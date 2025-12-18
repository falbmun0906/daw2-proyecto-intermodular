# Sección 1: Arquitectura CSS y comunicación visual

## Introducción: Modificación de etiquetas HTML mediante CSS

En esta aplicación web, el HTML semántico proporciona la estructura base del documento, mientras que CSS se encarga de definir la presentación visual. Cada elemento HTML puede modificarse completamente mediante estilos: los elementos `<h1>` a `<h4>` se redefinyen con tipografía, color y espaciado personalizados; los `<button>` y `<a>` se transforman mediante variantes de color, tamaño y estado; las `<section>` y `<div>` se organizan en layouts complejos usando Flexbox y CSS Grid. Esta separación entre estructura (HTML) y presentación (CSS) permite que el mismo elemento HTML se presente de múltiples formas diferentes según su contexto, mejorando la reutilización de código y facilitando el mantenimiento del sistema de diseño.

### 1.1 Principios de comunicación visual: Explica los 5 principios básicos y cómo los aplicas en tu proyecto:

En este proyecto se aplican de forma sistemática los cinco principios básicos de comunicación visual (jerarquía, contraste, alineación, proximidad y repetición) para guiar la lectura y mejorar la usabilidad de la interfaz.

**Jerarquía**

En la interfaz se usa la escala tipográfica para marcar niveles de importancia: el título principal utiliza `H1` con la fuente secundaria `Glass-Antiqua` y tamaño grande, mientras que `H2`, `H3` y `H4` usan `Poppins` con tamaños decrecientes y pesos altos para estructurar secciones y subsecciones.

Además, se combinan espaciados verticales mayores entre bloques (`spacing-16`, `spacing-24`) y menores entre elementos relacionados para reforzar qué contenido debe leerse primero. En la home, esto se ve en el contraste entre el gran título de marca y el bloque “Inspírate y cocina algo nuevo”, y en la página de receta individual el título “Pizza margarita” domina sobre la descripción y los pasos, marcando claramente el punto de entrada a la pantalla.

<img width="1121" height="908" alt="homepage" src="https://github.com/user-attachments/assets/a1a2d771-8a53-4aee-9df6-600548cb4f42" />

<img width="1179" height="803" alt="receta-individual" src="https://github.com/user-attachments/assets/cd24cbf1-e9dd-4839-8c54-c8c047c846d0" />
<br><br/>

**Contraste**

El contraste se consigue mediante color, tamaño y peso tipográfico: los elementos interactivos (botones y enlaces) usan el color secundario y pesos más altos frente al texto base en gris oscuro, lo que facilita identificar acciones frente a contenido informativo.

También se utiliza contraste de fondo (bloques sobre fondos claros o terciarios) para destacar secciones clave como llamadas a la acción. En las pantallas de Figma, esto se aprecia en el botón amarillo principal de la home, que destaca sobre el fondo verde suave, y en las tarjetas de receta, donde el título blanco sobre una forma gris oscura contrasta con la fotografía cálida del plato, facilitando la lectura incluso sobre imágenes complejas.

<img width="1240" height="516" alt="contraste-tarjetas" src="https://github.com/user-attachments/assets/e1c7ac71-a33a-4848-983b-3b5c7759a3c8" />
<br><br/>

**Alineación**

La maquetación sigue una alineación principalmente izquierda y basada en un grid de 12 columnas, lo que genera columnas de contenido alineadas y predecibles en todas las vistas.

Los elementos dentro de cada bloque se alinean mediante utilidades de flex y grid (por ejemplo, títulos y textos alineados al inicio, iconos y botones alineados entre sí) para mantener una estructura limpia y fácil de escanear. En las capturas puede verse en la barra de navegación (logo alineado a la izquierda y menú a la derecha sobre una misma línea), en el layout de dos columnas de la página de recetas (filtros a la izquierda y listado a la derecha) y en la sección de ingredientes de la receta individual, donde las tarjetas de ingredientes se distribuyen de forma regular dentro de la misma rejilla.

<img width="1239" height="101" alt="alineación-header" src="https://github.com/user-attachments/assets/5e0ad2de-b05b-4812-ad39-a913a455a91f" />

<img width="1168" height="811" alt="alineación-grid-con-filtros" src="https://github.com/user-attachments/assets/c08c5bd9-f403-4142-9204-fbaf6f3782dc" />
<br><br/>

**Proximidad**

Los elementos relacionados (título, descripción y botón de una misma tarjeta) se agrupan con espaciados pequeños, mientras que se añaden márgenes mayores entre secciones diferentes, de modo que el usuario percibe de forma clara qué contenidos forman parte del mismo grupo.

Este uso de proximidad reduce la carga cognitiva y ayuda a identificar bloques funcionales como secciones de contenido, tarjetas o módulos de navegación. En el listado de recetas, las opciones de filtrado se agrupan por categorías (“Dificultad”, “Tiempo de preparación”, “Restricciones o dietas”), con poco espacio entre checkboxes de un mismo grupo y más espacio entre grupos, lo que refuerza visualmente la estructura. En la home y en el detalle de receta, títulos, textos y botones dentro de cada sección comparten un bloque compacto, separado claramente de las secciones superiores e inferiores por espaciados mayores.

<img width="1245" height="287" alt="proximidad-espacios-2" src="https://github.com/user-attachments/assets/a090ba46-18b7-43bb-924e-fccb711b60c1" />
<br><br/>

**Repetición** 

Se repiten patrones visuales de forma consistente: los componentes comparten la misma paleta de colores, tipografía base, radios de borde y sombras, de forma que una tarjeta, un botón o un bloque de contenido se reconocen como parte del mismo sistema.

La repetición de patrones de layout (por ejemplo, tarjetas con imagen de receta de fondo, forma orgánica con el título y botones en la parte inferior) refuerza la coherencia y facilita al usuario anticipar cómo se comporta cada componente. En las capturas se observa que la misma tarjeta de receta se reutiliza en la home (sección “Tendencias de esta semana”) y en la página de listado, y que las formas orgánicas de fondo y la combinación de colores se mantienen tanto en la portada como en la página de detalle y demás secciones, reforzando la identidad visual de Desp[i]lensa.

