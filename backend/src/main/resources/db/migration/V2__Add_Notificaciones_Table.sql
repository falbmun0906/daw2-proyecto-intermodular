-- Schema migration for Notificaciones feature
-- This script adds the notification system tables

-- Tabla de Notificaciones
CREATE TABLE IF NOT EXISTS notificacion (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT,
    fecha_creacion TIMESTAMP NOT NULL,
    leida BOOLEAN NOT NULL DEFAULT FALSE,
    despensa_item_id BIGINT,
    receta_id BIGINT,

    CONSTRAINT fk_notificacion_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_notificacion_despensa_item
        FOREIGN KEY (despensa_item_id)
        REFERENCES despensa_item(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_notificacion_receta
        FOREIGN KEY (receta_id)
        REFERENCES receta(id)
        ON DELETE SET NULL
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_notificacion_usuario
    ON notificacion(usuario_id);

CREATE INDEX IF NOT EXISTS idx_notificacion_leida
    ON notificacion(leida);

CREATE INDEX IF NOT EXISTS idx_notificacion_tipo
    ON notificacion(tipo);

CREATE INDEX IF NOT EXISTS idx_notificacion_fecha_creacion
    ON notificacion(fecha_creacion DESC);

-- Comentarios en la tabla y columnas
COMMENT ON TABLE notificacion IS
    'Almacena notificaciones de usuarios sobre caducidad de ingredientes y recomendaciones de recetas';

COMMENT ON COLUMN notificacion.tipo IS
    'Tipo de notificación: CADUCIDAD_PROXIMA, CADUCADO, RECOMENDACION_RECETA';

COMMENT ON COLUMN notificacion.titulo IS
    'Título corto de la notificación';

COMMENT ON COLUMN notificacion.mensaje IS
    'Mensaje descriptivo de la notificación';

COMMENT ON COLUMN notificacion.leida IS
    'Indica si el usuario ha leído la notificación';
