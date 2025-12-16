# Sección 1: Arquitectura CSS y comunicación visual.

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

# Sección 3: Sistema de componentes UI

## 3.1 Componentes implementados

### Button (app-button)

**Propósito:**
Componente de botón reutilizable que cubre todas las necesidades de acciones interactivas en la aplicación. Soporta múltiples variantes visuales, tamaños y estados para mantener la jerarquía visual y guiar al usuario en sus acciones.

**Variantes disponibles:**
- **primary** (`.button--primary`): Botón de acción principal con color secundario del sistema (amarillo). Se utiliza para la acción más importante de cada pantalla (ej: "Iniciar sesión", "Guardar receta", "Buscar").
- **secondary** (`.button--secondary`): Botón de acción secundaria con color primario del sistema (verde). Para acciones importantes pero no prioritarias (ej: "Ver más", "Filtrar").
- **ghost** (`.button--ghost`): Botón sin fondo, solo con borde y texto. Para acciones terciarias o enlaces de baja prioridad (ej: "Cancelar", "Volver").
- **danger** (`.button--danger`): Botón destructivo con color rojo. Para acciones irreversibles o peligrosas (ej: "Eliminar receta", "Borrar cuenta").

**Tamaños disponibles:**
- **sm** (`.button--sm`): Pequeño (32px altura, padding reducido). Para acciones compactas en tarjetas o listas.
- **md** (`.button--md`): Mediano (40px altura). Tamaño por defecto para la mayoría de acciones.
- **lg** (`.button--lg`): Grande (48px altura desktop, 56px tablet+). Para CTAs principales y acciones destacadas.

**Estados que maneja:**
- **:hover**: Cambio de color, elevación de sombra y movimiento sutil hacia arriba (translateY -2px).
- **:focus**: Outline visible con color de info (azul) para navegación por teclado, aplicado mediante mixin `focus-ring`.
- **:active**: Escala reducida (scale 0.98) para feedback táctil.
- **:disabled / .button--disabled**: Opacidad reducida (0.5), cursor not-allowed, sin interacciones.

**Modificadores adicionales:**
- **--full-width**: Ancho completo (100%) para botones en formularios o layouts estrechos.
- **--with-icon**: Ajusta el espaciado interno cuando el botón incluye un icono.

**Características de accesibilidad:**
- Atributo `[type]` configurable (button, submit, reset)
- Estado deshabilitado comunicado con `aria-disabled`
- Focus ring visible para navegación por teclado
- Iconos opcionales marcados con `aria-hidden="true"`
- Proyección de contenido con `<ng-content>` para flexibilidad

**Ejemplo de uso:**

```html
<!-- Botón primary por defecto -->
<app-button (buttonClick)="onSave()">
  Guardar cambios
</app-button>

<!-- Botón secundario mediano con icono izquierda -->
<app-button 
  variant="secondary" 
  size="md" 
  icon="🔍"
  iconPosition="left"
  (buttonClick)="onSearch()">
  Buscar recetas
</app-button>

<!-- Botón ghost pequeño -->
<app-button 
  variant="ghost" 
  size="sm"
  (buttonClick)="onCancel()">
  Cancelar
</app-button>

<!-- Botón danger grande, ancho completo, deshabilitado -->
<app-button 
  variant="danger"
  size="lg"
  [fullWidth]="true"
  [disabled]="isProcessing"
  type="submit"
  (buttonClick)="onDelete()">
  Eliminar receta
</app-button>

<!-- Botón primary con icono a la derecha -->
<app-button 
  icon="→"
  iconPosition="right"
  (buttonClick)="onNext()">
  Siguiente paso
</app-button>
```

**Código TypeScript del componente:**

```typescript
@Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
@Input() size: 'sm' | 'md' | 'lg' = 'md';
@Input() type: 'button' | 'submit' | 'reset' = 'button';
@Input() disabled: boolean = false;
@Input() fullWidth: boolean = false;
@Input() icon: string = '';
@Input() iconPosition: 'left' | 'right' = 'left';
@Output() buttonClick = new EventEmitter<MouseEvent>();
```

---

### Card (app-card)

**Propósito:**
Componente de tarjeta reutilizable diseñado específicamente para mostrar recetas de forma visual y atractiva. Combina imagen de fondo, SVG decorativo, información estructurada y acción principal en un contenedor elegante y responsive.

