package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Configuración para servir archivos estáticos (imágenes).
 *
 * Las imágenes se almacenan en una carpeta externa al JAR:
 * - /images/recetas/ - Imágenes de recetas
 * - /images/ingredientes/ - Imágenes de ingredientes
 *
 * Cada imagen tiene 3 versiones:
 * - {nombre}-small.webp (150px, thumbnail)
 * - {nombre}-medium.webp (400px, cards)
 * - {nombre}-large.webp (800px, detalle)
 */
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Value("${app.images.path:images/}")
    private String imagesPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Obtener ruta absoluta del directorio de imágenes
        Path absolutePath = Paths.get(imagesPath).toAbsolutePath();
        String absolutePathStr = absolutePath.toUri().toString();

        // Servir imágenes desde carpeta externa
        registry.addResourceHandler("/images/**")
                .addResourceLocations(absolutePathStr)
                .setCachePeriod(3600); // Cache de 1 hora
    }
}
