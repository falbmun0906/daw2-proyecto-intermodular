package com.example.backend.service;

import com.example.backend.model.PlanificacionDia;
import com.example.backend.model.PlanificacionSemana;
import com.example.backend.repository.PlanificacionSemanaRepository;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

/**
 * Servicio para generar PDFs de planificaciones semanales.
 */
@Service
@RequiredArgsConstructor
public class PdfGeneracionService {

    private final PlanificacionSemanaRepository planificacionSemanaRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter DAY_FORMATTER = DateTimeFormatter.ofPattern("EEEE");

    /**
     * Genera un PDF con la planificación semanal.
     *
     * @param planificacionId ID de la planificación semanal
     * @return bytes del PDF generado
     */
    @Transactional(readOnly = true)
    public byte[] generarPdfPlanificacionSemanal(Long planificacionId) {
        PlanificacionSemana planificacion = planificacionSemanaRepository.findById(planificacionId)
                .orElseThrow(() -> new RuntimeException("Planificación semanal no encontrada con id: " + planificacionId));

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Colores personalizados
            DeviceRgb colorPrimario = new DeviceRgb(76, 175, 80); // Verde
            DeviceRgb colorSecundario = new DeviceRgb(240, 240, 240); // Gris claro

            // Título principal
            Paragraph titulo = new Paragraph("Planificación Semanal")
                    .setFontSize(24)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(colorPrimario)
                    .setMarginBottom(10);
            document.add(titulo);

            // Información de la planificación
            Paragraph info = new Paragraph()
                    .add("Etiqueta: " + planificacion.getEtiqueta() + "\n")
                    .add("Fecha de inicio: " + planificacion.getFechaInicio().format(DATE_FORMATTER) + "\n")
                    .add("Creada: " + planificacion.getFechaCreacion().format(DATE_FORMATTER))
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20);
            document.add(info);

            // Obtener y ordenar los días
            List<PlanificacionDia> dias = planificacion.getDias();
            dias.sort(Comparator.comparing(PlanificacionDia::getFecha));

            // Tabla de planificación
            if (!dias.isEmpty()) {
                // Crear tabla con 4 columnas: Día, Fecha, Comida, Receta
                Table table = new Table(UnitValue.createPercentArray(new float[]{15, 20, 20, 45}))
                        .useAllAvailableWidth()
                        .setMarginBottom(20);

                // Cabecera de la tabla
                agregarCeldaCabecera(table, "Día", colorPrimario);
                agregarCeldaCabecera(table, "Fecha", colorPrimario);
                agregarCeldaCabecera(table, "Comida", colorPrimario);
                agregarCeldaCabecera(table, "Receta", colorPrimario);

                // Filas de datos
                boolean colorAlternativo = false;
                for (PlanificacionDia dia : dias) {
                    DeviceRgb colorFila = colorAlternativo ? colorSecundario : new DeviceRgb(255, 255, 255);

                    agregarCeldaDato(table, dia.getFecha().format(DAY_FORMATTER), colorFila);
                    agregarCeldaDato(table, dia.getFecha().format(DATE_FORMATTER), colorFila);
                    agregarCeldaDato(table, dia.getTipoComida().name(), colorFila);

                    String recetaNombre = dia.getReceta() != null ? dia.getReceta().getNombre() : "Sin receta";
                    agregarCeldaDato(table, recetaNombre, colorFila);

                    colorAlternativo = !colorAlternativo;
                }

                document.add(table);
            } else {
                Paragraph sinDatos = new Paragraph("No hay días planificados en esta semana.")
                        .setFontSize(12)
                        .setItalic()
                        .setTextAlignment(TextAlignment.CENTER);
                document.add(sinDatos);
            }

            // Pie de página
            Paragraph footer = new Paragraph("Generado por Despiensa - Tu asistente de planificación de comidas")
                    .setFontSize(10)
                    .setItalic()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(ColorConstants.GRAY)
                    .setMarginTop(30);
            document.add(footer);

