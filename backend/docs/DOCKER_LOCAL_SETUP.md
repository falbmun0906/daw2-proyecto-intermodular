# PostgreSQL Local con Docker - Configuración Alternativa

## ⚠️ IMPORTANTE

Este documento describe cómo usar **PostgreSQL local con Docker** como **ALTERNATIVA** a Neon.

**El proyecto está configurado por defecto para usar Neon PostgreSQL Serverless.**

Solo sigue estas instrucciones si:
- No puedes usar Neon por alguna razón
- Prefieres trabajar con base de datos local
- Necesitas trabajar sin conexión a internet

---

## 📋 ¿Cuándo usar esta alternativa?

### Usa Neon (Recomendado) si:
- ✅ Tienes conexión a internet
- ✅ Quieres setup rápido (2 minutos)
- ✅ No quieres instalar Docker
- ✅ Necesitas acceso remoto
- ✅ Quieres backups automáticos

### Usa PostgreSQL Local si:
- 🔧 Trabajas sin conexión frecuentemente
- 🔧 Ya tienes Docker instalado
- 🔧 Prefieres control total de la BD
- 🔧 Necesitas desarrollo offline

---

## 🐳 Requisitos Previos

Para usar PostgreSQL local necesitas:

- **Docker Desktop** instalado
  - Windows: https://www.docker.com/products/docker-desktop
  - Linux: https://docs.docker.com/engine/install/
  - macOS: https://www.docker.com/products/docker-desktop

Verificar instalación:
```bash
docker --version
docker-compose --version
```

---

## 🚀 Instalación y Configuración

### Opción A: Usando el script (Linux/macOS)

```bash
# Ejecutar el script de configuración
chmod +x setup-db.sh
./setup-db.sh
```

El script te preguntará si quieres continuar (ya que Neon es la opción recomendada).

### Opción B: Manual (Todas las plataformas)

1. **Iniciar los servicios Docker**:
   ```bash
   docker-compose up -d
   ```

2. **Verificar que los contenedores están corriendo**:
   ```bash
   docker ps
   ```

   Deberías ver:
   - `despiensa_postgres` (PostgreSQL 16)
   - `despiensa_pgadmin` (pgAdmin 4)

---

## ⚙️ Configurar Variables de Entorno

Después de iniciar Docker, **debes actualizar tu archivo `.env`**:

```env
# PostgreSQL LOCAL (Docker) - Reemplaza las credenciales de Neon
NEON_DATABASE_URL=jdbc:postgresql://localhost:5432/despiensa
NEON_DB_USER=postgres
NEON_DB_PASSWORD=postgres
DB_SSL_MODE=disable

# JWT (mantener igual)
JWT_SECRET=dGhpc0lzQVZlcnlTZWNyZXRLZXlGb3JKV1RUb2tlbkdlbmVyYXRpb25JblNwcmluZ0Jvb3Q=

# Perfil (mantener)
SPRING_PROFILES_ACTIVE=dev
```

**Nota**: Mantenemos las variables `NEON_*` por compatibilidad, aunque apunten a localhost.

---

## 🔌 Credenciales y Acceso

### PostgreSQL Database

| Parámetro | Valor |
|-----------|-------|
| Host | `localhost` |
| Puerto | `5432` |
| Usuario | `postgres` |
| Contraseña | `postgres` |
| Base de datos | `despiensa` |

**Connection String**:
```
postgresql://postgres:postgres@localhost:5432/despiensa
```

### pgAdmin (Administrador Web)

| Parámetro | Valor |
|-----------|-------|
| URL | http://localhost:5050 |
| Email | admin@example.com |
| Contraseña | admin |

---

## 📊 Acceder a la Base de Datos

### Desde la aplicación Spring Boot

Simplemente ejecuta:
```bash
./mvnw spring-boot:run
```

La aplicación se conectará a `localhost:5432` automáticamente.

### Desde psql (Línea de comandos)

```bash
# Conectar con psql
psql -h localhost -p 5432 -U postgres -d despiensa

# Contraseña cuando te la pida: postgres
```

Comandos útiles en psql:
```sql
-- Ver todas las tablas
\dt

-- Describir una tabla
\d receta

-- Ver recetas
SELECT * FROM receta;

-- Salir
\q
```

### Desde pgAdmin (Interfaz Web)

1. Abre http://localhost:5050
2. Inicia sesión con `admin@example.com` / `admin`
3. Añadir servidor:
   - Pestaña General:
     - Name: `Despiensa Local`
   - Pestaña Connection:
     - Host: `postgres` (nombre del contenedor Docker)
     - Port: `5432`
     - Username: `postgres`
     - Password: `postgres`
     - Save password: ✓
