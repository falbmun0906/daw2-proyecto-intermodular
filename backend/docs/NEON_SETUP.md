# Configuración de Neon Database

Este documento explica cómo configurar Neon PostgreSQL serverless para el proyecto Despiensa.

## ¿Qué es Neon?

Neon es una plataforma de PostgreSQL serverless moderna que ofrece:

- **Auto-scaling**: Escala automáticamente según la demanda
- **Separación de cómputo y almacenamiento**: Paga solo por lo que usas
- **Branching**: Crea ramas de base de datos instantáneas para testing
- **Punto de restauración**: Recupera datos de cualquier momento en el tiempo
- **Tier gratuito generoso**: 3 GB de almacenamiento, 3 proyectos

## Pasos de Configuración

### 1. Crear una Cuenta en Neon

1. Visita [https://neon.tech](https://neon.tech)
2. Haz clic en "Sign Up" o "Start Free"
3. Regístrate con GitHub, Google o email
4. Verifica tu email si es necesario

### 2. Crear un Proyecto

1. Una vez logueado, haz clic en "Create a project" o "New Project"
2. Configura tu proyecto:
   - **Nombre del proyecto**: `despiensa` o `despiensa-dev`
   - **Región**: Selecciona la más cercana (ej: `US East (Ohio)`, `EU (Frankfurt)`)
   - **PostgreSQL version**: 16 (recomendado)
   - **Compute size**: Selecciona según necesidad (Starter es suficiente para desarrollo)

3. Haz clic en "Create project"

### 3. Obtener las Credenciales de Conexión

Neon te proporcionará automáticamente:

1. **Connection String**: La URL completa de conexión
2. **Host**: El endpoint de tu base de datos
3. **Database**: Nombre de la base de datos (por defecto `neondb`)
4. **User**: Usuario de la base de datos
5. **Password**: Contraseña generada

**Ejemplo de Connection String proporcionado por Neon:**
```
postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 4. Adaptar la Connection String para Spring Boot

Spring Boot usa el prefijo `jdbc:postgresql://` en lugar de solo `postgresql://`.

**Conversión:**

De esto (Neon):
```
postgresql://myuser:mypass123@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

A esto (Spring Boot):
```
jdbc:postgresql://ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Separar las credenciales:**
- **NEON_DATABASE_URL**: `jdbc:postgresql://ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`
- **NEON_DB_USER**: `myuser`
- **NEON_DB_PASSWORD**: `mypass123`

### 5. Configurar Variables de Entorno Locales

#### Opción A: Crear archivo `.env`

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus credenciales de Neon:
   ```env
   # Connection String completa
   NEON_DATABASE_URL=jdbc:postgresql://ep-your-project-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   
   # Credenciales
   NEON_DB_USER=your-username
   NEON_DB_PASSWORD=your-password
   
   # SSL Mode
   DB_SSL_MODE=prefer
   
   # JWT
   JWT_SECRET=dGhpc0lzQVZlcnlTZWNyZXRLZXlGb3JKV1RUb2tlbkdlbmVyYXRpb25JblNwcmluZ0Jvb3Q=
   
   # Perfil
   SPRING_PROFILES_ACTIVE=dev
   ```

3. El archivo `.env` está en `.gitignore`, así que tus credenciales no se subirán a Git

#### Opción B: Variables de Entorno del Sistema (Windows)

```powershell
# PowerShell
$env:NEON_DATABASE_URL = "jdbc:postgresql://ep-your-project.us-east-2.aws.neon.tech/neondb?sslmode=require"
$env:NEON_DB_USER = "your-username"
$env:NEON_DB_PASSWORD = "your-password"
$env:SPRING_PROFILES_ACTIVE = "dev"
```

### 6. Ejecutar la Aplicación

```bash
# Compilar
./mvnw clean install

# Ejecutar
./mvnw spring-boot:run
```

La aplicación se conectará automáticamente a Neon y creará las tablas necesarias (porque `ddl-auto=update` en dev).

### 7. Verificar la Conexión

1. Revisa los logs de la aplicación:
   ```
   Hikari Pool - Starting...
   HikariPool-1 - Start completed.
   ```

2. Verifica en Neon Console:
   - Ve a tu proyecto en [https://console.neon.tech](https://console.neon.tech)
   - Sección "Monitoring" para ver conexiones activas
   - Sección "Tables" para ver las tablas creadas

## Configuración para Producción

### 1. Crear Proyecto de Producción

Recomendado: Crea un proyecto separado en Neon para producción:
- Nombre: `despiensa-production`
- Región: Donde esté tu servidor de producción
- Compute: Según necesidades de producción

### 2. Variables de Entorno en Producción

```bash
# Linux/Mac
export NEON_DATABASE_URL="jdbc:postgresql://ep-production.region.aws.neon.tech/despiensa_prod?sslmode=require"
export NEON_DB_USER="prod_user"
export NEON_DB_PASSWORD="secure_password_here"
export JWT_SECRET="your_production_jwt_secret"
export SPRING_PROFILES_ACTIVE="prod"
```

### 3. Ejecutar con Perfil de Producción

```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

## Características Avanzadas de Neon

### Branching (Ramas de Base de Datos)

Neon permite crear "ramas" de tu base de datos para testing:

1. En Neon Console, ve a "Branches"
2. Haz clic en "Create branch"
3. Nombre: `testing` o `feature-nueva-funcionalidad`
4. Se crea una copia instantánea de tu base de datos

Cada rama tiene su propia connection string, ideal para:
- Testing sin afectar producción
- Desarrollo de features sin riesgo
- CI/CD pipelines

### Point-in-Time Restore

Restaura tu base de datos a cualquier momento:

1. Ve a "Restore" en Neon Console
2. Selecciona fecha y hora
3. Crea una nueva rama con los datos de ese momento

### Auto-Suspend

Neon pausará automáticamente tu base de datos después de 5 minutos de inactividad (tier gratuito), reduciendo costos.

## Migración desde Docker PostgreSQL Local

Si ya tienes datos en PostgreSQL local:

### 1. Exportar Datos

```bash
# Desde Docker
docker exec -t despiensa_postgres pg_dump -U postgres despiensa > backup.sql
```

### 2. Importar a Neon

```bash
# Conectar a Neon y ejecutar el dump
psql "postgresql://username:password@ep-your-project.us-east-2.aws.neon.tech/neondb?sslmode=require" < backup.sql
```

## Troubleshooting

### Error: "Connection refused"

**Causa**: Connection string incorrecta o SSL mal configurado

**Solución**:
- Verifica que el connection string empiece con `jdbc:postgresql://`
- Asegúrate de que `sslmode=require` o `sslmode=prefer` esté en la URL
- Verifica que las credenciales sean correctas

### Error: "SSL required"

**Causa**: Neon requiere SSL pero no está configurado

**Solución**:
- Añade `?sslmode=require` al final del connection string
- Verifica que `spring.datasource.hikari.data-source-properties.ssl=true` esté configurado

### Error: "Too many connections"

**Causa**: Pool de conexiones mal configurado

**Solución**:
- Reduce `maximum-pool-size` en application.properties
- Neon Free tier limita conexiones simultáneas
- Considera upgrade de plan si necesitas más conexiones

### Aplicación no crea tablas

**Causa**: `ddl-auto` en modo incorrecto

**Solución**:
- En desarrollo: `spring.jpa.hibernate.ddl-auto=update`
- En producción: `spring.jpa.hibernate.ddl-auto=validate` + ejecutar migraciones manualmente

## Comparativa: Docker Local vs Neon

| Característica | Docker Local | Neon |
|----------------|--------------|------|
| **Setup inicial** | Requiere Docker instalado | Solo crear cuenta |
| **Costo** | Gratis (recursos locales) | Tier gratis + pago por uso |
| **Escalabilidad** | Limitado a tu máquina | Auto-scaling ilimitado |
| **Backups** | Manual | Automático con PITR |
| **Branching** | No disponible | Ramas instantáneas |
| **Acceso remoto** | Requiere configuración | Acceso global inmediato |
| **Despliegue** | Complicado en producción | Listo para producción |
| **Mantenimiento** | Manual | Automático |

## Recursos Adicionales

- **Documentación de Neon**: [https://neon.tech/docs](https://neon.tech/docs)
- **Connection Pooling**: [https://neon.tech/docs/connect/connection-pooling](https://neon.tech/docs/connect/connection-pooling)
- **Branching Guide**: [https://neon.tech/docs/guides/branching](https://neon.tech/docs/guides/branching)
- **Community**: [https://community.neon.tech](https://community.neon.tech)

## Soporte

Si encuentras problemas:

1. Revisa los logs de la aplicación
2. Verifica el estado de Neon: [https://neonstatus.com](https://neonstatus.com)
3. Consulta la documentación de Neon
4. Abre un issue en el repositorio del proyecto

---

**Última actualización**: Enero 2026
