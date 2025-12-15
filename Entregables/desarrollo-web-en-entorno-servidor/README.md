# Despiensa - Backend API REST (DWES)

Aplicación backend desarrollada con **Spring Boot + JPA/Hibernate + MySQL** para la gestión inteligente de despensa y recetas.

---

## Índice

### **Entrega 1: Modelo de Datos**
1. [1.1 Diagrama E/R](#11-modelo-de-datos---diagrama-er)
2. [1.2 Entidades JPA](#12-entidades-jpa)
3. [1.3 DTOs Iniciales](#13-dtos-iniciales)
4. [1.4 Repositorios](#14-repositorios)

### **Entrega 2: Controladores y Servicios**
1. [2.1 Servicios](#21-servicios)
2. [2.2 Controladores](#22-controladores-rest)

### **Entrega Seguridad: Autenticación y Autorización**
*(Por documentar)*

---

## 1.1 Modelo de Datos - Diagrama E/R

### Descripción del Dominio

El sistema **Despiensa** gestiona la despensa de un usuario, las recetas disponibles, la planificación semanal de comidas y la generación de listas de compra. El modelo está diseñado para permitir:

- Almacenar y gestionar ingredientes en la despensa personal.
- Consultar recetas y sus ingredientes necesarios.
- Guardar recetas favoritas o personalizadas por usuario.
- Planificar comidas por días de la semana.
- Generar listas de compra automáticamente basadas en la planificación.
- Alertar sobre caducidad de productos (futuro).

---

### Diagrama E/R (Modelo Conceptual)

```mermaid
erDiagram
    USUARIO ||--o{ DESPENSA_ITEM : tiene
    USUARIO ||--o{ RECETA_USUARIO : guarda
    USUARIO ||--o{ PLANIFICACION_SEMANA : planifica
    USUARIO ||--o{ LISTA_COMPRA : genera
    
    RECETA ||--o{ RECETA_USUARIO : "es guardada por"
    RECETA ||--o{ PLANIFICACION_DIA : "se asigna a"
    RECETA ||--o{ RECETA_INGREDIENTE : contiene
    
    INGREDIENTE ||--o{ RECETA_INGREDIENTE : "forma parte de"
    INGREDIENTE ||--o{ DESPENSA_ITEM : "se almacena como"
    INGREDIENTE ||--o{ LISTA_ITEM : "aparece en"
    
    PLANIFICACION_SEMANA ||--o{ PLANIFICACION_DIA : contiene
    
    LISTA_COMPRA ||--o{ LISTA_ITEM : contiene

    USUARIO {
        int id PK
        string email UK
        string password
        string rol
        datetime fecha_registro
    }

    RECETA {
        int id PK
        string nombre
        string descripcion
        string instrucciones
        int tiempo_preparacion
        int porciones
        datetime fecha_creacion
    }

    INGREDIENTE {
        int id PK
        string nombre
        string categoria
        string unidad_defecto
        float calorias_por_unidad
    }

    RECETA_INGREDIENTE {
        int id PK
        int receta_id FK
        int ingrediente_id FK
        float cantidad
        string unidad
        boolean opcional
    }

    RECETA_USUARIO {
        int id PK
        int usuario_id FK
        int receta_id FK
        string tipo
        datetime fecha_guardado
        string visibilidad
    }

    DESPENSA_ITEM {
        int id PK
        int usuario_id FK
        int ingrediente_id FK
        float cantidad_actual
        string unidad
        date fecha_caducidad
        string ubicacion
        string estado
    }

    PLANIFICACION_SEMANA {
        int id PK
        int usuario_id FK
        date fecha_inicio_semana
        string etiqueta
        datetime fecha_creacion
    }

    PLANIFICACION_DIA {
        int id PK
        int planificacion_semana_id FK
        int receta_id FK
        date fecha
        string tipo_comida
        string notas
    }

    LISTA_COMPRA {
        int id PK
        int usuario_id FK
        datetime fecha_generada
        string origen
        string estado
        string texto_whatsapp_generado
    }

    LISTA_ITEM {
        int id PK
        int lista_compra_id FK
        int ingrediente_id FK
        float cantidad_necesaria
        string unidad
        boolean comprado
    }
```

---

### Justificación del Diseño

#### **USUARIO**
- Centro del sistema: cada usuario tiene su propia despensa, recetas y planificación independientes.
- Incluye autenticación (email, password) y autorización (rol).
- Relaciones 1:N con entidades que pertenecen al usuario.

#### **RECETA e INGREDIENTE**
- Relación N:M: una receta puede tener muchos ingredientes y un ingrediente aparece en muchas recetas.
- Tabla intermedia **RECETA_INGREDIENTE** permite almacenar cantidad y unidad por receta.

#### **RECETA_USUARIO**
- Relación N:M entre USUARIO y RECETA.
- Permite guardar recetas favoritas, propias o compartidas con metadata como fecha de guardado.

#### **DESPENSA_ITEM**
- Almacena los ingredientes que el usuario tiene actualmente.
- Incluye fecha de caducidad, ubicación y estado para alertas y búsquedas.

#### **PLANIFICACION_SEMANA y PLANIFICACION_DIA**
- Relación 1:N: una semana contiene varios días con comidas.
- Cada día puede tener una receta asignada por tipo de comida (desayuno, comida, cena).

#### **LISTA_COMPRA y LISTA_ITEM**
- Relación 1:N: una lista contiene múltiples items.
- Se genera automáticamente a partir de la planificación semanal.
- Campo `comprado` permite marcar items mientras se compra.

#### **Relaciones Bidireccionales vs Unidireccionales**
- Mantenidas principalmente **unidireccionales** (USUARIO → sus entidades) para evitar ciclos y mantener claridad.
- Solo se añaden navegaciones bidireccionales cuando sea realmente necesario (ej: para consultas frecuentes).

---

### Tipos de Datos y Enums

| Entidad | Campo | Tipo | Notas |
|---------|-------|------|-------|
| USUARIO | rol | ENUM | `ROLE_USER`, `ROLE_ADMIN` |
| DESPENSA_ITEM | ubicacion | ENUM | `NEVERA`, `CONGELADOR`, `DESPENSA`, `MOSTRADOR` |
| DESPENSA_ITEM | estado | ENUM | `OK`, `PROXIMO_A_CADUCAR`, `CADUCADO` |
| PLANIFICACION_DIA | tipo_comida | ENUM | `DESAYUNO`, `COMIDA`, `CENA` |
| LISTA_COMPRA | estado | ENUM | `PENDIENTE`, `COMPRADA` |
| RECETA_USUARIO | tipo | ENUM | `FAVORITA`, `PROPIA` |

---

### Convenciones de Base de Datos

- **Nombre de tablas**: `snake_case` (ej: `despensa_item`, `receta_usuario`)
- **Claves primarias**: `id` (auto-increment)
- **Claves foráneas**: `{entidad}_id` (ej: `usuario_id`, `receta_id`)
- **Campos únicos**: `email` en USUARIO
- **Fechas**: `LocalDate` o `LocalDateTime` según contexto
- **Booleans**: almacenados como TINYINT(1) en MySQL

---

## 1.2 Entidades JPA

### Arquitectura y Convenciones

Las entidades JPA se encuentran en el paquete `com.example.backend.model` siguiendo estas convenciones:

- **Anotaciones JPA**: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@ManyToOne`, `@OneToMany`, `@JoinColumn`, etc.
- **Validación**: Anotaciones de Jakarta Validation (`@NotNull`, `@NotBlank`, `@Email`, `@Size`, etc.)
- **Lombok**: `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder` para reducir boilerplate
- **Relaciones**: Principalmente **unidireccionales** para evitar ciclos; `FetchType.LAZY` por defecto
- **Exclusiones Lombok**: `@ToString.Exclude` y `@EqualsAndHashCode.Exclude` en colecciones para evitar problemas con proxies de Hibernate

### Entidades Creadas

#### 1. **Usuario**
Centro del sistema. Autenticación (email, password) y autorización (rol).
- Relaciones 1:N: DespensaItem, RecetaUsuario, PlanificacionSemana, ListaCompra

#### 2. **Receta**
Catálogo de recetas con ingredientes, instrucciones y tiempo de preparación.
- Relaciones 1:N: RecetaIngrediente, RecetaUsuario, PlanificacionDia

#### 3. **Ingrediente**
Catálogo de ingredientes usado por recetas, despensa y listas de compra.
- Relaciones 1:N: RecetaIngrediente, DespensaItem, ListaItem

#### 4. **RecetaIngrediente**
Tabla intermedia N:M (Receta ↔ Ingrediente). Almacena cantidad, unidad y si es opcional.

#### 5. **RecetaUsuario**
Tabla intermedia N:M (Usuario ↔ Receta). Permite guardar recetas favoritas o propias.

#### 6. **DespensaItem**
Items almacenados en la despensa del usuario con caducidad, ubicación y estado.

#### 7. **PlanificacionSemana**
Agrupa la planificación de comidas de una semana completa por usuario.
- Relaciones 1:N: PlanificacionDia

#### 8. **PlanificacionDia**
Una comida planificada (desayuno, comida, cena) asignada a un día de la semana.

#### 9. **ListaCompra**
Listas de compra generadas automáticamente a partir de la planificación.
- Relaciones 1:N: ListaItem

#### 10. **ListaItem**
Items dentro de una lista de compra con cantidad y estado de compra.

### Tipos Enumerados

| Entidad | Enum | Valores |
|---------|------|---------|
| Usuario | Rol | ROLE_USER, ROLE_ADMIN |
| RecetaUsuario | TipoRecetaUsuario | FAVORITA, PROPIA |
| DespensaItem | UbicacionDespensa | NEVERA, CONGELADOR, DESPENSA, MOSTRADOR |
| DespensaItem | EstadoDespensaItem | OK, PROXIMO_A_CADUCAR, CADUCADO |
| PlanificacionDia | TipoComida | DESAYUNO, ALMUERZO, COMIDA, MERIENDA, CENA |
| ListaCompra | EstadoListaCompra | PENDIENTE, COMPRADA |

---

## 1.3 DTOs Iniciales

### Estrategia de DTOs

Los DTOs (Data Transfer Objects) se encuentran en el paquete `com.example.backend.dto` y siguen estas convenciones:

- **Request DTOs**: Para operaciones de creación/actualización (`CreateRequest`, `UpdateRequest`)
- **Response DTOs**: Para devolver datos al cliente (`Response`)
- **Validación**: Anotaciones Jakarta Validation en Request DTOs
- **Composición**: Response DTOs anidan otras Response para relaciones (evitando ciclos)
- **Proyección**: Los DTOs seleccionan qué campos exponer (seguridad: no incluir passwords)

### DTOs por Entidad

#### **Usuario**
| DTO | Propósito |
|-----|-----------|
| `UsuarioCreateRequest` | Registro: email, password |
| `UsuarioResponse` | Devuelve: id, email, rol, fechaRegistro (sin password) |

#### **Receta**
| DTO | Propósito |
|-----|-----------|
| `RecetaCreateRequest` | Crear receta: nombre, descripción, instrucciones, tiempoPreparacion, porciones |
| `RecetaResponse` | Datos básicos de receta |
| `RecetaDetailedResponse` | Receta con lista de ingredientes (usado en GET /recetas/{id}) |

#### **Ingrediente**
| DTO | Propósito |
|-----|-----------|
| `IngredienteCreateRequest` | Crear ingrediente: nombre, categoría, unidadDefecto, calorías |
| `IngredienteResponse` | Datos del ingrediente |

#### **RecetaIngrediente**
| DTO | Propósito |
|-----|-----------|
| `RecetaIngredienteCreateRequest` | Agregar ingrediente a receta: ingredienteId, cantidad, unidad, opcional |
| `RecetaIngredienteResponse` | Datos del ingrediente en la receta (con IngredienteResponse anidado) |

#### **RecetaUsuario**
| DTO | Propósito |
|-----|-----------|
| `RecetaUsuarioCreateRequest` | Guardar receta: tipo (FAVORITA\|PROPIA), visibilidad |
| `RecetaUsuarioResponse` | Receta guardada (con RecetaResponse anidado) |

#### **DespensaItem**
| DTO | Propósito |
|-----|-----------|
| `DespensaItemCreateRequest` | Agregar a despensa: ingredienteId, cantidadActual, unidad, fechaCaducidad, ubicación |
| `DespensaItemUpdateRequest` | Actualizar: cantidad, caducidad, ubicación, estado (todos opcionales) |
| `DespensaItemResponse` | Datos del item (con IngredienteResponse anidado) |

#### **PlanificacionSemana**
| DTO | Propósito |
|-----|-----------|
| `PlanificacionSemanaCreateRequest` | Crear planificación: fechaInicio, etiqueta |
| `PlanificacionSemanaResponse` | Datos de la semana con lista de PlanificacionDiaResponse anidadas |

#### **PlanificacionDia**
| DTO | Propósito |
|-----|-----------|
| `PlanificacionDiaCreateRequest` | Crear comida planificada: fecha, tipoComida, recetaId (opcional), notas |
| `PlanificacionDiaResponse` | Datos del día (con RecetaResponse anidado) |

#### **ListaCompra**
| DTO | Propósito |
|-----|-----------|
| `ListaCompraCreateRequest` | Crear lista: origen, textoWhatsapp |
| `ListaCompraResponse` | Datos de la lista con items (lista de ListaItemResponse) |

#### **ListaItem**
| DTO | Propósito |
|-----|-----------|
| `ListaItemCreateRequest` | Agregar item: ingredienteId, cantidadNecesaria, unidad |
| `ListaItemResponse` | Datos del item (con IngredienteResponse anidado) |

### Resumen de DTOs Creados

**Total: 26 DTOs**
- 14 Request DTOs (Create/Update)
- 12 Response DTOs

---

## 1.4 Repositorios

### Arquitectura y Estrategia

Los repositorios JPA se encuentran en el paquete `com.example.backend.repository` y extienden `JpaRepository` para:

- Operaciones CRUD básicas (heredadas de JpaRepository)
- Consultas personalizadas con `@Query` (JPQL y nativas)
- Consultas derivadas (method names)
- Paginación y ordenación
- Agregaciones y conteos

### Repositorios Creados

#### 1. **UsuarioRepository**
Consultas personalizadas:
- `findByEmail(email)` - Búsqueda por email (autenticación)
- `existsByEmail(email)` - Verificación de unicidad
- `findByRol(rol)` - Listar usuarios por rol (ROLE_USER, ROLE_ADMIN)

---

#### 2. **RecetaRepository**
Consultas personalizadas:
- `findByNombreContainingIgnoreCase(nombre)` - Búsqueda parcial
- `findByNombreContainingIgnoreCase(nombre, Pageable)` - Con paginación
- `findRecetasRapidas(minutos)` - Recetas por tiempo de preparación
- `findByPorciones(porciones)` - Filtro por porciones
- `findAllOrderByFechaCreacionDesc()` - Ordenado por fecha

---

#### 3. **IngredienteRepository**
Consultas personalizadas:
- `findByNombreContainingIgnoreCase(nombre)` - Búsqueda parcial
- `findByCategoria(categoria)` - Filtro por categoría
- `findByNombreIgnoreCase(nombre)` - Búsqueda exacta case-insensitive
- `existsByNombreIgnoreCase(nombre)` - Verificación de existencia
- `findAllOrderByNombre()` - Ordenado alfabéticamente
- `findDistinctCategories()` - Todas las categorías únicas

---

#### 4. **RecetaIngredienteRepository**
Consultas personalizadas:
- `findByRecetaId(recetaId)` - Ingredientes de una receta
- `countByRecetaId(recetaId)` - Número de ingredientes
- `findIngredientesOpcionalesByRecetaId(recetaId)` - Solo ingredientes opcionales
- `findByIngredienteId(ingredienteId)` - Recetas que contienen un ingrediente
- `countRecetasByIngredienteId(ingredienteId)` - Número de recetas
- `existsByRecetaIdAndIngredienteId(recetaId, ingredienteId)` - Verificación de duplicados

---

#### 5. **RecetaUsuarioRepository**
Consultas personalizadas:
- `findByUsuarioId(usuarioId)` - Recetas guardadas por usuario
- `findFavoritasByUsuarioId(usuarioId)` - Solo recetas favoritas
- `findPropiasByUsuarioId(usuarioId)` - Solo recetas propias
- `findByUsuarioIdAndRecetaId(usuarioId, recetaId)` - Búsqueda específica
- `existsByUsuarioIdAndRecetaId(usuarioId, recetaId)` - Verificación
- `countByUsuarioId(usuarioId)` - Total de recetas guardadas
- `countFavoritasByUsuarioId(usuarioId)` - Total de favoritas
- `countUsuariosByRecetaId(recetaId)` - Popularidad de receta (cuántos la guardan)

---

#### 6. **DespensaItemRepository**
Consultas personalizadas:
- `findByUsuarioId(usuarioId)` - Todos los items de la despensa
- `findByUsuarioId(usuarioId, Pageable)` - Con paginación
- `findByUsuarioIdAndIngredienteId(usuarioId, ingredienteId)` - Item específico
- `findCaducadosByUsuarioId(usuarioId)` - Productos caducados
- `findProximoCaducarByUsuarioId(usuarioId)` - Próximos a caducar
- `findOkByUsuarioId(usuarioId)` - Productos en buen estado
- `findByUsuarioIdAndUbicacion(usuarioId, ubicacion)` - Por ubicación (NEVERA, CONGELADOR, etc.)
- `findCaducadosAntesDeFecha(usuarioId, fecha)` - Caducados antes de una fecha
- `findByUsuarioIdAndIngredienteNombre(usuarioId, nombre)` - Búsqueda por nombre
- `countByUsuarioId(usuarioId)` - Total de items
- `existsByUsuarioIdAndIngredienteId(usuarioId, ingredienteId)` - Verificación

---

#### 7. **PlanificacionSemanaRepository**
Consultas personalizadas:
- `findByUsuarioId(usuarioId)` - Planificaciones del usuario
- `findByUsuarioId(usuarioId, Pageable)` - Con paginación
- `findMostRecentByUsuarioId(usuarioId)` - Planificación más reciente
- `findByUsuarioIdAndFechaInicio(usuarioId, fechaInicio)` - Búsqueda por fecha
- `findByUsuarioIdAndFechaRange(usuarioId, fechaInicio, fechaFin)` - Rango de fechas
- `countByUsuarioId(usuarioId)` - Total de planificaciones
- `findByUsuarioIdAndEtiqueta(usuarioId, etiqueta)` - Búsqueda por etiqueta

---

#### 8. **PlanificacionDiaRepository**
Consultas personalizadas:
- `findByPlanificacionSemanaId(planificacionSemanaId)` - Todos los días de una semana
- `findByPlanificacionSemanaIdAndFechaAndTipoComida(...)` - Día específico
- `findByPlanificacionSemanaIdAndFecha(...)` - Todas las comidas de un día
- `findByPlanificacionSemanaIdAndTipoComida(...)` - Comidas de un tipo
- `findWithRecetaByPlanificacionSemanaId(...)` - Solo días con receta
- `findWithoutRecetaByPlanificacionSemanaId(...)` - Solo días sin receta
- `countWithReceta(planificacionSemanaId)` - Número de días planificados
- `findDistinctRecetasByPlanificacionSemanaId(...)` - Recetas únicas de la semana

---

#### 9. **ListaCompraRepository**
Consultas personalizadas:
- `findByUsuarioId(usuarioId)` - Todas las listas del usuario
- `findByUsuarioId(usuarioId, Pageable)` - Con paginación
- `findPendientesByUsuarioId(usuarioId)` - Listas pendientes
- `findCompradasByUsuarioId(usuarioId)` - Listas compradas
- `findMostRecentByUsuarioId(usuarioId)` - Lista más reciente
- `findMostRecentPendienteByUsuarioId(usuarioId)` - Última lista pendiente
- `findByUsuarioIdAndOrigen(usuarioId, origen)` - Por origen (PLANIFICACION, MANUAL)
- `findByUsuarioIdAndFechaRange(usuarioId, fechaInicio, fechaFin)` - Rango de fechas
- `countPendientesByUsuarioId(usuarioId)` - Total de listas pendientes
- `countByUsuarioId(usuarioId)` - Total de listas

---

#### 10. **ListaItemRepository**
Consultas personalizadas:
- `findByListaCompraId(listaCompraId)` - Items de una lista
- `findNotCompradosByListaCompraId(listaCompraId)` - Items sin comprar
- `findCompradosByListaCompraId(listaCompraId)` - Items comprados
- `findByListaCompraIdAndIngredienteId(...)` - Item específico
- `countByListaCompraId(listaCompraId)` - Total de items
- `countNotCompradosByListaCompraId(listaCompraId)` - Items sin comprar
- `countCompradosByListaCompraId(listaCompraId)` - Items comprados
- `existsByListaCompraIdAndIngredienteId(...)` - Verificación de duplicados
- `getPorcentajeComprado(listaCompraId)` - Porcentaje de items comprados (SQL nativa)

---

### Resumen de Repositorios

**Total: 10 Repositorios JPA**
- **Consultas personalizadas**: 80+ métodos con lógica de negocio
- **Estrategias de consulta**: Combinación de JPQL, derived queries y SQL nativo
- **Características**:
  - Filtros y búsquedas avanzadas
  - Ordenación y paginación
  - Conteos y agregaciones
  - Verificaciones de existencia
  - Estadísticas (ej: porcentaje, popularidad)

---

## 2.1 Servicios

### Arquitectura de Servicios

Los servicios se encuentran en `com.example.backend.service` y encapsulan la **lógica de negocio**:

- **`@Service` + `@Transactional`**: Gestión automática de transacciones
- **Inyección de dependencias**: `@RequiredArgsConstructor` de Lombok
- **Validaciones**: Verificaciones en tiempo de ejecución
- **Seguridad de datos**: Validaciones de pertenencia (usuario-recurso)
- **Mapeo de DTOs**: Conversión entidades → DTOs

### Servicios Creados (9 total)

| Servicio | Métodos Clave | Responsabilidad |
|----------|---------------|-----------------|
| **UsuarioService** | registrar, obtenerPorId, obtenerPorEmail, verificarCredenciales | Autenticación y gestión de usuarios |
| **RecetaService** | crear, obtenerPorIdDetallado, buscarPorNombre, obtenerRecetasRapidas | CRUD de recetas y búsquedas |
| **IngredienteService** | crear, obtenerPorNombre, obtenerPorCategoria, obtenerCategorias | Gestión de catálogo de ingredientes |
| **RecetaIngredienteService** | agregarIngrediente, obtenerIngredientesPorReceta, eliminarIngrediente | Relación N:M recetas-ingredientes |
| **RecetaUsuarioService** | guardarReceta, obtenerFavoritas, obtenerPropias, obtenerPopularidad | Recetas guardadas por usuario |
| **DespensaItemService** | agregarADespensa, obtenerDespensa, obtenerCaducados, actualizar | Gestión de despensa con caducidad |
| **PlanificacionSemanaService** | crear, obtenerDelUsuario, obtenerMasReciente | Planificaciones semanales |
| **PlanificacionDiaService** | crear, obtenerDelaSemana, obtenerDelDia, actualizar | Comidas planificadas diariamente |
| **ListaCompraService** | crear, obtenerPendientes, marcarComoComprada | Generación y estado de listas |
| **ListaItemService** | agregarItem, marcarComoComprado, obtenerPorcentajeComprado | Gestión de items en listas |

### Funcionalidades Especiales

**DespensaItemService**:
- Cálculo automático de estado según caducidad
- Alerta de próxima caducidad (3 días antes)
- Filtrado por ubicación (NEVERA, CONGELADOR, etc.)

**RecetaUsuarioService**:
- Seguimiento de recetas favoritas vs propias
- Cálculo de popularidad de receta

**ListaItemService**:
- Cálculo de porcentaje de compra completada
- Tracking de items comprados vs pendientes

---

## 2.2 Controladores REST

### Arquitectura de Controladores

Los controladores se encuentran en `com.example.backend.controller` y manejan:

- **Rutas RESTful**: `/api/recurso` en plural
- **Verbos HTTP**: GET, POST, PUT/PATCH, DELETE
- **Códigos HTTP**: 200, 201, 204, 400, 401, 403, 404, 422, 500
- **Inyección de servicios**: Delegan lógica en servicios
- **DTOs**: Reciben Request, devuelven Response

### Controladores Creados (10 total)

#### UsuarioController
**Rutas**:
- `POST /api/usuarios/registro` - Registrar usuario
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `GET /api/usuarios/email/{email}` - Obtener por email
- `GET /api/usuarios` - Listar todos (ADMIN)

**Códigos HTTP**:
- 201 Created - Registro exitoso
- 200 OK - Usuario encontrado
- 400 Bad Request - Email duplicado
- 404 Not Found - Usuario no existe

#### RecetaController
**Rutas**:
- `POST /api/recetas` - Crear receta
- `GET /api/recetas/{id}` - Obtener receta (con ingredientes)
- `GET /api/recetas` - Listar recetas (paginado)
- `GET /api/recetas/buscar?nombre=X` - Búsqueda por nombre
- `GET /api/recetas/rapidas?minutos=30` - Recetas rápidas
- `PUT /api/recetas/{id}` - Actualizar receta
- `DELETE /api/recetas/{id}` - Eliminar receta

**Códigos HTTP**:
- 201 Created - Receta creada
- 200 OK - Receta obtenida/listada
- 400 Bad Request - Validación fallida
- 404 Not Found - Receta no existe
- 204 No Content - Eliminado

#### IngredienteController
**Rutas**:
- `POST /api/ingredientes` - Crear ingrediente
- `GET /api/ingredientes/{id}` - Obtener ingrediente
- `GET /api/ingredientes` - Listar (paginado)
- `GET /api/ingredientes/buscar?nombre=X` - Búsqueda
- `GET /api/ingredientes/categoria/{categoria}` - Por categoría
- `GET /api/ingredientes/categorias` - Listar categorías únicas

#### RecetaIngredienteController (anidado)
**Rutas**:
- `POST /api/recetas/{recetaId}/ingredientes` - Agregar ingrediente
- `GET /api/recetas/{recetaId}/ingredientes` - Listar ingredientes
- `GET /api/recetas/{recetaId}/ingredientes/opcionales` - Solo opcionales
- `DELETE /api/recetas/{recetaId}/ingredientes/{ingredienteId}` - Eliminar

#### RecetaUsuarioController (anidado)
**Rutas**:
- `POST /api/usuarios/{usuarioId}/recetas/{recetaId}` - Guardar receta
- `GET /api/usuarios/{usuarioId}/recetas` - Recetas guardadas
- `GET /api/usuarios/{usuarioId}/recetas/favoritas` - Solo favoritas
- `GET /api/usuarios/{usuarioId}/recetas/propias` - Solo propias
- `DELETE /api/usuarios/{usuarioId}/recetas/{recetaId}` - Desguardar

#### DespensaItemController (anidado)
**Rutas**:
- `POST /api/usuarios/{usuarioId}/despensa` - Agregar producto
- `GET /api/usuarios/{usuarioId}/despensa` - Listar despensa (paginado)
- `GET /api/usuarios/{usuarioId}/despensa/caducados` - Caducados
- `GET /api/usuarios/{usuarioId}/despensa/proximo-caducar` - Próximos a caducar
- `GET /api/usuarios/{usuarioId}/despensa/ubicacion/{ubicacion}` - Por ubicación
- `PUT /api/usuarios/{usuarioId}/despensa/{itemId}` - Actualizar item
- `DELETE /api/usuarios/{usuarioId}/despensa/{itemId}` - Eliminar item

#### PlanificacionSemanaController (anidado)
**Rutas**:
- `POST /api/usuarios/{usuarioId}/planificaciones` - Crear planificación
- `GET /api/usuarios/{usuarioId}/planificaciones` - Listar (paginado)
- `GET /api/usuarios/{usuarioId}/planificaciones/{planificacionId}` - Obtener
- `GET /api/usuarios/{usuarioId}/planificaciones/reciente` - Más reciente

#### PlanificacionDiaController (anidado)
**Rutas**:
- `POST /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias` - Crear día
- `GET /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias` - Listar días
- `GET /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias/{diaId}` - Obtener día
- `PUT /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias/{diaId}` - Actualizar
- `DELETE /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias/{diaId}` - Eliminar

#### ListaCompraController (anidado)
**Rutas**:
- `POST /api/usuarios/{usuarioId}/listas` - Crear lista
- `GET /api/usuarios/{usuarioId}/listas` - Listar listas (paginado)
- `GET /api/usuarios/{usuarioId}/listas/pendientes` - Solo pendientes
- `PUT /api/usuarios/{usuarioId}/listas/{listaId}/comprada` - Marcar comprada

#### ListaItemController (anidado)
**Rutas**:
- `POST /api/usuarios/{usuarioId}/listas/{listaId}/items` - Agregar item
- `GET /api/usuarios/{usuarioId}/listas/{listaId}/items` - Listar items
- `GET /api/usuarios/{usuarioId}/listas/{listaId}/items/sin-comprar` - Items sin comprar
- `GET /api/usuarios/{usuarioId}/listas/{listaId}/items/comprados` - Items comprados
- `GET /api/usuarios/{usuarioId}/listas/{listaId}/items/porcentaje` - Porcentaje comprado
- `PUT /api/usuarios/{usuarioId}/listas/{listaId}/items/{itemId}/comprado` - Marcar como comprado
- `PUT /api/usuarios/{usuarioId}/listas/{listaId}/items/{itemId}/no-comprado` - Desmarcar como comprado
- `DELETE /api/usuarios/{usuarioId}/listas/{listaId}/items/{itemId}` - Eliminar item

---

### Manejo de Errores Centralizado

**@ControllerAdvice** con @ExceptionHandler:
- `IllegalArgumentException` → 400 Bad Request o 404 Not Found
- `ValidationException` → 422 Unprocessable Entity
- `Exception` → 500 Internal Server Error

---

### Seguridad en Controladores

- **@PreAuthorize**: Protección por roles
- **Usuario autenticado**: Requerido para operaciones CRUD
- **Validación de pertenencia**: Usuario solo accede sus datos
- **CORS**: Configurado para frontend Angular

---

## Entrega 3: Seguridad - Autenticación y Autorización

### Arquitectura de Seguridad

La seguridad se implementa con **JWT (JSON Web Tokens)** + **Spring Security** y se encuentra en el paquete `com.example.backend.security`:

- **JWT**: Tokens stateless para autenticación
- **Spring Security**: Filtros, autorización por roles, protección de rutas
- **BCrypt**: Hash de contraseñas
- **CORS**: Configurado para Angular (localhost:4200)
- **Roles**: `ROLE_USER` (usuarios normales), `ROLE_ADMIN` (administradores)

---

### 3.1 Componentes de Seguridad

#### 1. **JwtUtils** - Generación y Validación de Tokens
**Ubicación**: `com.example.backend.security.JwtUtils`

**Funcionalidades**:
- `generateJwtToken(Authentication)` - Genera token JWT desde autenticación
- `generateTokenFromEmail(String)` - Genera token desde email (para registro)
- `getEmailFromJwtToken(String)` - Extrae email del token
- `validateJwtToken(String)` - Valida firma y expiración

**Configuración**:
```properties
jwt.secret=dGhpc0lzQVZlcnlTZWNyZXRLZXlGb3JKV1RUb2tlbkdlbmVyYXRpb25JblNwcmluZ0Jvb3Q=
jwt.expiration=86400000  # 24 horas
```

#### 2. **JwtAuthenticationFilter** - Interceptor de Peticiones
**Ubicación**: `com.example.backend.security.JwtAuthenticationFilter`

**Funcionalidad**:
- Intercepta TODAS las peticiones HTTP
- Extrae token JWT del header `Authorization: Bearer <token>`
- Valida el token y establece autenticación en SecurityContext
- Si el token no es válido, la petición continúa sin autenticación

#### 3. **UserDetailsServiceImpl** - Carga de Usuarios
**Ubicación**: `com.example.backend.security.UserDetailsServiceImpl`

**Funcionalidad**:
- Implementa interfaz de Spring Security `UserDetailsService`
- Carga datos del usuario desde la base de datos (por email)
- Convierte `Usuario` (entidad JPA) → `UserDetails` (Spring Security)
- Asigna autoridades (roles) al usuario autenticado

#### 4. **SecurityConfig** - Configuración Central
**Ubicación**: `com.example.backend.config.SecurityConfig`

**Configuración de rutas**:
```java
// Rutas públicas (sin autenticación)
/api/auth/**               → Permitido (login, registro)
/swagger-ui/**, /v3/api-docs/** → Permitido (documentación)

// Rutas solo para ADMIN
DELETE /api/**             → hasRole("ADMIN")
GET /api/usuarios/**       → hasRole("ADMIN")

// Rutas públicas de lectura, protegidas para crear
GET /api/recetas/**        → Permitido
GET /api/ingredientes/**   → Permitido
POST /api/recetas/**       → hasAnyRole("USER", "ADMIN")
POST /api/ingredientes/**  → hasAnyRole("USER", "ADMIN")

// Todas las demás rutas
anyRequest()               → authenticated()
```

**CORS**:
- Origen permitido: `http://localhost:4200` (Angular)
- Métodos: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Headers: Todos (`*`)
- Credentials: Habilitado
- Headers expuestos: Authorization

---

### 3.2 DTOs de Autenticación

#### LoginRequest
```java
{
  "email": "usuario@email.com",
  "password": "password123"
}
```

#### AuthResponse
```java
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "id": 1,
  "email": "usuario@email.com",
  "rol": "ROLE_USER"
}
```

---

### 3.3 Endpoints de Autenticación

#### AuthController
**Rutas públicas** (no requieren autenticación):

**POST /api/auth/login**
- Autentica un usuario
- Request: `LoginRequest`
- Response: `AuthResponse` con token JWT
- Códigos HTTP:
  - 200 OK - Login exitoso
  - 401 Unauthorized - Credenciales inválidas

**POST /api/auth/registro**
- Registra un nuevo usuario
- Request: `UsuarioCreateRequest`
- Response: `AuthResponse` con token JWT
- Códigos HTTP:
  - 201 Created - Registro exitoso
  - 400 Bad Request - Email ya existe
  - 422 Unprocessable Entity - Validación fallida

---

### 3.4 Flujo de Autenticación

#### 1. Registro de Usuario
```
Cliente → POST /api/auth/registro
       → AuthService.registrar()
       → UsuarioRepository.save() (password hasheado con BCrypt)
       → JwtUtils.generateTokenFromEmail()
       → AuthResponse con token
```

#### 2. Login de Usuario
```
Cliente → POST /api/auth/login
       → AuthenticationManager.authenticate()
       → UserDetailsServiceImpl.loadUserByUsername()
       → Valida password con BCrypt
       → JwtUtils.generateJwtToken()
       → AuthResponse con token
```

#### 3. Petición Protegida
```
Cliente → GET /api/usuarios/{id}/despensa
        Header: Authorization: Bearer <token>
       → JwtAuthenticationFilter.doFilterInternal()
       → JwtUtils.validateJwtToken()
       → UserDetailsServiceImpl.loadUserByUsername()
       → SecurityContext establecido
       → Controlador verifica roles (@PreAuthorize)
       → Respuesta si autorizado, 403 si denegado
```

---

### 3.5 Autorización por Roles

#### Roles Disponibles
| Rol | Descripción | Permisos |
|-----|-------------|----------|
| `ROLE_USER` | Usuario normal | CRUD sobre sus propios recursos |
| `ROLE_ADMIN` | Administrador | CRUD sobre todos los recursos + gestión de usuarios |

#### Protección de Rutas por Rol

**Rutas de solo lectura (públicas)**:
- GET /api/recetas/** - Cualquiera puede ver recetas
- GET /api/ingredientes/** - Cualquiera puede ver ingredientes

**Rutas protegidas (autenticado)**:
- /api/usuarios/{id}/despensa - Usuario solo accede a SU despensa
- /api/usuarios/{id}/recetas - Usuario solo accede a SUS recetas guardadas
- /api/usuarios/{id}/planificaciones - Usuario solo accede a SU planificación
- /api/usuarios/{id}/listas - Usuario solo accede a SUS listas

**Rutas de administración (solo ADMIN)**:
- DELETE /api/** - Solo admin puede eliminar
- GET /api/usuarios/** - Solo admin puede listar usuarios

---

### 3.6 Validaciones de Seguridad

#### En Servicios
Todos los servicios validan pertenencia de recursos:
```java
public DespensaItemResponse obtener(Long usuarioId, Long itemId) {
    // 1. Validar que el usuario existe
    usuarioService.obtenerUsuarioCompleto(usuarioId);
    
    // 2. Obtener el item
    DespensaItem item = despensaItemRepository.findById(itemId)
        .orElseThrow(() -> new IllegalArgumentException("Item no encontrado"));
    
    // 3. Validar pertenencia
    if (!item.getUsuario().getId().equals(usuarioId)) {
        throw new IllegalArgumentException("El item no pertenece a este usuario");
    }
    
    return mapToResponse(item);
}
```

#### Manejo de Errores de Seguridad
`GlobalExceptionHandler` captura excepciones de autenticación/autorización:

- `BadCredentialsException` → 401 Unauthorized
- `UsernameNotFoundException` → 401 Unauthorized
- `AccessDeniedException` → 403 Forbidden

---

### 3.7 Cómo Usar la API con Autenticación

#### 1. Registrar un Usuario
```bash
POST http://localhost:8080/api/auth/registro
Content-Type: application/json

{
  "email": "usuario@test.com",
  "password": "password123"
}

# Respuesta (201 Created)
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "id": 1,
  "email": "usuario@test.com",
  "rol": "ROLE_USER"
}
```

#### 2. Login
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "usuario@test.com",
  "password": "password123"
}

# Respuesta (200 OK)
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "id": 1,
  "email": "usuario@test.com",
  "rol": "ROLE_USER"
}
```

#### 3. Usar Token en Peticiones Protegidas
```bash
GET http://localhost:8080/api/usuarios/1/despensa
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# Respuesta (200 OK) - Si autorizado
# Respuesta (401 Unauthorized) - Si token inválido/expirado
# Respuesta (403 Forbidden) - Si sin permisos
```

---

### 3.8 Configuración para Desarrollo

#### application.properties
```properties
# JWT Configuration
jwt.secret=dGhpc0lzQVZlcnlTZWNyZXRLZXlGb3JKV1RUb2tlbkdlbmVyYXRpb25JblNwcmluZ0Jvb3Q=
jwt.expiration=86400000  # 24 horas en milisegundos

# CORS para Angular
# Ya configurado en SecurityConfig para http://localhost:4200
```

**IMPORTANTE**: En producción:
- Cambiar `jwt.secret` por una clave aleatoria segura (256 bits mínimo)
- Usar variables de entorno para secretos
- Configurar HTTPS
- Añadir refresh tokens
- Implementar logout (blacklist de tokens)

---

### 3.9 Próximas Mejoras (Post-MVP)

- [ ] **Refresh Tokens** - Renovar tokens sin reautenticar
- [ ] **Logout** - Blacklist de tokens revocados
- [ ] **Password Reset** - Recuperación de contraseña por email
- [ ] **Rate Limiting** - Protección contra fuerza bruta
- [ ] **Auditoría** - Log de accesos y cambios
- [ ] **2FA** - Autenticación de dos factores

---

## 🚀 Cómo Levantar el Proyecto

### Requisitos Previos
- Java 21+
- Maven 3.6+
- MySQL 8.0+
- Postman (opcional, para pruebas)

### Pasos

#### 1. Configurar Base de Datos
```sql
CREATE DATABASE despiensa;
```

O dejar que Spring Boot la cree automáticamente (`createDatabaseIfNotExist=true`).

#### 2. Configurar application.properties (si es necesario)
```properties
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
jwt.secret=TU_SECRETO_SEGURO_BASE64
```

#### 3. Compilar y Ejecutar
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### 4. Verificar
```bash
# Servidor levantado en:
http://localhost:8080

# Swagger UI (documentación):
http://localhost:8080/swagger-ui/index.html
```

---

## Documentación de la API

### Swagger/OpenAPI
Accede a la documentación interactiva en:
```
http://localhost:8080/swagger-ui/index.html
```

### 🧪 Colección Postman/Newman

#### Uso con Postman GUI
1. Abre Postman
2. Importa: `backend/postman/Despiensa_API_Collection.json`
3. Importa entorno: `backend/postman/Despiensa_Local_Environment.json`
4. Selecciona entorno "Despiensa Local"
5. Ejecuta peticiones en orden (empezando por Autenticación)

#### Uso con Newman (CLI)

**Instalación**:
```bash
npm install -g newman newman-reporter-htmlextra
```

**Ejecutar tests (Windows)**:
```bash
run-newman-tests.bat
```

**Ejecutar tests (Linux/Mac)**:
```bash
newman run backend/postman/Despiensa_API_Collection.json \
  -e backend/postman/Despiensa_Local_Environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export backend/postman/reports/test-report.html
```

#### Contenido de la Colección

La colección incluye **47 peticiones** organizadas en 9 carpetas:

1. **Autenticación** (2) - Registro y Login con JWT
2. **Ingredientes** (5) - CRUD + búsquedas + categorías
3. **Recetas** (5) - CRUD + búsquedas + filtros
4. **Receta Ingredientes** (2) - Agregar/listar ingredientes
5. **Despensa** (4) - Gestión completa de despensa
6. **Recetas de Usuario** (2) - Favoritas y propias
7. **Planificación Semanal** (3) - Crear y gestionar planificaciones
8. **Lista de Compra** (4) - Crear listas y agregar items
9. **Tests de Seguridad** (2) - Verificar protecciones 401/403

**Características**:
- ✅ Variables automáticas (token JWT, IDs)
- ✅ Tests automáticos incluidos
- ✅ Reportes HTML con newman-reporter-htmlextra
- ✅ Flujo completo de testing

Ver documentación completa en: `backend/postman/README.md`

---

## Testing

### Tests Unitarios
```bash
mvn test
```

**Configuración de tests**:
- Base de datos: H2 en memoria
- Configuración: `src/test/resources/application.properties`
- Tests ejecutados: `BackendApplicationTests.contextLoads()`

---

## Licencia

Este proyecto es parte del módulo de Desarrollo Web en Entorno Servidor (DWES) del CFGS de Desarrollo de Aplicaciones Web.

---

**Proyecto**: Despiensa - Gestión Inteligente de Despensa y Recetas  
**Tecnologías**: Spring Boot 3.5.6 + JPA/Hibernate + MySQL + JWT + Angular  
**Autor**: Francisco Alba 
**Fecha**: Diciembre 2025

