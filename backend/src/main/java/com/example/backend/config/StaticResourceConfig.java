package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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

    @Value("${app.images.path:./images/}")
    private String imagesPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Servir imágenes desde carpeta externa
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + imagesPath)
                .setCachePeriod(3600); // Cache de 1 hora

        // También servir desde classpath para desarrollo
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCachePeriod(3600);
    }
}
