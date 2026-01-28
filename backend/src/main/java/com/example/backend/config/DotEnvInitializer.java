package com.example.backend.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Inicializador que carga variables de entorno desde el archivo .env
 * Este se ejecuta antes de que Spring Boot inicie el contexto.
 */
public class DotEnvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        Map<String, Object> envVariables = new HashMap<>();

        // Intentar cargar .env desde la raíz del proyecto
        Resource envFile = new FileSystemResource(".env");

        if (!envFile.exists()) {
            // Intentar desde el directorio padre (para ejecutar desde IDE)
            envFile = new FileSystemResource("../.env");
        }

        if (envFile.exists()) {
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(envFile.getInputStream(), StandardCharsets.UTF_8))) {

                String line;
                while ((line = reader.readLine()) != null) {
                    line = line.trim();

                    // Ignorar líneas vacías y comentarios
                    if (line.isEmpty() || line.startsWith("#")) {
                        continue;
                    }

                    // Parsear línea con formato KEY=VALUE
                    int separatorIndex = line.indexOf('=');
                    if (separatorIndex > 0) {
                        String key = line.substring(0, separatorIndex).trim();
                        String value = line.substring(separatorIndex + 1).trim();

                        // Remover comillas si existen
                        if (value.startsWith("\"") && value.endsWith("\"")) {
                            value = value.substring(1, value.length() - 1);
                        }

                        envVariables.put(key, value);
                        System.out.println("✓ Cargada variable: " + key);
                    }
                }

                // Añadir las variables al entorno de Spring
                environment.getPropertySources().addFirst(
                    new MapPropertySource("dotenv", envVariables)
                );

                System.out.println("✓ Archivo .env cargado correctamente con " + envVariables.size() + " variables");

            } catch (Exception e) {
                System.err.println("⚠ Error al cargar .env: " + e.getMessage());
            }
        } else {
            System.out.println("ℹ Archivo .env no encontrado, usando valores por defecto o variables del sistema");
        }
    }
}
