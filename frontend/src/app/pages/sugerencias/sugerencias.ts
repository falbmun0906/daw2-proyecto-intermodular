import {Component, inject, signal} from '@angular/core';
import {SugerenciaService} from '../../services/sugerencia-service';
import {Ingrediente} from '../../models';
import {SugerenciaRequest} from '../../models/sugerencia-model';
import {SugerenciaCard} from '../../components/shared/sugerencia-card/sugerencia-card';
import {Product} from '../../features/products/models/product';

@Component({
  standalone: true,
  selector: 'app-sugerencias',
  imports: [
    SugerenciaCard
  ],
  templateUrl: './sugerencias.html',
  styleUrl: './sugerencias.scss',
})
export class Sugerencias {
  private surgerenciaService = inject(SugerenciaService);

  public mockSugerencias: SugerenciaRequest[] = [
    { id: '1', asunto: 'Esta es la sugerencia 1', descripcion: 'Esta es la descripción de la sugerencia 1' },
    { id: '2', asunto: 'Esta es la sugerencia 2', descripcion: 'Esta es la descripción de la sugerencia 2' },
    { id: '3', asunto: 'Esta es la sugerencia 3', descripcion: 'Esta es la descripción de la sugerencia 3' },
    { id: '4', asunto: 'Esta es la sugerencia 4', descripcion: 'Esta es la descripción de la sugerencia 4' },
    { id: '5', asunto: 'Esta es la sugerencia 5', descripcion: 'Esta es la descripción de la sugerencia 5' },
    { id: '6', asunto: 'Esta es la sugerencia 6', descripcion: 'Esta es la descripción de la sugerencia 6' },
  ];

  sugerencias = signal<SugerenciaRequest[]>([]);

  ngOnInit(): void {
    this.loadSugerencias();
  }

  private loadSugerencias(): void {
    this.surgerenciaService.getAll().subscribe({
      next: (sugerencias) => this.sugerencias.set(sugerencias),
      error: (err) => console.error('Error cargando ingredientes:', err)
    });
  }
}
