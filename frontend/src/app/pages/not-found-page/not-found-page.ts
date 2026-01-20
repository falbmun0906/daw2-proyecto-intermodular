import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, Button],
  templateUrl: './not-found-page.html',
  styleUrls: ['./not-found-page.scss']
})
export class NotFoundPage {}