<img width="1013" height="254" alt="repetición-tarjeta" src="https://github.com/user-attachments/assets/f9da180d-1d3a-4ad1-aa4a-7fef28cc948f" />
<br><br/>

### 1.2 Metodología CSS: Explica qué metodología usas (BEM recomendado) y por qué. Muestra ejemplos de tu nomenclatura. Si usas BEM, explica que usarás bloques (.card), elementos (.card__title), y modificadores (.card--featured).

Para la organización de clases se utiliza la metodología BEM (Block Element Modifier), que permite definir componentes claros y reutilizables mediante una convención de nombres estable.

Los bloques representan componentes independientes de la interfaz, por ejemplo `.card`, `.button` o `.navbar`, que se corresponden con piezas visuales como tarjetas de receta, botones de acción o la barra de navegación principal.

Los elementos son partes internas de cada bloque, como `.card__title`, `.card__body` o `.navbar__link`, que permiten identificar de forma explícita los subcomponentes de una misma pieza (título, contenido, enlaces de menú).

Los modificadores describen variantes de estilo o estado, como `.card--featured`, `.button--primary` o `.button--ghost`, que se utilizan para representar cambios visuales (por ejemplo, una receta destacada o un botón de énfasis) sin duplicar estructuras de HTML ni CSS.

Esta metodología facilita localizar los estilos de cada componente, evita colisiones entre nombres y ayuda a mantener la especificidad baja, lo que encaja bien con una arquitectura ITCSS escalable y con el uso de componentes reutilizables en Angular.

### 1.3 Organización de archivos: Documenta tu estructura ITCSS. Explica por qué cada carpeta está en ese orden (de menor a mayor especificidad). Muestra el árbol de carpetas completo.

La arquitectura de estilos sigue ITCSS (Inverted Triangle CSS), organizando los archivos de menor a mayor especificidad para controlar mejor la cascada y la herencia.

Estructura general:

```text
src/styles/
  00-settings/
    _variables.scss
  01-tools/
    _mixins.scss
  02-generic/
    _reset.scss
  03-elements/
    _elements.scss
  04-layout/
    _layout.scss
  05-components/
    _buttons.scss
    _cards.scss
    …
  06-utilities/
    _utilities.scss
  main.scss
```

- **00-settings**: design tokens globales (colores, tipografía, espaciado, breakpoints, sombras, radios, transiciones). No generan CSS por sí mismos; actúan como “fuente de verdad” visual que se reutiliza en todas las capas.

- **01-tools**: mixins y funciones SCSS reutilizables (breakpoints, layouts flex, estilos de botón base, focus accesible). Tampoco generan CSS hasta que se incluyen en otros archivos, lo que mantiene esta capa puramente de herramientas.

- **02-generic**: reset básico que normaliza el comportamiento del navegador (box-sizing, márgenes, tipografía base), afectando a todo el documento y sirviendo como punto de partida común para el resto de estilos.

- **03-elements**: estilos base de elementos HTML (`body`, `h1–h4`, `p`, `a`, `button`, etc.), redefiniendo su apariencia por defecto, pero sin depender de clases, para garantizar una tipografía y colores coherentes en toda la aplicación.

- **04-layout**: patrones de layout globales (contenedor, grid de 12 columnas, estructuras de página) que se reutilizan en distintas vistas, como la distribución en dos columnas de filtros + listado o el layout de la página de receta individual.

- **05-components**: componentes de UI específicos (botones, tarjetas de receta, módulos de navegación o formularios) con nomenclatura BEM; aquí se concentra la mayor parte de los estilos visuales de la interfaz.

- **06-utilities**: clases de utilidad de alta especificidad (por ejemplo `.visually-hidden`, `.text-center`) que pueden sobrescribir estilos anteriores de forma controlada para ajustes puntuales.

### 1.4 Sistema de Design Tokens: Documenta todas tus variables. Para cada grupo (colores, tipografía, espaciado, etc.) explica las decisiones:

Los design tokens se definen en `00-settings/_variables.scss` usando CSS Custom Properties, de modo que estén disponibles en todo el árbol de estilos y puedan atravesar cualquier mecanismo de encapsulación de componentes.

**Colores**

La paleta de colores está organizada en grupos semánticos, cada uno con variantes de luminosidad (light, base, hover, active, dark, darker):

```scss
/* Primario - Verdes suaves para fondos y elementos neutros */
--color-primary-light: #F9FAF8;
--color-primary: #C0C9BD;
--color-primary-dark: #90978E;
--color-primary-darker: #434642;

/* Secundario - Amarillos para acciones principales y CTAs */
--color-secondary-light: #EAE0C7;
--color-secondary: #F2B545;
--color-secondary-dark: #d59828;
--color-secondary-darker: #553F18;

/* Terciario - Azules verdosos para acentos */
--color-tertiary-light: #F7FBFB;
--color-tertiary: #B3D9DA;
--color-tertiary-dark: #86A3A4;

/* Semánticos - Estados y feedback */
--color-success-dark: #6AD243;
--color-error-dark: #D55353;
--color-warning-dark: #FFE24E;
--color-info-dark: #607DD9;

/* Neutros - Texto y fondos */
--color-text-main: #292C2C;
--color-neutral-white: #eaeaea;
--color-neutral-gray: #AEB9C7;
```

El color primario (verde) se utiliza para fondos suaves y elementos de interfaz neutros. El color secundario (amarillo) se reserva para acciones principales, botones y elementos destacados. Los colores semánticos siguen convenciones universales: verde para éxito, rojo para errores, amarillo para advertencias y azul para información.

<img width="2213" height="367" alt="colores-1" src="https://github.com/user-attachments/assets/e9dac3bb-1d9b-454b-910b-3d4470f5f964" />
<img width="2222" height="380" alt="colores-2" src="https://github.com/user-attachments/assets/bad170e0-97a1-4cd7-ba37-cfed025584a8" />
<img width="2222" height="376" alt="colores-3" src="https://github.com/user-attachments/assets/123678b9-bbf3-4370-ac26-b1c346c13e76" />
<img width="2222" height="355" alt="colores-4" src="https://github.com/user-attachments/assets/288c55a9-eef2-4d5f-835a-f6341493306e" />
<img width="2222" height="346" alt="colores-5" src="https://github.com/user-attachments/assets/9e7752bb-ca35-4d49-a646-99df7e0f380a" />

