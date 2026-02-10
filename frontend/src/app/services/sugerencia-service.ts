import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { SugerenciaRequest } from '../models/sugerencia-model';

@Injectable({
  providedIn: 'root',
})

export class SugerenciaService {
  private api = new ApiService();
  private readonly endpoint = 'sugerencias';

  create(request: { asunto: string; descripcion: string }): Observable<any> {
    return this.api.post(this.endpoint, request).pipe(
      catchError((error: any) => {
        console.error('Error al enviar sugerencia:', error);
        return throwError(() => new Error('Ocurrió un error al enviar la sugerencia. Por favor, inténtalo de nuevo más tarde.'));
      })
    );
  }

  /**
   * GET /api/sugerencia - Obtener todas las sugerencias
   */
  getAll(): Observable<SugerenciaRequest[]> {
    return this.api.get<SugerenciaRequest[]>(this.endpoint).pipe(
      map((response: any) => {
        if (response && Array.isArray(response)) {
          return response.map((item: any) => ({
            id: item.id,
            asunto: item.asunto,
            descripcion: item.descripcion
          }));
        }
        return [];
      }
    ));
  }


}
