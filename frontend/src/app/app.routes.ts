import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { StyleGuidePage } from './pages/style-guide-page/style-guide-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'registro', component: RegisterPage },
  { path: 'style-guide', component: StyleGuidePage },
];
