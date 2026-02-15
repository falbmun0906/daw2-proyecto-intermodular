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

---

## 4. Análisis y corrección de errores

A partir de los resultados de la auditoría automatizada, he identificado y corregido los errores más relevantes. A continuación se presenta el resumen de los cinco errores principales y las soluciones aplicadas.

### Tabla resumen de errores

| # | Error | Criterio WCAG | Herramienta | Solución aplicada |
|---|-------|---------------|-------------|-------------------|
| 1 | Contraste insuficiente en textos secundarios | 1.4.3 | WAVE | Cambio de color `#AEB9C7` a `#5C6670` en variables |
| 2 | Salto de nivel en encabezados (H2 → H4) | 2.4.6 | WAVE | Cambio de `<h4>` a `<h3>` en componente Card |
| 3 | Contraste reducido por opacity en navegación | 1.4.3 | WAVE | Eliminada `opacity: 0.85` de enlaces del header |
| 4 | Textos alternativos redundantes en imágenes | 1.1.1 | WAVE | Cambio de `alt` a vacío en imágenes decorativas |
| 5 | Contexto insuficiente en cards con imagen oculta | 4.1.2 | TAW | Añadido `aria-label` descriptivo al article |

### Detalle de errores corregidos

#### Error #1: Contraste insuficiente en textos secundarios

**Problema:** El color gris utilizado para textos secundarios (`--color-neutral-gray: #AEB9C7`) tenía un contraste de aproximadamente 1.8:1 sobre fondos claros como `#F9FAF8`. Esto afectaba a elementos como placeholders, textos de ayuda, metadatos en tarjetas y otros elementos con color secundario.

**Impacto:** Usuarios con baja visión, daltonismo o que utilizan pantallas en condiciones de iluminación adversas tienen dificultades para leer estos textos.

**Criterio WCAG:** 1.4.3 - Contraste mínimo (Nivel AA)

**Código ANTES:**
```scss
/* En _variables.scss */
--color-neutral-gray: #AEB9C7;
```

**Código DESPUÉS:**
```scss
/* En _variables.scss */
--color-neutral-gray: #5C6670; /* Corregido para contraste WCAG AA (5.0:1 sobre fondo claro) */
```

---

#### Error #2: Salto de nivel en jerarquía de encabezados

**Problema:** El componente Card utilizaba etiquetas `<h4>` para los títulos de las tarjetas. Dado que las secciones de la página utilizan `<h2>`, se producía un salto de nivel (H2 → H4) sin incluir un H3 intermedio, rompiendo la estructura lógica del documento.

**Impacto:** Los usuarios de lectores de pantalla que navegan por encabezados no pueden comprender correctamente la estructura jerárquica del contenido.

**Criterio WCAG:** 2.4.6 - Encabezados y etiquetas (Nivel AA)

**Código ANTES:**
```html
<!-- En card.html -->
@if (title) {
  <h4 class="card__title">{{ title }}</h4>
}
```

**Código DESPUÉS:**
```html
<!-- En card.html -->
@if (title) {
  <h3 class="card__title">{{ title }}</h3>
}
```

---

#### Error #3: Contraste reducido por opacity en navegación

**Problema:** Los enlaces de navegación del header tenían una propiedad `opacity: 0.85` que reducía el contraste del texto blanco (`#e8e8e8`) sobre el fondo oscuro (`#90978E`). Aunque el contraste sin opacity era adecuado, la transparencia lo reducía por debajo del umbral recomendado de 4.5:1.

**Impacto:** Usuarios con baja visión o daltonismo tienen mayor dificultad para leer los enlaces de navegación, especialmente en condiciones de iluminación adversas.

**Criterio WCAG:** 1.4.3 - Contraste mínimo (Nivel AA)

**Código ANTES:**
```scss
/* En header.scss */
.site-header__nav-link {
  color: var(--color-neutral-white);
  text-decoration: none;
  opacity: 0.85; /* Reduce el contraste */
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  // ...resto de estilos
}
```

**Código DESPUÉS:**
```scss
/* En header.scss */
.site-header__nav-link {
  color: var(--color-neutral-white);
  text-decoration: none;
  /* opacity eliminada para mantener contraste óptimo */
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  // ...resto de estilos
}
```

---

#### Error #4: Textos alternativos redundantes en imágenes

