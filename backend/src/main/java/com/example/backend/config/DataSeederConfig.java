package com.example.backend.config;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Configuration
@Profile("dev")
public class DataSeederConfig {

    @Bean
    public CommandLineRunner seedData(
            RecetaRepository recetaRepo,
            IngredienteRepository ingRepo,
            RecetaIngredienteRepository recIngRepo,
            RecetaPasoRepository pasoRepo,
            ObjectMapper objectMapper) {

        return args -> {
            // 1. Evitar duplicados: Si ya hay recetas, no hacemos nada
            if (recetaRepo.count() > 0) {
                System.out.println("--> Base de datos ya contiene datos. Saltando Seed.");
                return;
            }

            System.out.println("--> Iniciando importación de 40 recetas reales...");

            try {
                // 2. Cargar el archivo JSON
                InputStream is = new ClassPathResource("data/recetas_reales.json").getInputStream();
                List<Map<String, Object>> recetasList = objectMapper.readValue(is, new TypeReference<>() {});

                for (Map<String, Object> rMap : recetasList) {

                    // 3. Crear y Guardar la Entidad Receta
                    Receta receta = Receta.builder()
                            .nombre((String) rMap.get("nombre"))
                            .descripcion((String) rMap.get("descripcion"))
                            .tiempoPreparacion((Integer) rMap.get("tiempoPreparacion"))
                            .porciones((Integer) rMap.get("porciones"))
                            .dificultad((String) rMap.get("dificultad"))
                            .imagenUrl((String) rMap.get("imagenUrl"))
                            .fechaCreacion(LocalDateTime.now())
                            .etiquetas(parseEtiquetas((List<String>) rMap.get("etiquetas")))
                            .build();

                    Receta savedReceta = recetaRepo.save(receta);

                    // 4. Procesar y Guardar los Pasos
                    List<Map<String, Object>> pasosJson = (List<Map<String, Object>>) rMap.get("pasos");
                    if (pasosJson != null) {
                        for (Map<String, Object> p : pasosJson) {
                            pasoRepo.save(RecetaPaso.builder()
                                    .receta(savedReceta)
                                    .orden((Integer) p.get("orden"))
                                    .descripcion((String) p.get("descripcion"))
                                    .tiempoMinutos((Integer) p.get("tiempoMinutos"))
                                    .build());
                        }
                    }

                    // 5. Procesar Ingredientes y Relaciones
                    List<Map<String, Object>> ingredsJson = (List<Map<String, Object>>) rMap.get("ingredientes");
                    if (ingredsJson != null) {
                        for (Map<String, Object> i : ingredsJson) {
                            String nombreIngrediente = (String) i.get("nombre");
                            String categoria = (String) i.get("categoria");
                            String unidad = (String) i.get("unidad"); // <-- CAPTURAMOS LA UNIDAD DEL JSON

                            // Lógica de "Unicidad"
                            Ingrediente ingrediente = ingRepo.findByNombreIgnoreCase(nombreIngrediente)
                                    .orElseGet(() -> ingRepo.save(
                                            Ingrediente.builder()
                                                    .nombre(nombreIngrediente)
                                                    .categoria(categoria)
                                                    .unidadDefecto(unidad != null ? unidad : "unidades") // <-- ASIGNAMOS LA UNIDAD AQUÍ
                                                    .build()
                                    ));

                            // Creamos la relación intermedia Receta-Ingrediente
                            recIngRepo.save(RecetaIngrediente.builder()
                                    .receta(savedReceta)
                                    .ingrediente(ingrediente)
                                    .cantidad(convertirACantidad(i.get("cantidad")))
                                    .unidad(unidad)
                                    .opcional(false)
                                    .build());
                        }
                    }
                }
                System.out.println("✅ ¡ÉXITO! Se han importado las 40 recetas y sus dependencias.");

            } catch (Exception e) {
                System.err.println("❌ ERROR durante el seeding: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }

    // Helper para convertir las etiquetas del JSON al Enum de Java
    private Set<TipoDieta> parseEtiquetas(List<String> etiquetasJson) {
        if (etiquetasJson == null) return new HashSet<>();
        return etiquetasJson.stream()
                .map(tag -> {
                    try {
                        return TipoDieta.valueOf(tag.toUpperCase());
                    } catch (IllegalArgumentException e) {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
    }

    // Helper para manejar si el número viene como Integer o Double del JSON
    private Float convertirACantidad(Object cantidad) {
        if (cantidad instanceof Number) {
            return ((Number) cantidad).floatValue();
        }
        return 0.0f;
    }
}