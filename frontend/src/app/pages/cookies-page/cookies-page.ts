import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-cookies-page',
  standalone: true,
  imports: [RouterLink, Button, Breadcrumbs],
  templateUrl: './cookies-page.html',
  styleUrls: ['./cookies-page.scss']
})
export class CookiesPage {}