<br></br>

**Tipografía**

Se definen dos familias tipográficas con una escala consistente:

```scss
/* Familias */
--font-family-primary: 'Poppins', sans-serif;
--font-family-secondary: 'Glass Antiqua', cursive;

/* Escala tipográfica */
--font-h1-size: 3.75rem;   /* 60px - Glass Antiqua */
--font-h2-size: 3rem;      /* 48px - Poppins */
--font-h3-size: 2.25rem;   /* 36px - Poppins */
--font-h4-size: 1.875rem;  /* 30px - Poppins */
--font-body-size: 1rem;    /* 16px - Poppins */
--font-sm-size: 0.875rem;  /* 14px */
--font-xs-size: 0.75rem;   /* 12px */
--font-caption-size: 0.625rem; /* 10px */

/* Pesos disponibles */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

La fuente secundaria `Glass Antiqua` se usa exclusivamente para el `H1` principal y elementos de marca, aportando personalidad. `Poppins` se usa para todo el contenido restante, garantizando legibilidad en pantalla.

<img width="2222" height="752" alt="tipografia-1" src="https://github.com/user-attachments/assets/db4d6b9f-4e95-4a67-892e-8c8c15ec4b1a" />
<img width="2222" height="546" alt="tipografia-2" src="https://github.com/user-attachments/assets/648804ff-35ac-4851-88d2-752d80850fea" />

<br></br>

**Espaciado**

El sistema de espaciado se basa en una escala de 4px, proporcionando 24 niveles de espaciado consistentes:

```scss
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-24: 6rem;     /* 96px */
```

Esta escala permite mantener coherencia en márgenes, paddings y gaps entre componentes, facilitando la alineación visual y la proximidad entre elementos relacionados.

**Breakpoints**

Se definen 4 breakpoints siguiendo el enfoque mobile-first:

```scss
--breakpoint-sm: 640px;   /* Móvil grande */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Desktop grande */
```

Estos valores están alineados con el diseño de Figma y permiten adaptar layouts, número de columnas en grids y tamaños de fuente según el dispositivo.

**Sombras, bordes y transiciones**

```scss
/* Sombras - Elevación progresiva */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 4px 10px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.16);

/* Bordes */
--border-width-thin: 1px;
--border-width-medium: 2px;
--border-width-thick: 4px;

/* Radios de borde */
--radius-sm: 2px;
--radius-md: 5px;
--radius-lg: 8px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Transiciones */
--transition-fast: 50ms;
--transition-base: 150ms;
--transition-slow: 300ms;
--transition-easing: ease-in-out;
```

Las sombras usan opacidades bajas para no comprometer la legibilidad. Los radios de borde van desde esquinas sutiles (`radius-sm`) hasta elementos completamente redondeados (`radius-full` para avatares o badges). Las transiciones proporcionan feedback inmediato (`fast`) o animaciones más suaves (`slow`) según el contexto.

### 1.5 Mixins y funciones: Documenta cada mixin que creaste, para qué sirve, y muestra un ejemplo de uso.

En `01-tools/_mixins.scss` se han definido mixins reutilizables que encapsulan patrones de diseño comunes, reduciendo duplicación y garantizando consistencia.

**Mixin de breakpoints (`respond-to`)**

Permite escribir media queries legibles usando nombres semánticos en lugar de valores numéricos:

```scss
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px
);

@mixin respond-to($breakpoint) {
  @media (min-width: map.get($breakpoints, $breakpoint)) {
    @content;
  }
}

// Uso:
.component {
  padding: var(--spacing-4);
  
  @include respond-to(md) {
    padding: var(--spacing-8);
  }
}
```

**Mixin de layout flex (`flex-layout`)**

Centraliza la configuración de contenedores flexibles con parámetros declarativos:

```scss
@mixin flex-layout(
  $direction: row,
  $justify: flex-start,
  $align: center,
  $gap: 0
) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  gap: $gap;
}

// Uso en header:
.site-header {
  @include flex-layout(row, space-between, center);
}

// Uso en footer:
.site-footer__social-list {
  @include flex-layout(row, flex-start, center, var(--spacing-8));
}
```

**Mixin de foco accesible (`focus-ring`)**

Encapsula un estilo de foco visible que cumple WCAG 2.1 AA:

```scss
@mixin focus-ring($color: var(--color-info-dark), $size: 2px) {
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 $size $color;
  }
}

