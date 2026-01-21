import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [RouterLink, Button, Breadcrumbs],
  templateUrl: './privacy-page.html',
  styleUrls: ['./privacy-page.scss']
})
export class PrivacyPage {}