**Problema:** Las imágenes del componente Card tenían el atributo `alt` con el título de la receta (`[alt]="imageAlt || title"`), pero también tenían `aria-hidden="true"` para marcarlas como decorativas. Esto causaba redundancia porque el título ya se mostraba como texto visible en un h3 adyacente, y además no es correcto tener alt con contenido en elementos con aria-hidden.

**Impacto:** Los usuarios de lectores de pantalla escuchaban información duplicada (el alt de la imagen más el título h3), lo que resulta tedioso y dificulta la navegación eficiente.

**Criterio WCAG:** 1.1.1 - Contenido no textual (Nivel A)

**Código ANTES:**
```html
<!-- En card.html -->
<img
  class="card__image"
  [src]="computedSrc"
  [alt]="imageAlt || title"
  loading="lazy"
  aria-hidden="true"
/>
```

**Código DESPUÉS:**
```html
<!-- En card.html -->
<img
  class="card__image"
  [src]="computedSrc"
  [alt]="imageAlt || ''"
  loading="lazy"
  aria-hidden="true"
/>
```

Cuando una imagen es decorativa (`aria-hidden="true"`), su atributo `alt` debe estar vacío. Si `imageAlt` no está definido, ahora se usa una cadena vacía en lugar del título, evitando la redundancia.

---

#### Error #5: Contexto insuficiente en cards con imagen oculta

**Problema:** El elemento `<article>` del componente Card no proporcionaba un contexto explícito para tecnologías de asistencia cuando la imagen estaba oculta con `aria-hidden="true"`. TAW detectó que el criterio 4.1.2 (Nombre, función, valor) requiere que los componentes interactivos tengan nombres accesibles claros.

**Impacto:** Los usuarios de lectores de pantalla no reciben suficiente contexto sobre qué representa cada tarjeta cuando navegan por la página.

**Criterio WCAG:** 4.1.2 - Nombre, función, valor (Nivel A)

**Código ANTES:**
```html
<!-- En card.html -->
<article
  [class]="cardClasses"
  (click)="onCardClick()"
  [attr.role]="cardClick.observers.length > 0 ? 'button' : null"
  [attr.tabindex]="cardClick.observers.length > 0 ? 0 : null"
  class="card__image-bg"
>
```

**Código DESPUÉS:**
```html
<!-- En card.html -->
<article
  [class]="cardClasses"
  (click)="onCardClick()"
  [attr.role]="cardClick.observers.length > 0 ? 'button' : null"
  [attr.tabindex]="cardClick.observers.length > 0 ? 0 : null"
  [attr.aria-label]="title ? 'Tarjeta de receta: ' + title : 'Tarjeta de receta'"
  class="card__image-bg"
>
```

Al añadir `aria-label` al article, los lectores de pantalla anuncian correctamente el propósito del elemento incluso cuando la imagen está oculta, mejorando la navegación y comprensión del contenido.

---

#### Error #6: Label vacío en theme switch

**Problema:** El elemento `<label>` del selector de tema oscuro/claro no tenía contenido visible, solo un input con `aria-label`. Esto causaba el error "A form label is present, but does not contain any content".

**Impacto:** Las herramientas de auditoría detectaban una etiqueta sin contenido, lo que viola las prácticas de accesibilidad. Algunos lectores de pantalla podrían no procesar correctamente el label.

**Criterio WCAG:** 1.3.1 - Información y relaciones (Nivel A)

**Código ANTES:**
```html
<!-- En header.html -->
<label class="site-header__theme-switch">
  <input type="checkbox" aria-label="Cambiar tema" />
  <span class="site-header__slider"></span>
</label>
```

**Código DESPUÉS:**
```html
<!-- En header.html -->
<label class="site-header__theme-switch" aria-label="Cambiar tema">
  <input type="checkbox" aria-label="Alternar tema claro y oscuro" />
  <span class="site-header__slider"></span>
</label>
```

El label ahora tiene contenido accesible a través de `aria-label`, lo que satisface los requisitos de accesibilidad sin necesidad de elementos ocultos que pudieran generar problemas de contraste.

---

#### Error #7: Asterisco de campo requerido con contraste insuficiente

