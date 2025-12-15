# 🧪 Testing de la API Despiensa con Postman/Newman

Esta carpeta contiene la colección de Postman y scripts para probar la API REST de Despiensa.

## 📁 Contenido

- `Despiensa_API_Collection.json` - Colección de Postman con todos los endpoints
- `Despiensa_Local_Environment.json` - Variables de entorno para localhost
- `run-newman-tests.bat` - Script para ejecutar tests automáticamente (Windows)
- `reports/` - Carpeta donde se generan los reportes HTML

---

## Uso Rápido

### Opción 1: Postman GUI

1. Abre Postman
2. Importa la colección: `Despiensa_API_Collection.json`
3. Importa el entorno: `Despiensa_Local_Environment.json`
4. Selecciona el entorno "Despiensa Local"
5. Ejecuta las peticiones en orden:
   - Primero: **1. Autenticación** → **Registro de Usuario**
   - Luego: Explora las demás carpetas

### Opción 2: Newman (CLI)

#### Instalación (solo la primera vez):
```bash
npm install -g newman
npm install -g newman-reporter-htmlextra
```

#### Ejecutar tests:

**Windows**:
```bash
run-newman-tests.bat
```

**Linux/Mac**:
```bash
newman run postman/Despiensa_API_Collection.json \
  -e postman/Despiensa_Local_Environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export postman/reports/test-report.html
```

---

## Estructura de la Colección

### 1. Autenticación 🔐
- **Registro de Usuario** - Crea cuenta y obtiene JWT
- **Login** - Autentica y obtiene JWT

### 2. Ingredientes 🥕
- Crear ingredientes (Tomate, Pasta, etc.)
- Listar ingredientes
- Buscar por nombre
- Obtener categorías

### 3. Recetas 🍝
- Crear receta (Pasta con Tomate)
- Listar recetas con paginación
- Buscar recetas rápidas
- Contar recetas

### 4. Receta Ingredientes 📝
- Agregar ingredientes a receta
- Listar ingredientes de receta

### 5. Despensa 🏠
- Agregar items a despensa
- Listar despensa
- Filtrar por estado (caducados, OK)

### 6. Recetas de Usuario ⭐
- Guardar receta como favorita
- Listar favoritas

### 7. Planificación Semanal 📅
- Crear planificación semanal
- Listar planificaciones
- Obtener más reciente

### 8. Lista de Compra 🛒
- Crear lista de compra
- Agregar items
- Listar pendientes

### 9. Tests de Seguridad 🔒
- Acceso sin token (debe fallar 401)
- Login con credenciales incorrectas (debe fallar 401)

---

## Variables Automáticas

La colección guarda automáticamente:
- `jwt_token` - Token JWT después del registro/login
- `usuario_id` - ID del usuario autenticado
- `receta_id` - ID de la última receta creada
- `ingrediente_id` - ID del último ingrediente creado
- `planificacion_id` - ID de la última planificación creada
- `lista_id` - ID de la última lista creada

Estas variables se usan en las peticiones subsiguientes.

---

## Tests Incluidos

Cada petición incluye tests automáticos:

- **Registro**: Verifica que se reciba token JWT y rol ROLE_USER
- **Login**: Verifica status 200 y guarda token
- **Endpoints protegidos**: Verifican autenticación correcta

---

## 📊 Reportes HTML

Newman genera reportes HTML detallados con:
- Tests pasados/fallidos
- Tiempos de respuesta
- Gráficos de resultados
- Request/Response completos

Los reportes se guardan en: `postman/reports/`

---

## Troubleshooting

### Error: "Newman no está instalado"
```bash
npm install -g newman newman-reporter-htmlextra
```

### Error: "Servidor no accesible"
Asegúrate de que Spring Boot esté corriendo:
```bash
cd backend
mvn spring-boot:run
```

### Error: "401 Unauthorized"
1. Ejecuta primero "Registro de Usuario" o "Login"
2. El token JWT se guarda automáticamente
3. Verifica que el entorno "Despiensa Local" esté seleccionado

### Error: "404 Not Found"
- Verifica que `baseUrl` sea `http://localhost:8080`
- Confirma que el servidor esté en puerto 8080

---

## Flujo Recomendado de Testing

1. **Levantar servidor**:
   ```bash
   mvn spring-boot:run
   ```

2. **Ejecutar tests en orden**:
   - ✅ Autenticación (Registro/Login)
   - ✅ Ingredientes (Crear 2-3 ingredientes)
   - ✅ Recetas (Crear receta)
   - ✅ Receta Ingredientes (Agregar ingredientes a receta)
   - ✅ Despensa (Agregar items)
   - ✅ Recetas de Usuario (Guardar favoritas)
   - ✅ Planificación (Crear planificación semanal)
   - ✅ Lista de Compra (Crear lista y agregar items)
   - ✅ Tests de Seguridad (Verificar protecciones)

3. **Revisar reporte HTML** en `postman/reports/`

---

## Recursos

- [Documentación de Newman](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)
- [Postman Learning Center](https://learning.postman.com/)
- [Newman Reporter HTMLExtra](https://www.npmjs.com/package/newman-reporter-htmlextra)

---

## Personalización

### Cambiar servidor (producción, staging, etc.):

Edita `Despiensa_Local_Environment.json`:
```json
{
  "key": "baseUrl",
  "value": "https://api.despiensa.com"
}
```

O crea un nuevo entorno para cada ambiente.

---

