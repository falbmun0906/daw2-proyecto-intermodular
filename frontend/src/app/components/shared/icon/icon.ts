import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Icon Component
 * Componente reutilizable para mostrar iconos SVG de Phosphor Icons.
 * Carga SVG desde assets.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon {
  @Input() name: string = 'search';
  @Input() size: number = 20;
  @Input() color: string = 'currentColor';
  @Input() solidBlack: boolean = false; // Nueva propiedad para evitar filter de tema
  @Input() solidWhite: boolean = false; // Nueva propiedad para forzar icono blanco

  // Iconos que se cargan desde assets
  private socialIcons = ['google', 'facebook', 'x-icon'];

  get isSocialIcon(): boolean {
    return this.socialIcons.includes(this.name);
  }

  get hasSolidBlack(): boolean {
    return this.solidBlack;
  }

  get hasSolidWhite(): boolean {
    return this.solidWhite;
  }

  get iconPath(): string {
    if (this.isSocialIcon) {
      const iconMap: { [key: string]: string } = {
        'google': 'assets/google-icon-logo-svgrepo-com.svg',
        'facebook': 'assets/facebook-icon-logo-svgrepo-com.svg',
        'x-icon': 'assets/x-icon-logo-svgrepo-com.svg'
      };
      return iconMap[this.name] || '';
    }
    // Mapeo de nombres a archivos Phosphor
    const phosphorMap: { [key: string]: string } = {
      'search': 'magnifying-glass',
      'filter': 'funnel',
      'settings': 'gear-six',
      'heart': 'heart',
      'star': 'star',
      'arrow-right': 'arrow-right',
      'chevron-right': 'caret-right',
      'chevron-left': 'caret-left',
      'home': 'house',
      'user': 'user',
      'menu': 'list',
      'x': 'x',
      'check': 'check',
      'alert-circle': 'warning-circle',
      'info': 'info',
      'trash2': 'trash',
      'edit': 'pencil-simple',
      'eye': 'eye',
      'plus': 'plus',
      'mail': 'envelope-simple',
      'lock': 'lock',
      'user-check': 'user-check',
      'usb': 'usb',
      'chef-hat': 'chef-hat',
      'utensils': 'fork-knife',
      'fire': 'fire',
      'schedule': 'clock',
      'chart-bar': 'chart-bar'
    };
    const phosphorName = phosphorMap[this.name] || this.name;
    return `assets/icons/phosphor/regular/${phosphorName}.svg`;
  }
}
