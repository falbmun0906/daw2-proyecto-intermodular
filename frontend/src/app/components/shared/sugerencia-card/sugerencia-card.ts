import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sugerencia-card',
  imports: [],
  templateUrl: './sugerencia-card.html',
  styleUrl: './sugerencia-card.scss',
})
export class SugerenciaCard {
  @Input() id: string = '';
  @Input() asunto: string = '';
  @Input() descripcion: string = '';
}
