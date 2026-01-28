#!/bin/bash
# Script para configurar PostgreSQL LOCAL con Docker (OPCIONAL)
#
# ===============================================
# NOTA: Este script es OPCIONAL
# ===============================================
# El proyecto está configurado para usar Neon PostgreSQL Serverless por defecto.
# Solo ejecuta este script si prefieres usar PostgreSQL local en lugar de Neon.
#
# Para usar Neon (RECOMENDADO):
# 1. Crea una cuenta en https://neon.tech
# 2. Configura las variables de entorno en .env
# 3. Consulta NEON_SETUP.md para más detalles
#
# Para usar PostgreSQL local con Docker:
# 1. Ejecuta este script: ./setup-db.sh
# 2. Configura .env con localhost como host
# ===============================================

echo ""
echo "========================================================="
echo "  Configuracion de PostgreSQL LOCAL con Docker"
echo "  (ALTERNATIVA a Neon - Solo si no quieres usar Neon)"
echo "========================================================="
echo ""
echo "⚠️  NOTA: El proyecto usa Neon por defecto."
echo "   Si ya tienes Neon configurado, NO necesitas esto."
echo ""
read -p "¿Quieres continuar con PostgreSQL local? (s/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Cancelado. Usa Neon o ejecuta este script cuando lo necesites."
    exit 0
fi

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker no está instalado"
    echo "Por favor, instala Docker desde https://www.docker.com"
    exit 1
fi

echo "[1] Iniciando PostgreSQL y PgAdmin con Docker Compose..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "ERROR: No se pudo iniciar los servicios"
    exit 1
fi

echo "[2] Esperando a que PostgreSQL esté listo..."
sleep 5

echo ""
echo "========================================================="
echo "  ✅ PostgreSQL LOCAL iniciado correctamente!"
echo "========================================================="
echo ""
echo "IMPORTANTE: Ahora debes configurar .env para usar localhost:"
echo ""
echo "Edita el archivo .env y cambia:"
echo "   NEON_DATABASE_URL=jdbc:postgresql://localhost:5432/despiensa"
echo "   NEON_DB_USER=postgres"
echo "   NEON_DB_PASSWORD=postgres"
echo "   DB_SSL_MODE=disable"
echo ""
echo "PostgreSQL Local:"
echo "   - Host: localhost"
echo "   - Puerto: 5432"
echo "   - Usuario: postgres"
echo "   - Contraseña: postgres"
echo "   - Base de datos: despiensa"
echo ""
echo "PgAdmin (Administrador Web):"
echo "   - URL: http://localhost:5050"
echo "   - Usuario: admin@example.com"
echo "   - Contraseña: admin"
echo ""
echo "Para conectarte directamente:"
echo "   psql -U postgres -d despiensa -h localhost"
echo ""
echo "Para detener los servicios:"
echo "   docker-compose down"
echo ""
echo "Para volver a usar Neon:"
echo "   1. Detén Docker: docker-compose down"
echo "   2. Restaura las credenciales de Neon en .env"
echo ""

