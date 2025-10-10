package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Backend.
 *
 * Esta clase arranca la aplicación Spring Boot.
 */
@SpringBootApplication
public class BackendApplication {

    /**
     * Método principal que inicia la aplicación.
     *
     * @param args argumentos de línea de comandos (si los hubiera)
     */
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}