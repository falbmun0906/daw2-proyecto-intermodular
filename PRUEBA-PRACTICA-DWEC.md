## Documentación de la práctica - Parte de DIW

### Componente padre: SugerenciasPage (No funcional. Mockeado)

Se ha creado un componente padre llamado SugerenciasPage que renderiza todas las sugerencias de usuarios que se encuentren en la base de datos.

- **Routing y navegación**: El componente SugerenciasPage se ha integrado en el sistema de routing de la aplicación, lo que permite a los usuarios acceder a la página de sugerencias a través de una URL específica. Esto facilita la navegación y mejora la experiencia del usuario al permitirles encontrar fácilmente la sección de sugerencias.
- **Integración**: El componente SugerenciasPage se ha integrado con el backend de la aplicación para recuperar las sugerencias de los usuarios de la base de datos. Esto se ha logrado utilizando una función que maneja la recuperación y realiza una solicitud HTTP GET al servidor para recuperar las sugerencias.
- **LazyLoading**: Para mejorar el rendimiento de la aplicación, se ha implementado LazyLoading en el componente SugerenciasPage. Esto significa que los datos de las sugerencias se cargan de manera asíncrona cuando el usuario accede a la página, lo que reduce el tiempo de carga inicial y mejora la experiencia del usuario.

### Componente hijo: SugerenciaCard (No funcional. Mockeado)

Se ha creado un componente hijo llamado SugerenciaCard que se encarga de mostrar la información de cada sugerencia de usuario. Este componente recibe los datos de la sugerencia los renderiza de manera atractiva y fácil de leer.

- **Routing y navegación**: El componente SugerenciaCard se utiliza dentro del componente SugerenciasPage para mostrar cada sugerencia individualmente. No tiene su propia ruta, pero se renderiza como parte de la página de sugerencias.
- **Integración**: El componente SugerenciaCard se integra con el componente padre SugerenciasPage al recibir los datos de cada sugerencia como props. Esto permite que el componente SugerenciaCard se mantenga modular y reutilizable, ya que puede ser utilizado para mostrar cualquier sugerencia de usuario sin depender de la estructura específica del componente padre.

NOTA: Se ha creado una interfaz SugerenciaRequest para definir la estructura de los datos que se esperan recibir en el componente SugerenciaCard. Esta interfaz ayuda a garantizar que los datos se manejen de manera consistente y facilita la integración entre el componente padre y el componente hijo. Para poder mostrar datos en la web sin culminar la integración con el backend, se ha creado un mock de sugerencias que se recorrerá con `@for` en el que se renderizará un componente SugerenciaCard por cada sugerencia del mock. No obstante, aunque no se hayan terminado de finalizar, las implementaciones del model (interfaz) y el servicio de sugerencias es la siguiente:

```typescript
@Injectable({
  providedIn: 'root',
})

export class SugerenciaService {
  private api = new ApiService();
  private readonly endpoint = 'sugerencias';

  create(request: { asunto: string; descripcion: string }): Observable<any> {
    return this.api.post(this.endpoint, request).pipe(
      catchError((error: any) => {
        console.error('Error al enviar sugerencia:', error);
        return throwError(() => new Error('Ocurrió un error al enviar la sugerencia. Por favor, inténtalo de nuevo más tarde.'));
      })
    );
  }

  /**
   * GET /api/sugerencia - Obtener todas las sugerencias
   */
  getAll(): Observable<SugerenciaRequest[]> {
    return this.api.get<SugerenciaRequest[]>(this.endpoint).pipe(
      map((response: any) => {
          if (response && Array.isArray(response)) {
            return response.map((item: any) => ({
              id: item.id,
              asunto: item.asunto,
              descripcion: item.descripcion
            }));
          }
          return [];
        }
      ));
  }
}
```

```typescript
export interface SugerenciaRequest {
  id: string;
  asunto: string;
  descripcion: string;
}
```

```typescript
public mockSugerencias: SugerenciaRequest[] = [
  { id: '1', asunto: 'Esta es la sugerencia 1', descripcion: 'Esta es la descripción de la sugerencia 1' },
  { id: '2', asunto: 'Esta es la sugerencia 2', descripcion: 'Esta es la descripción de la sugerencia 2' },
  { id: '3', asunto: 'Esta es la sugerencia 3', descripcion: 'Esta es la descripción de la sugerencia 3' },
  { id: '4', asunto: 'Esta es la sugerencia 4', descripcion: 'Esta es la descripción de la sugerencia 4' },
  { id: '5', asunto: 'Esta es la sugerencia 5', descripcion: 'Esta es la descripción de la sugerencia 5' },
  { id: '6', asunto: 'Esta es la sugerencia 6', descripcion: 'Esta es la descripción de la sugerencia 6' },
];
```

- **LazyLoading**: El componente SugerenciaCard también se beneficia del LazyLoading implementado en el componente SugerenciasPage, ya que los datos de cada sugerencia se cargan de manera asíncrona cuando el usuario accede a la página de sugerencias. Esto garantiza que la información de cada sugerencia se muestre de manera eficiente y sin afectar el rendimiento general de la aplicación.