// Uso en botones:
.button {
  @include focus-ring(var(--color-info-dark));
}
```

**Mixin de botón base (`button-base`)**

Define la estructura común de todos los botones, permitiendo que las variantes solo ajusten colores:

```scss
@mixin button-base($bg, $color: var(--color-text-main)) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8) var(--spacing-16);
  border-radius: var(--radius-md);
  border: none;
  background-color: $bg;
  color: $color;
  cursor: pointer;
  transition: background-color var(--transition-base) var(--transition-easing),
              box-shadow var(--transition-base) var(--transition-easing);
}
```

Estos mixins se utilizan extensivamente en los componentes de layout (header, footer, sidebar) y en componentes interactivos (botones, modales, formularios), garantizando que todos compartan la misma base estructural.

### 1.6 ViewEncapsulation en Angular: Explica qué estrategia de encapsulación usarás. Angular por defecto usa Emulated (estilos encapsulados por componente). Documenta si mantendrás esto o usarás None (estilos globales). Justifica tu decisión.

En este proyecto se utiliza un enfoque **ITCSS + BEM** puro, con estilos globales gestionados desde styles.scss y sin encapsulación adicional de Angular (`ViewEncapsulation.None`).

Al tratarse de un proyecto educativo y de un único desarrollador, he optado por esta opción, ya que encaja con las recomendaciones de los materiales de referencia: permite un CSS más ligero, con especificidad controlada y una arquitectura más fácil de entender y documentar dentro del módulo de Diseño de Interfaces Web. La encapsulación se gestiona mediante la propia metodología BEM y la estructura ITCSS (`settings`, `tools`, `generic`, `elements`, `layout`, `components`, `utilities`), evitando colisiones de estilos a través de convenciones claras de nombres en lugar de mecanismos automáticos de aislamiento.

---

# Sección 2: HTML semántico y estructura

## 2.1 Elementos semánticos utilizados

En este proyecto se utilizan elementos semánticos HTML5 de forma sistemática para estructurar el contenido de manera clara y accesible. A continuación se detallan los principales elementos y su uso:

### `<header>` - Cabecera principal

El elemento `<header>` se utiliza para la cabecera principal del sitio, conteniendo el logo, navegación principal y elementos de utilidad.

**Ejemplo del código:**

```html
<header class="site-header" aria-label="Cabecera principal">
  <section class="site-header__branding">
    <a class="site-header__logo" routerLink="/" aria-label="Ir a la página de inicio de Desp[i]lensa">
      <span class="site-header__logo-text">Desp[i]lensa</span>
    </a>
  </section>

  <nav class="site-header__nav" aria-label="Navegación principal">
    <ul class="site-header__nav-list">
      <li class="site-header__nav-item">
        <a class="site-header__nav-link" routerLink="/inicio">Inicio</a>
      </li>
      <li class="site-header__nav-item">
        <a class="site-header__nav-link" routerLink="/recetas">Recetas</a>
      </li>
      <li class="site-header__nav-item">
        <a class="site-header__nav-link" routerLink="/despensa">Mi despensa</a>
      </li>
    </ul>
  </nav>

  <section class="site-header__theme-toggle" aria-label="Selector de tema">
    <button class="site-header__theme-button" type="button">
      <span class="visually-hidden">Cambiar tema</span>
    </button>
  </section>
</header>
```

**Cuándo se usa:** Una vez por página, al inicio del documento, conteniendo elementos de navegación global y branding.

### `<nav>` - Navegación

El elemento `<nav>` se utiliza para contener bloques de navegación principales. En este proyecto aparece dentro del `<header>` para la navegación principal y dentro del `<aside>` (sidebar) para navegación secundaria.

**Cuándo se usa:** Para bloques de navegación significativos que permiten moverse entre secciones o páginas de la aplicación.

### `<main>` - Contenido principal

El elemento `<main>` marca el contenido principal de la página, excluyendo header, footer y barras laterales.

**Ejemplo del código:**

```html
<main class="site-main" role="main">
  <div class="site-main__container">
    <ng-content></ng-content>
  </div>
</main>
```

**Cuándo se usa:** Una vez por página, conteniendo el contenido único y principal de cada vista. Utiliza `<ng-content>` para proyectar el contenido dinámico de cada página.

### `<aside>` - Contenido secundario (Sidebar)

El elemento `<aside>` se utiliza para contenido tangencialmente relacionado con el contenido principal, como navegación secundaria o filtros.

**Ejemplo del código:**

```html
<aside class="app-sidebar" [class.app-sidebar--open]="isOpen" aria-label="Navegación secundaria">
  <h2 class="app-sidebar__title">Mi cocina</h2>

  <nav class="app-sidebar__nav" aria-label="Menú de Mi cocina">
    <ul class="app-sidebar__nav-list">
      <li class="app-sidebar__nav-item">
        <a class="app-sidebar__nav-link" routerLink="/mi-cocina/resumen">
          <span class="app-sidebar__nav-icon" aria-hidden="true">📊</span>
          Resumen
        </a>
      </li>
      <li class="app-sidebar__nav-item">
        <a class="app-sidebar__nav-link" routerLink="/mi-cocina/despensa">
          <span class="app-sidebar__nav-icon" aria-hidden="true">🏪</span>
          Despensa
        </a>
      </li>
    </ul>
  </nav>
</aside>
```

**Cuándo se usa:** Para navegación secundaria, filtros, o widgets relacionados con el contenido principal pero que no son parte central de la página.

### `<footer>` - Pie de página

El elemento `<footer>` contiene información de cierre como enlaces legales, redes sociales y copyright.

**Ejemplo del código:**

```html
<footer class="site-footer" aria-label="Pie de página">
  <section class="site-footer__social" aria-label="Redes sociales">
    <ul class="site-footer__social-list">
      <li class="site-footer__social-item">
        <a class="site-footer__social-link" href="#" aria-label="YouTube">YouTube</a>
      </li>
      <!-- más redes sociales... -->
    </ul>
  </section>

  <section class="site-footer__middle">
    <section class="site-footer__links" aria-label="Enlaces informativos">
      <a class="site-footer__link" routerLink="/acerca">Acerca de nosotros</a>
      <a class="site-footer__link" routerLink="/terminos">Términos y condiciones</a>
      <a class="site-footer__link" routerLink="/privacidad">Política de privacidad</a>
    </section>
  </section>

  <section class="site-footer__bottom">
    <p class="site-footer__copyright">© 2025 - 2025 Desp[i]lensa</p>
  </section>
</footer>
```

**Cuándo se usa:** Una vez por página, al final del documento, conteniendo información complementaria, enlaces legales y redes sociales.

### `<article>` y `<section>` - Agrupación de contenido

Aunque no están implementados en los componentes de layout actuales, estos elementos se utilizarán en las páginas de contenido:

- **`<article>`**: Para contenido autónomo e independiente que podría distribuirse por separado (ej: una tarjeta de receta, un post del blog).
- **`<section>`**: Para agrupar contenido temático relacionado dentro de una página (ej: sección de ingredientes, sección de pasos de preparación).

### Atributos de accesibilidad

Todos los elementos semánticos incluyen atributos ARIA apropiados:
- `aria-label`: Para describir regiones y elementos interactivos
- `aria-hidden="true"`: Para ocultar iconos decorativos de lectores de pantalla
- `role="main"`, `role="alert"`, `role="status"`: Para reforzar la semántica en contextos específicos

---

## 2.2 Jerarquía de headings

La jerarquía de encabezados sigue estrictamente las mejores prácticas de HTML5 y accesibilidad:

### Reglas aplicadas:

1. **Un único `<h1>` por página**: Cada vista tiene un solo `<h1>` que representa el título principal de la página.
2. **Orden secuencial**: Los niveles nunca se saltan (no se pasa de `<h2>` a `<h4>` sin un `<h3>` intermedio).
3. **Jerarquía lógica**: Los encabezados crean una estructura de documento clara y navegable.

### Diagrama de jerarquía por tipo de página:

#### **Página de Login/Registro:**

```
h1: "Iniciar sesión" / "Registro"
  └─ (formulario sin headings adicionales, usa fieldset/legend)