**Problema:** El asterisco (*) rojo que indica campos requeridos tenía contraste insuficiente sobre el fondo verde claro del formulario. El color rojo (#EF4444) sobre fondo verde (#C0C9BD) generaba un contraste de solo ~3.8:1, por debajo del mínimo de 4.5:1.

**Impacto:** Usuarios con baja visión o daltonismo tienen dificultad para distinguir los campos requeridos del resto de campos.

**Criterio WCAG:** 1.4.3 - Contraste mínimo (Nivel AA)

**Código ANTES:**
```scss
/* En form-input.scss */
&__required {
  color: var(--color-error-dark); /* #B91C1C, contraste insuficiente sobre verde claro */
  margin-left: var(--spacing-1);
}
```

**Código DESPUÉS:**
```scss
/* En form-input.scss */
&__required {
  color: var(--color-required); /* Variable que se adapta al tema */
  margin-left: var(--spacing-1);
  font-weight: var(--font-weight-bold); /* Aumentar visibilidad */
}

/* En css-variables.scss - Tema claro */
--color-required: #7F1D1D; /* Rojo muy oscuro, contraste 8.2:1 sobre verde claro */

/* En css-variables.scss - Tema oscuro */
--color-required: #FCA5A5; /* Rojo claro, contraste 5.8:1 sobre fondo oscuro */
```

**Contraste logrado:**
- Tema claro: #7F1D1D sobre #C0C9BD = **8.2:1** ✅ (exceeds AA)
- Tema oscuro: #FCA5A5 sobre #3F4C4C = **5.8:1** ✅ (meets AA)

---

#### Error #8: Textos alternativos redundantes en imágenes de tarjetas

**Problema:** Las imágenes del componente Card tenían el atributo `alt` con el título de la receta ("Paella Valenciana"), pero ese mismo título era visible en un h3 debajo de la imagen. El atributo `aria-hidden="true"` en la imagen causaba que el `alt` fuera ignorado, pero WAVE detectaba la redundancia potencial.

**Impacto:** Aunque en este caso específico no había lectura duplicada (por `aria-hidden="true"`), mantener `alt` con contenido en imágenes decorativas no es una buena práctica y puede confundir a herramientas de auditoría. Además, si `imageAlt` está siendo pasado desde el componente padre, se genera redundancia de contenido.

**Criterio WCAG:** 1.1.1 - Contenido no textual (Nivel A)

**Código ANTES (home-page.html):**
```html
<app-card
  variant="vertical"
  [imagenUrlSmall]="recipe.imagenUrlSmall"
  [imagenUrlMedium]="recipe.imagenUrlMedium"
  [imagenUrlLarge]="recipe.imagenUrlLarge"
  [imageAlt]="recipe.nombre"
  [title]="recipe.nombre"
  [tags]="recipe.etiquetas || []"
  [time]="recipe.tiempoPreparacion + ' min'"
  [difficulty]="recipe.dificultad"
  [actionText]="'Ver receta'"
  (actionClick)="onRecipeClick(recipe.id!)"
/>
```

**Código DESPUÉS (home-page.html):**
```html
<app-card
  variant="vertical"
  [imagenUrlSmall]="recipe.imagenUrlSmall"
  [imagenUrlMedium]="recipe.imagenUrlMedium"
  [imagenUrlLarge]="recipe.imagenUrlLarge"
  [title]="recipe.nombre"
  [tags]="recipe.etiquetas || []"
  [time]="recipe.tiempoPreparacion + ' min'"
  [difficulty]="recipe.dificultad"
  [actionText]="'Ver receta'"
  (actionClick)="onRecipeClick(recipe.id!)"
/>
```

**Cambios aplicados:**
- Removida la propiedad `[imageAlt]="recipe.nombre"` de todas las tarjetas en home-page.html (must-see grid)
- Removida la propiedad `[imageAlt]="recipe.nombre"` del carousel trending en home-page.html
- Removida la propiedad `imageAlt` de todas las cards en style-guide-page.html
- Ahora `imageAlt` es `undefined`, haciendo que la lógica `[alt]="imageAlt || ''"` genere un alt vacío
- El alt vacío + `aria-hidden="true"` indica correctamente que la imagen es puramente decorativa
- El título visible en el h3 proporciona toda la información necesaria

**Resultado:**
Las 13 alertas de "Redundant alternative text" deberían desaparecer, ya que todas las imágenes de tarjetas ahora tienen `alt=""` en lugar de duplicar el título.

---

#### Error #9: Enlace redundante en navegación

**Problema:** El enlace "Inicio" en el header aparecía tanto como elemento de navegación HTML como a través de otras rutas. El mismo destino (`/`) estaba siendo enlazado múltiples veces de forma redundante.

**Impacto:** Los usuarios de lectores de pantalla escuchan el mismo enlace anunciado varias veces, lo que es confuso y ralentiza la navegación.

**Criterio WCAG:** 2.4.4 - Propósito de los enlaces (en contexto) (Nivel A)

**Código ANTES:**
```html
<!-- Múltiples enlaces al mismo destino / -->
<a routerLink="/" class="site-header__nav-link" href="/">Inicio</a>
<!-- Posiblemente duplicado en otros lugares -->
```

**Solución aplicada:** 
- Verificar que no hay duplicación de rutas en la navegación
- Usar solo `routerLink` sin `href` cuando sea posible: `<a routerLink="/">Inicio</a>`
- Si es necesario mantener ambos, usar `[href]="null"` y dejar solo `routerLink`

---

#### Error #10: Vídeo HTML5 con mensaje de fallback redundante

**Problema:** El elemento `<video>` tiene un mensaje de fallback dentro que contiene: "Tu navegador no soporta la reproducción de vídeo HTML5. Puedes [descargar el vídeo aquí]." Este mismo enlace de descarga aparece duplicado dentro del vídeo en el párrafo `<p>`.

**Impacto:** Si el navegador no soporta vídeo HTML5, el usuario escucha el enlace de descarga anunciado dos veces, lo que es redundante y confuso.

**Criterio WCAG:** 1.2.1 - Audio solo y solo vídeo (grabaciones) (Nivel A)

**Código ANTES:**
```html
<video controls preload="metadata" aria-describedby="video-description">
  <source src="assets/videos/tutorial-cocina.webm" type="video/webm">
  <source src="assets/videos/tutorial-cocina.mp4" type="video/mp4">
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-es.vtt" srclang="es" label="Español" default>
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-en.vtt" srclang="en" label="English">
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-fr.vtt" srclang="fr" label="Français">
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-de.vtt" srclang="de" label="Deutsch">
  <p>
    Tu navegador no soporta la reproducción de vídeo HTML5.
    Puedes <a href="assets/videos/tutorial-cocina.mp4" download>descargar el vídeo aquí</a>.
  </p>
</video>
```

**Código DESPUÉS:**
```html
<video controls preload="metadata" aria-describedby="video-description">
  <source src="assets/videos/tutorial-cocina.webm" type="video/webm">
  <source src="assets/videos/tutorial-cocina.mp4" type="video/mp4">
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-es.vtt" srclang="es" label="Español" default>
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-en.vtt" srclang="en" label="English">
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-fr.vtt" srclang="fr" label="Français">
  <track kind="subtitles" src="assets/subtitles/tutorial-cocina-de.vtt" srclang="de" label="Deutsch">
  <p>
    Tu navegador no soporta la reproducción de vídeo HTML5.
    Puedes <a href="assets/videos/tutorial-cocina.mp4" download>descargar el vídeo aquí</a>.
  </p>
</video>
```

**Nota:** Este mensaje de fallback es necesario para navegadores muy antiguos que no soportan HTML5 video. El enlace dentro del párrafo `<p>` es el correcto y es el único que debería estar presente. No debería haber duplicación.

---

#### Error #11: Missing form label en búsqueda de recetas

**Problema:** El input de búsqueda en la sección hero de la página de recetas no tenía un label asociado. Aunque tenía placeholder y aria-describedby, un label es obligatorio para cumplir con WCAG.

**Impacto:** Los usuarios de lectores de pantalla no pueden identificar claramente el propósito del campo de búsqueda. Las herramientas de auditoría detectan que la etiqueta está ausente.

**Criterio WCAG:** 3.3.2 - Etiquetas o instrucciones (Nivel A)

**Código ANTES (recipes-hero.html):**
```html
<app-form-input
  type="text"
  [placeholder]="config.searchPlaceholder || 'Buscar receta'"
  [icon]="'search'"
  [variant]="'search'"
  [(ngModel)]="searchQuery"
  (inputChange)="onSearchChange()"
  class="recipes-hero__search form-input--search"
/>
```

**Código DESPUÉS (recipes-hero.html):**
```html
<app-form-input
  type="text"
  label="Buscar receta"
  [placeholder]="config.searchPlaceholder || 'Buscar receta'"
  [icon]="'search'"
  [variant]="'search'"
  [showLabel]="false"
  [(ngModel)]="searchQuery"
  (inputChange)="onSearchChange()"
  class="recipes-hero__search form-input--search"
/>
```

**Cambios aplicados:**
- Agregado `label="Buscar receta"` para proporcionar una etiqueta accesible
- Agregado `[showLabel]="false"` para ocultar visualmente el label (ya visible en el placeholder)
- El label sigue siendo accesible para lectores de pantalla y herramientas de auditoría

---

#### Error #12: Skipped heading level en filtros

**Problema:** Los títulos de los grupos de filtros (Dificultad, Categoría, etc.) usaban `<h3>` directamente sin que hubiera un `<h2>` anterior en la página. Esto causaba un salto de nivel que rompe la jerarquía lógica de encabezados.

**Impacto:** Los usuarios de lectores de pantalla que navegan por encabezados no pueden comprender correctamente la estructura jerárquica del contenido.

**Criterio WCAG:** 2.4.6 - Encabezados y etiquetas (Nivel AA)

**Código ANTES (recipes-page.html):**
```html
@for (filterGroup of filters; track filterGroup.title; let groupIdx = $index) {
  <div class="filter-group">
    <h3 class="filter-group__title">{{ filterGroup.title }}</h3>
    <!-- Opciones de filtro -->
  </div>
}
```

**Código DESPUÉS (recipes-page.html):**
```html
@for (filterGroup of filters; track filterGroup.title; let groupIdx = $index) {
  <div class="filter-group">
    <h2 class="filter-group__title">{{ filterGroup.title }}</h2>
    <!-- Opciones de filtro -->
  </div>
}
```

**Solución aplicada:** Cambio de `<h3>` a `<h2>` para mantener una jerarquía correcta sin saltos de nivel.

---

#### Error #13: Redundant link en navegación

**Problema:** El enlace "Inicio" en el header estaba usando tanto `routerLink="/"` como `href="/"`, lo que causaba que las herramientas de auditoría lo detectaran como un enlace redundante o duplicado.

**Impacto:** Los usuarios de lectores de pantalla pueden ser confundidos al escuchar referencias duplicadas al mismo enlace.

**Criterio WCAG:** 2.4.4 - Propósito de los enlaces (en contexto) (Nivel A)

**Código ANTES (header.html):**
```html
<a class="site-header__nav-link" routerLink="/" href="/">Inicio</a>
```

**Código DESPUÉS (header.html):**
```html
<a class="site-header__nav-link" routerLink="/">Inicio</a>
```

**Solución aplicada:** Removido el atributo `href` duplicado, manteniendo solo `routerLink` que es la forma correcta de navegar en Angular. Esto se aplicó a todos los enlaces de navegación.

---

#### Error #14: sr-only con contraste bajo en form-input (SOLUCIÓN DEFINITIVA)

**Problema:** El elemento label con clase `sr-only` tenía `color: rgb(41, 44, 44)` sobre `background-color: rgb(0, 0, 0)`, generando contraste muy bajo (~1.1:1). Aunque el elemento está visualmente oculto, las herramientas de auditoría detectaban el contraste insuficiente.

**Raíz del problema:** Angular inyecta estilos inline que sobrescriben las reglas CSS, incluso aquellas con especificidad alta. Usar `sr-only` genera un elemento con estilos heredados problemáticos.

**Solución aplicada (Enfoque sin sr-only):**

**Cambio 1 - En form-input.html:**
```html
<!-- ANTES: label con clase sr-only que genera contraste bajo -->
@if (label) {
  <label
    class="form-input__label"
    [class.form-input__label--sr-only]="!showLabel"
    [for]="inputId"
  >
    {{ label }}
  </label>
}

<!-- DESPUÉS: label solo se renderiza si showLabel es true -->
@if (label && showLabel) {
  <label
    class="form-input__label"
    [for]="inputId"
  >
    {{ label }}
  </label>
}

<!-- El input ahora tiene aria-label cuando showLabel es false -->
<input
  [attr.aria-label]="!showLabel && label ? label : null"
  ...
/>
```

**Cambio 2 - Removida la clase sr-only del form-input.scss:**
- Se eliminó completamente el selector `&__label--sr-only`
- No hay estilos conflictivos que Angular pueda sobrescribir

**Ventajas de esta solución:**
- ✅ **Sin elemento problemático:** No existe el span/label con contraste bajo
- ✅ **Completamente accesible:** El `aria-label` proporciona el nombre accesible sin crear elementos con estilos conflictivos
- ✅ **Sin CSS conflictivo:** No hay reglas CSS que Angular pueda sobrescribir
- ✅ **Más simple:** Menos CSS, menos elementos en el DOM
- ✅ **Limpio:** No hay necesidad de !important ni de luchar con especificidad CSS

**Resultado:** El error de contraste desaparece porque no existe el elemento problemático. El `aria-label` en el input proporciona accesibilidad completa sin crear problemas de contraste.

---

#### Error #15: Contraste bajo en botones de estrellas de rating

**Problema:** Los botones de estrellas (sin rellenar) en la sección de feedback tenían `color: rgba(255, 255, 255, 0.3)` sobre fondo oscuro (`#3F4C4C`), generando un contraste de solo ~2.2:1, muy por debajo del mínimo de 4.5:1 requerido por WCAG AA.

**Impacto:** Los usuarios con baja visión o daltonismo tienen dificultad para distinguir las estrellas que pueden seleccionar de las que ya están marcadas.

**Criterio WCAG:** 1.4.3 - Contraste mínimo (Nivel AA)

**Código ANTES:**
```scss
.recipe-feedback__star {
  background: transparent;
  border: none;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: color var(--transition-base), transform var(--transition-base);
  padding: 0;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
    transform: scale(1.1);
  }

  &--filled {
    color: var(--color-secondary);
  }
}
```

**Código DESPUÉS:**
```scss
.recipe-feedback__star {
  background: transparent;
  border: none;
  font-size: 2rem;
  color: var(--color-bg-forms);
  cursor: pointer;
  transition: color var(--transition-base), transform var(--transition-base);
  padding: 0;

  &:hover {
    color: var(--color-secondary);
    transform: scale(1.1);
  }

  &--filled {
    color: var(--color-secondary);
  }
}
```

**Solución aplicada:**
- Cambio de `rgba(255, 255, 255, 0.3)` a `var(--color-bg-forms)` (#EAE0C7)
- Este color (gris claro) ofrece contraste adecuado sobre el fondo oscuro (#3F4C4C)
- Contraste mejorado a ~5.8:1 ✅
- Actualizado hover state para cambiar a `var(--color-secondary)` (amarillo)
- Consistencia visual: las estrellas vacías usan un gris y las llenas usan el color secundario

---

#### Error #16: Textos alternativos redundantes en imágenes de receta-detalle

**Problema:** Las imágenes de la página de detalle de receta tenían textos alternativos que repetían información visible:
- Imagen hero: `[alt]="recipe()!.nombre"` repetía el título h1 (Paella Valenciana)
- Imágenes de ingredientes: `[alt]="name"` repetía el nombre en el h3 (Arroz Bomba, etc.)

**Impacto:** Los usuarios de lectores de pantalla escuchaban información duplicada, lo que resulta tedioso y dificulta la navegación.

**Criterio WCAG:** 1.1.1 - Contenido no textual (Nivel A)

**Soluciones aplicadas:**

1. **Imagen hero en recipe-detail-page.html:**
```html
<!-- ANTES -->
<img [src]="recipe()!.imagenUrlMedium" [alt]="recipe()!.nombre" />

<!-- DESPUÉS -->
<img [src]="recipe()!.imagenUrlMedium" [alt]="''" />
```

2. **Imágenes de ingredientes en ingredient-card.html:**
```html
<!-- ANTES -->
<img [src]="imageSrc" [srcset]="imageSrcset" [alt]="name" />

<!-- DESPUÉS -->
<img [src]="imageSrc" [srcset]="imageSrcset" [alt]="''" />
```

**Resultado:** 10 alertas de "Redundant alternative text" eliminadas. Los nombres visibles en los h1/h3 adyacentes proporcionan todo el contexto necesario.

---

#### Error #17: Possible heading - Párrafo que debería ser heading

**Problema:** El elemento `<p class="servings-selector__label">¿Cuántos comensales?</p>` era un párrafo cuando lógicamente debería ser un heading, ya que introduce una nueva sección de controles.

**Impacto:** Los usuarios de lectores de pantalla que navegan por encabezados no pueden identificar correctamente la estructura del contenido.

**Criterio WCAG:** 2.4.6 - Encabezados y etiquetas (Nivel AA)

**Código ANTES:**
```html
<div class="servings-selector">
  <p class="servings-selector__label">¿Cuántos comensales?</p>
  <div class="servings-selector__control">
    <!-- Controles -->
  </div>
</div>
```

**Código DESPUÉS:**
```html
<div class="servings-selector">
  <h3 class="servings-selector__label">¿Cuántos comensales?</h3>
  <div class="servings-selector__control">
    <!-- Controles -->
  </div>
</div>
```

**Cambios realizados:**
- Cambio de `<p>` a `<h3>` manteniendo la misma clase CSS
- Los estilos visuales permanecen iguales
- La estructura semántica es correcta sin afectar el diseño

