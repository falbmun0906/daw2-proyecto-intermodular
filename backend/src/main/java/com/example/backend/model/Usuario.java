package com.example.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

/**
 * Representa un usuario en la aplicación.
 * Esta entidad se almacena en la base de datos mediante JPA.
 */
@Entity
@Getter
@Setter
public class Usuario {

    /** Identificador único del usuario, generado automáticamente */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre completo del usuario */
    private String nombre;

    /** Correo electrónico del usuario */
    private String email;
}