```

**Ejemplo de código:**

```html
<form class="login-form">
  <h1 class="login-form__title">Iniciar sesión</h1>
  
  <fieldset class="login-form__fieldset">
    <legend class="visually-hidden">Credenciales de acceso</legend>
    <!-- campos del formulario -->
  </fieldset>
</form>
```

#### **Página de inicio (Home):**

```
h1: "Desp[i]lensa - Tu compañero de cocina inteligente"
  h2: "Tendencias de esta semana"
  h2: "Recetas populares"
  h2: "Inspírate según tu despensa"
```

#### **Página de listado de recetas:**

```
h1: "Recetas"
  h2: "Filtros"
    h3: "Dificultad"
    h3: "Tiempo de preparación"
    h3: "Restricciones o dietas"
  h2: "Resultados"
    h3: (título de cada tarjeta de receta)
```

#### **Página de detalle de receta:**

```
h1: "Pizza Margarita" (nombre de la receta)
  h2: "Ingredientes"
  h2: "Pasos de preparación"
    h3: "Paso 1: Preparar la masa"
    h3: "Paso 2: Preparar la salsa"
    h3: "Paso 3: Hornear"
  h2: "Información nutricional"
  h2: "Recetas relacionadas"
```

#### **Sidebar (navegación secundaria):**

```
h2: "Mi cocina"
  └─ (lista de navegación sin headings adicionales)
```

### Tipografía asociada a cada nivel:

Los estilos tipográficos están definidos en las variables SCSS:

- **H1**: `font-family: Glass-Antiqua` (secundaria), `font-size: clamp(2rem, 5vw, 3rem)`, `font-weight: 700`
- **H2**: `font-family: Poppins` (primaria), `font-size: 1.75rem`, `font-weight: 600`
- **H3**: `font-family: Poppins`, `font-size: 1.5rem`, `font-weight: 600`
- **H4**: `font-family: Poppins`, `font-size: 1.25rem`, `font-weight: 500`

Esta jerarquía visual refuerza la estructura semántica, facilitando el escaneo y la comprensión del contenido.

---

## 2.3 Estructura de formularios

Los formularios en este proyecto siguen las mejores prácticas de HTML semántico y accesibilidad, utilizando `<fieldset>`, `<legend>` y asociación correcta entre `<label>` e `<input>`.

### Componente `form-input` reutilizable

El componente `app-form-input` es la base de todos los formularios y garantiza la accesibilidad y usabilidad:

**Código del componente:**

```html
<div class="form-input" [class.form-input--error]="hasError">
  <!-- Label asociado al input -->
  <label class="form-input__label" [for]="inputId">
    {{ label }}
    @if (required) {
      <span class="form-input__required" aria-label="Campo requerido">*</span>
    }
  </label>

  <!-- Wrapper del input con icono opcional -->
  <div class="form-input__wrapper">
    @if (icon) {
      <span class="form-input__icon" aria-hidden="true">{{ icon }}</span>
    }

    <input
      class="form-input__field"
      [class.form-input__field--with-icon]="icon"
      [id]="inputId"
      [type]="type"
      [name]="name"
      [placeholder]="placeholder"
      [required]="required"
      [disabled]="disabled"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-invalid]="hasError"
      [(ngModel)]="value"
      (blur)="onBlur()"
      (input)="onInput($event)"
    />
  </div>

  <!-- Texto de ayuda -->
  @if (helpText && !hasError) {
    <p class="form-input__help-text" [id]="inputId + '-help'">
      {{ helpText }}
    </p>
  }

  <!-- Mensaje de error -->
  @if (hasError && errorMessage) {
    <p class="form-input__error-message" [id]="inputId + '-error'" role="alert">
      <span class="form-input__message-icon" aria-hidden="true">⚠️</span>
      {{ errorMessage }}
    </p>
  }
</div>
```

### Características clave:

1. **Asociación label-input**: El atributo `for` del `<label>` coincide con el `id` del `<input>`, generado de forma única en el componente TypeScript:

```typescript
private static idCounter = 0;
inputId: string = `form-input-${++FormInput.idCounter}`;
```

2. **Indicador visual de campo requerido**: Un asterisco (`*`) visible con texto alternativo para lectores de pantalla.

3. **Mensajes de error descriptivos**: Vinculados al input mediante `aria-describedby` y marcados con `role="alert"` para notificación inmediata.

4. **Texto de ayuda opcional**: Información adicional vinculada al input mediante `aria-describedby`.

5. **Estados visuales**: Clases BEM modificadoras para estados de error, éxito y deshabilitado.

### Formulario completo con fieldset y legend

**Ejemplo: Formulario de login**

```html
<form class="login-form" (ngSubmit)="onSubmit()" #loginFormRef="ngForm">
  <h1 class="login-form__title">Iniciar sesión</h1>

  <!-- Fieldset agrupa campos relacionados -->
  <fieldset class="login-form__fieldset">
    <!-- Legend describe el propósito del grupo -->
    <legend class="visually-hidden">Credenciales de acceso</legend>

    <!-- Componentes form-input reutilizables -->
    <app-form-input
      label="Email"
      type="email"
      name="email"
      placeholder="Email"
      icon="✉"
      [required]="true"
      [hasError]="emailError"
      [errorMessage]="emailErrorMessage"
      [(ngModel)]="formData.email"
      (blur)="validateEmail()"
    ></app-form-input>

    <app-form-input
      label="Contraseña"
      type="password"
      name="password"
      placeholder="Contraseña"
      icon="***"
      [required]="true"
      [hasError]="passwordError"
      [errorMessage]="passwordErrorMessage"
      [(ngModel)]="formData.password"
      (blur)="validatePassword()"
    ></app-form-input>
  </fieldset>

  <!-- Opciones adicionales -->
  <div class="login-form__options">
    <label class="login-form__checkbox-label">
      <input type="checkbox" name="rememberMe" class="login-form__checkbox" 
             [(ngModel)]="formData.rememberMe" />
      <span>Recuérdame</span>
    </label>
  </div>

  <!-- Mensaje de error general -->
  @if (generalError) {
    <div class="login-form__error" role="alert">
      <span aria-hidden="true">⚠️</span>
      {{ generalErrorMessage }}
    </div>
  }

  <!-- Botón de envío con texto descriptivo -->
  <div class="login-form__actions">
    <button type="submit" class="login-form__button" 
            [disabled]="!loginFormRef.valid || isSubmitting">
      @if (isSubmitting) {
        <span>Iniciando sesión...</span>
      } @else {
        <span>Iniciar sesión</span>
      }
    </button>
  </div>
