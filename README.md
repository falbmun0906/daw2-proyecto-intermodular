> **NOTA IMPORTANTE:** Tras la entrega de la práctica, me he percatado de que el frontend no está renderizando correctamente por una línea de código muerta en el archivo `app.routes.ts` [línea 65].
> 
> ```javascript
> loadComponent : () => import('./pages/sugerencias/sugerencias').then(m => m.Sugerencias),
> ```
>
> Borrando esa línea, el front renderizará correctamente y se podrán visualizar todos los cambios realizados.


# Prueba práctica
Rama específica para la prueba práctica.
