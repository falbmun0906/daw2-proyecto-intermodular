package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Controlador para administración y mantenimiento de datos.
 * Solo accesible para administradores.
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Administración", description = "Endpoints administrativos para gestión de datos")
public class AdminController {

    private final RecetaRepository recetaRepo;
    private final IngredienteRepository ingRepo;
    private final RecetaIngredienteRepository recIngRepo;
    private final RecetaPasoRepository pasoRepo;
    private final ObjectMapper objectMapper;

    /**
     * Carga las recetas desde el archivo JSON de forma forzada.
     * POST /api/admin/seed-recetas?force=true
     *
     * @param force si true, elimina datos existentes antes de cargar
     * @return Mensaje de éxito con estadísticas
     */
    @Operation(summary = "Cargar recetas desde JSON",
               description = "Carga las 40 recetas del archivo recetas_reales.json. Use force=true para recargar.")
    @PostMapping("/seed-recetas")
    public ResponseEntity<Map<String, Object>> seedRecetas(
            @RequestParam(defaultValue = "false") boolean force) {

        Map<String, Object> response = new HashMap<>();

        try {
            // Si force=true, limpiamos los datos existentes
            if (force) {
                System.out.println("🗑️ Eliminando datos existentes (force=true)...");
                recIngRepo.deleteAll();
                pasoRepo.deleteAll();
                recetaRepo.deleteAll();
                System.out.println("✅ Datos eliminados");
            } else if (recetaRepo.count() > 0) {
                response.put("status", "skipped");
                response.put("message", "La base de datos ya contiene recetas. Use force=true para recargar.");
                response.put("recetasExistentes", recetaRepo.count());
                return ResponseEntity.ok(response);
            }

            System.out.println("📥 Iniciando importación de recetas reales...");

            // Cargar el archivo JSON
            InputStream is = new ClassPathResource("data/recetas_reales.json").getInputStream();
            List<Map<String, Object>> recetasList = objectMapper.readValue(is, new TypeReference<>() {});

            int recetasCargadas = 0;
            int pasosCargados = 0;
            int ingredientesCargados = 0;
            Set<String> ingredientesUnicos = new HashSet<>();

            for (Map<String, Object> rMap : recetasList) {

                // Crear y Guardar la Entidad Receta
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
                recetasCargadas++;

                // Procesar y Guardar los Pasos
                List<Map<String, Object>> pasosJson = (List<Map<String, Object>>) rMap.get("pasos");
                if (pasosJson != null) {
                    for (Map<String, Object> p : pasosJson) {
                        pasoRepo.save(RecetaPaso.builder()
                                .receta(savedReceta)
                                .orden((Integer) p.get("orden"))
                                .descripcion((String) p.get("descripcion"))
                                .tiempoMinutos((Integer) p.get("tiempoMinutos"))
                                .build());
                        pasosCargados++;
                    }
                }

                // Procesar Ingredientes y Relaciones
                List<Map<String, Object>> ingredsJson = (List<Map<String, Object>>) rMap.get("ingredientes");
                if (ingredsJson != null) {
                    for (Map<String, Object> i : ingredsJson) {
                        String nombreIngrediente = (String) i.get("nombre");
                        String categoria = (String) i.get("categoria");
                        String unidad = (String) i.get("unidad");

                        // Lógica de "Unicidad"
                        Ingrediente ingrediente = ingRepo.findByNombreIgnoreCase(nombreIngrediente)
                                .orElseGet(() -> {
                                    ingredientesUnicos.add(nombreIngrediente);
                                    return ingRepo.save(
                                            Ingrediente.builder()
                                                    .nombre(nombreIngrediente)
                                                    .categoria(categoria)
                                                    .unidadDefecto(unidad != null ? unidad : "unidades")
                                                    .build()
                                    );
                                });

                        // Creamos la relación intermedia Receta-Ingrediente
                        recIngRepo.save(RecetaIngrediente.builder()
                                .receta(savedReceta)
                                .ingrediente(ingrediente)
                                .cantidad(convertirACantidad(i.get("cantidad")))
                                .unidad(unidad)
                                .opcional(false)
                                .build());
                        ingredientesCargados++;
                    }
                }
            }

            System.out.println("✅ Importación completada exitosamente");

            response.put("status", "success");
            response.put("message", "Recetas cargadas exitosamente");
            response.put("estadisticas", Map.of(
                    "recetas", recetasCargadas,
                    "pasos", pasosCargados,
                    "relaciones_ingredientes", ingredientesCargados,
                    "ingredientes_unicos", ingredientesUnicos.size()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("❌ ERROR durante la importación: " + e.getMessage());

            response.put("status", "error");
            response.put("message", "Error al cargar las recetas: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Obtiene estadísticas de la base de datos.
     * GET /api/admin/stats
     *
     * @return Estadísticas de recetas, ingredientes, etc.
     */
    @Operation(summary = "Estadísticas de la base de datos",
               description = "Obtiene contadores de todas las entidades")
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("recetas", recetaRepo.count());
        stats.put("ingredientes", ingRepo.count());
        stats.put("pasos", pasoRepo.count());
        stats.put("relaciones_receta_ingrediente", recIngRepo.count());

        return ResponseEntity.ok(stats);
    }

    /**
     * Elimina todos los datos de recetas.
     * DELETE /api/admin/delete-all
     *
     * @return Mensaje de confirmación
     */
    @Operation(summary = "Eliminar todos los datos",
               description = "CUIDADO: Elimina todas las recetas, ingredientes y relaciones")
    @DeleteMapping("/delete-all")
    public ResponseEntity<Map<String, String>> deleteAll() {
        try {
            long recetas = recetaRepo.count();
            long ingredientes = ingRepo.count();

            recIngRepo.deleteAll();
            pasoRepo.deleteAll();
            recetaRepo.deleteAll();
            ingRepo.deleteAll();

            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Eliminadas " + recetas + " recetas y " + ingredientes + " ingredientes");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // Helpers
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

    private Float convertirACantidad(Object cantidad) {
        if (cantidad instanceof Number) {
            return ((Number) cantidad).floatValue();
        }
        return 0.0f;
    }
}
