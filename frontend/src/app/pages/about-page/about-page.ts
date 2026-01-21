import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, Button, Breadcrumbs],
  templateUrl: './about-page.html',
  styleUrls: ['./about-page.scss']
})
export class AboutPage {}
