import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';
import { Accordion, AccordionItem } from '../../components/shared/accordion/accordion';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [RouterLink, Button, Breadcrumbs, Accordion],
  templateUrl: './faq-page.html',
  styleUrls: ['./faq-page.scss']
})
export class FaqPage {
  faqItems: AccordionItem[] = [
    {
      id: 'faq-1',
      title: '¿Cómo puedo crear una cuenta en Desp[i]ensa?',
      content: 'Para crear una cuenta, haz clic en el botón "Registrarse" en la parte superior de la página. Puedes registrarte usando tu correo electrónico o mediante tu cuenta de Google o Facebook. Solo necesitas proporcionar tu nombre, correo y una contraseña segura.',
      isExpanded: false
    },
    {
      id: 'faq-2',
      title: '¿Es gratis usar Desp[i]ensa?',
      content: 'Sí, Desp[i]ensa es completamente gratuito. Puedes acceder a todas nuestras recetas, guardar tus favoritas y gestionar tu despensa sin ningún coste.',
      isExpanded: false
    },
    {
      id: 'faq-3',
      title: '¿Cómo funciona el sistema de búsqueda por ingredientes?',
      content: 'Solo tienes que ir a la sección "Mi Despensa", añadir los ingredientes que tienes disponibles, y la plataforma te mostrará recetas que puedes hacer con ellos. También puedes usar el buscador de recetas y filtrar por ingredientes específicos.',
      isExpanded: false
    },
    {
      id: 'faq-4',
      title: '¿Puedo guardar mis recetas favoritas?',
      content: 'Sí, una vez que hayas creado una cuenta, puedes guardar tus recetas favoritas haciendo clic en el icono de corazón. Podrás acceder a ellas desde tu perfil en cualquier momento.',
      isExpanded: false
    },
    {
      id: 'faq-5',
      title: '¿Puedo compartir mis propias recetas?',
      content: 'Actualmente estamos trabajando en esta funcionalidad. Próximamente podrás compartir tus propias recetas con la comunidad de Desp[i]ensa.',
      isExpanded: false
    },
    {
      id: 'faq-6',
      title: '¿Cómo puedo filtrar recetas según mis restricciones alimentarias?',
      content: 'En tu perfil, puedes configurar tus preferencias alimentarias y alergias (vegetariano, vegano, sin gluten, sin lactosa, etc.). Las recetas que veas se adaptarán automáticamente a tus necesidades.',
      isExpanded: false
    },
    {
      id: 'faq-7',
      title: '¿Las recetas incluyen información nutricional?',
      content: 'Sí, cada receta incluye información nutricional detallada: calorías, proteínas, carbohidratos, grasas y otros valores nutricionales importantes.',
      isExpanded: false
    },
    {
      id: 'faq-8',
      title: '¿Puedo usar Desp[i]ensa en mi móvil?',
      content: 'Absolutamente. Desp[i]ensa está diseñado para ser completamente responsive y funciona perfectamente en móviles, tablets y ordenadores.',
      isExpanded: false
    },
    {
      id: 'faq-9',
      title: '¿Cómo puedo modificar o eliminar mi cuenta?',
      content: 'Puedes gestionar tu cuenta desde la sección "Mi Perfil". Allí encontrarás opciones para editar tu información personal, cambiar tu contraseña o eliminar tu cuenta si lo deseas.',
      isExpanded: false
    },
    {
      id: 'faq-10',
      title: '¿Cómo puedo reportar un problema o hacer una sugerencia?',
      content: 'Puedes contactarnos a través del formulario de contacto en la página de Contacto. También puedes enviarnos un correo a soporte@despiensa.com. Valoramos mucho tus comentarios y sugerencias.',
      isExpanded: false
    },
    {
      id: 'faq-11',
      title: '¿Qué hago si olvido mi contraseña?',
      content: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?". Te enviaremos un enlace a tu correo electrónico para que puedas restablecerla.',
      isExpanded: false
    },
    {
      id: 'faq-12',
      title: '¿Puedo imprimir las recetas?',
      content: 'Sí, cada receta tiene un botón de impresión que te permite generar una versión optimizada para imprimir, con solo los ingredientes y pasos necesarios.',
      isExpanded: false
    }
  ];
}
