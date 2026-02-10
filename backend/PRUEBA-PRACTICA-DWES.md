## PRUEBA PRÁCTICA DWES

### Creación de un nuevo endpoint :

Para el desarrollo de este nuevo endpoint, he creado un nuevo DTO para la respuesta de las sugerencias, llamado `SugerenciaResponse`. Este DTO contiene los campos necesarios para representar la información de una sugerencia.

**Propósito**: El objetivo de este nuevo endpoint es añadir una funcionalidad al ya existente: crear sugerencias. Este anterior ofrece al usuario enviar una sugerencia, en forma de asunto y descripción para la mejora de la aplicación. Hasta el momento de la implementación actual, no existía una funcionalidad que permitiese al los usuarios ADMIN obtener todas las sugerencias enviadas por los usuarios, lo que es fundamental para que puedan revisar las sugerencias y tomar decisiones sobre posibles mejoras en la aplicación.

**Implementación**: Este nuevo endpoint, al igual que los anteriores, se ha implementado siguiendo la arquitectura de capas, utilizando el patrón DTO para la transferencia de datos. Se ha añadido una función en el servicio de sugerencias que permite obtener todas las sugerencias almacenadas en la base de datos. Esta función se encarga de interactuar con el repositorio para recuperar los datos y luego transformarlos en objetos `SugerenciaResponse` antes de devolverlos al controlador.

- **Modelo**: Se ha partido de la entidad Sugerencia, que representa la estructura de los datos en la base de datos. Esta entidad contiene campos como id, asunto, descripción, fecha de creación, etc.

```java
@Entity
@Table(name = "sugerencia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sugerencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del ingrediente", example = "1")
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotBlank(message = "El asunto es obligatorio")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String asunto;

    @NotBlank(message = "La descripción es obligatoria")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @NotNull(message = "La fecha es obligatoria")
    @Column(nullable = false)
    private LocalDate fechaDeCreacion;
}
```

- **Repository**: El repositorio se ha implementado utilizando JPA Repository.

```java
@Repository
public interface SugerenciaRepository extends JpaRepository<Sugerencia, Long> {
}
```

- **Service**: En la capa de servicio, que controla la lógica de negocio, se ha añadido una función para obtener todas las sugerencias. Esta función interactúa con el repositorio para recuperar los datos y luego los transforma en objetos `SugerenciaResponse`. La nueva funcionalidad implementada 'bebe' de este nuevo método `obtenerTodas()`.

```java
public List<SugerenciaResponse> obtenerTodas() {
        return sugerenciaRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
```

- **Controller**: Finalmente, en el controlador, se ha añadido un nuevo endpoint que permite a los usuarios ADMIN acceder a la lista de sugerencias. Este endpoint se ha protegido con la anotación `@PreAuthorize` para asegurar que SOLO los usuarios con el rol ADMIN puedan acceder a esta información.

```java
/**
     * Lista todos las sugerencias con paginación opcional.
     * GET /api/sugerencias?page=0&size=10
     *
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de sugerencias o lista completa
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtenerTodos(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<SugerenciaResponse> sugerencias = sugerenciaService.obtenerTodas(pageable);
            return ResponseEntity.ok(sugerencias);
        } else {
            List<SugerenciaResponse> sugerencias = sugerenciaService.obtenerTodas();
            return ResponseEntity.ok(sugerencias);
        }
    }
```

### Seguridad:

Es aquí donde dejo reflejado la implemetación de la seguridad. Como he indicado antes, el nuevo endpoint para obtener todas las sugerencias se ha protegido utilizando la anotación `@PreAuthorize("hasRole('ADMIN')")`. Esto asegura que SOLO los usuarios con el rol ADMIN puedan acceder a esta información, lo que es crucial para mantener la seguridad y privacidad de los datos de los usuarios.

Además, ha sido necesario realizar modificaciones en el fichero de configuración de seguridad (`SecurityConfig`) para asegurar que los roles y permisos estén correctamente definidos y aplicados en toda la aplicación. Se ha añadido de forma explícita la siguiente configuración a la SecurityFilterChain para proteger el nuevo endpoint:

```java
.requestMatchers(HttpMethod.GET, "/api/sugerencias/**").hasRole("ADMIN")
```

Esto asegura que los métodos GET en el endpoint `/api/sugerencias/**`, es decir, el nuevo endpoint que permite obtener todas las sugerencias creadas por los usuasrios, quede solo accesible a usuarios autenticados y que además tengan el rol ADMIN, garantizando así la seguridad de la aplicación y la protección de los datos de los usuarios.

**Autenticación con JTW**: El peso de la autenticación queda relegado al paquete de seguridad de Spring Security, que implementa Json Web Token. De esta forma, el flujo sería el siguiente:

El usuario se logea -> JWT (``JwtUtils``) genera un token -> El token se envía al cliente -> En cada 'intercambio' cliiente/servidor, ese token se enviará en el header de la petición. Es el servidor, gracias a ``JwtAuthenticationFilter``, el encargado de validar el token y, si procede, permitir el acceso a los recursos protegidos que se ajusten al rol concreto. ``UserDetailsServiceImpl`` es el encargado de cargar los detalles del usuario desde la base de datos.

### Pruebas

Para realizar las pruebas solicitadas, se ha utilizado la UI ya implementada en el proyecto, Swagger UI, que permite interactuar con los endpoints de la API de forma sencilla sin necesidad de implementar de antemano una interfaz gráfica específica en la aplicación. Con esto, consigo logear a un usuario con el rol de ADMIN de forma sencilla, obtener el token que se genera y que otorga los permisos necesarios para hacer uso de este nuevo endpoint, y luego realizar una petición GET a este, obteniendo el listado completo de las sugerencias creadas por los usuarios.

**Evidencias**: A continuación, se muestran las evidencias de las pruebas realizadas.

[PENDIENTE INSERTAR DESDE GITHUB: ]