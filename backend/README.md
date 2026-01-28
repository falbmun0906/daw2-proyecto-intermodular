# Despiensa - Backend API REST

API REST desarrollada con Spring Boot para la gestión de despensas, recetas y planificación de comidas. Permite a los usuarios gestionar sus ingredientes, explorar recetas, planificar menús semanales y generar listas de compra automáticas.

## Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
4. [Modelo de Datos](#modelo-de-datos)
   - [Diagrama Entidad-Relación](#diagrama-entidad-relación)
   - [Entidades del Sistema](#entidades-del-sistema)
   - [Relaciones entre Entidades](#relaciones-entre-entidades)
5. [API REST](#api-rest)
   - [Diseño de Recursos REST](#diseño-de-recursos-rest)
   - [Endpoints Principales](#endpoints-principales)
   - [Códigos de Estado HTTP](#códigos-de-estado-http)
   - [Ejemplos de Uso](#ejemplos-de-uso)
6. [Autenticación y Autorización](#autenticación-y-autorización)
   - [Sistema JWT](#sistema-jwt)
   - [Roles y Permisos](#roles-y-permisos)
   - [Seguridad de Endpoints](#seguridad-de-endpoints)
7. [Instalación y Configuración](#instalación-y-configuración)
   - [Requisitos Previos](#requisitos-previos)
   - [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
   - [Variables de Entorno](#variables-de-entorno)
   - [Ejecución del Proyecto](#ejecución-del-proyecto)
8. [Documentación de la API](#documentación-de-la-api)
9. [Testing](#testing)
10. [Estructura del Proyecto](#estructura-del-proyecto)
11. [Consultas Personalizadas](#consultas-personalizadas)
12. [Manejo de Errores](#manejo-de-errores)
13. [CORS y Configuración de Seguridad](#cors-y-configuración-de-seguridad)

---

## Descripción del Proyecto

**Despiensa** es una aplicación web para la gestión inteligente de despensas y planificación de comidas. El backend proporciona una API REST completa que permite:

- Gestionar ingredientes en la despensa con control de caducidad y ubicación
- Buscar y almacenar recetas con ingredientes, pasos y etiquetas dietéticas
- Planificar menús semanales organizados por días y tipos de comida
- Generar listas de compra automáticas basadas en la planificación
- Sistema de autenticación seguro con JWT
- Control de acceso basado en roles (USER/ADMIN)

---

## Tecnologías Utilizadas

### Framework y Lenguaje
- **Java 21**: Lenguaje de programación principal
- **Spring Boot 3.5.6**: Framework para desarrollo de aplicaciones Java
- **Maven**: Gestión de dependencias y construcción del proyecto

### Dependencias Principales
- **Spring Data JPA**: Persistencia de datos y acceso a base de datos
- **Spring Security**: Autenticación y autorización
- **Spring Validation**: Validación de datos en DTOs y entidades
- **JWT (jjwt 0.12.3)**: Generación y validación de tokens JWT
- **Lombok**: Reducción de código boilerplate
- **SpringDoc OpenAPI 2.8.13**: Documentación automática de la API (Swagger)
- **Spring Dotenv**: Gestión de variables de entorno

### Bases de Datos Soportadas
- **PostgreSQL**: Base de datos principal para producción
- **MySQL**: Alternativa para entornos compatibles
- **H2**: Base de datos en memoria para testing

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura **MVC (Model-View-Controller)** adaptada para APIs REST, con clara separación de responsabilidades:

### Capas de la Aplicación

```
┌─────────────────────────────────────┐
│         Controllers                 │  <- Endpoints REST (HTTP)
│  (Reciben peticiones HTTP)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│          Services                   │  <- Lógica de negocio
│  (Transforman datos, validan)       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│        Repositories                 │  <- Acceso a datos (JPA)
│  (CRUD + consultas personalizadas)  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Base de Datos (PostgreSQL)     │
└─────────────────────────────────────┘
```

### Componentes Adicionales

- **DTOs (Data Transfer Objects)**: Controlan la estructura de entrada/salida de la API
- **Security**: Filtros JWT, configuración de seguridad y servicios de autenticación
- **Exception Handlers**: Manejo centralizado de errores
- **Config**: Configuración de Swagger, CORS, seguridad y carga de datos iniciales

---

## Modelo de Datos

### Diagrama Entidad-Relación

El modelo de datos está diseñado para soportar un sistema completo de gestión de despensas y planificación de comidas. A continuación se describe la estructura:

```
USUARIO (1) ──────< (N) DESPENSA_ITEM (N) >────── (1) INGREDIENTE
   │                                                       │
   │                                                       │
   │ (1)                                                   │ (N)
   │                                                       │
   ├────< (N) RECETA_USUARIO (N) >────── (1) RECETA        │
   │                                           │           │
   │                                           │ (1)       │
   │                                           │           │
   │                                           ├────< (N) RECETA_INGREDIENTE (N) >────┘
   │                                           │
   │                                           ├────< (N) RECETA_PASO
   │                                           │
   │ (1)                                       │ (1)
   │                                           │
   ├────< (N) PLANIFICACION_SEMANA             │
   │                │ (1)                      │
   │                │                          │
   │                └────< (N) PLANIFICACION_DIA >────────┘
   │
   │ (1)
   │
   └────< (N) LISTA_COMPRA
                │ (1)
                │
                └────< (N) LISTA_ITEM (N) >────── (1) INGREDIENTE
```

### Entidades del Sistema

#### 1. Usuario (`usuario`)

Entidad central del sistema. Cada usuario tiene su propia despensa, recetas guardadas y planificaciones.

**Campos:**
- `id` (Long): Identificador único autogenerado
- `email` (String): Email único del usuario (usado para login)
- `password` (String): Contraseña encriptada con BCrypt
- `rol` (Enum): Rol del usuario (`ROLE_USER` o `ROLE_ADMIN`)
- `fechaRegistro` (LocalDateTime): Fecha de creación de la cuenta

**Validaciones:**
- Email obligatorio y con formato válido
- Contraseña mínimo 8 caracteres
- Email único en el sistema

**Código ejemplo:**
```java
@Entity
@Table(name = "usuario", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Email(message = "El formato del email no es válido")
    @Column(nullable = false, unique = true)
    private String email;
    
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol; // ROLE_USER, ROLE_ADMIN
    
    // Relaciones...
}
```

#### 2. Ingrediente (`ingrediente`)

Catálogo global de ingredientes disponibles en el sistema.

**Campos:**
- `id` (Long): Identificador único
- `nombre` (String): Nombre del ingrediente
- `categoria` (String): Categoría (Verduras, Carnes, Lácteos, etc.)
- `unidadDefecto` (String): Unidad de medida por defecto (kg, l, unidades)
- `caloriasPorUnidad` (Integer): Información nutricional
- `imagenUrl` (String): URL de la imagen del ingrediente

**Validaciones:**
- Nombre entre 2 y 100 caracteres
- Unidad por defecto obligatoria
- Calorías no negativas

#### 3. Receta (`receta`)

Representa una receta con sus características e instrucciones.

**Campos:**
- `id` (Long): Identificador único
- `nombre` (String): Nombre de la receta
- `descripcion` (String): Descripción detallada
- `imagenUrl` (String): URL de la imagen
- `tiempoPreparacion` (Integer): Tiempo en minutos
- `porciones` (Integer): Número de porciones
- `dificultad` (String): BAJA, MEDIA o ALTA
- `fechaCreacion` (LocalDateTime): Fecha de creación
- `etiquetas` (Set<TipoDieta>): Etiquetas dietéticas (VEGANO, SIN_GLUTEN, etc.)

**Validaciones:**
- Nombre entre 3 y 255 caracteres
- Tiempo y porciones mayores a 0
- Dificultad obligatoria

#### 4. RecetaIngrediente (`receta_ingrediente`)

Tabla intermedia que relaciona recetas con ingredientes, incluyendo cantidades.

**Campos:**
- `id` (Long): Identificador único
- `receta` (Receta): FK a la receta
- `ingrediente` (Ingrediente): FK al ingrediente
- `cantidad` (Float): Cantidad necesaria
- `unidad` (String): Unidad de medida
- `opcional` (Boolean): Si el ingrediente es opcional

**Tipo de relación:** N:M (Muchos a Muchos con atributos)

#### 5. RecetaPaso (`receta_paso`)

Pasos ordenados para preparar una receta.

**Campos:**
- `id` (Long): Identificador único
- `receta` (Receta): FK a la receta
- `orden` (Integer): Orden del paso (1, 2, 3...)
- `descripcion` (String): Instrucciones del paso
- `tiempoMinutos` (Integer): Tiempo estimado del paso

**Validaciones:**
- Orden mayor a 0
- Descripción entre 5 y 1000 caracteres

#### 6. DespensaItem (`despensa_item`)

Ingredientes que el usuario tiene actualmente en su despensa.

**Campos:**
- `id` (Long): Identificador único
- `usuario` (Usuario): FK al usuario propietario
- `ingrediente` (Ingrediente): FK al ingrediente
- `cantidadActual` (Float): Cantidad disponible
- `unidad` (String): Unidad de medida
- `fechaCaducidad` (LocalDate): Fecha de caducidad (opcional)
- `ubicacion` (Enum): NEVERA, CONGELADOR, DESPENSA, MOSTRADOR
- `estado` (Enum): OK, PROXIMO_A_CADUCAR, CADUCADO

**Validaciones:**
- Cantidad mayor a 0
- Usuario e ingrediente obligatorios

#### 7. RecetaUsuario (`receta_usuario`)

Relación entre usuarios y sus recetas favoritas o propias.

**Campos:**
- `id` (Long): Identificador único
- `usuario` (Usuario): FK al usuario
- `receta` (Receta): FK a la receta
- `tipo` (Enum): FAVORITA o PROPIA
- `fechaGuardado` (LocalDateTime): Cuándo se guardó
- `visibilidad` (String): Configuración de privacidad

**Tipo de relación:** N:M (Muchos a Muchos)

#### 8. PlanificacionSemana (`planificacion_semana`)

Agrupa la planificación de comidas de una semana completa.

**Campos:**
- `id` (Long): Identificador único
- `usuario` (Usuario): FK al usuario
- `fechaInicio` (LocalDate): Primer día de la semana planificada
- `etiqueta` (String): Nombre descriptivo de la planificación
- `fechaCreacion` (LocalDateTime): Cuándo se creó

#### 9. PlanificacionDia (`planificacion_dia`)

Cada comida planificada para un día y tipo de comida específico.

**Campos:**
- `id` (Long): Identificador único
- `planificacionSemana` (PlanificacionSemana): FK a la semana
- `receta` (Receta): FK a la receta asignada (opcional)
- `fecha` (LocalDate): Día específico
- `tipoComida` (Enum): DESAYUNO, ALMUERZO, COMIDA, MERIENDA, CENA
- `notas` (String): Notas adicionales

#### 10. ListaCompra (`lista_compra`)

Listas de compra generadas automáticamente o manualmente.

**Campos:**
- `id` (Long): Identificador único
- `usuario` (Usuario): FK al usuario
- `fechaGenerada` (LocalDateTime): Cuándo se creó
- `origen` (String): PLANIFICACION, MANUAL
- `estado` (Enum): PENDIENTE, COMPRADA
- `textoWhatsappGenerado` (String): Texto formateado para compartir

#### 11. ListaItem (`lista_item`)

Items individuales dentro de una lista de compra.

**Campos:**
- `id` (Long): Identificador único
- `listaCompra` (ListaCompra): FK a la lista
- `ingrediente` (Ingrediente): FK al ingrediente
- `cantidadNecesaria` (Float): Cantidad a comprar
- `unidad` (String): Unidad de medida
- `comprado` (Boolean): Si ya se compró

### Relaciones entre Entidades

#### Relaciones 1:N (Uno a Muchos)

1. **Usuario → DespensaItem**: Un usuario puede tener muchos ingredientes en su despensa
2. **Usuario → PlanificacionSemana**: Un usuario puede tener múltiples planificaciones semanales
3. **Usuario → ListaCompra**: Un usuario puede generar múltiples listas de compra
4. **Receta → RecetaIngrediente**: Una receta tiene muchos ingredientes
5. **Receta → RecetaPaso**: Una receta tiene múltiples pasos
6. **Receta → PlanificacionDia**: Una receta puede estar en múltiples planificaciones
7. **PlanificacionSemana → PlanificacionDia**: Una semana contiene múltiples días/comidas
8. **ListaCompra → ListaItem**: Una lista contiene múltiples items
9. **Ingrediente → RecetaIngrediente**: Un ingrediente puede estar en muchas recetas
10. **Ingrediente → DespensaItem**: Un ingrediente puede estar en múltiples despensas
11. **Ingrediente → ListaItem**: Un ingrediente puede estar en múltiples listas

#### Relaciones N:M (Muchos a Muchos)

1. **Usuario ↔ Receta** (a través de `RecetaUsuario`): Los usuarios pueden guardar múltiples recetas como favoritas o propias
2. **Receta ↔ Ingrediente** (a través de `RecetaIngrediente`): Relación con atributos adicionales (cantidad, unidad)

#### Estrategias de Carga (Fetch)

El proyecto utiliza principalmente **LAZY fetching** para optimizar el rendimiento:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "usuario_id", nullable = false)
private Usuario usuario;
```

Para evitar problemas de serialización JSON con referencias circulares, se utilizan las anotaciones de Lombok:

```java
@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
@ToString.Exclude
@EqualsAndHashCode.Exclude
private List<DespensaItem> despensaItems = new ArrayList<>();
```

#### Cascadas y Eliminación en Cascada

Configuración de operaciones en cascada:

- `CascadeType.ALL`: Las operaciones en el padre se propagan a los hijos
- `orphanRemoval = true`: Los hijos huérfanos se eliminan automáticamente

Ejemplo:
```java
@OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
private List<RecetaPaso> pasos = new ArrayList<>();
```

Esto significa que al eliminar una `Receta`, todos sus `RecetaPaso` se eliminan automáticamente.

---

## API REST

### Diseño de Recursos REST

La API sigue estrictamente los principios RESTful:

- **Recursos en plural**: `/api/recetas`, `/api/ingredientes`, `/api/usuarios`
- **Sin verbos en URLs**: Se usan los métodos HTTP (GET, POST, PUT, DELETE)
- **Jerarquía lógica**: `/api/usuarios/{id}/despensa`, `/api/usuarios/{id}/planificaciones`
- **Paginación y filtros**: Parámetros query string (`?page=0&size=10&sort=nombre,asc`)

### Endpoints Principales

#### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/registro` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión y obtener token JWT | No |

**Ejemplo de registro:**
```json
POST /api/auth/registro
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}

Response 201 Created:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "tipo": "Bearer",
  "email": "usuario@ejemplo.com",
  "rol": "ROLE_USER"
}
```

#### Recetas (`/api/recetas`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/recetas` | Listar recetas con paginación | No |
| GET | `/api/recetas/{id}` | Obtener receta por ID (con ingredientes) | No |
| GET | `/api/recetas/buscar?nombre={nombre}` | Buscar por nombre | No |
| GET | `/api/recetas/rapidas?minutos={min}` | Recetas rápidas (≤ X minutos) | No |
| GET | `/api/recetas/porciones/{num}` | Filtrar por porciones | No |
| GET | `/api/recetas/count` | Contar total de recetas | No |
| POST | `/api/recetas` | Crear nueva receta | USER/ADMIN |

**Ejemplo de consulta con paginación:**
```http
GET /api/recetas?page=0&size=10

Response 200 OK:
{
  "content": [
    {
      "id": 1,
      "nombre": "Paella valenciana",
      "descripcion": "Deliciosa paella tradicional",
      "tiempoPreparacion": 45,
      "porciones": 4,
      "dificultad": "MEDIA",
      "etiquetas": ["PESCADO", "SIN_GLUTEN"]
    }
  ],
  "totalElements": 50,
  "totalPages": 5,
  "size": 10,
  "number": 0
}
```

#### Ingredientes (`/api/ingredientes`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/ingredientes` | Listar todos los ingredientes | No |
| GET | `/api/ingredientes/{id}` | Obtener ingrediente por ID | No |
| POST | `/api/ingredientes` | Crear nuevo ingrediente | USER/ADMIN |

#### Despensa (`/api/despensa`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/despensa` | Listar items de la despensa del usuario | USER |
| POST | `/api/despensa` | Añadir item a despensa | USER |
| PUT | `/api/despensa/{id}` | Actualizar cantidad o ubicación | USER |
| DELETE | `/api/despensa/{id}` | Eliminar item de despensa | ADMIN |

#### Planificación (`/api/planificaciones`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/planificaciones` | Listar planificaciones del usuario | USER |
| POST | `/api/planificaciones` | Crear nueva planificación semanal | USER |
| GET | `/api/planificaciones/{id}` | Obtener planificación con días | USER |

#### Listas de Compra (`/api/listas-compra`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/listas-compra` | Listar listas del usuario | USER |
| POST | `/api/listas-compra` | Crear lista de compra | USER |
| GET | `/api/listas-compra/{id}` | Obtener lista con items | USER |

### Códigos de Estado HTTP

La API utiliza correctamente los códigos de estado HTTP:

#### Respuestas Exitosas

- **200 OK**: Petición exitosa (GET, PUT)
- **201 Created**: Recurso creado exitosamente (POST)
- **204 No Content**: Eliminación exitosa (DELETE)

#### Errores del Cliente

- **400 Bad Request**: Validación fallida o datos inválidos
- **401 Unauthorized**: No autenticado o token inválido
- **403 Forbidden**: Sin permisos para acceder al recurso
- **404 Not Found**: Recurso no encontrado
- **422 Unprocessable Entity**: Violación de reglas de negocio

#### Errores del Servidor

- **500 Internal Server Error**: Error inesperado del servidor

### Ejemplos de Uso

#### Flujo completo: Registro, Login y Crear Receta

```bash
# 1. Registrar usuario
curl -X POST http://localhost:8080/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "email": "chef@ejemplo.com",
    "password": "mipassword123"
  }'

# Response: { "token": "eyJhbG...", "email": "chef@ejemplo.com", "rol": "ROLE_USER" }

# 2. Login (obtener token)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "chef@ejemplo.com",
    "password": "mipassword123"
  }'

# Response: { "token": "eyJhbG...", ... }

# 3. Crear receta (usando el token)
curl -X POST http://localhost:8080/api/recetas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbG..." \
  -d '{
    "nombre": "Tortilla de patatas",
    "descripcion": "Receta tradicional española",
    "tiempoPreparacion": 30,
    "porciones": 4,
    "dificultad": "MEDIA",
    "etiquetas": ["VEGETARIANO"]
  }'
```

#### Buscar recetas rápidas

```bash
curl -X GET "http://localhost:8080/api/recetas/rapidas?minutos=30"

# Response:
[
  {
    "id": 5,
    "nombre": "Ensalada César",
    "tiempoPreparacion": 15,
    "porciones": 2
  },
  {
    "id": 12,
    "nombre": "Pasta al pesto",
    "tiempoPreparacion": 20,
    "porciones": 3
  }
]
```

---

## Autenticación y Autorización

### Sistema JWT

El proyecto implementa autenticación basada en **JSON Web Tokens (JWT)** sin estado (stateless).

#### Flujo de Autenticación

1. **Registro/Login**: El usuario envía credenciales a `/api/auth/login`
2. **Generación de Token**: El servidor valida y genera un JWT firmado
3. **Envío al Cliente**: Se devuelve el token en la respuesta
4. **Uso del Token**: El cliente incluye el token en el header `Authorization: Bearer <token>`
5. **Validación**: Un filtro (`JwtAuthenticationFilter`) valida el token en cada petición

#### Configuración JWT

```java
// application.properties
jwt.secret=${JWT_SECRET:clave_por_defecto_desarrollo}
jwt.expiration=86400000  // 24 horas en milisegundos
```

#### Estructura del Token

El token JWT contiene:
- **Subject**: Email del usuario
- **Issued At**: Fecha de emisión
- **Expiration**: Fecha de expiración (24h)
- **Claims**: Información adicional (rol, etc.)

#### Implementación del Filtro

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) {
        String jwt = parseJwt(request); // Extrae token del header
        
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String email = jwtUtils.getEmailFromJwtToken(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            
            // Establece la autenticación en el contexto de seguridad
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
}
```

### Roles y Permisos

El sistema define dos roles principales:

#### ROLE_USER
- Usuarios estándar registrados
- Pueden gestionar su propia despensa
- Pueden crear y guardar recetas
- Pueden crear planificaciones y listas de compra
- **No pueden eliminar recursos** (solo ADMIN)

#### ROLE_ADMIN
- Administradores del sistema
- Todos los permisos de ROLE_USER
- Pueden eliminar cualquier recurso (DELETE)
- Pueden acceder a información de todos los usuarios

### Seguridad de Endpoints

#### Rutas Públicas (sin autenticación)

```java
.requestMatchers("/api/auth/**").permitAll()
.requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
.requestMatchers(HttpMethod.GET, "/api/recetas/**").permitAll()
.requestMatchers(HttpMethod.GET, "/api/ingredientes/**").permitAll()
```

#### Rutas Protegidas por Rol

```java
// Solo administradores pueden eliminar
.requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")

// Usuarios autenticados pueden crear
.requestMatchers(HttpMethod.POST, "/api/recetas/**").hasAnyRole("USER", "ADMIN")

// Acceso a datos propios del usuario
.requestMatchers(HttpMethod.GET, "/api/usuarios/*/despensa/**")
    .hasAnyRole("USER", "ADMIN")
```

#### Anotaciones de Seguridad

También se pueden proteger métodos específicos con anotaciones:

```java
@PreAuthorize("hasRole('ADMIN')")
public void eliminarReceta(Long id) {
    recetaRepository.deleteById(id);
}

@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public RecetaResponse crear(RecetaCreateRequest request) {
    // ...
}
```

---

## Instalación y Configuración

### Requisitos Previos

- **Java JDK 21** o superior
- **Maven 3.8+**
- **PostgreSQL 16** (o MySQL, o H2 para testing)
- **Docker** (opcional, para levantar base de datos con docker-compose)
- **Git**

### Configuración de la Base de Datos

#### Opción 1: Usar Docker Compose (Recomendado)

El proyecto incluye un archivo `docker-compose.yml` que levanta PostgreSQL y pgAdmin:

```bash
# Levantar contenedores
docker-compose up -d

# Verificar que estén corriendo
docker ps
```

Credenciales por defecto:
- **PostgreSQL**:
  - Host: `localhost:5432`
  - Database: `despiensa`
  - User: `postgres`
  - Password: `postgres`

- **pgAdmin** (http://localhost:5050):
  - Email: `admin@example.com`
  - Password: `admin`

#### Opción 2: Instalación Manual de PostgreSQL

1. Descargar e instalar PostgreSQL 16
2. Crear la base de datos:

```sql
CREATE DATABASE despiensa;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE despiensa TO postgres;
```

### Variables de Entorno

El proyecto utiliza variables de entorno para configuración sensible.

#### Desarrollo

Crear archivo `.env` en la raíz del proyecto (copiar de `.env.example`):

```bash
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=despiensa
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=dGhpc0lzQVZlcnlTZWNyZXRLZXlGb3JKV1RUb2tlbkdlbmVyYXRpb25JblNwcmluZ0Jvb3Q=

# Perfil activo
SPRING_PROFILES_ACTIVE=dev
```

#### Producción

Usar variables de entorno del sistema o crear `.env.prod`:

```bash
# IMPORTANTE: Cambiar estos valores en producción
DB_HOST=tu-servidor-bd.com
DB_PORT=5432
DB_NAME=despiensa_prod
DB_USER=usuario_produccion
DB_PASSWORD=contraseña_segura_compleja

JWT_SECRET=clave_jwt_muy_segura_generada_aleatoriamente
SPRING_PROFILES_ACTIVE=prod
```

**Generar JWT_SECRET seguro:**

```bash
# En Linux/Mac
openssl rand -base64 64

# En Windows PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Ejecución del Proyecto

#### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd backend
```

#### 2. Instalar dependencias

```bash
./mvnw clean install
```

O en Windows:
```cmd
mvnw.cmd clean install
```

#### 3. Ejecutar tests

```bash
./mvnw test
```

#### 4. Ejecutar la aplicación

```bash
./mvnw spring-boot:run
```

O compilar y ejecutar el JAR:

```bash
./mvnw package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

#### 5. Verificar que funciona

- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs JSON: http://localhost:8080/v3/api-docs

### Perfiles de Spring

El proyecto usa perfiles para diferentes entornos:

- **dev** (desarrollo): `application-dev.properties`
  - Base de datos local
  - DDL auto-update habilitado
  - Logs detallados

- **prod** (producción): `application-prod.properties`
  - Variables de entorno obligatorias
  - DDL en modo validate (no crea tablas)
  - Optimizaciones de conexión

Cambiar perfil:
```bash
java -jar app.jar --spring.profiles.active=prod
```

---

## Documentación de la API

### Swagger/OpenAPI

El proyecto incluye documentación automática de la API con **SpringDoc OpenAPI**.

#### Acceder a Swagger UI

1. Ejecutar la aplicación
2. Abrir navegador en: http://localhost:8080/swagger-ui/index.html

(INSERTAR captura de Swagger UI mostrando los endpoints)

#### Características de la Documentación

- **Listado completo de endpoints**: Todos los controladores y métodos
- **Esquemas de DTOs**: Estructura de peticiones y respuestas
- **Try it out**: Probar endpoints directamente desde el navegador
- **Autenticación JWT**: Botón "Authorize" para añadir token Bearer
- **Ejemplos de uso**: Valores de ejemplo en cada campo

#### Configuración de Swagger

```java
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Despiensa API")
                .version("1.0.0")
                .description("API REST para gestión de despensa y planificación de comidas"))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
            .components(new Components()
                .addSecuritySchemes("bearerAuth",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

#### Usar autenticación en Swagger

1. Hacer login en `/api/auth/login` desde Swagger
2. Copiar el token de la respuesta
3. Clic en botón "Authorize" (candado verde)
4. Pegar token en formato: `Bearer <tu-token>`
5. Ahora puedes probar endpoints protegidos

#### Exportar Documentación

- **OpenAPI JSON**: http://localhost:8080/v3/api-docs
- **YAML**: http://localhost:8080/v3/api-docs.yaml

---

## Testing

### Estrategia de Testing

El proyecto incluye tests unitarios para validar el modelo de datos y las validaciones.

#### Tests de Modelo

Ubicación: `src/test/java/com/example/backend/model/`

Se prueban:
- Validaciones de campos (`@NotNull`, `@Email`, `@Size`, etc.)
- Constraints de negocio
- Builders y constructores
- Relaciones entre entidades

**Ejemplo de test:**

```java
@DisplayName("Tests de la entidad Usuario")
class UsuarioTest {
    
    private static Validator validator;
    
    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }
    
    @Test
    @DisplayName("Debe crear un usuario válido con todos los campos requeridos")
    void testCrearUsuarioValido() {
        Usuario usuario = Usuario.builder()
            .email("test@ejemplo.com")
            .password("password123")
            .rol(Usuario.Rol.ROLE_USER)
            .fechaRegistro(LocalDateTime.now())
            .build();
        
        Set<ConstraintViolation<Usuario>> violations = validator.validate(usuario);
        
        assertTrue(violations.isEmpty(), "No debe haber violaciones");
        assertEquals("test@ejemplo.com", usuario.getEmail());
    }
    
    @Test
    @DisplayName("Debe fallar cuando el email es inválido")
    void testEmailInvalido() {
        Usuario usuario = Usuario.builder()
            .email("email-invalido")
            .password("password123")
            .rol(Usuario.Rol.ROLE_USER)
            .build();
        
        Set<ConstraintViolation<Usuario>> violations = validator.validate(usuario);
        
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
            .anyMatch(v -> v.getPropertyPath().toString().equals("email")));
    }
}
```

#### Ejecutar Tests

```bash
# Todos los tests
./mvnw test

# Tests de un paquete específico
./mvnw test -Dtest=com.example.backend.model.*

# Un test específico
./mvnw test -Dtest=UsuarioTest

# Con cobertura (si está configurado)
./mvnw test jacoco:report
```

#### Reportes de Tests

Los resultados se encuentran en:
- `target/surefire-reports/` - Reportes en XML y TXT
- `target/site/jacoco/` - Cobertura de código (si está configurado)

---

## Estructura del Proyecto

### Organización de Paquetes

```
src/
├── main/
│   ├── java/com/example/backend/
│   │   ├── BackendApplication.java          # Clase principal
│   │   ├── config/                          # Configuraciones
│   │   │   ├── SecurityConfig.java          # Spring Security + JWT
│   │   │   ├── OpenApiConfig.java           # Swagger/OpenAPI
│   │   │   └── DataSeederConfig.java        # Carga de datos iniciales
│   │   ├── controller/                      # Controladores REST
│   │   │   ├── AuthController.java          # Login y registro
│   │   │   ├── RecetaController.java        # CRUD de recetas
│   │   │   ├── IngredienteController.java
│   │   │   ├── DespensaItemController.java
│   │   │   ├── PlanificacionSemanaController.java
│   │   │   └── ListaCompraController.java
│   │   ├── dto/                             # Data Transfer Objects
│   │   │   ├── RecetaCreateRequest.java     # DTOs de entrada
│   │   │   ├── RecetaResponse.java          # DTOs de salida
│   │   │   ├── AuthResponse.java
│   │   │   └── ...
│   │   ├── exception/                       # Manejo de errores
│   │   │   ├── GlobalExceptionHandler.java  # Captura excepciones
│   │   │   └── ErrorResponse.java           # Estructura de errores
│   │   ├── model/                           # Entidades JPA
│   │   │   ├── Usuario.java
│   │   │   ├── Receta.java
│   │   │   ├── Ingrediente.java
│   │   │   ├── DespensaItem.java
│   │   │   └── ...
│   │   ├── repository/                      # Repositorios JPA
│   │   │   ├── UsuarioRepository.java
│   │   │   ├── RecetaRepository.java        # Con consultas personalizadas
│   │   │   └── ...
│   │   ├── security/                        # Componentes de seguridad
│   │   │   ├── JwtUtils.java                # Generación/validación JWT
│   │   │   ├── JwtAuthenticationFilter.java # Filtro de autenticación
│   │   │   └── UserDetailsServiceImpl.java  # Carga de usuarios
│   │   └── service/                         # Lógica de negocio
│   │       ├── AuthService.java             # Login y registro
│   │       ├── RecetaService.java           # Lógica de recetas
│   │       └── ...
│   └── resources/
│       ├── application.properties           # Configuración principal
│       ├── application-dev.properties       # Perfil desarrollo
│       ├── application-prod.properties      # Perfil producción
│       ├── db/migration/                    # Scripts SQL
│       │   └── V1__Init_Database.sql
│       └── data/
│           └── recetas_reales.json          # Datos de ejemplo
└── test/
    └── java/com/example/backend/
        └── model/                           # Tests unitarios
            ├── UsuarioTest.java
            ├── RecetaTest.java
            └── ...
```

### Patrones de Diseño Utilizados

#### 1. Repository Pattern

Abstracción de la capa de acceso a datos:

```java
@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    List<Receta> findByNombreContainingIgnoreCase(String nombre);
    
    @Query("SELECT r FROM Receta r WHERE r.tiempoPreparacion <= :minutos")
    List<Receta> findRecetasRapidas(@Param("minutos") Integer minutos);
}
```

#### 2. Service Layer Pattern

Encapsulación de lógica de negocio:

```java
@Service
@Transactional
public class RecetaService {
    private final RecetaRepository recetaRepository;
    
    public RecetaResponse crear(RecetaCreateRequest request) {
        // Validaciones de negocio
        // Transformación de DTOs
        // Persistencia
        // Retorno de respuesta
    }
}
```

#### 3. DTO Pattern

Separación entre el modelo de dominio y la representación API:

```java
// Request DTO (entrada)
public class RecetaCreateRequest {
    @NotBlank
    private String nombre;
    
    @Min(1)
    private Integer tiempoPreparacion;
    // ...
}

// Response DTO (salida)
public class RecetaResponse {
    private Long id;
    private String nombre;
    private Integer tiempoPreparacion;
    // Sin exponer relaciones complejas
}
```

#### 4. Builder Pattern

Construcción fluida de objetos (via Lombok):

```java
Receta receta = Receta.builder()
    .nombre("Paella")
    .tiempoPreparacion(45)
    .porciones(4)
    .build();
```

---

## Consultas Personalizadas

### Consultas Derivadas (Query Methods)

Spring Data JPA genera automáticamente consultas a partir del nombre del método:

```java
// Buscar por nombre (case insensitive, parcial)
List<Receta> findByNombreContainingIgnoreCase(String nombre);

// Buscar por porciones exactas
List<Receta> findByPorciones(Integer porciones);

// Paginación automática
Page<Receta> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);
```

### Consultas JPQL Personalizadas

Para consultas más complejas, se usan anotaciones `@Query`:

```java
@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    
    /**
     * Encuentra recetas con tiempo de preparación menor o igual a X minutos,
     * ordenadas por tiempo ascendente.
     */
    @Query("SELECT r FROM Receta r WHERE r.tiempoPreparacion <= :minutos ORDER BY r.tiempoPreparacion ASC")
    List<Receta> findRecetasRapidas(@Param("minutos") Integer minutos);
    
    /**
     * Obtiene recetas ordenadas por fecha de creación descendente.
     */
    @Query("SELECT r FROM Receta r ORDER BY r.fechaCreacion DESC")
    List<Receta> findAllOrderByFechaCreacionDesc();
    
    /**
     * Cuenta el total de recetas (método heredado de JpaRepository).
     */
    long count();
}
```

### Consultas con Agregación

Ejemplos de consultas con funciones agregadas:

```java
// Contar ingredientes por categoría
@Query("SELECT i.categoria, COUNT(i) FROM Ingrediente i GROUP BY i.categoria")
List<Object[]> countIngredientesPorCategoria();

// Promedio de tiempo de preparación
@Query("SELECT AVG(r.tiempoPreparacion) FROM Receta r")
Double avgTiempoPreparacion();

// Recetas con más ingredientes
@Query("SELECT r FROM Receta r JOIN r.ingredientes ri GROUP BY r ORDER BY COUNT(ri) DESC")
List<Receta> findRecetasConMasIngredientes(Pageable pageable);
```

### Consultas Nativas (SQL)

Para casos muy específicos:

```java
@Query(value = "SELECT * FROM receta WHERE EXTRACT(YEAR FROM fecha_creacion) = :year", 
       nativeQuery = true)
List<Receta> findByYear(@Param("year") int year);
```

---

## Manejo de Errores

### GlobalExceptionHandler

El proyecto utiliza un manejador global de excepciones con `@RestControllerAdvice`:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    /**
     * Maneja errores de validación (@Valid en DTOs).
     * Devuelve 400 Bad Request con detalles de cada campo inválido.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String campo = ((FieldError) error).getField();
            String mensaje = error.getDefaultMessage();
            errores.put(campo, mensaje);
        });
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(400)
            .error("Bad Request")
            .message("Errores de validación")
            .detalles(errores)
            .build();
            
        return ResponseEntity.badRequest().body(error);
    }
    
    /**
     * Maneja credenciales inválidas en login.
     * Devuelve 401 Unauthorized.
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(
            BadCredentialsException ex) {
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(401)
            .error("Unauthorized")
            .message("Credenciales inválidas")
            .build();
            
        return ResponseEntity.status(401).body(error);
    }
    
    /**
     * Maneja acceso denegado por falta de permisos.
     * Devuelve 403 Forbidden.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(
            AccessDeniedException ex) {
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(403)
            .error("Forbidden")
            .message("No tienes permisos para acceder a este recurso")
            .build();
            
        return ResponseEntity.status(403).body(error);
    }
    
    /**
     * Maneja recursos no encontrados.
     * Devuelve 404 Not Found.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            IllegalArgumentException ex) {
        
        HttpStatus status = ex.getMessage().contains("no encontrad") 
            ? HttpStatus.NOT_FOUND 
            : HttpStatus.BAD_REQUEST;
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(status.value())
            .error(status.getReasonPhrase())
            .message(ex.getMessage())
            .build();
            
        return ResponseEntity.status(status).body(error);
    }
}
```

### Estructura de Respuesta de Error

```json
{
  "timestamp": "2026-01-28T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Errores de validación",
  "detalles": {
    "email": "El formato del email no es válido",
    "password": "La contraseña debe tener al menos 8 caracteres"
  }
}
```

---

## CORS y Configuración de Seguridad

### Configuración CORS

Permite peticiones desde el frontend Angular:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    
    // Orígenes permitidos (frontend Angular)
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    
    // Métodos HTTP permitidos
    configuration.setAllowedMethods(Arrays.asList(
        "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
    ));
    
    // Headers permitidos
    configuration.setAllowedHeaders(Arrays.asList("*"));
    
    // Permitir credenciales (cookies, authorization headers)
    configuration.setAllowCredentials(true);
    
    // Headers expuestos al cliente
    configuration.setExposedHeaders(Arrays.asList("Authorization"));
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### Flujo de Seguridad Completo

1. **Petición sin token** → Rutas públicas (`/api/auth`, `/api/recetas` GET)
2. **Petición con token** → `JwtAuthenticationFilter` valida token
3. **Token válido** → Extrae usuario y establece autenticación
4. **Verificación de roles** → `SecurityFilterChain` verifica permisos
5. **Acceso permitido** → Ejecuta controlador
6. **Acceso denegado** → 403 Forbidden

### Configuración de Filtros

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // API REST sin estado
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/recetas/**").permitAll()
            .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthenticationFilter, 
                         UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
}
```

---

## Próximos Pasos y Mejoras

### Tests Adicionales Recomendados

- Tests de integración con `@SpringBootTest` y `MockMvc`
- Tests de repositorios con `@DataJpaTest`
- Tests de servicios con mocks (`@MockBean`)
- Cobertura de código con JaCoCo

### Funcionalidades Futuras

- Sistema de notificaciones para ingredientes próximos a caducar
- Recomendaciones de recetas basadas en ingredientes disponibles
- Integración con APIs de nutrición
- Sistema de calificaciones y comentarios en recetas
- Compartir listas de compra por WhatsApp/Telegram
- Generación de PDFs con planificaciones semanales

### Optimizaciones

- Caché con Redis para recetas frecuentes
- Paginación en todas las consultas grandes
- Índices de base de datos para búsquedas frecuentes
- Rate limiting para prevenir abuso de la API

---

## Contacto y Soporte

Para preguntas, problemas o sugerencias:

- **Email**: falbmun0906@g.educaand.es
- **Repositorio**: [GitHub](https://github.com/falbmun0906/daw2-proyecto-intermodular)
- **Documentación**: http://localhost:8080/swagger-ui.html

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.
