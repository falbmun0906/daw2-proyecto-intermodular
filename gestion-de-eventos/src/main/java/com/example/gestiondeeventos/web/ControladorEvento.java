package com.example.gestiondeeventos.web;

import com.example.gestiondeeventos.domain.Evento;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/eventos")
public class ControladorEvento {

    @GetMapping
    public List<Evento> getEventos() {
        return List.of(); // Simula la obtención de una lista de eventos
    }

    @GetMapping("/{id}")
    public Evento getEventoPorId(@PathVariable Long id) {
        Evento evento = new Evento();
        return evento; // Simula la obtención del evento por ID
    }

    @PostMapping
    public Evento crearEvento(@RequestBody Evento evento) {
        return evento; // Simula la creación del evento
    }

    @PutMapping("/{id}")
    public Evento actualizarEvento(@PathVariable Long id, @RequestBody Evento evento) {
        Evento eventoActualizado = new Evento();
        eventoActualizado.setId(id);

        return eventoActualizado; // Simula la actualización del evento
    }
}
