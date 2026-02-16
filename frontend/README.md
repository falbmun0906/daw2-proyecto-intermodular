# Proyecto 4 - Accesibilidad y Multimedia

## Descripción

Desp[i]ensa es una aplicación web de gestión de cocina que permite a los usuarios explorar recetas, gestionar su despensa y planificar comidas. Este proyecto ha sido desarrollado con un enfoque especial en accesibilidad, cumpliendo con las pautas WCAG 2.1 nivel AA para garantizar una experiencia inclusiva para todos los usuarios.

## Componente multimedia añadido

**Tipo:** Reproductor de vídeo HTML5 con subtítulos y transcripción

**Descripción:** Tutorial de cocina "Gazpacho rápido" con controles nativos accesibles, subtítulos en 4 idiomas (ES, EN, FR, DE) en formato WebVTT y transcripción completa en texto plano.

## Resultados de auditoría de accesibilidad

| Herramienta | Puntuación inicial | Puntuación final | Mejora |
|-------------|-------------------|------------------|--------|
| Lighthouse | 98/100 | 100/100 | +2 puntos |
| WAVE | 96 errores, 25 alertas | 0 errores, 6 alertas | -96 errores, -19 alertas |
| TAW | 9 problemas | 0 problemas | -9 problemas |

**Nivel de conformidad alcanzado:** WCAG 2.1 AA (100% - 70/70 criterios cumplidos)

## Documentación completa

**[Ver análisis completo de accesibilidad](./docs/accesibilidad/README.md)**

El documento incluye:
- Fundamentos de accesibilidad y principios WCAG 2.1
- Auditoría automatizada inicial con capturas
- Análisis detallado de 96+ errores corregidos
- Correcciones paso a paso con código ANTES/DESPUÉS
- Advertencias verificadas manualmente
- Estructura semántica y landmarks HTML5
- Verificación manual exhaustiva (teclado + NVDA + cross-browser)
- Checklist completo WCAG 2.1 nivel AA
- Conclusiones y reflexión personal

## Verificación realizada

- Auditoría con Lighthouse, WAVE y TAW
- Test con lector de pantalla (NVDA 2024.1)
- Test de navegación por teclado completo
- Verificación cross-browser (Chrome 131, Firefox 133, Edge 131)

## Principales correcciones aplicadas

### 1. Contraste de color (95 errores → 0 errores)
- Cambio de texto secundario de `#AEB9C7` (2.8:1) a `#5C6670` (5.0:1)
- Eliminación de opacidades que reducían contraste
- Ajustes en múltiples componentes (botones, calendarios, tarjetas)

### 2. Focus visible en elementos interactivos
- Implementación de `outline: 3px solid var(--color-secondary)`
- Theme switch accesible con Enter y Espacio
- Navegación completa por teclado en todos los componentes

### 3. Jerarquía de encabezados sin saltos
- Corrección de H4 → H3 en componentes de tarjetas
- H1 con clase `sr-only` en páginas de aplicación
- Estructura lógica H1 → H2 → H3 en todas las páginas

### 4. Imágenes decorativas correctamente marcadas
- Eliminación de 20+ textos alternativos redundantes
- Implementación de `alt=""` + `aria-hidden="true"`
- Textos alternativos descriptivos solo en imágenes informativas

### 5. Etiquetado de formularios
- Labels asociados correctamente con `for`/`id`
- Uso de clase `sr-only` para labels visualmente ocultos
- `aria-label` en controles de búsqueda

## Tecnologías utilizadas

- **Frontend:** Angular 20.3.9
- **HTML5 semántico:** header, nav, main, footer, article, section
- **CSS3:** Variables CSS, Grid, Flexbox, media queries de accesibilidad
- **TypeScript:** Lógica de componentes y servicios
- **ARIA:** Labels, roles y estados para mejorar accesibilidad
- **WebVTT:** Subtítulos accesibles para vídeo en 4 idiomas
- **Responsive Design:** Mobile-first con breakpoints 640px, 768px, 1024px, 1280px

