package com.example.backend.config;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Seeder para crear datos de demostración para el usuario fran@despiensa.es
 * Incluye:
 * - Planificación de comidas para la semana
 * - Items en la despensa con fechas de caducidad variadas
 * - Lista de la compra con ingredientes reales
 */
@Configuration
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DemoUserDataSeeder {

    @Bean
    @Order(2) // Ejecutar después del DataSeederConfig principal
    public CommandLineRunner seedDemoUserData(
            UsuarioRepository usuarioRepo,
            RecetaRepository recetaRepo,
            IngredienteRepository ingredienteRepo,
            DespensaItemRepository despensaItemRepo,
            PlanificacionSemanaRepository planSemanaRepo,
            PlanificacionDiaRepository planDiaRepo,
            ListaCompraRepository listaCompraRepo,
            ListaItemRepository listaItemRepo) {

        return args -> {
            // Buscar usuario fran@despiensa.es
            Optional<Usuario> franOpt = usuarioRepo.findByEmail("fran@despiensa.es");

            if (franOpt.isEmpty()) {
                log.info("--> Usuario fran@despiensa.es no encontrado. Saltando seed de datos demo.");
                return;
            }

            Usuario fran = franOpt.get();
            log.info("--> Configurando datos de demostración para usuario: {}", fran.getEmail());

            // Verificar si ya tiene datos de demostración
            if (despensaItemRepo.countByUsuarioId(fran.getId()) > 0) {
                log.info("--> El usuario ya tiene datos de despensa. Saltando seed.");
                return;
            }

            // Obtener recetas para la planificación
            List<Receta> recetas = recetaRepo.findAll();
            if (recetas.size() < 14) {
                log.warn("--> No hay suficientes recetas para la planificación. Se necesitan al menos 14.");
                return;
            }

            // 1. CREAR PLANIFICACIÓN SEMANAL
            crearPlanificacionSemanal(fran, recetas, planSemanaRepo, planDiaRepo);

            // 2. CREAR ITEMS EN LA DESPENSA
            crearDespensa(fran, ingredienteRepo, despensaItemRepo);

            // 3. CREAR LISTA DE LA COMPRA
            crearListaCompra(fran, ingredienteRepo, listaCompraRepo, listaItemRepo);

            log.info("✅ Datos de demostración creados para usuario: {}", fran.getEmail());
        };
    }

    private void crearPlanificacionSemanal(
            Usuario usuario,
            List<Receta> recetas,
            PlanificacionSemanaRepository planSemanaRepo,
            PlanificacionDiaRepository planDiaRepo) {

        // Calcular fechas de la semana siguiente
        LocalDate hoy = LocalDate.now();
        LocalDate inicioSemana = hoy.plusDays(1); // Empieza mañana

        // Crear planificación de semana
        PlanificacionSemana planSemana = PlanificacionSemana.builder()
                .usuario(usuario)
                .fechaInicio(inicioSemana)
                .etiqueta("Semana del " + inicioSemana.getDayOfMonth() + "/" + inicioSemana.getMonthValue())
                .fechaCreacion(LocalDateTime.now())
                .build();

        PlanificacionSemana savedPlanSemana = planSemanaRepo.save(planSemana);

        // Crear comidas y cenas para cada día
        Random random = new Random(42); // Seed fijo para reproducibilidad
        List<Receta> recetasDisponibles = new ArrayList<>(recetas);
        Collections.shuffle(recetasDisponibles, random);

        int recetaIndex = 0;
        for (int dia = 0; dia < 7; dia++) {
            LocalDate fecha = inicioSemana.plusDays(dia);

            // COMIDA (13:00 - 15:00)
            if (recetaIndex < recetasDisponibles.size()) {
                PlanificacionDia comida = PlanificacionDia.builder()
                        .planificacionSemana(savedPlanSemana)
                        .receta(recetasDisponibles.get(recetaIndex++))
                        .fecha(fecha)
                        .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                        .notas("Comida planificada - 13:00 a 15:00")
                        .build();
                planDiaRepo.save(comida);
            }

            // CENA (20:30 - 22:30)
            if (recetaIndex < recetasDisponibles.size()) {
                PlanificacionDia cena = PlanificacionDia.builder()
                        .planificacionSemana(savedPlanSemana)
                        .receta(recetasDisponibles.get(recetaIndex++))
                        .fecha(fecha)
                        .tipoComida(PlanificacionDia.TipoComida.CENA)
                        .notas("Cena planificada - 20:30 a 22:30")
                        .build();
                planDiaRepo.save(cena);
            }
        }

        log.info("  ✓ Planificación semanal creada: {} comidas y cenas", Math.min(recetaIndex, 14));
    }

    private void crearDespensa(
            Usuario usuario,
            IngredienteRepository ingredienteRepo,
            DespensaItemRepository despensaItemRepo) {

        LocalDate hoy = LocalDate.now();

        // Items con diferentes fechas de caducidad para demostrar el sistema de alertas
        List<DespensaItemData> itemsData = List.of(
            // URGENCIA ALTA (1-2 días)
            new DespensaItemData("Leche", 1.0f, "litro", "Nevera", hoy.plusDays(1)),
            new DespensaItemData("Yogur", 4.0f, "unidades", "Nevera", hoy.plusDays(2)),

            // URGENCIA MEDIA (3-5 días)
            new DespensaItemData("Pollo", 500.0f, "gramos", "Nevera", hoy.plusDays(3)),
            new DespensaItemData("Tomate", 6.0f, "unidades", "Nevera", hoy.plusDays(4)),
            new DespensaItemData("Huevos", 6.0f, "unidades", "Nevera", hoy.plusDays(5)),

            // URGENCIA BAJA (6-14 días)
            new DespensaItemData("Queso", 200.0f, "gramos", "Nevera", hoy.plusDays(7)),
            new DespensaItemData("Mantequilla", 250.0f, "gramos", "Nevera", hoy.plusDays(10)),
            new DespensaItemData("Jamón", 150.0f, "gramos", "Nevera", hoy.plusDays(8)),

            // DESPENSA (larga duración)
            new DespensaItemData("Arroz", 1.0f, "kg", "Despensa", hoy.plusDays(180)),
            new DespensaItemData("Pasta", 500.0f, "gramos", "Despensa", hoy.plusDays(200)),
            new DespensaItemData("Aceite de oliva", 1.0f, "litro", "Despensa", hoy.plusDays(365)),
            new DespensaItemData("Sal", 1.0f, "kg", "Despensa", null), // Sin caducidad

            // CONGELADOR
            new DespensaItemData("Pescado", 400.0f, "gramos", "Congelador", hoy.plusDays(60)),
            new DespensaItemData("Guisantes", 500.0f, "gramos", "Congelador", hoy.plusDays(90))
        );

        int itemsCreados = 0;
        for (DespensaItemData itemData : itemsData) {
            Optional<Ingrediente> ingredienteOpt = ingredienteRepo.findByNombreIgnoreCase(itemData.nombre);

            if (ingredienteOpt.isEmpty()) {
                // Si no existe, crearlo
                Ingrediente nuevoIngrediente = Ingrediente.builder()
                        .nombre(itemData.nombre)
                        .categoria("General")
                        .unidadDefecto(itemData.unidad)
                        .build();
                ingredienteOpt = Optional.of(ingredienteRepo.save(nuevoIngrediente));
            }

            Ingrediente ingrediente = ingredienteOpt.get();

            // Determinar el estado según la fecha de caducidad
            DespensaItem.EstadoDespensaItem estado = DespensaItem.EstadoDespensaItem.OK;
            if (itemData.fechaCaducidad != null) {
                long diasHastaCaducidad = java.time.temporal.ChronoUnit.DAYS.between(hoy, itemData.fechaCaducidad);
                if (diasHastaCaducidad <= 0) {
                    estado = DespensaItem.EstadoDespensaItem.CADUCADO;
                } else if (diasHastaCaducidad <= 5) {
                    estado = DespensaItem.EstadoDespensaItem.PROXIMO_A_CADUCAR;
                }
            }

            DespensaItem item = DespensaItem.builder()
                    .usuario(usuario)
                    .ingrediente(ingrediente)
                    .cantidadActual(itemData.cantidad)
                    .unidad(itemData.unidad)
                    .ubicacion(itemData.ubicacion)
                    .fechaCaducidad(itemData.fechaCaducidad)
                    .estado(estado)
                    .build();

            despensaItemRepo.save(item);
            itemsCreados++;
        }

        log.info("  ✓ Despensa creada con {} items", itemsCreados);
    }

    private void crearListaCompra(
            Usuario usuario,
            IngredienteRepository ingredienteRepo,
            ListaCompraRepository listaCompraRepo,
            ListaItemRepository listaItemRepo) {

        // Crear lista de la compra
        ListaCompra lista = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .origen("MANUAL")
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .build();

        ListaCompra savedLista = listaCompraRepo.save(lista);

        // Items de la lista de la compra
        List<ListaItemData> itemsData = List.of(
            new ListaItemData("Tomate", 6.0f, "unidades"),
            new ListaItemData("Cebolla", 3.0f, "unidades"),
            new ListaItemData("Ajo", 2.0f, "cabezas"),
            new ListaItemData("Pimiento", 4.0f, "unidades"),
            new ListaItemData("Zanahoria", 500.0f, "gramos"),
            new ListaItemData("Patata", 1.0f, "kg"),
            new ListaItemData("Lechuga", 1.0f, "unidad"),
            new ListaItemData("Pepino", 2.0f, "unidades"),
            new ListaItemData("Limón", 4.0f, "unidades"),
            new ListaItemData("Naranja", 6.0f, "unidades"),
            new ListaItemData("Manzana", 6.0f, "unidades"),
            new ListaItemData("Pan", 1.0f, "barra")
        );

        int itemsCreados = 0;
        for (ListaItemData itemData : itemsData) {
            Optional<Ingrediente> ingredienteOpt = ingredienteRepo.findByNombreIgnoreCase(itemData.nombre);

            if (ingredienteOpt.isEmpty()) {
                // Si no existe, crearlo
                Ingrediente nuevoIngrediente = Ingrediente.builder()
                        .nombre(itemData.nombre)
                        .categoria("General")
                        .unidadDefecto(itemData.unidad)
                        .build();
                ingredienteOpt = Optional.of(ingredienteRepo.save(nuevoIngrediente));
            }

            Ingrediente ingrediente = ingredienteOpt.get();

            ListaItem item = ListaItem.builder()
                    .listaCompra(savedLista)
                    .ingrediente(ingrediente)
                    .cantidadNecesaria(itemData.cantidad)
                    .unidad(itemData.unidad)
                    .comprado(false)
                    .build();

            listaItemRepo.save(item);
            itemsCreados++;
        }

        log.info("  ✓ Lista de la compra creada con {} items", itemsCreados);
    }

    // Records para datos de items
    private record DespensaItemData(
            String nombre,
            float cantidad,
            String unidad,
            String ubicacion,
            LocalDate fechaCaducidad
    ) {}

    private record ListaItemData(
            String nombre,
            float cantidad,
            String unidad
    ) {}
}

