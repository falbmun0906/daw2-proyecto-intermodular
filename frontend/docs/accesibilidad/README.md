# Documentación de Accesibilidad - Proyecto Desp[i]ensa

**Autor:** Francisco Alba Muñoz
**Curso:** 2º DAW - Desarrollo de Aplicaciones Web  
**Módulo:** Diseño de Interfaces Web (DIW)  
**Fecha:** Febrero 2026

---

## Índice

1. [Fundamentos de accesibilidad](#1-fundamentos-de-accesibilidad)
   - [¿Por qué es necesaria la accesibilidad web?](#por-qué-es-necesaria-la-accesibilidad-web)
   - [Los 4 principios de WCAG 2.1](#los-4-principios-de-wcag-21)
   - [Niveles de conformidad](#niveles-de-conformidad)

2. [Componente multimedia implementado](#2-componente-multimedia-implementado)
   - [Tipo de componente](#tipo-de-componente)
   - [Descripción](#descripción)
   - [Características de accesibilidad](#características-de-accesibilidad-implementadas)

3. [Auditoría automatizada inicial](#3-auditoría-automatizada-inicial)
   - [Resultados de las herramientas](#resultados-de-las-herramientas)
   - [Problemas más graves detectados](#problemas-más-graves-detectados)

4. [Análisis y corrección de errores](#4-análisis-y-corrección-de-errores)
   - [Tabla resumen de errores](#tabla-resumen-de-errores)
   - [Detalle de errores corregidos](#detalle-de-errores-corregidos)

5. [Análisis de estructura semántica](#5-análisis-de-estructura-semántica)
   - [Landmarks HTML5](#landmarks-html5-utilizados)
   - [Jerarquía de encabezados](#jerarquía-de-encabezados)
   - [Análisis de imágenes](#análisis-de-imágenes)

6. [Verificación manual](#6-verificación-manual)
   - [Test de navegación por teclado](#61-test-de-navegación-por-teclado)
   - [Test con lector de pantalla](#62-test-con-lector-de-pantalla)
   - [Verificación cross-browser](#63-verificación-cross-browser)

7. [Resultados finales después de correcciones](#7-resultados-finales-después-de-correcciones)
   - [Comparativa de mejoras](#comparativa-de-mejoras)
   - [Checklist WCAG 2.1 Nivel AA](#checklist-de-conformidad-wcag-21-nivel-aa)
   - [Nivel de conformidad alcanzado](#nivel-de-conformidad-alcanzado)

8. [Conclusiones y reflexión](#8-conclusiones-y-reflexión)
   - [¿Es accesible mi proyecto?](#es-accesible-mi-proyecto)
   - [Principales mejoras aplicadas](#principales-mejoras-aplicadas)
   - [Mejoras futuras](#mejoras-futuras)
   - [Aprendizaje clave](#aprendizaje-clave)

---

## 1. Fundamentos de accesibilidad

### ¿Por qué es necesaria la accesibilidad web?

La accesibilidad web es fundamental porque garantiza que todas las personas, independientemente de sus capacidades, puedan acceder y utilizar los contenidos digitales. Existen diversos tipos de discapacidades que debemos tener en cuenta: visuales (ceguera, baja visión, daltonismo), auditivas (sordera), motoras (dificultad para usar el ratón o teclado) y cognitivas (dislexia, trastornos de atención). Pero la accesibilidad no solo beneficia a personas con discapacidad: mejora la experiencia para todos los usuarios, como personas mayores, usuarios con conexiones lentas o quienes acceden desde dispositivos móviles. Además, en España y Europa es una obligación legal: la normativa europea exige que los sitios web del sector público cumplan con estándares de accesibilidad, y cada vez más se extiende al sector privado.

### Los 4 principios de WCAG 2.1

Las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 se basan en cuatro principios fundamentales:

1. **Perceptible:** La información y los componentes de la interfaz deben presentarse de forma que los usuarios puedan percibirlos.
   - Ejemplo en mi proyecto: El vídeo de gazpacho incluye subtítulos en cuatro idiomas (español, inglés, francés y alemán) para que personas con discapacidad auditiva puedan acceder al contenido. Además, todas las imágenes de recetas tienen textos alternativos descriptivos.

2. **Operable:** Los componentes de la interfaz y la navegación deben ser operables por todos los usuarios.
   - Ejemplo en mi proyecto: El reproductor de vídeo puede controlarse completamente con el teclado usando la tecla Espacio para pausar/reproducir, las flechas para avanzar/retroceder y la tecla Tab para navegar entre controles. Los botones de selección de idioma de la transcripción también son accesibles mediante teclado.

3. **Comprensible:** La información y el manejo de la interfaz deben ser comprensibles.
   - Ejemplo en mi proyecto: He incluido una transcripción completa del vídeo en texto plano debajo del reproductor, organizada por segmentos temporales, para que cualquier persona pueda leer el contenido sin necesidad de reproducir el vídeo. Los mensajes de error en los formularios son claros y específicos.

4. **Robusto:** El contenido debe ser suficientemente robusto para funcionar con diferentes tecnologías, incluidas las tecnologías de asistencia.
   - Ejemplo en mi proyecto: Utilizo HTML5 semántico con etiquetas como `<header>`, `<nav>`, `<main>`, `<section>` y `<footer>`, que son correctamente interpretadas por lectores de pantalla como NVDA. Los atributos ARIA (aria-label, aria-pressed) complementan la semántica cuando es necesario.

### Niveles de conformidad

WCAG 2.1 establece tres niveles de conformidad progresivos:

- **Nivel A:** Es el nivel mínimo de accesibilidad. Incluye los requisitos más básicos que, si no se cumplen, imposibilitan el acceso a ciertos grupos de usuarios. Por ejemplo, proporcionar texto alternativo para imágenes.

- **Nivel AA:** Es el nivel recomendado y el más comúnmente exigido por normativas legales. Incluye criterios que eliminan barreras significativas para el acceso. Por ejemplo, asegurar un contraste de color de al menos 4.5:1 entre texto y fondo.

- **Nivel AAA:** Es el nivel más alto de accesibilidad. Incluye criterios adicionales que mejoran la experiencia para el mayor número posible de usuarios. Por ejemplo, contraste de color de 7:1 o interpretación en lengua de signos para vídeos.

**El objetivo de este proyecto es alcanzar el nivel de conformidad AA**, que es el estándar recomendado y el que proporciona una accesibilidad adecuada para la mayoría de usuarios sin ser excesivamente restrictivo para el diseño.

---

## 2. Componente multimedia implementado

### Tipo de componente

**Reproductor de vídeo HTML5**

### Descripción

He implementado un reproductor de vídeo HTML5 en la página principal de Desp[i]ensa que muestra un tutorial de cocina sobre cómo preparar gazpacho clásico de forma rápida. El vídeo está integrado como una sección más de la home-page, entre la sección "Tu cocina, siempre bajo control" y el formulario de newsletter, manteniendo la coherencia visual con el resto del sitio.

El componente incluye el elemento `<video>` nativo con controles estándar del navegador, archivos de subtítulos en cuatro idiomas diferentes (español, inglés, francés y alemán) en formato WebVTT, y una transcripción completa expandible mediante un elemento `<details>`. La transcripción permite al usuario seleccionar el idioma mediante botones interactivos que cambian dinámicamente el contenido mostrado.

### Características de accesibilidad implementadas

- **Subtítulos multiidioma:** El vídeo incluye cuatro pistas de subtítulos en formato WebVTT (español, inglés, francés y alemán) que pueden activarse desde los controles nativos del reproductor. Los subtítulos siguen el estándar con marcas temporales precisas sincronizadas con el audio.

- **Transcripción completa accesible:** Debajo del vídeo se encuentra un elemento `<details>` expandible que contiene la transcripción íntegra del contenido del vídeo, dividida en segmentos temporales. La transcripción es independiente del reproductor, permitiendo el acceso al contenido textual sin necesidad de reproducir el vídeo. Incluye un selector de idioma con cuatro botones que cambia dinámicamente el texto mostrado.

- **Controles de teclado completos:** El reproductor de vídeo HTML5 es completamente operable mediante teclado. Los usuarios pueden usar Espacio para reproducir/pausar, las flechas del teclado para avanzar/retroceder, y la tecla Tab para navegar entre todos los controles (volumen, pantalla completa, subtítulos).

- **Atributos ARIA y semántica correcta:** El vídeo tiene el atributo `aria-describedby` que lo vincula con la descripción del contenido. Los botones de selección de idioma incluyen `aria-label` en cada idioma nativo y `aria-pressed` dinámico para indicar el estado activo a tecnologías de asistencia. El selector de idioma permite cambiar entre español, inglés, francés y alemán tanto en los subtítulos del vídeo como en la transcripción textual.

- **Múltiples formatos de vídeo:** El reproductor ofrece dos formatos de vídeo (WebM y MP4) para garantizar la compatibilidad con diferentes navegadores. Si el navegador no soporta ninguno de los formatos, se proporciona un enlace de descarga alternativo.

- **Integración visual coherente:** La sección del vídeo utiliza las mismas variables de diseño (colores, tipografías, espaciados) que el resto de la aplicación, asegurando contraste adecuado y legibilidad. Los botones de idioma utilizan el componente Button del sistema de diseño, con estados visuales claros (variante 'primary' para activo, 'ghost' para inactivo).

---

## 3. Auditoría automatizada inicial

Para evaluar el estado de accesibilidad del proyecto antes de aplicar correcciones, he utilizado tres herramientas de análisis automatizado. Cada una ofrece una perspectiva diferente: Lighthouse se centra en métricas generales y buenas prácticas, WAVE detecta errores específicos en el HTML y TAW evalúa el cumplimiento de las pautas WCAG 2.1.

### Resultados de las herramientas

| Herramienta | Puntuación/Errores | Captura |
|-------------|-------------------|---------|
| Lighthouse | 98/100 | ![Lighthouse inicial](./capturas/lighthouse-test.png) |
| WAVE | 1 error, 95 errores de contraste, 25 alertas | ![WAVE inicial](./capturas/wave-test.png) |
| TAW | 9 problemas en 4 criterios de éxito | ![TAW inicial](./capturas/taw-test.png) |

### Detalle de los análisis

#### Lighthouse (Chrome DevTools)

La auditoría de Lighthouse arrojó una puntuación de accesibilidad de 98 sobre 100, lo cual es un resultado bastante positivo. Sin embargo, esta puntuación alta no significa que el sitio esté libre de problemas, ya que Lighthouse no detecta todos los tipos de errores de accesibilidad.

En cuanto al rendimiento, la puntuación fue de 58 sobre 100, con métricas de carga que necesitan mejora:
- First Contentful Paint (FCP): 3.5 segundos
- Largest Contentful Paint (LCP): 5.7 segundos (valor crítico)
- Total Blocking Time (TBT): 0 ms (excelente)
- Cumulative Layout Shift (CLS): 0.003 (excelente, sin saltos de contenido)

#### WAVE (Web Accessibility Evaluation Tool)

WAVE proporcionó un análisis mucho más detallado y reveló problemas que Lighthouse no detectó:

- **1 error crítico:** Etiqueta de formulario vacía (Empty form label). Este error impide que los lectores de pantalla identifiquen el propósito de un campo de entrada.
- **95 errores de contraste:** Este es el problema más grave detectado. Hay deficiencias significativas de contraste entre el color del texto y el fondo en múltiples elementos de la página, especialmente en el menú de navegación y en las tarjetas de contenido.
- **25 alertas:** Incluyen 20 textos alternativos redundantes, 2 saltos de nivel en encabezados, 1 enlace redundante y alertas relacionadas con el elemento de vídeo.
- **38 características positivas:** Elementos de accesibilidad bien implementados, como textos alternativos en imágenes.
- **38 elementos estructurales:** Landmarks correctamente definidos (header, nav, main, footer) y jerarquía de encabezados presente.
- **261 atributos ARIA:** Uso extensivo de atributos ARIA para mejorar la accesibilidad.

La puntuación AIM (Accessibility Impact Metric) fue de 2 sobre 10, indicando que hay trabajo importante por hacer.

#### TAW (Test de Accesibilidad Web)

TAW evaluó el sitio según las pautas WCAG 2.1 en nivel AA y encontró:

- **9 problemas directos** distribuidos en 4 criterios de éxito:
  - Perceptible: 5 problemas
  - Comprensible: 2 problemas
  - Robusto: 2 problemas

- **35 advertencias** que requieren revisión manual, distribuidas en 9 criterios de éxito.

- **17 elementos no verificados** que necesitan comprobación manual.

Los criterios que fallaron específicamente fueron:
- 1.1.1 - Contenido no textual (2 problemas)
- 1.3.1 - Información y relaciones (3 problemas)
- 3.3.2 - Etiquetas o instrucciones (2 problemas)
- 4.1.2 - Nombre, función, valor (2 problemas)

### Problemas más graves detectados

Tras analizar los resultados de las tres herramientas, los tres problemas más graves que requieren atención inmediata son:

1. **Errores de contraste de color (95 incidencias):** Este es sin duda el problema más crítico. WAVE detectó 95 elementos con contraste insuficiente entre el texto y el fondo. Esto afecta directamente a usuarios con baja visión, daltonismo o que utilizan la web en condiciones de iluminación adversas. Según WCAG 2.1, el contraste mínimo debe ser de 4.5:1 para texto normal y 3:1 para texto grande. Este problema incumple el criterio 1.4.3 (Contraste mínimo) de nivel AA.

2. **Etiquetas de formulario vacías o ausentes (3 incidencias):** Tanto WAVE como TAW detectaron problemas con las etiquetas de formulario. Hay al menos un campo de entrada sin etiqueta asociada y otros campos donde la relación entre etiqueta y campo no está correctamente establecida. Esto impide que los usuarios de lectores de pantalla comprendan qué información deben introducir en cada campo. Este problema incumple los criterios 1.3.1 (Información y relaciones) y 3.3.2 (Etiquetas o instrucciones).

3. **Saltos en la jerarquía de encabezados (2 incidencias):** WAVE detectó dos saltos de nivel en los encabezados, lo que significa que hay lugares donde se pasa de un H2 a un H4 sin incluir un H3 intermedio, por ejemplo. Esto dificulta la navegación para usuarios de lectores de pantalla que utilizan los encabezados como método principal de navegación por la página. Este problema incumple el criterio 2.4.6 (Encabezados y etiquetas) e impacta la comprensión de la estructura del documento.