4. Click en "Save"

---

## 🔄 Gestión de Servicios

### Iniciar servicios
```bash
docker-compose up -d
```

### Ver logs
```bash
# Todos los servicios
docker-compose logs -f

# Solo PostgreSQL
docker-compose logs -f postgres
```

### Detener servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes (⚠️ BORRA DATOS)
```bash
docker-compose down -v
```

### Reiniciar servicios
```bash
docker-compose restart
```

---

## 🔄 Volver a Neon

Si quieres volver a usar Neon:

1. **Detener Docker**:
   ```bash
   docker-compose down
   ```

2. **Restaurar `.env` con credenciales de Neon**:
   ```env
   NEON_DATABASE_URL=jdbc:postgresql://ep-aged-cloud-agj2kt8k-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
   NEON_DB_USER=neondb_owner
   NEON_DB_PASSWORD=npg_uYRvPpk6JA9s
   DB_SSL_MODE=require
   ```

3. **Reiniciar la aplicación**:
   ```bash
   ./mvnw spring-boot:run
   ```

---

## 🗃️ Persistencia de Datos

Los datos de PostgreSQL se guardan en un volumen Docker llamado `postgres_data`.

Esto significa que:
- ✅ Los datos persisten entre reinicios de Docker
- ✅ Puedes detener y volver a iniciar sin perder datos
- ⚠️ Se pierden si ejecutas `docker-compose down -v`

### Backup manual

```bash
# Exportar la base de datos
docker exec despiensa_postgres pg_dump -U postgres despiensa > backup.sql

# Restaurar
docker exec -i despiensa_postgres psql -U postgres despiensa < backup.sql
```

---

## 🐛 Troubleshooting

### Puerto 5432 ya en uso

**Problema**: Ya tienes PostgreSQL instalado localmente.

**Solución 1**: Detener PostgreSQL local
```bash
# Windows
net stop postgresql-x64-16

# Linux
sudo systemctl stop postgresql

# macOS
brew services stop postgresql
```

**Solución 2**: Cambiar puerto en `docker-compose.yml`
```yaml
ports:
  - "5433:5432"  # Usa 5433 en lugar de 5432
```

Y actualiza `.env`:
```env
NEON_DATABASE_URL=jdbc:postgresql://localhost:5433/despiensa
```

### Puerto 5050 ya en uso

Cambiar puerto de pgAdmin en `docker-compose.yml`:
```yaml
ports:
  - "5051:80"  # Usa 5051 en lugar de 5050
```

### No se puede conectar a PostgreSQL

```bash
# Verificar que el contenedor está corriendo
docker ps

# Ver logs de PostgreSQL
docker-compose logs postgres

# Reiniciar servicios
docker-compose restart
```

### Permisos en Linux

```bash
# Dar permisos al script
chmod +x setup-db.sh

# Si hay problemas con Docker
sudo usermod -aG docker $USER
# Luego cerrar sesión y volver a entrar
```

---

## 📁 Archivos Relacionados

| Archivo | Descripción |
|---------|-------------|
| `docker-compose.yml` | Configuración de servicios Docker |
| `setup-db.sh` | Script de instalación (Linux/macOS) |
| `.env.example` | Plantilla de variables de entorno |

---

## 🔍 Comparativa: Neon vs Docker Local

| Característica | Neon | Docker Local |
|----------------|------|--------------|
| Setup inicial | 2 min | 5-10 min |
| Instalación | No requiere | Requiere Docker |
| Internet | Necesario | No necesario |
| Recursos | 0 locales | RAM + CPU |
| Backups | Automático | Manual |
| Escalabilidad | Auto-scaling | Fijo |
| Acceso remoto | ✅ Incluido | ❌ Configuración compleja |
| Desarrollo offline | ❌ | ✅ |
| Coste | Free tier | Gratis (recursos) |

---

## ✅ Checklist de Configuración

- [ ] Docker Desktop instalado y corriendo
- [ ] `docker-compose up -d` ejecutado exitosamente
- [ ] Contenedores `despiensa_postgres` y `despiensa_pgadmin` corriendo
- [ ] Archivo `.env` actualizado con `localhost:5432`
- [ ] `DB_SSL_MODE=disable` en `.env`
- [ ] Aplicación conecta correctamente
- [ ] pgAdmin accesible en http://localhost:5050

---

## 🆘 Soporte

Si tienes problemas con Docker:
- Documentación Docker: https://docs.docker.com
- Docker Compose: https://docs.docker.com/compose

Si prefieres evitar estos problemas, considera **usar Neon** (configuración en 2 minutos, sin instalaciones).

---

**Última actualización**: 2026-01-28  
**Estado**: Alternativa opcional a Neon