**Variantes disponibles:**
- **vertical** (`.card--vertical`): Tarjeta vertical compacta (por defecto). Imagen arriba (180px), contenido sobre SVG decorativo en la parte inferior. max-width 280px. Ideal para grids compactos de recetas en home.
- **carousel** (`.card--carousel`): Tarjeta vertical para carruseles. Ligeramente más grande que vertical (200px de imagen). max-width 320px. Pensada para secciones destacadas con scroll horizontal.
- **horizontal** (`.card--horizontal`): Tarjeta horizontal con imagen a la izquierda (35%) y contenido a la derecha (65%) sobre fondo blanco. Sin SVG decorativo. Para listados o páginas de búsqueda. min-height 180px, ancho completo.
- **featured** (`.card--featured`): Tarjeta destacada más grande con borde amarillo (2px) y efectos hover más pronunciados. Para recetas principales o promociones especiales. max-width 400px, min-height 380px.

**Tamaños y dimensiones (respetando relación de aspecto):**
- **Vertical (default)**: 337px × 406px (relación aspecto 0.83) - Para grids compactos
- **Carousel**: 575px × 533px (relación aspecto 1.08) - Para carruseles/secciones destacadas
- **Horizontal (listado)**: 813px × 493px (relación aspecto 1.65) - Para listados de búsqueda
- **Featured**: 575px × 533px (como carousel, pero con borde especial) - Para promociones

**Estructura interna:**
La tarjeta es un contenedor donde **la imagen de fondo ocupa TODA la tarjeta** (100% width y height) con el contenido superpuesto encima:

1. **Imagen de fondo (ocupa 100%)**: Se aplica como `background-image` con `background-size: cover` y `background-position: center`, permitiendo zoom smooth en hover (scale 1.05)
2. **SVG decorativo (card-form)**: Forma orgánica gris oscura (rgba(65,65,65,0.90)) superpuesta en la parte inferior, creando un área visual para el contenido (no aparece en variante horizontal)
3. **Contenido superpuesto** (position: absolute, bottom: 0, con gradiente de fondo oscuro):
   - Categoría/Etiqueta (opcional): Badge amarillo con texto en mayúsculas
   - Título (h3): Fuente Poppins, bold, texto blanco, máximo 2 líneas con ellipsis
   - Descripción (opcional): Texto blanco, máximo 2 líneas con ellipsis
   - Metadatos:
     - Valoración: Estrellas (★/☆) de 0 a 5
     - Tiempo de preparación: Icono ⏱ + texto
     - Dificultad: Icono + texto
   - Botones de acción (en la parte inferior del contenido):
     - **Variantes vertical/carousel/featured**: Un botón "Ver receta" (primary, amarillo, ancho completo)
     - **Variante horizontal**: Dos botones flex (flex: 1 cada uno) - "Guardar" (secondary, gris semitransparente) y "Ver receta" (primary, amarillo)

**Estados que maneja:**
- **:hover**: Elevación de sombra (shadow-md → shadow-xl), translateY(-8px) y zoom de imagen (scale 1.05)
- **:hover (featured)**: Elevación mayor (translateY -12px + scale 1.02) con sombra amarilla
- **:focus**: Focus ring visible para cards clickeables (role="button")
- **:active**: Reducción del translateY a -4px para feedback táctil
- **clickeable**: Cursor pointer cuando se proporciona evento `(cardClick)`

**Propiedades Input:**
- `variant`: 'vertical' | 'carousel' | 'horizontal' | 'featured' (por defecto: 'vertical')
- `imageUrl`: URL de la imagen de fondo
- `imageAlt`: Texto alternativo para la imagen
- `title`: Título de la receta
- `description`: Descripción breve
- `rating`: Valoración de 0 a 5
- `time`: Tiempo de preparación (ej: "30 min")
- `difficulty`: Nivel de dificultad (ej: "Fácil")
- `category`: Categoría o etiqueta
- `actionText`: Texto del botón de acción (por defecto: "Ver receta")
- `showAction`: Mostrar u ocultar el botón (por defecto: true)
- `showDecorative`: Mostrar u ocultar el SVG decorativo (por defecto: true, no aplica a horizontal)

