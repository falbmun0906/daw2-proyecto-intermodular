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

La paleta incluye colores primarios, secundarios y terciarios, además de colores semánticos (`success`, `error`, `warning`, `info`) y neutros para texto y fondos.

El color primario se utiliza principalmente en fondos suaves, contenedores y elementos de interfaz neutros, mientras que el color secundario se reserva para acciones principales y elementos destacados como botones y enlaces clave. Los colores semánticos se emplean para estados: verde para éxito (acciones completadas), rojo para errores (validaciones de formulario), amarillo para avisos y azul para mensajes informativos, siguiendo el diseño de la interfaz de recetas.

**Tipografía**

Se definen dos familias tipográficas: una fuente primaria (`Poppins`) para el texto general y títulos secundarios, y una fuente secundaria (`Glass-Antiqua`) para el `H1` principal y elementos de marca, en coherencia con el diseño de Figma.

La escala tipográfica está construida de forma coherente (`H1–H4`, párrafo, texto pequeño, leyendas), manteniendo proporciones claras entre niveles para reforzar la jerarquía visual y la legibilidad en pantalla, tanto en la home como en las vistas de listado y detalle de recetas.

**Espaciado**

El sistema de espaciado se basa en un múltiplo fijo en rem (derivado de `4px` u `8px`) hasta `spacing-24`, lo que garantiza consistencia en márgenes y paddings entre componentes.

Este enfoque permite que las distancias verticales y horizontales se mantengan coherentes en toda la interfaz, facilitando la alineación en el grid y la proximidad entre elementos relacionados dentro de tarjetas, secciones y formularios.

**Breakpoints**

Se han definido breakpoints genéricos para móvil grande (`sm 640px`), tablet (`md 768px`), escritorio (`lg 1024px`) y escritorio grande (`xl 1280px`).

Estos valores son habituales en frameworks modernos y están alineados con el diseño de Figma, que contempla vistas diferenciadas para móvil, tablet y desktop, permitiendo adaptar el layout (por ejemplo, número de columnas del grid o disposición de filtros y contenido) según el ancho disponible.

**Sombras, bordes y transiciones**

Las sombras (`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`) se basan en valores rgba con opacidades bajas para aportar profundidad a tarjetas y contenedores sin comprometer la legibilidad del contenido.

Los tokens de borde y radio (`border-width-*`, `radius-*`) permiten aplicar distintos niveles de redondeo y grosor de borde de forma consistente en botones, tarjetas y otros componentes interactivos.

Las transiciones (`fast`, `base`, `slow` con `ease-in-out`) se utilizan para animar cambios de color, sombra y estado (`hover`, `focus`), proporcionando microinteracciones suaves y coherentes en toda la interfaz.

_(Pendiente incluir capturas mostrando guía de estilos)_

### 1.5 Mixins y funciones: Documenta cada mixin que creaste, para qué sirve, y muestra un ejemplo de uso.

En `01-tools/_mixins.scss` se han definido mixins reutilizables que evitan repetir código y ayudan a aplicar patrones de diseño consistentes en todo el proyecto.

Ejemplos destacados:

- **Mixin de breakpoints (`respond-to`)**: permite escribir reglas responsive legibles a partir de un mapa de breakpoints (`sm`, `md`, `lg`, `xl`). Se utiliza para adaptar paddings, tamaños de fuente o el número de columnas en el grid según el ancho de pantalla, manteniendo en un solo lugar la lógica de los puntos de corte.

- **Mixin de layout flex (`flex-layout` / `flex-center`)**: centraliza la configuración de contenedores flexibles (dirección, justificación, alineación y gap) de forma declarativa, reduciendo duplicación en elementos como barras de navegación, tarjetas o contenedores de botones.

- **Mixin de botón base (`button-base`)**: define el estilo base de los botones (display, paddings, radios, transiciones, tipografía) para que cada variante BEM (`.button--primary`, `.button--secondary`, etc.) solo necesite ajustar colores o iconografía, garantizando que todos los botones compartan la misma estructura y comportamiento.

