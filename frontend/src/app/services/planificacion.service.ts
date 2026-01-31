import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';

/**
 * Interfaces para Planificación
 */
export interface PlanificacionSemana {
  id: number;
  usuarioId: number;
  fechaInicio: string;
  etiqueta: string;
  fechaCreacion: string;
  dias?: PlanificacionDia[];
}

export interface PlanificacionDia {
  id: number;
  fecha: string;
  tipoComida: 'DESAYUNO' | 'ALMUERZO' | 'COMIDA' | 'MERIENDA' | 'CENA';
  notas?: string;
  receta?: {
    id: number;
    nombre: string;
    descripcion: string;
    imagenUrlSmall: string;
    imagenUrlMedium: string;
    imagenUrlLarge: string;
    tiempoPreparacion: number;
    porciones: number;
    dificultad: string;
  };
}

export interface PlanificacionSemanaCreateRequest {
  fechaInicio: string;
  etiqueta: string;
}

export interface PlanificacionDiaCreateRequest {
  fecha: string;
  tipoComida: string;
  recetaId?: number;
  notas?: string;
}

/**
 * Servicio de Planificación Semanal
 * Conecta con el backend Spring Boot
 */
@Injectable({ providedIn: 'root' })
export class PlanificacionService {
  private api = inject(ApiService);

  /**
   * GET /api/usuarios/:usuarioId/planificaciones - Obtener todas las planificaciones
   */
  getPlanificaciones(usuarioId: number): Observable<PlanificacionSemana[]> {
    return this.api.get<PlanificacionSemana[]>(`usuarios/${usuarioId}/planificaciones`).pipe(retry(2));
  }

  /**
   * GET /api/usuarios/:usuarioId/planificaciones/reciente - Obtener planificación más reciente
   */
  getPlanificacionReciente(usuarioId: number): Observable<PlanificacionSemana> {
    return this.api.get<PlanificacionSemana>(`usuarios/${usuarioId}/planificaciones/reciente`).pipe(retry(2));
  }

  /**
   * GET /api/usuarios/:usuarioId/planificaciones/:planificacionId - Obtener una planificación específica
   */
  getPlanificacionById(usuarioId: number, planificacionId: number): Observable<PlanificacionSemana> {
    return this.api.get<PlanificacionSemana>(`usuarios/${usuarioId}/planificaciones/${planificacionId}`).pipe(retry(2));
  }

  /**
   * POST /api/usuarios/:usuarioId/planificaciones - Crear nueva planificación
   */
  crearPlanificacion(usuarioId: number, dto: PlanificacionSemanaCreateRequest): Observable<PlanificacionSemana> {
    return this.api.post<PlanificacionSemana>(`usuarios/${usuarioId}/planificaciones`, dto);
  }

  /**
   * GET /api/usuarios/:usuarioId/planificaciones/:planificacionId/dias - Obtener días de una planificación
   */
  getDiasDePlanificacion(usuarioId: number, planificacionId: number): Observable<PlanificacionDia[]> {
    return this.api.get<PlanificacionDia[]>(`usuarios/${usuarioId}/planificaciones/${planificacionId}/dias`).pipe(retry(2));
  }

  /**
   * GET /api/usuarios/:usuarioId/planificaciones/:planificacionId/dias/fecha?fecha=YYYY-MM-DD
   * Obtener comidas de un día específico
   */
  getComidasDelDia(usuarioId: number, planificacionId: number, fecha: string): Observable<PlanificacionDia[]> {
    return this.api.get<PlanificacionDia[]>(`usuarios/${usuarioId}/planificaciones/${planificacionId}/dias/fecha?fecha=${fecha}`).pipe(retry(2));
  }

  /**
   * POST /api/usuarios/:usuarioId/planificaciones/:planificacionId/dias - Crear día planificado
   */
  crearDia(usuarioId: number, planificacionId: number, dto: PlanificacionDiaCreateRequest): Observable<PlanificacionDia> {
    return this.api.post<PlanificacionDia>(`usuarios/${usuarioId}/planificaciones/${planificacionId}/dias`, dto);
  }

  /**
   * PUT /api/usuarios/:usuarioId/planificaciones/:planificacionId/dias/:diaId - Actualizar día
   */
  actualizarDia(usuarioId: number, planificacionId: number, diaId: number, dto: PlanificacionDiaCreateRequest): Observable<PlanificacionDia> {
    return this.api.put<PlanificacionDia>(`usuarios/${usuarioId}/planificaciones/${planificacionId}/dias/${diaId}`, dto);
  }

  /**
   * DELETE /api/usuarios/:usuarioId/planificaciones/:planificacionId/dias/:diaId - Eliminar día
   */
  eliminarDia(usuarioId: number, planificacionId: number, diaId: number): Observable<void> {
    return this.api.delete<void>(`usuarios/${usuarioId}/planificaciones/${planificacionId}/dias/${diaId}`);
  }

  /**
   * Obtiene las comidas de hoy para el usuario
   */
  getComidasDeHoy(usuarioId: number, planificacionId: number): Observable<PlanificacionDia[]> {
    const hoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return this.getComidasDelDia(usuarioId, planificacionId, hoy);
  }
}

