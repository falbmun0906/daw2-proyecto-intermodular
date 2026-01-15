# 🚀 Quick Start - FASE 5: Sistema HTTP

## Inicio Rápido (3 pasos)

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Iniciar backend + frontend
```bash
npm run dev:full
```

Este comando inicia:
- ✅ json-server en http://localhost:3000
- ✅ Angular en http://localhost:4200

### 3️⃣ Abrir en navegador
```
http://localhost:4200/productos
```

---

## 📋 Probar CRUD Completo

| Acción | Pasos |
|--------|-------|
| **Listar** | Abrir `/productos` |
| **Ver detalle** | Click en "👁️ Ver" |
| **Crear** | Click en "➕ Nuevo Producto" → Llenar formulario → Crear |
| **Editar** | Click en "✏️ Editar" → Modificar → Actualizar |
| **Eliminar** | Click en "🗑️ Eliminar" → Confirmar |

---

## 🔍 Verificar Implementación

### Verificar json-server funcionando
```bash
curl http://localhost:3000/products
```

### Verificar interceptor (headers)
Abrir DevTools → Network → Seleccionar request → Headers:
- ✅ `Content-Type: application/json`
- ✅ `X-App-Client: Angular-DWEC`

### Verificar operaciones CRUD
1. **GET**: Lista se carga automáticamente
2. **POST**: Crear producto y verificar que aparece
3. **PUT**: Editar producto y verificar cambios
4. **DELETE**: Eliminar y verificar que desaparece

---

## 📁 Archivos Clave

| Archivo | Descripción |
|---------|-------------|
| `db.json` | Base de datos (10 productos, 3 usuarios) |
| `app.config.ts` | provideHttpClient + interceptores |
| `core/services/api.service.ts` | Servicio base HTTP |
| `core/interceptors/auth.interceptor.ts` | Headers automáticos |
| `features/products/product.service.ts` | CRUD de productos |
| `features/products/components/` | UI (list, detail, form) |

---

## 🐛 Troubleshooting

### Error: "json-server no encontrado"
```bash
npm install json-server --save-dev
```

### Error: "Puerto 3000 en uso"
Matar proceso en puerto 3000:
```bash
# PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Error: "CORS"
json-server ya tiene CORS habilitado por defecto.

---

## ✅ Checklist de Verificación

- [ ] json-server arranca sin errores
- [ ] Angular compila sin errores
- [ ] Página `/productos` carga listado
- [ ] Botón "Nuevo Producto" funciona
- [ ] Formulario de creación tiene validación
- [ ] Crear producto funciona (POST)
- [ ] Ver detalle funciona (GET)
- [ ] Editar producto funciona (PUT)
- [ ] Eliminar producto pide confirmación (DELETE)
- [ ] Headers del interceptor aparecen en Network

---

**Todo listo!** Si todos los pasos funcionan: ✅ **FASE 5 (Tareas 1-2) COMPLETADA**

