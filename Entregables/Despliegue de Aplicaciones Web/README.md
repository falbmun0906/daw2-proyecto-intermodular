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

https://github.com/falbmun0906/daw2-proyecto-intermodular/blob/4ba06a3f99725d1d0bad99705d3f1264dbb1aa6f/backend/src/main/java/com/example/backend/service/UsuarioService.java#L9-L47

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

1. **Clonar el repositorio**: Cada workflow en GitHub Actions se ejecuta en una VM nueva (Ubuntu en este caso). Por ello, es necesario clonar el repositorio para disponer de todo el código fuente y la estructura de carpetas desde la que se generará la documentación.


2. **Configurar Java 21 y Maven**: La VM de GitHub no trae por defecto Java ni Maven. Para compilar el proyecto y generar Javadoc, se instalan y configuran estas herramientas en la sesión del job. Cada job empieza limpio, por eso hay que reinstalarlas siempre.


3. **Generar la documentación Javadoc en HTML**: Maven ejecuta javadoc:javadoc para producir los archivos HTML. Esto puede hacerse localmente o en el workflow. En el workflow, permite que los archivos se generen en la VM, listos para procesarse y versionarse.


4. **Instalar wkhtmltopdf**: La VM Ubuntu tampoco incluye esta herramienta. wkhtmltopdf se necesita para convertir HTML a PDF dentro del workflow. Sin esta instalación, no se podrían generar PDFs de manera automática en GitHub.


5. **Convertir cada archivo HTML en PDF preservando la estructura de carpetas**:  Se usa wkhtmltopdf sobre cada HTML generado, creando PDFs que mantienen la jerarquía original de carpetas. Esto garantiza que los PDFs sean fáciles de relacionar con el código fuente.


6. **Subir los PDF como artefactos del job**:  Las Actions de GitHub eliminan todos los archivos generados al finalizar el job. Subirlos como artefactos permite descargarlos desde la pestaña Actions sin necesidad de comprometerlos al repositorio.


7. **Actualizar la carpeta /docs en el repositorio con los HTML y PDF generados**: Copiar los archivos generados al directorio versionado /docs asegura que la documentación se mantenga en el repositorio y pueda ser consultada o referenciada públicamente.


8. **Hacer commit y push de los cambios con mensajes claros**: Como se mencionó en clase, sin este commit todos los archivos generados desaparecerían al terminar la VM. Al hacer commit y push, se guardan permanentemente en el repositorio, permitiendo que otros puedan verlos, descargarlos o servirlos vía GitHub Pages.

<p align="center">
  <img src="https://github.com/user-attachments/assets/430b7154-889c-4423-bfae-d551f91b74b2" width="512" height="384" alt="APUNTES CLASE 09_10" />
</p>


10. **Desplegar la documentación HTML en la rama gh-pages**: Permite que la documentación HTML sea accesible públicamente como un sitio web. Se aprovecha el token de GitHub para que la acción haga push automáticamente a la rama gh-pages.

---
### e) Mensajes de commit que evidencien la mejora: claros, descriptivos, en imperativo.

Ejemplos de commits realizados:

<img width="1570" height="501" alt="despliegue-commits" src="https://github.com/user-attachments/assets/a6f61005-4e42-47a2-8b2b-ef647867b1a8" />

---
### f) Evidencia de configuración SSH para GitHub (clave pública añadida, prueba ssh -T git@github.com).

Evidencia de configuración de clave SSH:

<img width="1127" height="491" alt="despliegue-evidencia-ssh" src="https://github.com/user-attachments/assets/d648ea00-f26a-4607-9ab6-ac06dd07478d" />

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
