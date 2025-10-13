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

    Instalado en Ubuntu con:
    
    ```bash
        sudo apt-get update && sudo apt-get install -y wkhtmltopdf
    ```
    
    Este fragmento recorre todos los archivos HTML generados por el Javadoc y los convierte en PDF manteniendo la misma estructura de carpetas. Para cada archivo, obtiene su ruta relativa, crea las carpetas necesarias en la carpeta de destino (target/reports/pdf) y utiliza la herramienta wkhtmltopdf para generar el PDF correspondiente. Así, se obtiene una copia en PDF de toda la documentación HTML del proyecto.  
    
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

---
## RESPUESTAS AL CUESTIONARIO

### a) ¿Qué herramienta o generador (p. ej., Sphinx, pdoc, Javadoc, Doxygen, Dokka) utilizaste en el workflow para crear la documentación en /docs?
En este proyecto utilicé Javadoc para generar la documentación de Java en HTML. Esto se hace ejecutando ``mvn clean javadoc:javadoc`` (ejecuta Maven sobre el proyecto, limpia compilaciones previas (clean) y genera la documentación Javadoc en target/reports/apidocs).

### b) Muestra un fragmento del código con comentarios/docstrings estructurados (p. ej., :param, :return: o etiquetas equivalentes) que haya sido procesado por la herramienta. Comenta que estilo de documentación has utlicado: (p. ej., reStructuredText, Google Style, KDoc)

https://github.com/falbmun0906/daw2-proyecto-intermodular/blob/4ba06a3f99725d1d0bad99705d3f1264dbb1aa6f/backend/src/main/java/com/example/backend/service/UsuarioService.java#L9-L47

**Estilo usado:** ``JavaDoc``, que utiliza etiquetas como ``@param``, ``@return`` y referencias a otras clases (``{@link Clase}``) para generar documentación estructurada.

**Procesamiento:** Maven con javadoc:javadoc toma estos comentarios y genera la documentación HTML automáticamente en ``target/reports/apidocs``.