</form>
```

### Uso de `<fieldset>` y `<legend>`:

- **`<fieldset>`**: Agrupa campos relacionados temáticamente (ej: credenciales de acceso, datos personales).
- **`<legend>`**: Describe el propósito del grupo. Se puede ocultar visualmente con la clase `.visually-hidden` manteniendo la accesibilidad.
- **Sin bordes visuales**: Los estilos BEM eliminan el borde por defecto de fieldset (`border: none`).

### Validación y feedback:

1. **Validación en tiempo real**: Los eventos `(blur)` activan la validación de cada campo.
2. **Estados visuales**: Bordes y colores cambian según el estado (error, éxito, enfocado).
3. **Mensajes descriptivos**: Cada error se asocia al input específico mediante `aria-describedby`.
4. **Botón de envío inteligente**: Se deshabilita si el formulario no es válido o está en proceso de envío.

### Accesibilidad garantizada:

- Todos los inputs tienen labels asociados
- Campos requeridos marcados visual y semánticamente
- Mensajes de error vinculados a los inputs
- Estados de error notificados con `role="alert"`
- Iconos decorativos ocultos con `aria-hidden="true"`
- Botones con texto descriptivo del estado actual
- Navegación por teclado completamente funcional
- Compatibilidad con lectores de pantalla

---

Esta estructura de formularios garantiza una experiencia de usuario accesible, usable y profesional, cumpliendo con los estándares WCAG 2.1 AA.

---

# Sección 3: Componentes interactivos y validación de estilos

## 3.1 Componentes interactivos implementados

La interfaz de Desp[i]lensa incluye una serie de componentes interactivos reutilizables que mejoran la experiencia del usuario mediante feedback visual, animaciones suaves y estados claros. Cada componente está diseñado con accesibilidad en mente y sigue la estructura BEM.

### Botones interactivos (.button)

Los botones son el elemento más versátil de la interfaz y cuentan con múltiples variantes de color, tamaño y estado:

**Estructura SCSS del bloque base:**

```scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background-color var(--transition-base) var(--transition-easing),
              transform var(--transition-fast) var(--transition-easing),
              box-shadow var(--transition-base) var(--transition-easing);

  @include focus-ring(var(--color-info-dark));

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
}
```

**Variantes de color implementadas:**

- **`.button--primary`**: `background-color: var(--color-secondary)` - Amarillo para acciones principales
- **`.button--secondary`**: `background-color: rgba(234, 224, 199, 0.75)` - Beige/crema con transparencia
- **`.button--ghost`**: `background-color: transparent; border: 2px solid` - Solo borde, sin fondo
- **`.button--danger`**: `background-color: var(--color-error-dark)` - Rojo para acciones destructivas

**Tamaños:**

- **`.button--sm`**: 32px de alto, `font-size: var(--font-sm-size)`
- **`.button--md`**: 40px de alto, `font-size: var(--font-body-size)`
- **`.button--lg`**: 48px de alto, `font-size: var(--font-h4-size)`

**Estados interactivos:**

Cada botón soporta estados visuales mediante transiciones suaves:
- **Hover**: Cambio de color mediante `background-color` y elevación mediante `box-shadow: var(--shadow-md)`
- **Active**: Presión visual mediante `transform: scale(0.98)`
- **Focus**: Anillo de foco accesible con `box-shadow: 0 0 0 2px var(--color-info-dark)`
- **Disabled**: `opacity: 0.5` y `pointer-events: none`

<img width="2222" height="228" alt="botones-1" src="https://github.com/user-attachments/assets/37c1ceb6-754b-447e-9ecf-de91b1033184" />
<img width="2222" height="287" alt="botones-2" src="https://github.com/user-attachments/assets/749d0bae-94b5-45dc-85a5-ad71509fa9cd" />
<img width="2221" height="225" alt="botones-3" src="https://github.com/user-attachments/assets/e7a7a842-7c19-4c85-94f1-81041dd6dc28" />
<img width="2222" height="215" alt="botones-4" src="https://github.com/user-attachments/assets/b08579d6-1836-43b6-9515-d075222ce9a5" />
<img width="2222" height="225" alt="botones-5" src="https://github.com/user-attachments/assets/eb0832ee-8ef2-48ea-91f1-58896ab9e88c" />

<br></br>

**Ejemplo de uso en componente:**

```html
<app-button 
  variant="primary" 
  size="md" 
  icon="🔍"
  iconPosition="left"
  (buttonClick)="onSearch()">
  Buscar receta
</app-button>

<app-button 
  variant="danger" 
  size="sm" 
  [disabled]="isDeleting"
  (buttonClick)="onDelete()">
  Eliminar
</app-button>
```

### Modales (.modal)

Los modales son componentes de overlay que centran contenido sobre el resto de la página, ideales para formularios, confirmaciones y contenido importante.

(_Aquí se muestra un ejemplo de un modal de confirmación._)

**Características:**

- Overlay oscuro semitransparente (`background-color: var(--surface-overlay)`)
- Animación suave de entrada: `transform: scale(0.95) translateY(20px)` → `scale(1) translateY(0)`
- Cierre mediante botón X, overlay click o tecla ESC (`@HostListener('document:keydown.escape')`)
- Posición `position: fixed` con `z-index: 1000` para aparecer sobre todo contenido
- `pointer-events: none` cuando está oculto, `auto` cuando visible

**Estructura SCSS del modal:**

```scss
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  @include flex-layout(row, center, center, 0);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-base) var(--transition-easing);
}

