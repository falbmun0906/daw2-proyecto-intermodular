import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { CarouselNavButton } from '../../components/shared/carousel-nav-button/carousel-nav-button';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { Receta } from '../../models/receta.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, Card, Button, FormInput, CarouselNavButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements AfterViewInit, OnInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  private authService = inject(AuthService);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  newsletterEmail: string = '';
  private carouselScrollAmount = 600; // Scroll de 600px por click

  // Signals para las recetas reales
  trendingRecipes = signal<Receta[]>([]);
  mustSeeRecipes = signal<Receta[]>([]);
  isLoadingTrending = signal<boolean>(true);
  isLoadingMustSee = signal<boolean>(true);

  // Signal para el idioma de la transcripción
  transcriptLanguage = signal<'es' | 'en' | 'fr' | 'de'>('es');

  // Transcripciones en diferentes idiomas
  transcripts = {
    es: {
      title: 'Transcripción: Gazpacho rápido - Versión clásica',
      content: [
        { time: '[00:00 - 00:04]', text: 'Venga, vamos a preparar un gazpacho clásico, pero en versión superrápida.' },
        { time: '[00:04 - 00:11]', text: 'Atentos. ¿Un plato fresco y auténtico listo en un momento? Pues sí, claro que es posible.' },
        { time: '[00:11 - 00:18]', text: 'Primero, los protagonistas. Estos son los ingredientes que le van a dar vida a todo. Tomate, pepino, pimiento, ajo y pan. Esta es la base.' },
        { time: '[00:18 - 00:26]', text: 'Con esto no hay fallo. Tomates bien maduros, medio pepino, un pimiento y un toque de ajo o medio para que no repita.' },
        { time: '[00:26 - 00:33]', text: 'Para darle cuerpo, un poco de pan del día anterior. Con 50 o 100 gramos, va perfecto. Ahora el oro líquido. Tres o cuatro cucharadas de un buen aceite de oliva virgen extra.' },
        { time: '[00:33 - 00:42]', text: 'Y el punto de acidez, muy importante, una cucharada de vinagre de jerez, el toque. Y para acabar, un vaso de agua bien fría para aligerarlo y, por supuesto, sal al gusto.' },
        { time: '[00:42 - 00:48]', text: 'Venga, a la acción. La preparación es sencillísima, en tres pasos, rapidísimo.' },
        { time: '[00:48 - 00:58]', text: 'Se trocea todo, se añaden los líquidos y la sal y a triturar a tope. Y ahora el toque final.' },
        { time: '[00:58 - 01:01]', text: 'Aquí es donde se decide el estilo del gazpacho.' },
        { time: '[01:01 - 01:08]', text: 'Aquí hay que elegir. Se prefiere rústico, sin colar o más fino, pasándolo por un colador.' },
        { time: '[01:08 - 01:13]', text: 'Ojo, este es el gran secreto. Hay que dejarlo enfriar bien en la nevera. Muy frío.' },
        { time: '[01:13 - 01:18]', text: 'Y con todo listo llega el mejor momento de todos, servir y disfrutar. Se puede servir en un vaso que apetece un montón o en un bol más tradicional.' },
        { time: '[01:18 - 01:27]', text: 'Y para coronar, ¿qué le va mejor? Unos picatostes crujientes o verduritas frescas picadas.' }
      ]
    },
    en: {
      title: 'Transcript: Quick Gazpacho - Classic Version',
      content: [
        { time: '[00:00 - 00:04]', text: 'Ok, let\'s make a gazpacho classic style, but in a super quick version.' },
        { time: '[00:04 - 00:11]', text: 'Listen up. A fresh and authentic dish ready in no time? Yes, it is possible.' },
        { time: '[00:11 - 00:18]', text: 'First, the main players. These are the ingredients that will bring everything to life: tomato, cucumber, pepper, garlic and bread. This is the base.' },
        { time: '[00:18 - 00:26]', text: 'With this, you just can\'t go wrong. Really ripe tomatoes, half a cucumber, one pepper and a touch of garlic, or just half a clove so it\'s not too strong.' },
        { time: '[00:26 - 00:33]', text: 'To give it body, a bit of day-old bread. Around 50 to 100 grams is perfect. Now, the liquid gold: three or four tablespoons of good extra virgin olive oil.' },
        { time: '[00:33 - 00:42]', text: 'And the acidic kick, super important: one tablespoon of sherry vinegar, that special touch. And to finish, a glass of very cold water to lighten it up and, of course, salt to taste.' },
        { time: '[00:42 - 00:48]', text: 'Time for action. The preparation is super simple, just three quick steps.' },
        { time: '[00:48 - 00:58]', text: 'Chop everything up, add the liquids and the salt and blend on high speed. Now for the final touch.' },
        { time: '[00:58 - 01:01]', text: 'This is where you choose the style of your gazpacho.' },
        { time: '[01:01 - 01:08]', text: 'You have to decide: do you like it rustic, unstrained, or smoother, passing it through a strainer?' },
        { time: '[01:08 - 01:13]', text: 'And here\'s the big secret: let it chill really well in the fridge. It has to be very cold.' },
        { time: '[01:13 - 01:18]', text: 'And once everything is ready, the best moment comes: serving and enjoying. You can serve it in a glass, which looks super tempting, or in a more traditional bowl.' },
        { time: '[01:18 - 01:27]', text: 'And on top, what works best? Some crunchy croutons or finely chopped fresh veggies.' }
      ]
    },
    fr: {
      title: 'Transcription : Gazpacho rapide - Version classique',
      content: [
        { time: '[00:00 - 00:04]', text: 'Allez, on va préparer un gazpacho classique, mais en version ultra rapide.' },
        { time: '[00:04 - 00:11]', text: 'Attention. Un plat frais et authentique prêt en un rien de temps ? Oui, c\'est possible.' },
        { time: '[00:11 - 00:18]', text: 'D\'abord, les vedettes. Voici les ingrédients qui vont donner vie à tout ça : tomate, concombre, poivron, ail et pain. C\'est la base.' },
        { time: '[00:18 - 00:26]', text: 'Avec ça, impossible de se tromper. Des tomates bien mûres, un demi-concombre, un poivron et une touche d\'ail, ou une demi-gousse pour que ce soit plus doux.' },
        { time: '[00:26 - 00:33]', text: 'Pour donner de la consistance, un peu de pain de la veille. Environ 50 à 100 g, c\'est parfait. Maintenant, l\'or liquide : trois ou quatre cuillères à soupe d\'une bonne huile d\'olive vierge extra.' },
        { time: '[00:33 - 00:42]', text: 'Et pour l\'acidité, très importante, une cuillère à soupe de vinaigre de Xérès, la petite touche en plus. Et pour finir, un verre d\'eau bien froide pour alléger le tout et, bien sûr, du sel à votre goût.' },
        { time: '[00:42 - 00:48]', text: 'Allez, on passe à l\'action. La préparation est ultra simple, en trois étapes rapides.' },
        { time: '[00:48 - 00:58]', text: 'On coupe tout, on ajoute les liquides et le sel, et on mixe à fond. Et maintenant, la touche finale.' },
        { time: '[00:58 - 01:01]', text: 'C\'est ici que se décide le style de votre gazpacho.' },
        { time: '[01:01 - 01:08]', text: 'Il faut choisir : vous le préférez rustique, non filtré, ou plus fin, en le passant au tamis ?' },
        { time: '[01:08 - 01:13]', text: 'Attention, voici le grand secret : il faut le laisser bien refroidir au réfrigérateur. Bien frais.' },
        { time: '[01:13 - 01:18]', text: 'Et une fois que tout est prêt, arrive le meilleur moment : servir et se régaler. On peut le servir dans un verre, très gourmand, ou dans un bol plus traditionnel.' },
        { time: '[01:18 - 01:27]', text: 'Et pour couronner le tout, qu\'est-ce qui va le mieux ? Quelques croûtons bien croustillants ou des petits légumes frais finement coupés.' }
      ]
    },
    de: {
      title: 'Transkript: Schneller Gazpacho - Klassische Version',
      content: [
        { time: '[00:00 - 00:04]', text: 'So, wir machen jetzt einen Gazpacho ganz klassisch, aber in einer super schnellen Version.' },
        { time: '[00:04 - 00:11]', text: 'Aufgepasst. Ein frisches und authentisches Gericht, in kürzester Zeit fertig? Ja, das ist möglich.' },
        { time: '[00:11 - 00:18]', text: 'Zuerst die Hauptdarsteller. Das sind die Zutaten, die dem Ganzen Leben einhauchen: Tomate, Gurke, Paprika, Knoblauch und Brot. Das ist die Basis.' },
        { time: '[00:18 - 00:26]', text: 'Damit kannst du nichts falsch machen. Reife Tomaten, eine halbe Gurke, eine Paprika und ein Hauch Knoblauch, oder nur eine halbe Zehe, damit es nicht zu stark ist.' },
        { time: '[00:26 - 00:33]', text: 'Für mehr Fülle etwas Brot vom Vortag. Etwa 50 bis 100 Gramm sind perfekt. Jetzt kommt das flüssige Gold: drei bis vier Esslöffel gutes natives Olivenöl extra.' },
        { time: '[00:33 - 00:42]', text: 'Und für die Säure, ganz wichtig: ein Esslöffel Sherryessig, das besondere Etwas. Und zum Abschluss ein Glas eiskaltes Wasser, um alles etwas zu verdünnen, und natürlich Salz nach Geschmack.' },
        { time: '[00:42 - 00:48]', text: 'Los geht\'s. Die Zubereitung ist super einfach, in drei schnellen Schritten.' },
        { time: '[00:48 - 00:58]', text: 'Alles klein schneiden, Flüssigkeiten und Salz dazugeben und kräftig pürieren. Und jetzt der letzte Schliff.' },
        { time: '[00:58 - 01:01]', text: 'Hier entscheidest du über den Stil deines Gazpachos.' },
        { time: '[01:01 - 01:08]', text: 'Du musst wählen: lieber rustikal, ungefiltert, oder feiner, durch ein Sieb gestrichen?' },
        { time: '[01:08 - 01:13]', text: 'Und hier kommt das große Geheimnis: Lass ihn richtig gut im Kühlschrank durchkühlen. Sehr kalt muss er sein.' },
        { time: '[01:13 - 01:18]', text: 'Und wenn alles fertig ist, kommt der beste Moment: servieren und genießen. Du kannst ihn in einem Glas servieren, was richtig einlädt, oder in einer klassischen Schüssel.' },
        { time: '[01:18 - 01:27]', text: 'Und obendrauf, was passt am besten? Ein paar knusprige Croutons oder frisch gehacktes Gemüse.' }
      ]
    }
  };

  ngOnInit(): void {
    // Cargar recetas del carrusel (10 recetas)
    this.recipeService.getRecipesPaginated(0, 10).subscribe({
      next: (response) => {
        this.trendingRecipes.set(response.content);
        this.isLoadingTrending.set(false);
      },
      error: (err) => {
        console.error('Error cargando recetas del carrusel:', err);
        this.isLoadingTrending.set(false);
      }
    });

    // Cargar recetas de tendencias (10 recetas, de la página 1 para que sean diferentes)
    this.recipeService.getRecipesPaginated(1, 10).subscribe({
      next: (response) => {
        this.mustSeeRecipes.set(response.content);
        this.isLoadingMustSee.set(false);
      },
      error: (err) => {
        console.error('Error cargando recetas de tendencias:', err);
        this.isLoadingMustSee.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    // Inicialización si es necesaria
  }


  onInspireClick(): void {
    // Hacer scroll suave a la sección kitchen-control
    const kitchenSection = document.getElementById('kitchen-control');
    if (kitchenSection) {
      kitchenSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onRecipeClick(id: number): void {
    this.router.navigate(['/recetas', id]);
  }

  /**
   * Formatea una etiqueta para mostrarla de forma legible
   */
  formatTag(tag: string): string {
    if (!tag) return '';
    return tag
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Traduce la dificultad del backend al español
   */
  getDifficultyLabel(dificultad: string): string {
    const difficultyUpper = dificultad?.toUpperCase();
    if (difficultyUpper === 'BAJA') return 'Fácil';
    if (difficultyUpper === 'MEDIA') return 'Media';
    if (difficultyUpper === 'ALTA') return 'Difícil';
    return dificultad;
  }

  onKitchenClick(): void {
    // Si el usuario está logeado, ir al dashboard
    // Si no está logeado, ir al registro
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    console.log('Newsletter submit:', this.newsletterEmail);
  }

  prevSlide(): void {
    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.scrollBy({
        left: -this.carouselScrollAmount,
        behavior: 'smooth'
      });
    }
  }

  nextSlide(): void {
    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.scrollBy({
        left: this.carouselScrollAmount,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Cambia el idioma de la transcripción del vídeo
   */
  setTranscriptLanguage(lang: 'es' | 'en' | 'fr' | 'de'): void {
    this.transcriptLanguage.set(lang);
  }

  /**
   * Obtiene la transcripción en el idioma actual
   */
  getCurrentTranscript() {
    return this.transcripts[this.transcriptLanguage()];
  }
}