## Herramientas de desarrollo

- Angular CLI 20.3.0
- Node.js 22.11.0
- npm 10.9.0
- NVDA 2024.1 (lector de pantalla)
- Chrome DevTools Lighthouse
- WAVE Browser Extension
- TAW (Test de Accesibilidad Web)

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/usuario/daw2-proyecto-intermodular.git
cd daw2-proyecto-intermodular/frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Abrir en navegador
# http://localhost:4200
```

## Estructura del proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── header/        # Navegación principal
│   │   │   │   └── footer/        # Pie de página
│   │   │   └── shared/            # Componentes reutilizables
│   │   ├── pages/
│   │   │   ├── home-page/         # Página principal con vídeo
│   │   │   ├── recipes-page/      # Catálogo de recetas
│   │   │   ├── dashboard/         # Panel de usuario
│   │   │   └── planner-page/      # Planificador de comidas
│   │   └── services/              # Servicios de datos
│   ├── assets/
│   │   ├── videos/                # Vídeo tutorial
│   │   ├── subtitles/             # Subtítulos WebVTT (ES, EN, FR, DE)
│   │   └── icons/                 # Iconografía SVG
│   └── styles/                    # Estilos globales y variables CSS
├── docs/
│   └── accesibilidad/
│       ├── README.md              # Documentación completa de accesibilidad
│       └── capturas/
│           ├── lighthouse-antes.png
│           ├── lighthouse-despues.png
│           ├── wave-antes.png
│           ├── wave-despues.png
│           ├── taw-antes.png
│           ├── taw-despues.png
│           ├── chrome.png
│           ├── firefox.png
│           └── edge.png
└── README.md                      # Este archivo
```

## Características de accesibilidad implementadas

### Navegación por teclado
- Tab: Navega entre todos los elementos interactivos
- Enter/Espacio: Activa botones, enlaces y controles
- Flechas: Navegación en carruseles y listas
- Esc: Cierra menús y modales
- H/Shift+H: Navegación por encabezados (NVDA)
- D/Shift+D: Navegación por landmarks (NVDA)

### Multimedia accesible
- Controles nativos del navegador
- Subtítulos en 4 idiomas (WebVTT)
- Transcripción textual completa
- Botones de cambio de idioma de transcripción
- Elemento `<details>` para expandir/colapsar transcripción
- Información de duración y idiomas disponibles

### Semántica HTML5
- Landmarks: header, nav, main, footer
- Jerarquía de encabezados correcta (H1 → H2 → H3)
- Listas semánticas (ul, ol) para navegación y contenido
- Formularios con labels asociados correctamente
- Botones y enlaces con textos descriptivos

### ARIA
- aria-label en landmarks para contexto adicional
- aria-hidden="true" en imágenes decorativas
- aria-pressed en botones de toggle
- aria-expanded en menús desplegables
- Clase sr-only para texto solo para lectores de pantalla

## Compatibilidad de navegadores

| Navegador | Versión mínima | Estado |
|-----------|----------------|--------|
| Chrome | 120+ | ✅ Totalmente compatible |
| Firefox | 121+ | ✅ Totalmente compatible |
| Edge | 120+ | ✅ Totalmente compatible |
| Safari | 17+ | ✅ Compatible (no probado) |

## Licencia

Este proyecto es parte del módulo de Diseño de Interfaces Web del ciclo formativo de Desarrollo de Aplicaciones Web.

## Autor

**Nombre:** Francisco Alba Muñoz  
**Curso:** 2º DAW - Desarrollo de Aplicaciones Web  
**Módulo:** Diseño de Interfaces Web (DIW)  
**Centro:** IES Rafael Alberti 
**Fecha:** Febrero 2026

---

## Recursos adicionales

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [TAW Test de Accesibilidad Web](https://www.tawdis.net/)

---

**Nota:** Este README documenta específicamente el trabajo realizado para el Proyecto 4 sobre accesibilidad y multimedia. Para documentación completa del proyecto general Desp[i]ensa, consultar el README principal del repositorio.