En [este enlace](https://falbmun0906.github.io/daw2-proyecto-intermodular/com/example/backend/service/UsuarioService.html) se muestra el resultado obtenido (HTML, CSS y JS).

### c) ¿Qué segundo formato (además de HTML) generaste? Explica la configuración o comandos del workflow y herramientas que lo producen.

Además de la documentación en HTML, se generó un formato PDF que incluye todos los archivos .html generados por JavaDoc, manteniendo la estructura de carpetas original.

Esta parte me resultó más complicada, ya que inicialmente intenté:

- Usar Pandoc + LaTeX para crear un .book uniendo los .html más relevantes en un solo PDF.

- Crear un script en Python personalizado para combinar los HTML y exportarlos a PDF.

Ninguna de estas opciones funcionó correctamente, por lo que finalmente recurrí a wkhtmltopdf, que convierte directamente los HTML a PDF respetando los enlaces relativos y la estructura de carpetas.

```bash
# 4. Generar Javadoc HTML
- name: Build Javadoc HTML
  run: mvn clean javadoc:javadoc

# 5. Instalar wkhtmltopdf
- name: Install wkhtmltopdf
  run: sudo apt-get update && sudo apt-get install -y wkhtmltopdf

# 6. Generar PDFs individuales
- name: Convert HTMLs to PDFs
  run: |
    mkdir -p target/reports/pdf
    for html in $(find target/reports/apidocs -type f -name "*.html"); do
      relative_path=$(realpath --relative-to=target/reports/apidocs "$html")
      pdf_path="target/reports/pdf/${relative_path%.html}.pdf"
      mkdir -p "$(dirname "$pdf_path")"
      echo "Generando $pdf_path..."
      wkhtmltopdf --enable-local-file-access "file://$(pwd)/$html" "$pdf_path"
    done

    echo "Archivos PDF generados:"
    find target/reports/pdf -type f -name "*.pdf"
```

Cada HTML se convierte en un PDF individual, y la estructura de carpetas se preserva gracias a ``realpath`` y ``mkdir -p``. Los PDF generados se almacenan en ``target/reports/pdf/``.

> ``Nota importante``: para generar los PDF es necesario ejecutar el workflow en GitHub, ya que ``wkhtmltopdf`` necesita estar instalado en el entorno Ubuntu de la Action y la configuración local puede no tenerlo disponible.

### d) Explica cómo GitHub facilita mantener la documentación (actualizaciones del README.md y de /docs) cuando colaboran varias personas (PRs, reviews, checks de CI, protección de ramas).

GitHub facilita el mantenimiento de la documentación de forma colaborativa y controlada gracias a su integración con GitHub Actions y las herramientas de colaboración:

- **Pull Requests (PR)**: permiten que los colaboradores propongan cambios sin modificar directamente la rama principal (main). Cada PR puede incluir actualizaciones en el código, el README.md o la carpeta /docs, manteniendo el control de versiones.

- **Reviews**: otros miembros del equipo pueden revisar y aprobar los cambios antes de fusionarlos, asegurando la calidad del contenido y evitando conflictos.

- **Checks de CI**: el workflow definido se ejecuta automáticamente en cada PR o push, regenerando la documentación y comprobando que todo compila correctamente antes de aceptar los cambios.

- **Protección de ramas**: se pueden aplicar reglas para impedir pushes directos a main, obligando a pasar por revisiones o por la ejecución correcta de los workflows. Esto garantiza que la documentación en /docs y el README.md siempre estén actualizados.

### e) Muestra mensajes de commit que evidencien el nuevo workflow. ¿Son claros y descriptivos? Justifícalo. Ademas de un conjunto de mensajes de tus commits.

Durante la creación y ajuste del workflow de documentación se realizaron varios commits descriptivos, tanto manuales como automáticos (desde GitHub Actions).

Si bien he cometido el error de mezclar mensajes en español e inglés, se ha seguido una convención de mensajes en modo imperativo (como "Fix...", "Update...", “Actualizar...” o "Corregir...") que indican acciones concretas y mantienen un historial claro y coherente.

<img width="1570" height="501" alt="despliegue-commits" src="https://github.com/user-attachments/assets/3c22d3cd-aaad-4b24-af48-b6c4c836e3db" />

Los commits generados automáticamente por el bot (``github-actions[bot]``) también usan mensajes descriptivos como:

<img width="1585" height="262" alt="despliegue-bot-ci" src="https://github.com/user-attachments/assets/fd22f9e3-181d-42e2-9be3-913d990e4f2d" />

Este formato con ``[skip ci]`` evita que el propio commit del workflow dispare una nueva ejecución de la acción, previniendo bucles infinitos.

### f) ¿Qué medidas/configuración del repositorio garantizan que solo personal autorizado accede al código y la documentación? (p. ej., repositorio privado, equipos, roles, claves/secretos, branch protection).

En este proyecto, el repositorio se ha configurado como público para facilitar la revisión por parte de los profesores, permitiendo un acceso rápido y sin necesidad de gestionar permisos.

En mi caso, utilizo autenticación mediante clave SSH, lo que evita tener que introducir credenciales manualmente y proporciona una conexión cifrada entre el equipo local y GitHub.

Los workflows de GitHub Actions usan el token automático ``${{ secrets.GITHUB_TOKEN }}`` para autenticarse y desplegar la documentación de forma segura, sin exponer credenciales en el código.

Ejemplo:

```bash
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Durante el desarrollo de la aplicación, si fuera necesario colaborar con otros compañeros de clase, se implementarán medidas adicionales como protección de ramas, revisiones obligatorias de pull requests y escaneo automático de vulnerabilidades en las dependencias, siguiendo las buenas prácticas de control de versiones en entornos colaborativos.

### g) Indica dónde en el README.md explicas el funcionamiento del workflow y dónde detallas las herramientas y comandos de documentación.

Esta información se encuentra en:

- [Herramientas y comandos](#a-herramientas-usadas-y-comandos-ejecutados)
- [Explicación del workflow](#d-explicación-breve-del-workflow-pasos-del-job-eventos-que-lo-disparan)

### h) Justifica por qué el workflow utilizado es CI. ¿Qué evento dispara automáticamente la generación/actualización de la documentación (p. ej., push, pull_request, workflow_dispatch)?

El workflow se considera un ejemplo de Integración Continua (CI) porque cada vez que se hacen cambios en la rama ``main``, **GitHub Actions** genera automáticamente la documentación actualizada, tanto en HTML como en PDF. Esto asegura que la documentación siempre refleja el estado real del proyecto y evita que se quede desactualizada. Además, se puede ejecutar manualmente con ``workflow_dispatch`` si se quiere regenerar la documentación en cualquier momento.

No se trata de **Entrega Continua (CD)** porque el workflow no despliega automáticamente un producto listo para producción más allá de actualizar **GitHub Pages**: su objetivo principal es mantener la documentación actualizada, no entregar ni instalar la aplicación en un entorno de producción.
