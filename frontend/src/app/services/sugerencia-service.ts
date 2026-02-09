import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { SugerenciaRequest } from '../models/sugerencia-model';

@Injectable({
  providedIn: 'root',
})

export class SugerenciaService {
  private api = new ApiService();
  private readonly endpoint = 'sugerencias';

  create(request: SugerenciaRequest): Observable<any> {
    return this.api.post(this.endpoint, request).pipe(
      catchError((error: any) => {
        console.error('Error al enviar sugerencia:', error);
        return throwError(() => new Error('Ocurrió un error al enviar la sugerencia. Por favor, inténtalo de nuevo más tarde.'));
      })
    );
  }
}