.modal--visible {
  pointer-events: auto;
  opacity: 1;
}

.modal__container {
  position: relative;
  z-index: 10;
  background-color: var(--surface-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  transform: scale(0.95) translateY(20px);
  transition: transform var(--transition-base), opacity var(--transition-base);
}

/* Tamaños disponibles */
.modal__container--sm { max-width: 400px; }
.modal__container--md { max-width: 600px; }
.modal__container--lg { max-width: 800px; }
.modal__container--xl { max-width: 1200px; }
```

![modal-demo](assets/modal-demo.gif)

**Estructura semántica:**

```html
<app-modal 
  [isOpen]="showModal"
  title="Confirmar acción"
  size="md"
  [closeOnEscape]="true"
  (closed)="onModalClosed()">
  
  <div class="modal-content">
    <p>¿Estás seguro de que deseas continuar?</p>
  </div>
  
  <div class="modal-footer">
    <app-button variant="ghost" (buttonClick)="closeModal()">
      Cancelar
    </app-button>
    <app-button variant="primary" (buttonClick)="confirm()">
      Confirmar
    </app-button>
  </div>
</app-modal>
```

### Tooltips (.tooltip)

Los tooltips proporcionan información contextual adicional sin ocupar espacio permanente en el layout.

**Estructura SCSS:**

```scss
.tooltip {
  position: absolute;
  z-index: 1000;
  padding: 8px 12px;
  font-size: 0.875rem;
  color: #fff;
  background-color: #333;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  animation: tooltipFadeIn 0.2s ease forwards;
}

.tooltip--top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}

.tooltip__arrow {
  position: absolute;
  border: 6px solid transparent;
}

.tooltip--top .tooltip__arrow {
  top: 100%;
  border-top-color: #333;
}
```

**Posiciones disponibles:** top, bottom, left, right - cada una con su flecha apuntando al elemento.

**Ejemplo:**

```html
<app-tooltip text="Número de porciones que aporta esta receta" position="top">
  <span class="recipe-servings">4 porciones</span>
</app-tooltip>
```

### Tabs y navegación por pestañas (.tabs)

Las pestañas permiten agrupar contenido relacionado sin expandir la altura de la página.

**Estructura:**

```html
<app-tabs [tabs]="[
  { id: 'ingredientes', label: 'Ingredientes', icon: '🥗' },
  { id: 'pasos', label: 'Pasos', icon: '👨‍🍳' },
  { id: 'info', label: 'Info nutricional', icon: '📊' }
]"
[activeTabId]="activeTab"
(tabChanged)="onTabChanged($event)">
</app-tabs>

<div *ngIf="activeTab === 'ingredientes'">
  <!-- Contenido de ingredientes -->
