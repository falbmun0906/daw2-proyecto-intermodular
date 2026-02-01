-- Migración: Cambiar ubicacion de ENUM a VARCHAR en DespensaItem
-- Fecha: 2026-01-31

-- Para H2 (desarrollo)
-- H2 no usa ENUM directamente, usa VARCHAR, así que no hay problema

-- Para MySQL (producción)
-- Si estuvieras usando MySQL con ENUM, necesitarías esto:
-- ALTER TABLE despensa_item MODIFY COLUMN ubicacion VARCHAR(50) NOT NULL;

-- Para PostgreSQL (producción)
-- ALTER TABLE despensa_item ALTER COLUMN ubicacion TYPE VARCHAR(50);
-- DROP TYPE IF EXISTS ubicacion_despensa CASCADE;

-- Actualizar valores existentes si es necesario (opcional)
-- Convertir de mayúsculas a capitalizado para mejor UX
-- UPDATE despensa_item SET ubicacion = 'Nevera' WHERE ubicacion = 'NEVERA';
-- UPDATE despensa_item SET ubicacion = 'Congelador' WHERE ubicacion = 'CONGELADOR';
-- UPDATE despensa_item SET ubicacion = 'Despensa' WHERE ubicacion = 'DESPENSA';
-- UPDATE despensa_item SET ubicacion = 'Mostrador' WHERE ubicacion = 'MOSTRADOR';

-- Nota: Esta migración es compatible con todas las bases de datos porque
-- JPA ya estaba usando VARCHAR con @Enumerated(EnumType.STRING)

