package com.example.backend.service;

import com.example.backend.dto.CompartirListaRequest;
import com.example.backend.dto.CompartirListaResponse;
import com.example.backend.model.ListaCompra;
import com.example.backend.model.ListaItem;
import com.example.backend.repository.ListaCompraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Servicio para compartir listas de compra por WhatsApp y Telegram.
 */
@Service
@RequiredArgsConstructor
public class CompartirListaService {

    private final ListaCompraRepository listaCompraRepository;

    /**
     * Genera el texto formateado de la lista de compra.
     */
    private String generarTextoLista(ListaCompra lista) {
        StringBuilder texto = new StringBuilder();
        texto.append("🛒 *Lista de Compra*\n\n");

        if (lista.getOrigen() != null && !lista.getOrigen().isEmpty()) {
            texto.append("📋 Origen: ").append(lista.getOrigen()).append("\n");
        }

        texto.append("📅 Generada: ").append(lista.getFechaGenerada().toLocalDate()).append("\n\n");
        texto.append("*Artículos:*\n");

        List<ListaItem> items = lista.getItems();
        for (int i = 0; i < items.size(); i++) {
            ListaItem item = items.get(i);
            String checkMark = item.getComprado() ? "✅" : "⬜";
            texto.append(String.format("%s %d. %s - %.2f %s\n",
                    checkMark,
                    i + 1,
                    item.getIngrediente().getNombre(),
                    item.getCantidadNecesaria(),
                    item.getUnidad()));
        }

        texto.append("\n💡 _Lista generada por Despiensa_");

        return texto.toString();
    }

    /**
     * Comparte una lista de compra por WhatsApp.
     */
    @Transactional
    public CompartirListaResponse compartirPorWhatsApp(Long listaId, CompartirListaRequest request) {
        ListaCompra lista = listaCompraRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista de compra no encontrada con id: " + listaId));

        String textoLista = generarTextoLista(lista);

        // Guardar el texto generado en la lista
        lista.setTextoWhatsappGenerado(textoLista);
        listaCompraRepository.save(lista);

        // Generar URL de WhatsApp
        String url = generarUrlWhatsApp(textoLista, request.getTelefono());

        return CompartirListaResponse.builder()
                .plataforma("WHATSAPP")
                .url(url)
                .mensaje(textoLista)
                .exito(true)
                .build();
    }

    /**
     * Comparte una lista de compra por Telegram.
     */
    @Transactional
    public CompartirListaResponse compartirPorTelegram(Long listaId, CompartirListaRequest request) {
        ListaCompra lista = listaCompraRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista de compra no encontrada con id: " + listaId));

        String textoLista = generarTextoLista(lista);

        // Guardar el texto generado en la lista
        lista.setTextoWhatsappGenerado(textoLista);
        listaCompraRepository.save(lista);

        // Generar URL de Telegram
        String url = generarUrlTelegram(textoLista);

        return CompartirListaResponse.builder()
                .plataforma("TELEGRAM")
                .url(url)
                .mensaje(textoLista)
                .exito(true)
                .build();
    }

    /**
     * Genera la URL de WhatsApp Web con el mensaje pre-rellenado.
     */
    private String generarUrlWhatsApp(String mensaje, String telefono) {
        try {
            String mensajeCodificado = URLEncoder.encode(mensaje, StandardCharsets.UTF_8.toString());

            if (telefono != null && !telefono.isEmpty()) {
                // WhatsApp con número específico
                // Limpiar el número de telefono (eliminar espacios, guiones, etc.)
                String numeroLimpio = telefono.replaceAll("[^0-9+]", "");
                return String.format("https://wa.me/%s?text=%s", numeroLimpio, mensajeCodificado);
            } else {
                // WhatsApp sin número específico (se abrirá la lista de contactos)
                return String.format("https://wa.me/?text=%s", mensajeCodificado);
            }
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Error al codificar el mensaje para WhatsApp", e);
        }
    }

    /**
     * Genera la URL de Telegram con el mensaje pre-rellenado.
     */
    private String generarUrlTelegram(String mensaje) {
        try {
            String mensajeCodificado = URLEncoder.encode(mensaje, StandardCharsets.UTF_8.toString());
            // URL de Telegram que permite compartir texto
            return String.format("https://t.me/share/url?url=&text=%s", mensajeCodificado);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Error al codificar el mensaje para Telegram", e);
        }
    }

    /**
     * Obtiene el texto pre-generado de una lista de compra.
     */
    @Transactional(readOnly = true)
    public String obtenerTextoLista(Long listaId) {
        ListaCompra lista = listaCompraRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista de compra no encontrada con id: " + listaId));

        if (lista.getTextoWhatsappGenerado() != null) {
            return lista.getTextoWhatsappGenerado();
        }

        return generarTextoLista(lista);
    }
}