</div>
```

**Estilos:**

- Tab activa: texto en color secundario con borde inferior más grueso
- Tab inactiva: texto gris, sin borde
- Transición suave entre tabs
- Accesible mediante teclado (arrow keys, enter)

### Notificaciones y Toasts (.toast, .notification)

Las notificaciones informan al usuario de cambios de estado, errores o acciones completadas sin interrumpir el flujo de trabajo.

**Servicio ToastService (patrón Observable):**

```typescript
@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  show(message: string, type: ToastType, duration = 5000): void {
    const toast = { id: ++this.idCounter, message, type, duration };
    this.toastsSubject.next([...this.toastsSubject.getValue(), toast]);
    
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }

  success(message: string, duration = 4000): void { this.show(message, 'success', duration); }
  error(message: string, duration = 8000): void { this.show(message, 'error', duration); }
  info(message: string, duration = 3000): void { this.show(message, 'info', duration); }
  warning(message: string, duration = 6000): void { this.show(message, 'warning', duration); }
}
```

**Estilos SCSS:**

```scss
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 6px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;

  &--success { background-color: #4caf50; }
  &--error { background-color: #f44336; }
  &--warning { background-color: #ff9800; }
  &--info { background-color: #2196f3; }
}
```

![toast-demo](assets/toast-demo.gif)

### Theme Switcher (.theme-toggle)

La aplicación soporta alternancia entre tema claro y oscuro, detectando la preferencia del sistema y permitiendo override manual.

**ThemeService (gestión de tema):**

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme: Theme = 'light';
  private readonly STORAGE_KEY = 'theme';

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme) {
      this.currentTheme = savedTheme as Theme;
    } else {
      // Detectar preferencia del sistema
      this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' : 'light';
    }
    this.applyTheme(this.currentTheme);
  }

  private applyTheme(theme: Theme): void {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }
}
```

**Variables CSS por tema (en `_css-variables.scss`):**

```scss
/* Tema claro (default) */
.light-theme {
  --bg-body: var(--color-primary-light);
  --text-primary: var(--color-text-main);
  --surface-base: var(--color-neutral-white);
  --bg-footer-start: var(--color-tertiary-darker);
  --svg-overlay-color: rgba(242, 181, 69, 1);
}

/* Tema oscuro */
.dark-theme {
  --bg-body: var(--color-primary-darker);
  --text-primary: var(--color-neutral-white);
  --surface-base: var(--color-text-main);
  --bg-footer-start: #1a1a1a;
  --svg-overlay-color: rgba(67, 70, 66, 0.6);
}
```

El toggle en el header usa un checkbox estilizado como slider con transición suave.

![theme-switch-demo](assets/theme-switch-demo.gif)

### Spinner de carga (.spinner)

El componente spinner proporciona feedback visual durante operaciones asincrónicas.

**Características:**

- Animación de rotación continua
- Múltiples tamaños (sm, md, lg)
- Integración con `LoadingService` para control global
- Overlay con fondo semitransparente cuando se muestra spinner global
- Puede usarse inline en botones o como overlay fullscreen

**Uso en componentes:**

```typescript
constructor(private loadingService: LoadingService) {}

onSave() {
  this.loadingService.show();
  this.userService.saveUser(this.user).subscribe({
    next: () => this.loadingService.hide(),
    error: () => this.loadingService.hide()
  });
}
```

![spinner-demo](assets/spinner-demo.gif)

### Notificaciones (.notification)

Las notificaciones son alertas contextuales que informan sobre cambios en la aplicación, complementando los toasts.

**Variantes:**

- **Success** (verde): Estados positivos
- **Warning** (naranja): Advertencias
- **Error** (rojo): Errores o problemas
- **Info** (azul): Información general

**Características:**

- Icono indicador de tipo
- Título y descripción
- Botones de acción opcionales
- Animación suave de entrada
- Auto-dismiss configurable

![notification-demo](assets/notification-demo.gif)

### Menú Hamburguesa (navegación móvil)

El menú hamburguesa es el componente de navegación responsiva para dispositivos móviles, oculto en desktop.

**Características:**

- Botón hamburguesa que aparece solo en dispositivos pequeños (`max-width: 768px`)
- Menú deslizable desde el lateral
- Overlay semitransparente que cierra el menú al hacer click
- Transiciones suaves de apertura/cierre
- Accesibilidad: botón con `aria-label` y `aria-expanded`
- Se integra con la navegación principal del header

**Comportamiento:**

- Checkbox oculto (`opacity: 0`) controla el estado visible/oculto
- Label actúa como botón toggleable
- Menú se desliza con `transform: translateX(-100%)` cuando está cerrado

![hamburger-demo](assets/hamburger-demo.gif)

## 3.2 Validación y herramientas de CSS

### Validadores CSS utilizados

La validación de estilos se ha realizado mediante:

1. **W3C CSS Validator**: Comprobación de sintaxis CSS válida y cumplimiento de estándares
2. **StyleLint**: Linter configurado en el proyecto para mantener consistencia en nomenclatura, orden de propiedades y convenciones
3. **Browser DevTools**: Inspección de estilos computados, cascada CSS y especificidad

### Criterios de validación aplicados

- **Especificidad controlada**: Uso de ITCSS para evitar guerras de especificidad
- **Nomenclatura consistente**: Todas las clases siguen BEM (`.block`, `.block__element`, `.block--modifier`)
- **Variables de diseño**: Todos los valores de color, espaciado, tipografía provienen de design tokens
- **Propiedades recomendadas**: Se evitan deprecaciones de CSS y se usan propiedades modernas (CSS Grid, Flexbox, Custom Properties)

### Buenas prácticas implementadas

- **Mobile-first**: Media queries comenzando en dispositivos pequeños (`min-width`)
- **Accesibilidad**: Suficiente contraste de color (WCAG AA), focus rings visibles, estados activos claros
- **Performance**: Minimización de reflows, uso de `will-change` en animaciones, evitar shadows excesivos
- **Mantenibilidad**: Documentación de cada componente, examples de uso, propósito de variables

## 3.3 Guía de estilo actualizada

La guía de estilo (Style Guide Page) actúa como referencia viva de todos los componentes disponibles y sus variantes. Se encuentra disponible en la ruta `/style-guide` y se actualiza constantemente conforme se añaden nuevos componentes.

### Estructura de la guía de estilo

La página de style guide está organizada en secciones temáticas:

1. **Paleta de colores**: Mostrando todas las variables de color (primarios, secundarios, semánticos)
2. **Tipografía**: Jerarquía de headings (H1–H4), texto base, pesos disponibles
3. **Botones**: Todas las variantes (primary, secondary, ghost, danger) y tamaños (sm, md, lg)
4. **Cards**: Variantes vertical, horizontal, featured, carrusel
5. **Formularios**: Inputs, textareas, checkboxes, radio buttons, selects
6. **FormArray**: Demostración de campos dinámicos (añadir/eliminar teléfonos, direcciones)
7. **Navegación**: Breadcrumbs, tabs, paginación
8. **Feedback**: Alertas, badges, modales, notificaciones, toasts
9. **Componentes interactivos**: Tooltips, spinner, theme switcher
10. **Utilidades**: Espaciado, sombras, radios de borde, transiciones

### Uso de la guía de estilo

La guía de estilo sirve como:

- **Referencia para desarrolladores**: Visualizar componentes disponibles y sus estados antes de usarlos
- **Documentación visual**: Cada componente muestra su nombre, variantes, tamaños y estados
- **Testing manual**: Verificar que los estilos renderean correctamente en diferentes navegadores
- **Base para discusiones de diseño**: Facilita comunicación sobre cambios visuales o nuevos componentes

### Componentes documentados en la guía

Cada componente en la guía de estilo incluye:

- **Título descriptivo**: Nombre y categoría del componente
- **Ejemplo interactivo**: Renderización real del componente
- **Variantes**: Todas las posibilidades visuales (colores, tamaños, estados)
- **Propiedades**: Input/Output principales si es un componente Angular
- **Notas de uso**: Cuándo usar cada variante, buenas prácticas de accesibilidad

### Ejemplos de componentes en la guía

**Botones:**
- Todas las 4 variantes (primary, secondary, ghost, danger)
- Todos los 3 tamaños (sm, md, lg)
- Estados: normal, hover, active, disabled
- Con iconos y ancho completo

**Cards:**
- Variante vertical (para grids)
- Variante horizontal (para listados)
- Variante featured (destacada)
- Estados interactivos (hover, active)

**Formularios:**
- Input text, email, password, tel
- Textarea con contador de caracteres
- Checkbox simple y agrupado
- Radio buttons vertical e inline
- Select/dropdown
- Validación visual (error, success, pending)
- Estados: normal, focused, disabled, filled

**Componentes complejos:**
- Modal con diferentes tamaños
- Tabs funcionales
- Notificaciones con auto-dismiss
- Tooltips en 4 posiciones
- Paginación con navegación

### Mantenimiento de la guía de estilo

Cada vez que se añade un nuevo componente o se modifica uno existente:

1. Se actualiza el componente en `src/app/components/shared/`
2. Se añade un ejemplo en la página de style guide
3. Se documenta en esta sección de DOCUMENTACION.md
4. Se verifica que los estilos sigan las convenciones (BEM, ITCSS, design tokens)

Esta práctica garantiza que la guía de estilo siempre refleja el estado actual de la interfaz y sirve como fuente de verdad para los componentes disponibles.
