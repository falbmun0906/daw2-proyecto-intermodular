# Configuración de Variables de Entorno - Refactorización de Seguridad

## Cambios Realizados

### 1. **application.properties (Principal)**
- JWT_SECRET ahora usa variable de entorno: `${JWT_SECRET:valor_por_defecto}`
- Mantiene valores por defecto para desarrollo
- Activa automáticamente el perfil `dev`

### 2. **application-dev.properties (Desarrollo)**
- Base de datos: Variables de entorno con valores por defecto
  - `DB_HOST:localhost`
  - `DB_PORT:5432`
  - `DB_NAME:despiensa`
  - `DB_USER:postgres`
  - `DB_PASSWORD:postgres`
- JWT_SECRET: Con valor por defecto para desarrollo
- DDL automático habilitado (`ddl-auto=update`)

### 3. **application-prod.properties (Producción)**
- Base de datos: Variables de entorno OBLIGATORIAS (sin valores por defecto)
  - `${DB_HOST}` - REQUERIDO
  - `${DB_PORT}` - REQUERIDO
  - `${DB_NAME}` - REQUERIDO
  - `${DB_USER}` - REQUERIDO
  - `${DB_PASSWORD}` - REQUERIDO
- JWT_SECRET: OBLIGATORIO sin valor por defecto
- DDL configurado como `validate` (no crea tablas)
- Connection pooling optimizado

### 4. **Archivos de Configuración de Entorno**

#### .env.example (Desarrollo)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=despiensa
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=dGhpc0lzQVZlcnlTZWNyZXRLZXlGb3JKV1RUb2tlbkdlbmVyYXRpb25JblNwcmluZ0Jvb3Q=
SPRING_PROFILES_ACTIVE=dev
```

#### .env.prod.example (Producción)
Contiene placeholders que DEBEN ser configurados antes del despliegue:
```
DB_HOST=your-db-host.com
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-db-user
DB_PASSWORD=your-secure-db-password
JWT_SECRET=your-secure-jwt-secret-here
SPRING_PROFILES_ACTIVE=prod
```

#### .env.gitignore
Aseguura que los archivos `.env` reales nunca se comitean:
```
.env
.env.prod
.env.local
*.env
!.env.example
!.env.prod.example
```

### 5. **Dependencia Maven**
Agregada `spring-dotenv` para leer variables de entorno desde archivos `.env`

## Cómo Usar

### Desarrollo Local
1. Copia `.env.example` a `.env`
2. Modifica valores si es necesario (opcional, usa defaults)
3. Spring Boot cargará automáticamente las variables

### Producción
1. Copia `.env.prod.example` a `.env.prod`
2. Edita TODOS los valores (no hay defaults)
3. Establece variables de entorno del sistema:
   ```bash
   export DB_HOST=prod-db.com
   export DB_PORT=5432
   export DB_NAME=prod_despiensa
   export DB_USER=prod_user
   export DB_PASSWORD=secure_password
   export JWT_SECRET=your-generated-secret
   export SPRING_PROFILES_ACTIVE=prod
   ```

## Seguridad

✅ Sin secretos hardcodeados en repositorio
✅ Valores por defecto seguros para desarrollo
✅ Producción requiere configuración explícita
✅ Archivos .env en .gitignore
✅ Fácil rotación de secretos (solo cambiar variables de entorno)

## Generación de JWT Secret Seguro (Producción)

```bash
# Linux/macOS
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

