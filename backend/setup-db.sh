#!/bin/bash
# Script para configurar PostgreSQL con Docker (Linux/macOS)

echo ""
echo "================================================"
echo "  Configuracion de Base de Datos - Despiensa"
echo "================================================"
echo ""

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
echo "================================================"
echo "  Servicios iniciados correctamente!"
echo "================================================"
echo ""
echo "PostgreSQL:"
echo "   - Host: localhost"
echo "   - Puerto: 5432"
echo "   - Usuario: postgres"
echo "   - Contraseña: postgres"
echo "   - Base de datos: despiensa"
echo ""
echo "PgAdmin (Administrador):"
echo "   - URL: http://localhost:5050"
echo "   - Usuario: admin@example.com"
echo "   - Contraseña: admin"
echo ""
echo "Para conectarte a PostgreSQL:"
echo "   psql -U postgres -d despiensa -h localhost"
echo ""
echo "Para detener los servicios:"
echo "   docker-compose down"
echo ""

