import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from '../../components/shared/button/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, Button],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  onExploreClick(): void {
    console.log('Explorar recetas clickeado');
  }
}