- **Mixin de foco accesible (`focus-ring`)**: encapsula un estilo de foco visible y suficientemente contrastado que se aplica a botones, enlaces y otros controles interactivos, cumpliendo buenas prácticas de accesibilidad sin tener que repetir reglas en cada componente.

Cada mixin está documentado con su propósito y se acompaña de ejemplos de uso dentro de los componentes donde se aplica (por ejemplo, botones, layouts de tarjetas o formularios).

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

**Variantes disponibles:**

- **`.button--primary`**: Color secundario (amarillo), para acciones principales y llamadas a la acción
- **`.button--secondary`**: Color primario (verde), para acciones secundarias
- **`.button--ghost`**: Sin fondo, solo texto y borde, para acciones terciarias
- **`.button--danger`**: Color rojo, para acciones destructivas (borrar, cancelar pagos)

**Tamaños:**

- **`.button--sm`**: 32px de alto, para contextos compactos (inline, modales pequeños)
- **`.button--md`**: 40px de alto (por defecto), para la mayoría de contextos
- **`.button--lg`**: 48px de alto, para botones prominentes o en mobile

**Estados interactivos:**

Cada botón soporta estados visuales mediante transiciones suaves:
- **Hover**: Cambio de color mediante `background-color` y elevación mediante `box-shadow` 
- **Active**: Presión visual mediante `transform: scale(0.98)`
- **Focus**: Anillo de foco accesible usando variables de color (`var(--color-info-dark)`)
- **Disabled**: Opacidad reducida (50%) y `pointer-events: none`

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

- Overlay oscuro semitransparente (`background-color: rgba(0,0,0,0.5)`)
- Animación suave de entrada: escala inicial 0.95 + opacidad 0
- Cierre mediante botón X, overlay click o tecla ESC
- Posición `position: fixed` con `z-index: 1000` para aparecer sobre todo contenido
- Scroll contenido cuando altura excede viewport

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

**Características:**

- Aparecen al pasar el ratón (mouseenter) o recibir foco
- Posicionamiento dinámico: top, bottom, left, right
- Flecha que apunta al elemento objetivo
- Color de fondo contrasta con el texto para legibilidad
- Animación suave de entrada

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

**Variantes por tipo:**

- **Success** (verde): Acciones completadas, cambios guardados
- **Error** (rojo): Fallos de validación, errores del servidor
- **Warning** (naranja): Advertencias, confirmaciones necesarias
- **Info** (azul): Información general, consejos

**Características:**

- Auto-dismiss después de 5 segundos (configurable)
- Posición fija en esquina superior derecha
- Animación suave de entrada y salida
- Click para cerrar manualmente
- Stack múltiples toasts sin superponerse

**Uso en componentes:**

```typescript
constructor(private toastService: ToastService) {}

onSave() {
  this.recipeService.saveRecipe(this.recipe).subscribe({
    next: (result) => {
      this.toastService.success('Receta guardada correctamente', 3000);
    },
    error: (err) => {
      this.toastService.error('No se pudo guardar la receta', 5000);
    }
  });
}
```

### Theme Switcher (.theme-toggle)

La aplicación soporta alternancia entre tema claro y oscuro, detectando la preferencia del sistema y permitiendo manual override.

**Implementación:**

- Lectura de `prefers-color-scheme` del navegador al cargar
- Botón en header para cambiar tema
- Persistencia en `localStorage`
- Variables CSS diferentes según tema (ej: `--color-bg-light` vs `--color-bg-dark`)

**Estilos tema claro:**

- Fondos: Blanco y verdes suaves
- Texto: Gris oscuro (#292C2C)
- Formas SVG: Amarillo

**Estilos tema oscuro:**

- Fondos: Grises oscuros
- Texto: Blanco/gris claro
- Formas SVG: Tonos más saturados

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
