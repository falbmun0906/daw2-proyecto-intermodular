package com.example.backend.config;

import com.example.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Configuración de seguridad de Spring Security con JWT.
 * Configura autenticación, autorización, CORS y protección de rutas.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Bean de PasswordEncoder para hashear contraseñas.
     * Usa BCrypt como algoritmo de hashing.
     *
     * @return PasswordEncoder configurado
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Bean de AuthenticationManager necesario para el login.
     *
     * @param authConfig configuración de autenticación
     * @return AuthenticationManager
     * @throws Exception si hay error en la configuración
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Proveedor de autenticación que usa UserDetailsService y PasswordEncoder.
     *
     * @return DaoAuthenticationProvider configurado
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Configuración de la cadena de filtros de seguridad.
     * Define rutas públicas, protegidas y restricciones por rol.
     *
     * @param http HttpSecurity para configurar
     * @return SecurityFilterChain configurada
     * @throws Exception si hay error en la configuración
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/h2-console/**") // Deshabilitar CSRF para H2
                        .disable())
                .headers(headers -> headers
                        .frameOptions(frame -> frame.sameOrigin())) // Permitir frames para H2
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Rutas públicas (sin autenticación)
                        .requestMatchers("/api/auth/**").permitAll()
                        // Imágenes estáticas (públicas)
                        .requestMatchers("/images/**").permitAll()
                        // Swagger/OpenAPI (permitir todas las rutas relacionadas)
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/api-docs/**",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()
                        .requestMatchers("/h2-console/**").permitAll() // Consola H2
                        .requestMatchers("/error").permitAll()

                        // TEMPORAL: Permitir endpoints de admin en desarrollo (QUITAR EN PRODUCCIÓN)
                        .requestMatchers("/api/admin/**").permitAll()

                        // Rutas de admin (solo ROLE_ADMIN)
                        .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
                        // Permitir GET de recursos de usuario solo a usuarios autenticados (USER o ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/*/despensa/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/*/recetas/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/*/planificaciones/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/*/listas/**").hasAnyRole("USER", "ADMIN")
                        // El resto de GET sobre /api/usuarios/** solo para admin
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/**").hasRole("ADMIN")

                        // Recetas públicas para lectura, protegidas para crear/modificar
                        .requestMatchers(HttpMethod.GET, "/api/recetas/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/ingredientes/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/recetas/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/ingredientes/**").hasAnyRole("USER", "ADMIN")

                        // Todas las demás rutas requieren autenticación
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuración de CORS para permitir peticiones del frontend Angular.
     *
     * @return CorsConfigurationSource configurada
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Frontend Angular
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