**Eventos Output:**
- `(cardClick)`: Emitido al hacer click en cualquier parte de la card
- `(actionClick)`: Emitido al hacer click en el botón de acción "Ver receta" (con stopPropagation)
- `(saveClick)`: Emitido al hacer click en el botón "Guardar" (solo en variante horizontal)

**Características de accesibilidad:**
- Uso semántico de `<article>` para cada card
- Atributo `role="button"` cuando la card es clickeable
- `tabindex="0"` para navegación por teclado en cards clickeables
- `aria-label` para valoración con estrellas legible por lectores de pantalla
- Iconos decorativos marcados con `aria-hidden="true"`
- `loading="lazy"` en imágenes para optimización de rendimiento
- Focus ring visible para navegación por teclado

**Ejemplo de uso:**

```html
<!-- Card VERTICAL (337x406, para grids compactos en home) -->
<app-card
  variant="vertical"
  imageUrl="/assets/images/pizza-margherita.jpg"
  imageAlt="Pizza Margherita recién horneada"
  title="Pizza Margherita"
  description="Clásica pizza italiana con tomate, mozzarella"
  [rating]="4.5"
  time="45 min"
  difficulty="Media"
  category="Italiana"
  (actionClick)="verReceta(1)"
></app-card>

<!-- Card CAROUSEL (575x533, para secciones destacadas con scroll horizontal) -->
<app-card
  variant="carousel"
  imageUrl="/assets/images/paella-valenciana.jpg"
  imageAlt="Paella Valenciana tradicional"
  title="Paella Valenciana Auténtica"
  description="Arroz, pollo, conejo, judías verdes y garrofón"
  [rating]="5"
  time="90 min"
  difficulty="Difícil"
  category="Destacada"
  (actionClick)="verReceta(2)"
></app-card>

<!-- Card HORIZONTAL (813x493, para listados de búsqueda con dos botones) -->
<app-card
  variant="horizontal"
  imageUrl="/assets/images/ensalada-cesar.jpg"
  imageAlt="Ensalada César"
  title="Ensalada César"
  description="Lechuga romana, pollo, parmesano y salsa César casera"
  [rating]="4"
  time="20 min"
  difficulty="Fácil"
  category="Ensaladas"
  actionText="Ver receta"
  (cardClick)="verDetalleReceta(3)"
  (actionClick)="verRecetaCompleta(3)"
  (saveClick)="agregarAFavoritos(3)"
></app-card>

<!-- Card FEATURED (575x533, para promociones especiales con borde amarillo) -->
<app-card
  variant="featured"
  imageUrl="/assets/images/tarta-chocolate.jpg"
  imageAlt="Tarta de Chocolate belga"
  title="Tarta de Chocolate Belga Premium"
  description="Chocolate 72%, nata, frambuesas y coulis de maracuyá"
  [rating]="4.8"
  time="60 min"
  difficulty="Media"
  category="Postres"
  actionText="Ver receta completa"
  (actionClick)="verRecetaDestacada(4)"
></app-card>
```

**Código TypeScript del componente:**

```typescript
@Input() variant: 'vertical' | 'carousel' | 'horizontal' | 'featured' = 'vertical';
@Input() imageUrl: string = '';
@Input() imageAlt: string = '';
@Input() title: string = '';
@Input() description: string = '';
@Input() rating: number = 0;
@Input() time: string = '';
@Input() difficulty: string = '';
@Input() category: string = '';
@Input() actionText: string = 'Ver receta';
@Input() showAction: boolean = true;
@Input() showDecorative: boolean = true;
@Output() cardClick = new EventEmitter<void>();
@Output() actionClick = new EventEmitter<void>();
@Output() saveClick = new EventEmitter<void>();
```

**Implementación del SVG decorativo (card-form):**

El SVG decorativo utiliza una curva Bézier cuadrática (path con comando Q) para crear una forma orgánica y suave que se adapta al ancho de la card:

```svg
<svg viewBox="0 0 300 200" preserveAspectRatio="none">
  <path
    d="M0,120 Q50,100 100,110 T200,120 L300,130 L300,200 L0,200 Z"
    fill="rgba(41, 44, 44, 0.85)"
  />
</svg>
```

- `preserveAspectRatio="none"`: Permite que el SVG se estire para llenar el contenedor
- `fill="rgba(41, 44, 44, 0.85)"`: Color oscuro semitransparente que permite ver la imagen de fondo
- La curva crea una forma ondulada natural que aporta dinamismo visual

