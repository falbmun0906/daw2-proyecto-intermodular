@echo off
REM Script para ejecutar tests de API con Newman
REM Asegúrate de que el servidor Spring Boot esté corriendo en localhost:8080

echo ========================================
echo   DESPIENSA API - Newman Test Runner
echo ========================================
echo.

REM Verificar si Newman está instalado
where newman >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Newman no está instalado.
    echo.
    echo Para instalar Newman, ejecuta:
    echo npm install -g newman
    echo npm install -g newman-reporter-htmlextra
    echo.
    pause
    exit /b 1
)

echo [OK] Newman detectado
echo.

REM Verificar si el servidor está corriendo
echo Verificando servidor en localhost:8080...
curl -s http://localhost:8080/api/auth/login > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ADVERTENCIA] El servidor no parece estar corriendo en localhost:8080
    echo Asegúrate de iniciar Spring Boot antes de ejecutar los tests:
    echo   mvn spring-boot:run
    echo.
    echo Presiona cualquier tecla para continuar de todos modos...
    pause >nul
)

echo [OK] Servidor accesible
echo.

REM Crear carpeta de reportes si no existe
if not exist "postman\reports" mkdir postman\reports

echo ========================================
echo   Ejecutando tests con Newman...
echo ========================================
echo.

REM Ejecutar Newman con reportes HTML
newman run postman/Despiensa_API_Collection.json ^
    -e postman/Despiensa_Local_Environment.json ^
    --reporters cli,htmlextra ^
    --reporter-htmlextra-export postman/reports/test-report-%date:~-4,4%%date:~-7,2%%date:~-10,2%-%time:~0,2%%time:~3,2%%time:~6,2%.html ^
    --reporter-htmlextra-title "Despiensa API Test Report" ^
    --reporter-htmlextra-darkTheme ^
    --delay-request 200 ^
    --timeout-request 5000

echo.
echo ========================================
echo   Tests completados
echo ========================================
echo.

if %ERRORLEVEL% EQU 0 (
    echo [OK] Todos los tests pasaron correctamente
) else (
    echo [ERROR] Algunos tests fallaron. Revisa el reporte HTML.
)

echo.
echo Reporte HTML generado en: postman\reports\
echo.
pause

