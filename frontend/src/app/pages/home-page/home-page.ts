import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  onExploreClick(): void {
    console.log('Explorar recetas clickeado');
  }
}