            document.close();

            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF de la planificación semanal", e);
        }
    }

    /**
     * Genera un PDF con múltiples planificaciones semanales de un usuario.
     *
     * @param usuarioId ID del usuario
     * @return bytes del PDF generado
     */
    @Transactional(readOnly = true)
    public byte[] generarPdfTodasPlanificaciones(Long usuarioId) {
        List<PlanificacionSemana> planificaciones = planificacionSemanaRepository.findByUsuarioId(usuarioId);

        if (planificaciones.isEmpty()) {
            throw new RuntimeException("No se encontraron planificaciones para el usuario con id: " + usuarioId);
        }

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            DeviceRgb colorPrimario = new DeviceRgb(76, 175, 80);
            DeviceRgb colorSecundario = new DeviceRgb(240, 240, 240);

            // Título principal
            Paragraph titulo = new Paragraph("Historial de Planificaciones")
                    .setFontSize(24)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(colorPrimario)
                    .setMarginBottom(30);
            document.add(titulo);

            // Procesar cada planificación
            for (int i = 0; i < planificaciones.size(); i++) {
                PlanificacionSemana planificacion = planificaciones.get(i);

                // Subtítulo de la planificación
                Paragraph subtitulo = new Paragraph(planificacion.getEtiqueta())
                        .setFontSize(16)
                        .setBold()
                        .setFontColor(colorPrimario)
                        .setMarginTop(i > 0 ? 20 : 0)
                        .setMarginBottom(5);
                document.add(subtitulo);

                // Información
                Paragraph info = new Paragraph()
                        .add("Fecha de inicio: " + planificacion.getFechaInicio().format(DATE_FORMATTER))
                        .setFontSize(10)
                        .setMarginBottom(10);
                document.add(info);

                // Tabla de la planificación
                List<PlanificacionDia> dias = planificacion.getDias();
                dias.sort(Comparator.comparing(PlanificacionDia::getFecha));

                if (!dias.isEmpty()) {
                    Table table = new Table(UnitValue.createPercentArray(new float[]{15, 20, 20, 45}))
                            .useAllAvailableWidth()
                            .setMarginBottom(15);

                    agregarCeldaCabecera(table, "Día", colorPrimario);
                    agregarCeldaCabecera(table, "Fecha", colorPrimario);
                    agregarCeldaCabecera(table, "Comida", colorPrimario);
                    agregarCeldaCabecera(table, "Receta", colorPrimario);

                    boolean colorAlternativo = false;
                    for (PlanificacionDia dia : dias) {
                        DeviceRgb colorFila = colorAlternativo ? colorSecundario : new DeviceRgb(255, 255, 255);

                        agregarCeldaDato(table, dia.getFecha().format(DAY_FORMATTER), colorFila);
                        agregarCeldaDato(table, dia.getFecha().format(DATE_FORMATTER), colorFila);
                        agregarCeldaDato(table, dia.getTipoComida().name(), colorFila);

                        String recetaNombre = dia.getReceta() != null ? dia.getReceta().getNombre() : "Sin receta";
                        agregarCeldaDato(table, recetaNombre, colorFila);

                        colorAlternativo = !colorAlternativo;
                    }

                    document.add(table);
                }
            }

            // Pie de página
            Paragraph footer = new Paragraph("Generado por Despiensa - Tu asistente de planificación de comidas")
                    .setFontSize(10)
                    .setItalic()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(ColorConstants.GRAY)
                    .setMarginTop(30);
            document.add(footer);

            document.close();

            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF de todas las planificaciones", e);
        }
    }

    /**
     * Agrega una celda de cabecera a la tabla.
     */
    private void agregarCeldaCabecera(Table table, String texto, DeviceRgb color) {
        Cell cell = new Cell()
                .add(new Paragraph(texto).setBold().setFontColor(ColorConstants.WHITE))
                .setBackgroundColor(color)
                .setTextAlignment(TextAlignment.CENTER)
                .setPadding(8);
        table.addHeaderCell(cell);
    }

    /**
     * Agrega una celda de dato a la tabla.
     */
    private void agregarCeldaDato(Table table, String texto, DeviceRgb color) {
        Cell cell = new Cell()
                .add(new Paragraph(texto))
                .setBackgroundColor(color)
                .setPadding(6);
        table.addCell(cell);
    }
}
