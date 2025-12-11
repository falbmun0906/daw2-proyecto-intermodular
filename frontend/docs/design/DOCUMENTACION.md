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
