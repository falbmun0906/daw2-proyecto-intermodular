# README - DWEC

## Índice Principal

- [Introducción](#introducción)
  - [Propósito](#propósito)
  - [Alcance](#alcance)

- [Requisitos previos](#requisitos-previos)
  - [Herramientas y versiones](#herramientas-y-versiones)
  - [Convenciones del proyecto](#convenciones-del-proyecto)

- [FASE 1: Manipulación del DOM y gestión de eventos](#fase-1-manipulación-del-dom-y-gestión-de-eventos)
  - [Tarea 1: Manipulación del DOM](#tarea-1-manipulación-del-dom)
    - [1.1 Acceder al DOM: @ViewChild y ElementRef](#11-acceder-al-dom-viewchild-y-elementref)
    - [1.2 Modificar estilos y propiedades: Renderer2](#12-modificar-estilos-y-propiedades-renderer2)
    - [1.3 Creación y eliminación dinámica de elementos](#13-creación-y-eliminación-dinámica-de-elementos)
    - [1.4 Buenas prácticas y seguridad](#14-buenas-prácticas-y-seguridad)
    - [1.5 Criterios de aceptación](#15-criterios-de-aceptación)
  - [Tarea 2: Sistema de eventos](#tarea-2-sistema-de-eventos)
    - [2.1 Event binding y $event](#21-event-binding-y-event)
    - [2.2 Pseudoeventos y filtrado](#22-pseudoeventos-y-filtrado)
    - [2.3 Prevención y propagación de eventos](#23-prevención-y-propagación-de-eventos)
    - [2.4 Manejo global de eventos: @HostListener](#24-manejo-global-de-eventos-hostlistener)
    - [2.5 Criterios de aceptación](#25-criterios-de-aceptación)
  - [Tarea 3: Componentes interactivos funcionales](#tarea-3-componentes-interactivos-funcionales)
    - [3.1 Menú hamburguesa](#31-menú-hamburguesa)
    - [3.2 Modales](#32-modales)
    - [3.3 Tabs](#33-tabs)
    - [3.4 Acordeones](#34-acordeones)
    - [3.5 Alerts y notificaciones](#35-alerts-y-notificaciones)
    - [3.6 Tooltips](#36-tooltips)
  - [Tarea 4: Theme Switcher funcional](#tarea-4-theme-switcher-funcional)
    - [4.1 Detectar prefers-color-scheme](#41-detectar-prefers-color-scheme)
    - [4.2 Toggle tema y persistencia](#42-toggle-tema-y-persistencia)
    - [4.3 Aplicación del tema al inicio](#43-aplicación-del-tema-al-inicio)
  - [Tarea 5: Documentación técnica sobre arquitectura de eventos](#tarea-5-documentación-técnica-sobre-arquitectura-de-eventos)
    - [5.1 Patrón unidireccional de eventos](#51-patrón-unidireccional-de-eventos)
    - [5.2 Servicios y centralización de eventos](#52-servicios-y-centralización-de-eventos)
    - [5.3 Diagrama de flujo de eventos](#53-diagrama-de-flujo-de-eventos)
  - [Entregables Fase 1](#entregables-fase-1)

- [FASE 2: Componentes interactivos y comunicación](#fase-2-componentes-interactivos-y-comunicación)
  - [Tarea 1: Servicios de comunicación](#tarea-1-servicios-de-comunicación)
    - [1.1 Crear servicio para comunicación entre componentes hermanos](#11-crear-servicio-para-comunicación-entre-componentes-hermanos)
    - [1.2 Patrón Observable/Subject para notificaciones](#12-patrón-observablesubject-para-notificaciones)
    - [1.3 Servicio de estado global para datos compartidos](#13-servicio-de-estado-global-para-datos-compartidos)
  - [Tarea 2: Separación de responsabilidades](#tarea-2-separación-de-responsabilidades)
    - [2.1 Extraer lógica de negocio a servicios](#21-extraer-lógica-de-negocio-a-servicios)
    - [2.2 Componentes gestionan solo presentación](#22-componentes-gestionan-solo-presentación)
    - [2.3 Servicios gestionan datos y lógica](#23-servicios-gestionan-datos-y-lógica)
  - [Tarea 3: Sistema de notificaciones / toasts](#tarea-3-sistema-de-notificaciones--toasts)
    - [3.1 Servicio centralizado de notificaciones](#31-servicio-centralizado-de-notificaciones)
    - [3.2 Componente toast que se subscribe al servicio](#32-componente-toast-que-se-subscribe-al-servicio)
    - [3.3 Diferentes tipos (success, error, info, warning)](#33-diferentes-tipos-success-error-info-warning)
    - [3.4 Auto-dismiss configurable](#34-auto-dismiss-configurable)
  - [Tarea 4: Gestión de loading states](#tarea-4-gestión-de-loading-states)
    - [4.1 Servicio para gestionar estados de carga global](#41-servicio-para-gestionar-estados-de-carga-global)
    - [4.2 Spinner global durante operaciones async](#42-spinner-global-durante-operaciones-async)
    - [4.3 Loading local en botones y componentes específicos](#43-loading-local-en-botones-y-componentes-específicos)
    - [4.4 HttpInterceptor opcional](#44-httpinterceptor-opcional)
  - [Tarea 5: Documentación](#tarea-5-documentación)
    - [5.1 Diagrama de arquitectura de servicios](#51-diagrama-de-arquitectura-de-servicios)
    - [5.2 Patrones de comunicación implementados](#52-patrones-de-comunicación-implementados)
    - [5.3 Buenas prácticas de separación de responsabilidades](#53-buenas-prácticas-de-separación-de-responsabilidades)
  - [Entregables Fase 2](#entregables-fase-2)

- [FASE 3: Formularios reactivos avanzados](#fase-3-formularios-reactivos-avanzados)
  - [Tarea 1: Formularios reactivos básicos](#tarea-1-formularios-reactivos-básicos)
    - [1.1 Implementar FormBuilder en todos los formularios](#11-implementar-formbuilder-en-todos-los-formularios)
    - [1.2 FormGroup y FormControl para cada campo](#12-formgroup-y-formcontrol-para-cada-campo)
    - [1.3 Validadores síncronos integrados (required, minLength, email, pattern, min/max)](#13-validadores-síncronos-integrados-required-minlength-email-pattern-minmax)
  - [Tarea 2: Validadores personalizados](#tarea-2-validadores-personalizados)
    - [2.1 Validador de contraseña fuerte](#21-validador-de-contraseña-fuerte)
    - [2.2 Validador de confirmación de contraseña](#22-validador-de-confirmación-de-contraseña)
    - [2.3 Validador de formato personalizado (NIF, teléfono, código postal)](#23-validador-de-formato-personalizado-nif-teléfono-código-postal)
    - [2.4 Validadores a nivel de formulario (cross-field validation)](#24-validadores-a-nivel-de-formulario-cross-field-validation)
  - [Tarea 3: Validadores asíncronos](#tarea-3-validadores-asíncronos)
    - [3.1 Validador de Email Único (Simular API)](#31-validador-de-email-único-simular-api)
    - [3.2 Validador de Username Disponible](#32-validador-de-username-disponible)
    - [3.3 Debounce para evitar múltiples llamadas](#33-debounce-para-evitar-múltiples-llamadas)
    - [3.4 Configuración avanzada (updateOn, pending)](#34-configuración-avanzada-updateon-pending)
  - [Tarea 4: FormArray para contenido dinámico](#tarea-4-formarray-para-contenido-dinámico)
    - [4.1 Definir FormArray y validación por elemento](#41-definir-formarray-y-validación-por-elemento)
    - [4.2 Template con agregar y eliminar dinámico](#42-template-con-agregar-y-eliminar-dinámico)
    - [4.3 Acceso y validación de elementos en el array](#43-acceso-y-validación-de-elementos-en-el-array)
  - [Tarea 5: Mostrar errores y feedback visual](#tarea-5-mostrar-errores-y-feedback-visual)
    - [5.1 Mostrar errores tras touched/dirty](#51-mostrar-errores-tras-toucheddirty)
    - [5.2 Deshabilitar submit si formulario inválido](#52-deshabilitar-submit-si-formulario-inválido)
    - [5.3 Loading durante validación asíncrona](#53-loading-durante-validación-asíncrona)
    - [5.4 Feedback visual de validación (clases CSS)](#54-feedback-visual-de-validación-clases-css)
  - [Tarea 6: Documentación](#tarea-6-documentación)
    - [6.1 Catálogo de validadores implementados](#61-catálogo-de-validadores-implementados)
    - [6.2 Guía de uso de FormArray](#62-guía-de-uso-de-formarray)
    - [6.3 Ejemplos de validación asíncrona](#63-ejemplos-de-validación-asíncrona)
  - [Entregables Fase 3](#entregables-fase-3)

- [Notas de implementación y buenas prácticas](#notas-de-implementación-y-buenas-prácticas)
  - [Accesibilidad](#accesibilidad)
  - [Performance](#performance)
  - [Testing](#testing)

- [Recursos y referencias](#recursos-y-referencias)
  - [Documentación oficial](#documentación-oficial)

- [Apéndices](#apéndices)
  - [Plantillas y ejemplos](#plantillas-y-ejemplos)


## Introducción

### Propósito

Este documento técnico presenta la implementación completa de manipulación del DOM, gestión de eventos y formularios reactivos en una aplicación Angular moderna. El proyecto demuestra las capacidades avanzadas de Angular para crear aplicaciones web interactivas, escalables y mantenibles.

El enfoque principal es la correcta utilización del modelo de objetos del documento (DOM) mediante las herramientas y patrones que Angular proporciona, garantizando código seguro, testeable y compatible con diferentes plataformas.

### Alcance

Esta entrega abarca tres fases principales de desarrollo:

1. **Manipulación del DOM y eventos**: Implementación de acceso seguro al DOM mediante ViewChild, ElementRef y Renderer2, sistema completo de gestión de eventos, componentes interactivos (modales, menús, tabs, tooltips) y theme switcher funcional.

2. **Componentes interactivos y comunicación**: Servicios de comunicación entre componentes usando patrones reactivos (BehaviorSubject, Observables), sistema de notificaciones toast, gestión de estados de carga y separación clara de responsabilidades.

3. **Formularios reactivos avanzados**: Implementación de formularios con FormBuilder, validadores síncronos y asíncronos personalizados, FormArray para campos dinámicos y feedback visual completo.

Cada fase se documenta con ejemplos de código reales, explicaciones técnicas y referencias a los componentes implementados.

---

## Requisitos previos

### Herramientas y versiones

**Entorno de desarrollo:**
- Node.js: v18.x o superior
- npm: v9.x o superior
- Angular CLI: v18.x
- TypeScript: v5.x

**Framework y librerías principales:**
- Angular v18 (Standalone Components)
- RxJS v7.x para programación reactiva
- SCSS para estilos

**Navegadores soportados:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Convenciones del proyecto

**Estructura de componentes:**
- Uso exclusivo de **standalone components** (sin módulos NgModule)
- Nomenclatura: PascalCase sin sufijo Component (ej: `Modal`, `LoginForm`)
- Organización por carpetas: `shared/` para componentes reutilizables, `layout/` para estructura, `pages/` para vistas

**Patrones de código:**
- **Signals** para estado local reactivo (Angular 17+)
- **BehaviorSubject** para estado global compartido
- **Renderer2** para manipulación segura del DOM
- **@HostListener** para eventos globales del documento
- **FormBuilder** para formularios reactivos

**Estilos:**
- Metodología BEM para nomenclatura de clases CSS
- Variables CSS para temas (--color-primary, --bg-body, etc.)
- SCSS con estructura modular (settings, tools, generic, elements, layout)

**Testing:**
- Archivos `.spec.ts` junto a cada componente
- Cobertura de casos críticos (validaciones, eventos, estados)

---

## FASE 1: Manipulación del DOM y gestión de eventos

### Tarea 1: Manipulación del DOM

#### 1.1 Acceder al DOM: @ViewChild y ElementRef

**Componentes implementados:**
- `src/app/components/shared/modal/modal.ts`
- `src/app/components/shared/tabs/tabs.ts`
- `src/app/components/shared/alert/alert.ts`
- `src/app/components/layout/sidebar/sidebar.ts`

**Implementación:**

Se utiliza el decorador `@ViewChild` para obtener referencias a elementos del template HTML. ElementRef proporciona acceso al elemento nativo del DOM.

```typescript
@ViewChild('modalDialog', { static: false }) modalDialog!: ElementRef;
@ViewChild('alertContainer', { static: false }) alertContainer!: ElementRef;
```

El parámetro `{ static: false }` indica que el elemento no está disponible durante la inicialización del componente, por lo que se accede en `ngAfterViewInit()`.

**Uso en componentes:**
- **Modal**: Referencias a `modalDialog` y `modalOverlay` para control de animaciones
- **Tabs**: Referencia a `tabsContainer` para manipular botones de pestañas
- **Alert**: Referencia a `alertContainer` para aplicar clases de animación
- **Sidebar**: Referencia a `sidebarElement` para control de estados

---

#### 1.2 Modificar estilos y propiedades: Renderer2

**Componentes implementados:**
- `src/app/components/shared/modal/modal.ts` - Control de overflow del body
- `src/app/components/shared/tabs/tabs.ts` - Manipulación de clases CSS dinámicas
- `src/app/components/shared/alert/alert.ts` - Aplicación de clases de animación
- `src/app/components/layout/sidebar/sidebar.ts` - Control de scroll del body

**Métodos de Renderer2 utilizados:**

```typescript
// Modificar estilos
this.renderer.setStyle(document.body, 'overflow', 'hidden');
this.renderer.setStyle(element, 'fontSize', '20px');

// Manipular clases CSS
this.renderer.addClass(element, 'clase-activa');
this.renderer.removeClass(element, 'clase-inactiva');

// Modificar propiedades
this.renderer.setProperty(element, 'innerText', 'Nuevo texto');
```

**Ventajas de Renderer2:**
- Compatibilidad con renderizado del lado del servidor (SSR)
- Seguridad contra ataques XSS
- Abstracción de la plataforma (Web, Native, etc.)
- Mejor integración con el ciclo de vida de Angular

**Casos de uso implementados:**

1. **Modal y Sidebar**: Control del overflow del body para prevenir scroll cuando están abiertos
```typescript
this.renderer.setStyle(document.body, 'overflow', 'hidden');
```

2. **Tabs**: Actualización de clases activas en botones de pestañas
```typescript
this.renderer.addClass(btn, 'tab-active');
this.renderer.removeClass(btn, 'tab-active');
```

3. **Alert**: Aplicación de clases de animación de entrada y salida
```typescript
this.renderer.addClass(this.alertContainer.nativeElement, 'alert--fade-in');
this.renderer.addClass(this.alertContainer.nativeElement, 'alert--fade-out');
```

---

#### 1.3 Creación y eliminación dinámica de elementos

Esta funcionalidad se implementa mediante los métodos `createElement`, `appendChild` y `removeChild` de Renderer2.

**Métodos disponibles:**
```typescript
// Crear elemento
const nuevoElemento = this.renderer.createElement('div');

// Añadir al DOM
this.renderer.appendChild(contenedor, nuevoElemento);

// Eliminar del DOM
this.renderer.removeChild(contenedor, elemento);

// Crear listener de eventos
this.renderer.listen(elemento, 'click', (event) => {
  // Manejar evento
});
```

**Aplicación en componentes:**

Aunque no se implementó creación dinámica de elementos en los componentes actuales (ya que usan templates declarativos), la infraestructura con Renderer2 está lista para casos futuros como:
- Generación dinámica de opciones de menú
- Creación de elementos de notificación en runtime
- Adición de elementos de interfaz basados en datos de API

---

#### 1.4 Buenas prácticas y seguridad

**Prácticas implementadas:**

1. **Uso exclusivo de Renderer2**: No se manipula directamente `document.body.style` ni propiedades del DOM
2. **Acceso al DOM en lifecycle hooks apropiados**: `ngAfterViewInit` para ViewChild, `ngOnChanges` para reacciones a cambios
3. **Cleanup de recursos**: Restauración del overflow del body al cerrar modales y sidebars
4. **Tipado estricto**: Uso de `ElementRef` con tipos específicos cuando es necesario
5. **Validación de referencias**: Comprobación de existencia antes de manipular elementos
6. **Listeners seguros**: Uso de `renderer.listen()` en lugar de addEventListener directo

**Seguridad:**
- Prevención de XSS mediante abstracción de Renderer2
- No uso de `innerHTML` directo
- Sanitización implícita de valores en templates de Angular

---

#### 1.5 Criterios de aceptación

**Componentes refactorizados:**
1. Modal: ViewChild + ElementRef + Renderer2 para control de overlay y body scroll
2. Tabs: ViewChild + Renderer2 para actualización dinámica de clases CSS
3. Alert: ViewChild + Renderer2 para animaciones de entrada/salida
4. Sidebar: Renderer2 para control de scroll del body en mobile

**Archivos modificados:**
- `src/app/components/shared/modal/modal.ts` (refactorizado)
- `src/app/components/shared/tabs/tabs.ts` (refactorizado)
- `src/app/components/shared/alert/alert.ts` (refactorizado)
- `src/app/components/layout/sidebar/sidebar.ts` (refactorizado)

**Técnicas aplicadas:**
- ViewChild para acceso a referencias del template
- ElementRef para obtener elementos nativos del DOM
- Renderer2 para manipulación segura (setStyle, addClass, removeClass)
- Lifecycle hooks (ngAfterViewInit, ngOnChanges, ngOnDestroy)
- Event listeners con Renderer2

**Testing:**
Se recomienda verificar:
- Funcionamiento de modales (apertura/cierre con ESC)
- Cambio de pestañas con actualización de estilos
- Animaciones de entrada/salida en alerts
- Comportamiento del sidebar en mobile/desktop

### Tarea 2: Sistema de eventos

#### 2.1 Event binding y $event

**Componentes implementados:**
- `src/app/components/shared/form-input/form-input.ts`
- `src/app/components/shared/login-form/login-form.ts`
- `src/app/components/shared/modal/modal.ts`

**Implementación:**

Event binding usando paréntesis en templates para enlazar eventos del DOM con métodos del componente.

```typescript
// Template
<input (keyup)="onKeyUp($event)" (focus)="onFocus()">

// Componente
onKeyUp(event: KeyboardEvent): void {
  console.log(event.key);
}
```

**Eventos implementados en FormInput:**
- input, focus, blur, keydown, keyup, mouseenter, mouseleave

**Acceso al objeto $event con tipado correcto (KeyboardEvent, MouseEvent).**

---

#### 2.2 Pseudoeventos y filtrado

Implementación custom de detección de teclas específicas en FormInput:

```typescript
onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    this.enterPressed.emit(this.value);
  }
  if (event.key === 'Escape') {
    this.escapePressed.emit();
  }
}
```

Permite emitir eventos personalizados (enterPressed, escapePressed) para uso en componentes padre.

---

#### 2.3 Prevención y propagación de eventos

**preventDefault implementado en LoginForm:**

```typescript
onSubmit(event?: Event): void {
  if (event) {
    event.preventDefault(); // Evita recarga de página
  }
  // Validación y envío
}
```

**stopPropagation implementado en Modal:**

```typescript
onOverlayClick(event: MouseEvent): void {
  if (this.closeOnOverlayClick && event.target === event.currentTarget) {
    event.stopPropagation(); // Detiene propagación
    this.close();
  }
}

onContentClick(event: MouseEvent): void {
  event.stopPropagation(); // Evita que clicks en contenido cierren modal
}
```

---

#### 2.4 Manejo global de eventos: @HostListener

Implementado en Modal para escuchar Escape a nivel de documento:

```typescript
@HostListener('document:keydown.escape')
handleEscapeKey(): void {
  if (this.closeOnEscape && this.isOpen) {
    this.close();
  }
}
```

Permite escuchar eventos globales sin ensuciar el template. Se limpia automáticamente al destruir el componente.

---

#### 2.5 Criterios de aceptación

**Componentes refactorizados:**

1. FormInput - Event binding completo (teclado, mouse, foco)
2. LoginForm - preventDefault, validación en blur, control Enter/Escape
3. Modal - stopPropagation, @HostListener para Escape

**Archivos modificados:**
- `form-input.ts` y `form-input.html`
- `login-form.ts` y `login-form.html`
- `modal.ts`

**Técnicas implementadas:**
- Event binding: (click), (input), (blur), (focus), (keydown), (keyup)
- Tipado de eventos: KeyboardEvent, MouseEvent, Event
- Eventos personalizados: enterPressed, escapePressed
- preventDefault para formularios
- stopPropagation para control de bubbling
- @HostListener para eventos globales
- Estados reactivos: isFocused, isHovered

---

### Tarea 3: Componentes interactivos funcionales

#### 3.1 Menú hamburguesa

**Componente:** `src/app/components/layout/header/header.ts`

**Implementación:**

El menú hamburguesa utiliza un booleano `isMenuOpen` para controlar la visibilidad. Se implementan @HostListener para cerrar al click fuera y al presionar Escape.

```typescript
isMenuOpen = false;

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  if (this.isMenuOpen) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeMenu();
    }
  }
}

@HostListener('document:keydown.escape')
onEscapeKey(): void {
  if (this.isMenuOpen) {
    this.closeMenu();
  }
}

toggleMenu(): void {
  this.isMenuOpen = !this.isMenuOpen;
}
```

**Template:**
```html
<button 
  [class.site-header__nav-toggle-btn--open]="isMenuOpen"
  (click)="toggleMenu()"
  [attr.aria-expanded]="isMenuOpen"
>
  <!-- Líneas hamburguesa -->
</button>

<ul [class.site-header__nav-list--open]="isMenuOpen">
  <li><a (click)="closeMenu()">Enlace</a></li>
</ul>
```

---

#### 3.2 Modales

**Componente:** `src/app/components/shared/modal/modal.ts`

El modal implementa control completo con @HostListener para Escape, stopPropagation para evitar cierre accidental, y Renderer2 para control de scroll del body.

```typescript
@HostListener('document:keydown.escape')
handleEscapeKey(): void {
  if (this.closeOnEscape && this.isOpen) {
    this.close();
  }
}

onOverlayClick(event: MouseEvent): void {
  if (this.closeOnOverlayClick && event.target === event.currentTarget) {
    event.stopPropagation();
    this.close();
  }
}

onContentClick(event: MouseEvent): void {
  event.stopPropagation();
}
```

---

#### 3.3 Tabs

**Componente:** `src/app/components/shared/tabs/tabs.ts`

Las pestañas mantienen un `activeTabId` y usan binding de clases para marcar la pestaña activa.

```typescript
@Input() activeTabId: string = '';
@Output() tabChanged = new EventEmitter<string>();

selectTab(tabId: string, disabled?: boolean): void {
  if (disabled) return;
  this.activeTabId = tabId;
  this.tabChanged.emit(tabId);
  this.updateTabStyles();
}
```

**Template:**
```html
<button
  [class.tabs__button--active]="isActive(tab.id)"
  [attr.data-tab-id]="tab.id"
  (click)="selectTab(tab.id, tab.disabled)"
>
  {{ tab.label }}
</button>
```

---

#### 3.4 Acordeones

El componente Alert implementa animaciones de apertura/cierre mediante clases CSS controladas con Renderer2.

```typescript
onDismiss(): void {
  if (this.alertContainer) {
    this.renderer.addClass(this.alertContainer.nativeElement, 'alert--fade-out');
    setTimeout(() => {
      this.isVisible = false;
      this.dismissed.emit();
    }, 300);
  }
}
```

---

#### 3.5 Alerts y notificaciones

**Componente:** `src/app/components/shared/alert/alert.ts`

Implementa animaciones de entrada y salida usando ViewChild y Renderer2.

```typescript
@ViewChild('alertContainer', { static: false }) alertContainer!: ElementRef;

ngAfterViewInit(): void {
  if (this.alertContainer) {
    this.renderer.addClass(this.alertContainer.nativeElement, 'alert--fade-in');
  }
}
```

---

#### 3.6 Tooltips

**Componente:** `src/app/components/shared/tooltip/tooltip.ts`

Componente tooltip con eventos mouseenter/mouseleave y delay configurable.

```typescript
@Input() text: string = '';
@Input() position: TooltipPosition = 'top';
@Input() delay: number = 200;

showTooltip: boolean = false;

@HostListener('mouseenter')
@HostListener('focusin')
onShow(): void {
  this.timeoutId = setTimeout(() => {
    this.showTooltip = true;
  }, this.delay);
}

@HostListener('mouseleave')
@HostListener('focusout')
onHide(): void {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
  }
  this.showTooltip = false;
}
```

**Uso:**
```html
<app-tooltip text="Información adicional" position="top">
  <button>Hover para ver tooltip</button>
</app-tooltip>
```

---

### Tarea 4: Theme Switcher funcional

#### 4.1 Detectar prefers-color-scheme

**Servicio:** `src/app/services/theme.service.ts`

Detección de preferencia del sistema:

```typescript
private getSystemPreference(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return 'light';
}
```

**CSS Variables:** `src/styles/00-settings/_css-variables.scss`

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--color-primary-darker);
    --text-primary: var(--color-neutral-white);
  }
}
```

---

#### 4.2 Toggle tema y persistencia

**ThemeService implementa:**

1. Toggle entre light/dark:
```typescript
toggleTheme(): void {
  const newTheme: Theme = this.currentTheme === 'light' ? 'dark' : 'light';
  this.setTheme(newTheme);
}
```

2. Persistencia en localStorage:
```typescript
private saveTheme(theme: Theme): void {
  localStorage.setItem(this.STORAGE_KEY, theme);
}
```

3. Aplicación de clases al documento:
```typescript
private applyTheme(theme: Theme): void {
  if (theme === 'dark') {
    this.renderer.addClass(body, 'dark-theme');
    this.renderer.removeClass(body, 'light-theme');
  } else {
    this.renderer.addClass(body, 'light-theme');
    this.renderer.removeClass(body, 'dark-theme');
  }
}
```

---

#### 4.3 Aplicación del tema al inicio

Al inicializar el servicio, se aplica la siguiente lógica:

```typescript
private initializeTheme(): void {
  const savedTheme = this.getSavedTheme();
  
  if (savedTheme) {
    this.currentTheme = savedTheme;
  } else {
    this.currentTheme = this.getSystemPreference();
  }
  
  this.applyTheme(this.currentTheme);
}
```

Prioridad: localStorage > prefers-color-scheme > light (defecto)

---

### Tarea 5: Documentación técnica sobre arquitectura de eventos

#### 5.1 Patrón unidireccional de eventos

La arquitectura de eventos sigue el patrón unidireccional:

```
Usuario → DOM Event → Template Binding → Component Handler → Service/State → View Re-render
```

Los eventos se capturan con `(eventName)="handler($event)"` donde `$event` proporciona el objeto nativo del evento.

**Tipos de event binding implementados:**
- Click: `(click)="onClick($event)"`
- Teclado: `(keydown)="onKeyDown($event)"`, `(keyup.enter)="onEnter()"`
- Mouse: `(mouseenter)="onEnter()"`, `(mouseleave)="onLeave()"`
- Focus: `(focus)="onFocus()"`, `(blur)="onBlur()"`
- Form: `(submit)="onSubmit($event)"`, `(input)="onInput($event)"`

---

#### 5.2 Servicios y centralización de eventos

Para flujos complejos, se centralizan eventos en servicios inyectables:

**ThemeService** - Gestiona el estado del tema:
```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme: Theme = 'light';
  
  toggleTheme(): void { ... }
  getTheme(): Theme { ... }
}
```

**Patrón de comunicación:**
- Componentes emiten eventos con `@Output`
- Servicios gestionan estado compartido
- Uso de Renderer2 para manipulación segura del DOM

---

#### 5.3 Diagrama de flujo de eventos

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO DE EVENTOS                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Usuario                                                    │
│    │                                                        │
│    ▼                                                        │
│  DOM Event (click, keydown, mouseenter...)                 │
│    │                                                        │
│    ▼                                                        │
│  Template Binding: (event)="handler($event)"               │
│    │                                                        │
│    ▼                                                        │
│  Component Handler                                          │
│    │                                                        │
│    ├──► preventDefault() - Bloquea comportamiento default  │
│    ├──► stopPropagation() - Detiene bubbling               │
│    │                                                        │
│    ▼                                                        │
│  Service/State Update                                       │
│    │                                                        │
│    ▼                                                        │
│  View Re-render (Zone.js / OnPush)                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

@HostListener para eventos globales:
┌─────────────────────────────────────────────────────────────┐
│  document:click        → Cerrar menú al click fuera        │
│  document:keydown.escape → Cerrar modal/menú con ESC       │
│  window:resize         → Responsive behavior               │
└─────────────────────────────────────────────────────────────┘
```

---

#### 5.4 Tabla de compatibilidad de eventos

**Eventos DOM implementados:**

| Evento | Chrome 90+ | Firefox 88+ | Safari 14+ | Edge 90+ | Uso en proyecto |
|--------|------------|-------------|------------|----------|-----------------|
| click | ✅ | ✅ | ✅ | ✅ | Botones, enlaces, overlay |
| keydown | ✅ | ✅ | ✅ | ✅ | Formularios, modal (ESC) |
| keyup | ✅ | ✅ | ✅ | ✅ | Input fields, detección Enter |
| keyup.enter | ✅ | ✅ | ✅ | ✅ | Submit formularios |
| mouseenter | ✅ | ✅ | ✅ | ✅ | Tooltip, hover states |
| mouseleave | ✅ | ✅ | ✅ | ✅ | Tooltip, hover states |
| focus | ✅ | ✅ | ✅ | ✅ | Form inputs, accesibilidad |
| blur | ✅ | ✅ | ✅ | ✅ | Validación async on blur |
| submit | ✅ | ✅ | ✅ | ✅ | Formularios con preventDefault |
| input | ✅ | ✅ | ✅ | ✅ | Validación en tiempo real |
| change | ✅ | ✅ | ✅ | ✅ | Checkboxes, selects, theme |

**APIs del DOM y características:**

| API/Característica | Compatibilidad | Uso en proyecto |
|-------------------|----------------|-----------------|
| ViewChild/ElementRef | ✅ Todos | Acceso a elementos del template |
| Renderer2 | ✅ Todos + SSR | Manipulación segura del DOM |
| @HostListener | ✅ Todos | Eventos document y window |
| matchMedia | ✅ Todos | Detección prefers-color-scheme |
| localStorage | ✅ Todos | Persistencia de preferencias |
| CSS Variables | ✅ Todos | Theme switcher dinámico |

**Notas:**
- Se usa `Event.key` (estándar moderno) en lugar de `Event.keyCode` (deprecated)
- Renderer2 garantiza compatibilidad cross-platform incluyendo SSR
- `localStorage` se valida con `typeof window !== 'undefined'` para SSR

---

### Entregables Fase 1

#### Tarea 1: Manipulación del DOM

**Componentes refactorizados:**

1. **Modal** (`src/app/components/shared/modal/modal.ts`)
  - Implementación de ViewChild y ElementRef para referencias del DOM
  - Uso de Renderer2 para control del overflow del body
  - Manejo seguro de elementos con @HostListener

2. **Tabs** (`src/app/components/shared/tabs/tabs.ts`)
  - ViewChild para referencia al contenedor de tabs
  - Renderer2 para manipulación dinámica de clases CSS
  - Método updateTabStyles() para actualización de estados activos

3. **Alert** (`src/app/components/shared/alert/alert.ts`)
  - ViewChild y ElementRef para control de animaciones
  - Renderer2 para aplicar clases de entrada y salida
  - Gestión de timeouts para animaciones fluidas

4. **Sidebar** (`src/app/components/layout/sidebar/sidebar.ts`)
  - Renderer2 para control de scroll del body en mobile
  - ngOnChanges para reaccionar a cambios de estado
  - Prevención de scroll cuando el menú está abierto

**Técnicas implementadas:**
- ViewChild: Acceso a referencias del template con { static: false }
- ElementRef: Obtención de elementos nativos del DOM
- Renderer2: Manipulación segura con setStyle, addClass, removeClass
- Lifecycle hooks: ngAfterViewInit, ngOnChanges para gestión del DOM
- Event listeners: @HostListener para eventos globales

---

#### Tarea 2: Sistema de eventos

**Componentes refactorizados:**

1. **FormInput** (`src/app/components/shared/form-input/form-input.ts`)
  - Event binding completo: keydown, keyup, focus, blur, mouseenter, mouseleave
  - Eventos personalizados: enterPressed, escapePressed
  - Estados visuales: isFocused, isHovered
  - Tipado correcto de eventos: KeyboardEvent, MouseEvent

2. **LoginForm** (`src/app/components/shared/login-form/login-form.ts`)
  - preventDefault en submit para evitar recarga de página
  - Validación automática en blur
  - Control de Enter para enviar formulario
  - Control de Escape para limpiar errores
  - stopPropagation en botón cancelar

3. **Modal** (`src/app/components/shared/modal/modal.ts`)
  - stopPropagation en clicks del overlay
  - Método onContentClick para evitar cierre involuntario
  - @HostListener para Escape a nivel de documento
  - onOverlayDoubleClick para control adicional

**Técnicas implementadas:**
- Event binding: (click), (input), (blur), (focus), (keydown), (keyup), (mouseenter), (mouseleave)
- Acceso a $event con tipado: KeyboardEvent, MouseEvent, Event
- Eventos personalizados con @Output: enterPressed, escapePressed
- preventDefault: Evitar comportamiento por defecto en formularios
- stopPropagation: Controlar bubbling de eventos
- @HostListener: Escuchar eventos globales a nivel de documento

---

#### Pendiente en FASE 1:
- Tarea 3: Componentes interactivos adicionales (COMPLETADA)
- Tarea 4: Theme Switcher funcional (COMPLETADA)
- Tarea 5: Documentación de arquitectura (COMPLETADA)

---

#### Tarea 3: Componentes interactivos

**Componentes implementados:**

1. **Header/Menú hamburguesa** (`header.ts`)
  - @HostListener document:click para cerrar al click fuera
  - @HostListener document:keydown.escape para cerrar con ESC
  - Control de visibilidad con isMenuOpen
  - Cierre al navegar a otra página

2. **Modal** (`modal.ts`)
  - Cierre con ESC vía @HostListener
  - stopPropagation en overlay y contenido
  - Control de scroll del body

3. **Tabs** (`tabs.ts`)
  - activeTabId para controlar pestaña activa
  - Binding de clases [class.tabs__button--active]
  - Actualización dinámica con Renderer2

4. **Alert** (`alert.ts`)
  - Animaciones de entrada/salida con Renderer2
  - ViewChild para control del contenedor

5. **Tooltip** (NUEVO - `tooltip.ts`)
  - mouseenter/mouseleave para mostrar/ocultar
  - focusin/focusout para accesibilidad
  - Delay configurable
  - Posiciones: top, bottom, left, right

---

#### Tarea 4: Theme Switcher

**Servicio creado:** `src/app/services/theme.service.ts`

**Funcionalidades:**
- Detección de prefers-color-scheme del sistema
- Persistencia en localStorage
- Toggle entre light/dark
- Aplicación de clases al documento con Renderer2

**Integración en Header:**
- Checkbox conectado con isDarkTheme() y onThemeChange()
- Cambio de tema en tiempo real

**CSS Variables:**
- Clases .light-theme y .dark-theme definidas
- Variables CSS que cambian según el tema

---

#### Tarea 5: Documentación

**Secciones documentadas:**
- Patrón unidireccional de eventos
- Centralización en servicios
- Diagrama de flujo de eventos
- Tabla de compatibilidad de navegadores

## FASE 2: Componentes interactivos y comunicación

### Tarea 1: Servicios de comunicación

#### 1.1 Crear servicio para comunicación entre componentes hermanos

**Servicio:** `src/app/services/communication.service.ts`

Servicio singleton con BehaviorSubject para comunicación entre componentes no relacionados.

```typescript
@Injectable({ providedIn: 'root' })
export class CommunicationService {
  private notificationSubject = new BehaviorSubject<string>('');
  public notifications$ = this.notificationSubject.asObservable();

  sendNotification(message: string): void {
    this.notificationSubject.next(message);
  }
}
```

---

#### 1.2 Patrón Observable/Subject para notificaciones

**Tipos de Subject implementados:**

| Tipo | Uso | Archivo |
|------|-----|---------|
| BehaviorSubject | Estado persistente con valor inicial | communication.service.ts |
| Subject | Eventos one-time sin retención | communication.service.ts |

**Uso en componentes:**

```typescript
// Emisor
this.commService.sendNotification('Mensaje enviado');

// Receptor
this.commService.notifications$.subscribe(msg => {
  console.log('Recibido:', msg);
});
```

---

#### 1.3 Servicio de estado global para datos compartidos

```typescript
private globalStateSubject = new BehaviorSubject<Record<string, any>>({});
public globalState$ = this.globalStateSubject.asObservable();

updateGlobalState(key: string, value: any): void {
  const currentState = this.globalStateSubject.getValue();
  this.globalStateSubject.next({ ...currentState, [key]: value });
}
```

---

### Tarea 2: Separación de responsabilidades

#### 2.1 Extraer lógica de negocio a servicios

Los servicios encapsulan lógica de negocio, validaciones y llamadas HTTP:

- `ThemeService` - Gestión de temas
- `ToastService` - Sistema de notificaciones
- `LoadingService` - Estados de carga
- `CommunicationService` - Comunicación entre componentes

---

#### 2.2 Componentes gestionan solo presentación

Ejemplo de componente limpio (LoginForm):

```typescript
constructor(
  private toastService: ToastService,
  private loadingService: LoadingService
) {}

onSubmit(): void {
  this.loadingService.show();
  // Delega lógica al servicio
  this.toastService.success('Operación exitosa');
  this.loadingService.hide();
}
```

---

#### 2.3 Servicios gestionan datos y lógica

Servicios manejan estado global con BehaviorSubject, validaciones y orquestación.

---

### Tarea 3: Sistema de notificaciones / toasts

#### 3.1 Servicio centralizado de notificaciones

**Servicio:** `src/app/services/toast.service.ts`

```typescript
export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  show(message: string, type: ToastType, duration = 5000): void { ... }
  success(message: string, duration = 4000): void { ... }
  error(message: string, duration = 8000): void { ... }
  info(message: string, duration = 3000): void { ... }
  warning(message: string, duration = 6000): void { ... }
  dismiss(id: number): void { ... }
}
```

---

#### 3.2 Componente toast que se subscribe al servicio

**Componente:** `src/app/components/shared/toast/toast.ts`

```typescript
@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast implements OnInit, OnDestroy {
  toasts = signal<ToastMessage[]>([]);

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts.set(toasts);
    });
  }

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
```

---

#### 3.3 Diferentes tipos (success, error, info, warning)

Estilos CSS por tipo:

```scss
.toast--success { background-color: #4caf50; }
.toast--error { background-color: #f44336; }
.toast--warning { background-color: #ff9800; }
.toast--info { background-color: #2196f3; }
```

---

#### 3.4 Auto-dismiss configurable

Cada toast tiene duración configurable. Si duration > 0, se elimina automáticamente:

```typescript
if (duration > 0) {
  setTimeout(() => this.dismiss(toast.id), duration);
}
```

Uso:

```typescript
this.toast.success('Guardado', 2000);  // 2 segundos
this.toast.error('Error crítico', 0);   // Sin auto-dismiss
```

---

### Tarea 4: Gestión de loading states

#### 4.1 Servicio para gestionar estados de carga global

**Servicio:** `src/app/services/loading.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();
  private requestCount = 0;

  show(): void {
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSubject.next(false);
    }
  }
}
```

---

#### 4.2 Spinner global durante operaciones async

**Componente:** `src/app/components/shared/spinner/spinner.ts`

```typescript
@Component({
  selector: 'app-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Spinner implements OnInit, OnDestroy {
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.subscription = this.loadingService.isLoading$.subscribe(loading => {
      this.isLoading.set(loading);
    });
  }
}
```

Incluido en app.html: `<app-spinner></app-spinner>`

---

#### 4.3 Loading local en botones y componentes específicos

Ejemplo en LoginForm:

```typescript
onSubmit(): void {
  this.loadingService.show();
  
  setTimeout(() => {
    this.loadingService.hide();
    this.toastService.success('Inicio de sesión exitoso');
  }, 1500);
}
```

---

#### 4.4 HttpInterceptor opcional

Patrón para implementación futura:

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  this.loadingService.show();
  return next.handle(req).pipe(
    finalize(() => this.loadingService.hide())
  );
}
```

---

### Tarea 5: Documentación

#### 5.1 Diagrama de arquitectura de servicios

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA DE SERVICIOS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │ Components  │───►│  Services   │───►│   State     │         │
│  │ (UI Layer)  │    │ (Business)  │    │ (RxJS)      │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                  │                  │                 │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                    SERVICIOS                         │       │
│  ├─────────────┬─────────────┬─────────────┬──────────┤       │
│  │ ThemeService│ ToastService│LoadingService│CommService│     │
│  │ (Theme)     │ (Notif.)   │ (Spinner)   │ (Events) │       │
│  └─────────────┴─────────────┴─────────────┴──────────┘       │
│                                                                 │
│  Patrón: BehaviorSubject → Observable → subscribe()            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 5.2 Patrones de comunicación implementados

| Patrón | Servicio | Uso |
|--------|----------|-----|
| BehaviorSubject | ToastService | Estado con valor inicial |
| Subject | CommunicationService | Eventos one-time |
| Signal | Toast, Spinner | Estado local reactivo |
| Singleton | Todos | providedIn: 'root' |

---

#### 5.3 Buenas prácticas de separación de responsabilidades

**Componentes "Dumb":**
- Solo templates y signals locales
- Delegan lógica a servicios
- Sin HTTP ni validaciones complejas

**Servicios "Smart":**
- Lógica de negocio
- Estado global con BehaviorSubject
- Orquestación de operaciones

**Estructura de carpetas:**
```
src/app/
├── services/
│   ├── theme.service.ts
│   ├── toast.service.ts
│   ├── loading.service.ts
│   └── communication.service.ts
├── components/
│   └── shared/
│       ├── toast/
│       └── spinner/
```

---

### Entregables Fase 2

**Servicios creados:**
1. `communication.service.ts` - Comunicación entre componentes
2. `toast.service.ts` - Sistema de notificaciones
3. `loading.service.ts` - Estados de carga global

**Componentes creados:**
1. `toast/` - Componente overlay de notificaciones
2. `spinner/` - Componente de carga global

**Componentes actualizados:**
1. `login-form.ts` - Usa ToastService y LoadingService
2. `app.ts` - Incluye Toast y Spinner
3. `app.html` - Añade componentes globales

**Técnicas implementadas:**
- BehaviorSubject para estado reactivo
- Subject para eventos one-time
- Signals para estado local (Angular 17+)
- ChangeDetectionStrategy.OnPush
- Subscription management con OnDestroy
- Inyección de dependencias con providedIn: 'root'

---

## FASE 3: Formularios reactivos avanzados

### Tarea 1: Formularios reactivos básicos

#### 1.1 Implementar FormBuilder en todos los formularios

**Archivos modificados:**
- `src/app/components/shared/login-form/login-form.ts`
- `src/app/components/shared/register-form/register-form.ts`

**Implementación:**

```typescript
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, ...],
})
export class LoginForm implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }
}
```

---

#### 1.2 FormGroup y FormControl para cada campo

Acceso a controles mediante getters:

```typescript
get email() { return this.loginForm.get('email'); }
get password() { return this.loginForm.get('password'); }
```

Template con bindings reactivos:

```html
<form [formGroup]="loginForm" (submit)="onSubmit($event)">
  <input formControlName="email" [class.error]="email?.invalid && email?.touched">
  <button [disabled]="loginForm.invalid">Enviar</button>
</form>
```

---

#### 1.3 Validadores síncronos integrados

| Validador | Uso | Error |
|-----------|-----|-------|
| required | `Validators.required` | `{required: true}` |
| email | `Validators.email` | `{email: true}` |
| minLength | `Validators.minLength(8)` | `{minlength: {requiredLength: 8}}` |
| pattern | `Validators.pattern(/regex/)` | `{pattern: {...}}` |

---

### Tarea 2: Validadores personalizados

#### 2.1 Validador de contraseña fuerte

**Archivo:** `src/app/validators/custom.validators.ts`

```typescript
export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const errors: ValidationErrors = {};
    if (!/[A-Z]/.test(value)) errors['noUppercase'] = true;
    if (!/[a-z]/.test(value)) errors['noLowercase'] = true;
    if (!/\d/.test(value)) errors['noNumber'] = true;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors['noSpecial'] = true;
    if (value.length < 8) errors['minLength'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}
```

---

#### 2.2 Validador de confirmación de contraseña

Cross-field validation a nivel de FormGroup:

```typescript
export function passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchControl = group.get(matchControlName);

    if (!control || !matchControl) return null;
    return control.value === matchControl.value ? null : { mismatch: true };
  };
}
```

Uso:
```typescript
this.fb.group({
  password: ['', [Validators.required, passwordStrength()]],
  confirmPassword: ['', [Validators.required]]
}, {
  validators: [passwordMatch('password', 'confirmPassword')]
});
```

---

#### 2.3 Validador de formato personalizado (NIF, teléfono, código postal)

```typescript
// NIF español con validación de letra
export function nif(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toUpperCase();
    if (!value) return null;

    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    if (!nifRegex.test(value)) return { invalidNif: true };

    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = parseInt(value.substring(0, 8), 10);
    return value[8] === letters[number % 23] ? null : { invalidNif: true };
  };
}

// Teléfono móvil español
export function telefono(): ValidatorFn {
  return (control): ValidationErrors | null => {
    return /^[67]\d{8}$/.test(control.value) ? null : { invalidTelefono: true };
  };
}

// Código postal
export function codigoPostal(): ValidatorFn {
  return (control): ValidationErrors | null => {
    return /^\d{5}$/.test(control.value) ? null : { invalidCP: true };
  };
}
```

---

#### 2.4 Validadores a nivel de formulario (cross-field validation)

```typescript
export function atLeastOneRequired(...fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const hasOne = fields.some(field => !!group.get(field)?.value?.trim());
    return hasOne ? null : { atLeastOneRequired: { fields } };
  };
}
```

---

### Tarea 3: Validadores asíncronos

#### 3.1 Validador de Email Único (Simular API)

**Archivo:** `src/app/services/validation.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ValidationService {
  private usedEmails = ['admin@ejemplo.com', 'user@test.com'];

  emailUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return timer(500).pipe(
        switchMap(() => this.checkEmailAvailable(control.value)),
        map(isAvailable => isAvailable ? null : { emailTaken: true }),
        catchError(() => of(null))
      );
    };
  }

  private checkEmailAvailable(email: string): Observable<boolean> {
    return of(!this.usedEmails.includes(email.toLowerCase())).pipe(
      switchMap(result => timer(800).pipe(map(() => result)))
    );
  }
}
```

---

#### 3.2 Validador de Username Disponible

```typescript
usernameAvailableValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value || control.value.length < 3) return of(null);

    return timer(300).pipe(
      switchMap(() => this.checkUsernameAvailable(control.value)),
      map(isAvailable => isAvailable ? null : { usernameTaken: true }),
      catchError(() => of(null))
    );
  };
}
```

---

#### 3.3 Debounce para evitar múltiples llamadas

Se implementa usando `timer()` de RxJS antes de ejecutar la validación:

```typescript
return timer(500).pipe(  // 500ms debounce
  switchMap(() => this.checkEmail(control.value)),
  take(1)
);
```

---

#### 3.4 Configuración avanzada (updateOn, pending)

```typescript
email: ['', {
  validators: [Validators.required, Validators.email],
  asyncValidators: [this.validationService.emailUniqueValidator()],
  updateOn: 'blur'  // Solo valida al salir del campo
}]
```

Template con estados:
```html
@if (email?.pending) {
  <span class="hint">Verificando disponibilidad...</span>
}
@if (email?.errors?.['emailTaken'] && !email?.pending) {
  <span class="error">Este email ya está registrado</span>
}
```

---

### Tarea 4: FormArray para contenido dinámico

**Componente:** `src/app/components/shared/contact-form/contact-form.ts`

FormArray permite gestionar colecciones dinámicas de controles, ideal para listas de teléfonos, direcciones o items de factura.

#### 4.1 Definición del formulario con FormArray

```typescript
ngOnInit(): void {
  this.contactForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefonos: this.fb.array([]),  // FormArray para teléfonos
    direcciones: this.fb.array([]), // FormArray para direcciones
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  this.addTelefono();
  this.addDireccion();
}
```

#### 4.2 Acceso al FormArray con getters

```typescript
get telefonos(): FormArray {
  return this.contactForm.get('telefonos') as FormArray;
}

get direcciones(): FormArray {
  return this.contactForm.get('direcciones') as FormArray;
}
```

#### 4.3 Crear elementos dinámicamente

```typescript
private createTelefonoGroup(): FormGroup {
  return this.fb.group({
    numero: ['', [Validators.required, telefono()]],
    tipo: ['movil', Validators.required]
  });
}

addTelefono(): void {
  this.telefonos.push(this.createTelefonoGroup());
}

removeTelefono(index: number): void {
  if (this.telefonos.length > 1) {
    this.telefonos.removeAt(index);
  }
}
```

#### 4.4 Template con formArrayName

```html
<div formArrayName="telefonos">
  @for (telefonoGroup of telefonos.controls; track $index; let i = $index) {
    <div class="array-item" [formGroupName]="i">
      <input type="tel" formControlName="numero" placeholder="612345678" />
      <select formControlName="tipo">
        <option value="movil">Móvil</option>
        <option value="fijo">Fijo</option>
      </select>
      <button type="button" (click)="removeTelefono(i)" [disabled]="telefonos.length === 1">
        Eliminar
      </button>
    </div>
  }
</div>
<button type="button" (click)="addTelefono()">+ Añadir teléfono</button>
```

#### 4.5 Validación de elementos del array

```typescript
hasArrayControlError(arrayName: string, index: number, controlName: string): boolean {
  const array = this.contactForm.get(arrayName) as FormArray;
  const group = array.at(index) as FormGroup;
  const control = group.get(controlName);
  return !!(control?.invalid && control?.touched);
}

getArrayControlError(arrayName: string, index: number, controlName: string): string {
  const array = this.contactForm.get(arrayName) as FormArray;
  const group = array.at(index) as FormGroup;
  const control = group.get(controlName);
  
  if (!control?.errors || !control.touched) return '';
  if (control.errors['required']) return 'Campo obligatorio';
  if (control.errors['invalidTelefono']) return 'Teléfono inválido';
  if (control.errors['invalidCP']) return 'Código postal inválido';
  return 'Campo inválido';
}
```

---

### Tarea 5: Mostrar errores y feedback visual

#### 5.1 Mostrar errores tras touched/dirty

```html
@if (email?.invalid && email?.touched) {
  <span class="error">{{ getErrorMessage('email') }}</span>
}
```

Helper para mensajes:
```typescript
getErrorMessage(controlName: string): string {
  const control = this.form.get(controlName);
  if (!control?.errors || !control.touched) return '';

  if (control.errors['required']) return 'Este campo es obligatorio';
  if (control.errors['email']) return 'Email inválido';
  if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
  return 'Campo inválido';
}
```

---

#### 5.2 Deshabilitar submit si formulario inválido

```html
<button
  type="submit"
  [disabled]="form.invalid || form.pending || isSubmitting"
>
  {{ form.pending ? 'Validando...' : 'Enviar' }}
</button>
```

---

#### 5.3 Loading durante validación asíncrona

```html
@if (email?.pending) {
  <span class="loading">Verificando disponibilidad...</span>
}
```

---

#### 5.4 Feedback visual de validación (clases CSS)

```html
<input
  formControlName="email"
  [class.input--error]="email?.invalid && email?.touched"
  [class.input--valid]="email?.valid && email?.touched"
  [class.input--pending]="email?.pending"
/>
```

CSS:
```scss
.input--error { border-color: #f44336; }
.input--valid { border-color: #4caf50; }
.input--pending { border-style: dashed; }
```

---

### Tarea 6: Documentación

#### 6.1 Catálogo de validadores implementados

| Nombre | Tipo | Nivel | Descripción |
|--------|------|-------|-------------|
| Validators.required | Síncrono | Campo | Campo obligatorio |
| Validators.email | Síncrono | Campo | Formato email |
| Validators.minLength(n) | Síncrono | Campo | Longitud mínima |
| passwordStrength() | Personalizado | Campo | Mayús, minús, número, especial, 8+ chars |
| telefono() | Personalizado | Campo | Móvil español (6/7 + 8 dígitos) |
| nif() | Personalizado | Campo | NIF español con letra |
| codigoPostal() | Personalizado | Campo | 5 dígitos |
| passwordMatch() | Cross-field | FormGroup | Confirmar contraseña |
| atLeastOneRequired() | Cross-field | FormGroup | Al menos un campo |
| emailUniqueValidator() | Asíncrono | Campo | Email no registrado (simula API) |
| usernameAvailableValidator() | Asíncrono | Campo | Username disponible (simula API) |

---

#### 6.2 Guía de uso de FormArray

**Componente de ejemplo:** `contact-form.ts`

El formulario de contacto implementa dos FormArrays:

1. **Teléfonos**: Lista dinámica con número y tipo (móvil, fijo, trabajo)
2. **Direcciones**: Lista dinámica con calle, ciudad, código postal y tipo

**Pasos para implementar FormArray:**

1. Definir FormArray en el FormGroup principal
2. Crear getter para acceso simplificado
3. Implementar método para crear FormGroup de cada elemento
4. Métodos para añadir y eliminar elementos
5. Template con `formArrayName` y `[formGroupName]="index"`

---

#### 6.3 Ejemplos de validación asíncrona

Ver sección 3.1 y 3.2 para ejemplos completos de validadores asíncronos con debounce y feedback visual.

---

### Entregables Fase 3

**Archivos creados:**
- `src/app/validators/custom.validators.ts` - Validadores personalizados
- `src/app/services/validation.service.ts` - Servicio de validación asíncrona
- `src/app/components/shared/contact-form/contact-form.ts` - Formulario con FormArray
- `src/app/components/shared/contact-form/contact-form.html` - Template con campos dinámicos
- `src/app/components/shared/contact-form/contact-form.scss` - Estilos del formulario

**Archivos modificados:**
- `src/app/components/shared/login-form/login-form.ts` - Formulario reactivo
- `src/app/components/shared/login-form/login-form.html` - Template reactivo
- `src/app/components/shared/register-form/register-form.ts` - Formulario reactivo completo
- `src/app/components/shared/register-form/register-form.html` - Template con feedback visual
- `src/app/pages/style-guide-page/style-guide-page.ts` - Incluye ContactForm
- `src/app/pages/style-guide-page/style-guide-page.html` - Sección FormArray

**Formularios reactivos implementados:**
1. LoginForm - Formulario de inicio de sesión
2. RegisterForm - Formulario de registro con validación asíncrona
3. ContactForm - Formulario de contacto con FormArray

**Técnicas implementadas:**
- FormBuilder y FormGroup
- FormArray para campos dinámicos (teléfonos, direcciones)
- Validadores síncronos (required, email, minLength)
- Validadores personalizados (passwordStrength, telefono, nif, codigoPostal)
- Cross-field validation (passwordMatch, atLeastOneRequired)
- Validadores asíncronos con debounce (emailUniqueValidator)
- Feedback visual con clases CSS
- Estados pending para validación asíncrona
- Helpers para mensajes de error
- Creación y eliminación dinámica de elementos en FormArray

---

## Notas de implementación y buenas prácticas

### Accesibilidad

**Principios aplicados:**

1. **Navegación por teclado**: Todos los componentes interactivos son accesibles con Tab, Enter y Escape
2. **ARIA attributes**: Uso de `aria-label`, `aria-expanded`, `aria-modal` en componentes complejos
3. **Focus management**: Control de foco en modales y menús desplegables
4. **Roles semánticos**: Uso correcto de `<button>`, `<nav>`, `<main>`, `<form>`

**Ejemplos implementados:**

```html
<!-- Modal con ARIA -->
<div role="dialog" aria-modal="true" [attr.aria-labelledby]="title">

<!-- Botón hamburguesa con estado -->
<button [attr.aria-expanded]="isMenuOpen" aria-label="Menú de navegación">

<!-- Tooltips con descripción -->
<app-tooltip text="Información adicional" position="top">
  <button aria-describedby="tooltip-1">Info</button>
</app-tooltip>
```

---

### Performance

**Estrategias implementadas:**

1. **OnPush Change Detection**: Usado en componentes Toast y Spinner para reducir ciclos de detección
2. **Lazy loading**: Componentes cargados bajo demanda (preparado para rutas)
3. **Signals**: Estado reactivo eficiente sin Zone.js overhead
4. **TrackBy en *ngFor**: Optimización de renderizado de listas dinámicas (FormArray)
5. **Debounce en validadores asíncronos**: Reducción de llamadas API simuladas

**Métricas objetivo:**
- First Contentful Paint (FCP): < 1.8s
- Time to Interactive (TTI): < 3.9s
- Bundle size: ~550KB (sin comprimir), ~120KB (gzip)

---

### Testing

**Cobertura de tests:**

- Componentes críticos tienen archivos `.spec.ts`
- Tests unitarios para validadores personalizados
- Tests de integración para formularios reactivos
- Verificación de eventos y estados

**Ejemplo de test para validador:**

```typescript
describe('passwordStrength', () => {
  it('debe validar contraseña fuerte', () => {
    const validator = passwordStrength();
    const control = new FormControl('Abc123!@#');
    expect(validator(control)).toBeNull();
  });

  it('debe fallar si no hay mayúsculas', () => {
    const validator = passwordStrength();
    const control = new FormControl('abc123!@#');
    expect(validator(control)).toEqual({ noUppercase: true });
  });
});
```

---

## Recursos y referencias

### Documentación oficial

1. **Angular Documentation**: https://angular.dev/
  - Guía de formularios reactivos
  - Sistema de eventos y event binding
  - Standalone components y Signals

2. **RxJS Documentation**: https://rxjs.dev/
  - BehaviorSubject y Observables
  - Operadores (map, switchMap, debounce, finalize)

3. **MDN Web Docs**: https://developer.mozilla.org/
  - DOM API y manipulación del DOM
  - Eventos del navegador (KeyboardEvent, MouseEvent)
  - CSS Variables y custom properties

## Apéndices

### Plantillas y ejemplos

**Template de componente standalone:**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.html',
  styleUrl: './example.scss'
})
export class Example {
  // Implementación
}
```

**Template de servicio singleton:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  updateData(data: any): void {
    this.dataSubject.next(data);
  }
}
```
