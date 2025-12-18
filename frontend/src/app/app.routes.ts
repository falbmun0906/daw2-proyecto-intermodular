import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { StyleGuidePage } from './pages/style-guide-page/style-guide-page';
import { AboutPage } from './pages/about-page/about-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'registro', component: RegisterPage },
  { path: 'sobre', component: AboutPage },
  { path: 'style-guide', component: StyleGuidePage },
];
