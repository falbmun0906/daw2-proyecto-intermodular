package com.example.gestiondeeventos.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity
public class Participante {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String usuario;

    @Column(nullable = false)
    private String contrasenia;
}
