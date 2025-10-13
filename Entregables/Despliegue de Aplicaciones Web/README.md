# Práctica 1.1: GH Action para documentación



- **Lenguaje utilizado**: ``Java``. La práctica se ha realizado sobre el directorio backend del repositorio raíz del proyecto (Spring Boot)
- **Herramienta de documentación**: ``Javadoc``
- **Formato principal de salida**: ``HTML`` (con ``CSS`` y ``JS``)
- **Segundo formato**: ``PDF`` (convertido desde los HTML generados con wkhtmltopdf)
- **Herramienta CI/CD**: ``GitHub Actions``

---
### a) Herramientas usadas y comandos ejecutados:

- **Java 21** → Versión del JDK utilizada para compilar el proyecto y generar la documentación.

- **Spring Boot** → Framework utilizado en el proyecto, cuya estructura de código se documenta con Javadoc.

- **Maven** → Gestión de dependencias y ejecución de la tarea javadoc:javadoc.

- **Javadoc** → Generación automática de documentación HTML a partir de comentarios ``Java``.

    ```bash
    mvn clean javadoc:javadoc
    ```
- **Wkhtmltopdf** → Conversión de los archivos ``HTML`` de Javadoc a formato ``PDF``.

    > Instalado en Ubuntu con:
    
    ```bash
        sudo apt-get update && sudo apt-get install -y wkhtmltopdf
    ```
    
    > Este fragmento recorre todos los archivos HTML generados por el Javadoc y los convierte en PDF manteniendo la misma estructura de carpetas. Para cada archivo, obtiene su ruta relativa, crea las carpetas necesarias en la carpeta de destino (target/reports/pdf) y utiliza la herramienta wkhtmltopdf para generar el PDF correspondiente. Así, se obtiene una copia en PDF de toda la documentación HTML del proyecto.  
    
    ```bash
        for html in $(find target/reports/apidocs -type f -name "*.html"); do
                    relative_path=$(realpath --relative-to=target/reports/apidocs "$html")
                    pdf_path="target/reports/pdf/${relative_path%.html}.pdf"
                    mkdir -p "$(dirname "$pdf_path")"
                    echo "Generando $pdf_path..."
                    wkhtmltopdf --enable-local-file-access "file://$(pwd)/$html" "$pdf_path"
                  done
    ```

- **GitHub Actions** → Automatización ``CI/CD`` para ejecutar los pasos y subir resultados.

---
### b) Ejemplos de código documentado (enlace al fuente) y fragmento con las etiquetas/estructura usadas (docstrings, @param, @return, Kdoc, reStructuredText o Google Style, Estilo según JavaDoc.

**Clase**: ``UsuarioService.java``

```java
package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio para manejar la lógica de negocio relacionada con los {@link Usuario}.
 * Proporciona métodos para obtener todos los usuarios y guardar nuevos usuarios.
 */
@Service
public class UsuarioService {
    /**
     * Repositorio para acceder a los datos de {@link Usuario}.
     */
    private final UsuarioRepository repository;

    /**
     * Constructor que inyecta el repositorio de usuarios.
     *
     * @param repository el repositorio de usuarios a utilizar
     */
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    /**
     * Obtiene todos los usuarios registrados en la base de datos.
     *
     * @return lista de todos los {@link Usuario} existentes
     */
    public List<Usuario> getAll() {
        return repository.findAll();
    }

    /**
     * Guarda un usuario en la base de datos.
     *
     * @param usuario el {@link Usuario} a guardar
     * @return el {@link Usuario} guardado con su ID generado
     */
    public Usuario save (Usuario usuario) {
        return repository.save(usuario);
    }
}
```

**Etiquetas usadas**:

- ``/** ... */`` → Comentario de documentación JavaDoc.

- ``@param`` → Describe los parámetros de un método.

- ``@return`` → Describe lo que devuelve un método.

- ``{@link Usuario}`` → Crea un enlace a la clase Usuario en la documentación generada.

---
### c) Formatos generados (HTML + otro) y enlaces a cada uno.

Se han generado salidas en formato HTML (con su respectivo CSS y JS para el despliegue en GitHub Pages) y PDF, gracias a Wkhtmltopdf.

[Documentación HTML generada](https://github.com/falbmun0906/daw2-proyecto-intermodular/tree/main/docs)

[Documentación PDF generada](https://github.com/falbmun0906/daw2-proyecto-intermodular/tree/main/docs/pdf)

---
### d) Explicación breve del workflow (pasos del job, eventos que lo disparan).

El workflow `Generate and Publish Javadoc PDFs` se dispara automáticamente al hacer `push` en la rama `main` o manualmente mediante `workflow_dispatch`. Los pasos que realiza son: 

1. Clonar el repositorio.
2. Configurar Java 21 y Maven.
3. Generar la documentación Javadoc en HTML.
4. Instalar `wkhtmltopdf`.
5. Convertir cada archivo HTML en PDF preservando la estructura de carpetas usando `wkhtmltopdf`.
6. Sube los PDF como artefactos del job.
7. Actualiza la carpeta `/docs` en el repositorio con los HTML y PDF generados.
8. Hace commit y push de los cambios con mensajes claros.
9. Finalmente, despliega la documentación HTML en la rama `gh-pages` de GitHub Pages.

---
### e) Mensajes de commit que evidencien la mejora: claros, descriptivos, en imperativo.

Ejemplos de commits realizados:

(Subir captura)

---
### f) Evidencia de configuración SSH para GitHub (clave pública añadida, prueba ssh -T git@github.com).

Evidencia de configuración:

(Subir captura)

---
### g) Cómo clonar/usar el repositorio para reproducir la generación de documentación.

Para generar la documentación en HTML, se puede hacer de dos formas:

1. Localmente: ejecutando en el directorio ``backend`` el comando de Maven:

```bash
mvn clean javadoc:javadoc
```

Esto generará la documentación en ``target/reports/apidocs``.

2. A través del workflow de **GitHub Actions**: al hacer push a main o mediante un ``workflow dispatch``, se ejecutará automáticamente el job ``generate-docs``, que genera el HTML y actualiza la carpeta ``/docs``.

Para la documentación en PDF, es necesario usar el workflow en **GitHub**, ya que depende de wkhtmltopdf y de la configuración específica que hemos definido en el job. Esto se hace de la siguiente manera:

- Hacer push a la rama main o ejecutar manualmente el workflow (``workflow_dispatch``) desde la pestaña **Actions** del repositorio.

- El job ``generate-docs`` recorrerá todos los archivos HTML generados por Javadoc y creará PDF en ``target/reports/pdf``, replicando la estructura de carpetas.

- Los PDF resultantes se subirán como artefactos del workflow y también se copiarán a ``/docs/pdf`` en el repositorio.

De este modo, no es necesario instalar ``wkhtmltopdf`` localmente, y cualquier usuario puede obtener los PDF ejecutando el workflow en **GitHub**.