---

## 3.2 Nomenclatura y metodología

Este proyecto utiliza **BEM (Block Element Modifier)** de forma estricta para garantizar componentes predecibles, escalables y fáciles de mantener.

### Estructura BEM aplicada:

**Block (Bloque):**
Representa un componente independiente y reutilizable.
- Ejemplo: `.button`, `.card`, `.form-input`, `.site-header`

**Element (Elemento):**
Parte interna del bloque que no tiene sentido fuera de su contexto.
- Se conecta con doble guion bajo: `__`
- Ejemplo: `.button__icon`, `.button__content`, `.card__title`, `.form-input__label`

**Modifier (Modificador):**
Variación del bloque o elemento que cambia su apariencia o comportamiento.
- Se conecta con doble guion: `--`
- Ejemplo: `.button--primary`, `.button--lg`, `.card--featured`, `.form-input--error`

### Ejemplos reales del proyecto:

**Componente Button:**
```scss
.button { /* Block: componente base */
  display: inline-flex;
  align-items: center;
  // ... estilos base
}

.button__content { /* Element: contenido interno */
  display: inline-flex;
}

.button__icon { /* Element: icono */
  font-size: 1.2em;
}

.button__icon--left { /* Modifier de elemento */
  margin-right: calc(var(--spacing-2) * -1);
}

.button--primary { /* Modifier: variante amarilla */
  background-color: var(--color-secondary);
}

.button--lg { /* Modifier: tamaño grande */
  padding: var(--spacing-4) var(--spacing-8);
}

.button--disabled { /* Modifier: estado deshabilitado */
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Componente Header:**
```scss
.site-header { /* Block */
  display: flex;
  position: sticky;
}

.site-header__branding { /* Element: zona de logo */
  flex-shrink: 0;
}

.site-header__nav { /* Element: navegación */
  flex-grow: 1;
}

.site-header__nav-link { /* Element: enlace de navegación */
  padding: var(--spacing-3);
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
}
```

**Componente Form Input:**
```scss
.form-input { /* Block */
  display: flex;
  flex-direction: column;
}

.form-input__label { /* Element: etiqueta */
  font-weight: var(--font-weight-medium);
}

.form-input__field { /* Element: campo de entrada */
  padding: var(--spacing-4);
}

.form-input--error { /* Modifier: estado de error */
  .form-input__field {
    border-color: var(--color-error-dark);
  }
}

.form-input--disabled { /* Modifier: estado deshabilitado */
  opacity: 0.5;
}
```

**Componente Card:**
```scss
.card { /* Block: tarjeta de receta */
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.card__image-wrapper { /* Element: contenedor de imagen */
  position: relative;
}

.card__decorative-bg { /* Element: SVG decorativo de fondo */
  position: absolute;
  bottom: 0;
  fill: rgba(65, 65, 65, 0.90);
}

.card__content { /* Element: zona de contenido */
  position: relative;
  z-index: 2;
  padding: var(--spacing-4) var(--spacing-5);
}

.card__title { /* Element: título de la receta */
  font-size: var(--font-h4-size);
  color: var(--color-neutral-white);
}

.card__rating { /* Element: valoración con estrellas */
  display: flex;
  gap: var(--spacing-1);
}

.card__star { /* Element: estrella individual */
  color: var(--color-neutral-gray);
}

.card__star--filled { /* Modifier de elemento: estrella rellena */
  color: var(--color-secondary);
}

.card--vertical { /* Modifier: card vertical (compacta, para grids) */
  max-width: 280px;
  min-height: 320px;
}

.card--carousel { /* Modifier: card para carruseles */
  max-width: 320px;
  min-height: 360px;
}

.card--horizontal { /* Modifier: card horizontal (para listados) */
  flex-direction: row;
  min-height: 180px;
  
  .card__image-wrapper {
    width: 35%;
  }

  .card__content {
    width: 65%;
    color: var(--color-text-main);
  }
  
  .card__decorative-bg {
    display: none;
  }
}

.card--featured { /* Modifier: card destacada */
  border: 2px solid var(--color-secondary);
  max-width: 400px;
  min-height: 380px;
}

.card--clickable { /* Modifier: card interactiva */
  cursor: pointer;
}
```

### Estrategia de nomenclatura:

Pendiente: Cards, Form elements adicionales, Alerts, Style Guide page
