import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [RouterLink, Button, Breadcrumbs],
  templateUrl: './terms-page.html',
  styleUrls: ['./terms-page.scss']
})
export class TermsPage {}
