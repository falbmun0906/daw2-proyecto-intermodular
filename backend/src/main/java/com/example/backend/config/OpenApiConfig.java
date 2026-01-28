package com.example.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuración de OpenAPI/Swagger para la documentación de la API.
 * Incluye información general, configuración de seguridad JWT y servidores.
 */
@Configuration
public class OpenApiConfig {

    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("Despiensa API")
                        .version("1.0.0")
                        .description("API REST para la gestión de despensa, recetas y planificación de comidas.\n\n" +
                                "Esta API permite a los usuarios:\n" +
                                "- Gestionar su despensa de ingredientes\n" +
                                "- Buscar y guardar recetas\n" +
                                "- Planificar comidas semanales\n" +
                                "- Generar listas de compra automáticas")
                        .contact(new Contact()
                                .name("Equipo Despiensa")
                                .email("info@despiensa.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(getServers())
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Introduce el token JWT obtenido del login")));
    }

    private List<Server> getServers() {
        Server devServer = new Server()
                .url("http://localhost:8080")
                .description("Servidor de desarrollo");

        Server prodServer = new Server()
                .url("https://api.despiensa.com")
                .description("Servidor de producción");

        if ("prod".equals(activeProfile)) {
            return List.of(prodServer, devServer);
        }
        return List.of(devServer, prodServer);
    }
}
