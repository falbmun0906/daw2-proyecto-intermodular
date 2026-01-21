-- Schema initialization for Despiensa application
-- This script creates the initial database schema

-- Enable UUID extension if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Usuario table
CREATE TABLE IF NOT EXISTS usuario (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Despensa item table
CREATE TABLE IF NOT EXISTS despensa_item (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    unidad VARCHAR(50),
    fecha_expiracion DATE,
    fecha_agregada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Receta table
CREATE TABLE IF NOT EXISTS receta (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    instrucciones TEXT,
    tiempo_preparacion INT,
    dificultad VARCHAR(50),
    imagen_url VARCHAR(500),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Receta usuario table
CREATE TABLE IF NOT EXISTS receta_usuario (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    receta_id BIGINT NOT NULL,
    fecha_guardada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (receta_id) REFERENCES receta(id) ON DELETE CASCADE
);

-- Planificacion semana table
CREATE TABLE IF NOT EXISTS planificacion_semana (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Lista compra table
CREATE TABLE IF NOT EXISTS lista_compra (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);
CREATE INDEX IF NOT EXISTS idx_despensa_item_usuario_id ON despensa_item(usuario_id);
CREATE INDEX IF NOT EXISTS idx_receta_usuario_usuario_id ON receta_usuario(usuario_id);
CREATE INDEX IF NOT EXISTS idx_receta_usuario_receta_id ON receta_usuario(receta_id);
CREATE INDEX IF NOT EXISTS idx_planificacion_usuario_id ON planificacion_semana(usuario_id);
CREATE INDEX IF NOT EXISTS idx_lista_compra_usuario_id ON lista_compra(usuario_id);


