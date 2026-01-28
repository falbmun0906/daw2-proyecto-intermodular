package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Backend.
 *
 * Esta clase arranca la aplicación Spring Boot y carga automáticamente
 * las variables de entorno desde el archivo .env gracias a spring-dotenv.
 */
@SpringBootApplication
public class BackendApplication {

    /**
     * Método principal que inicia la aplicación.
     *
     * Spring-dotenv cargará automáticamente el archivo .env de la raíz del proyecto.
     *
     * @param args argumentos de línea de comandos (si los hubiera)
     */
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}