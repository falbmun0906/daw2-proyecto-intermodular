import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { StyleGuidePage } from './pages/style-guide-page/style-guide-page';
import { AboutPage } from './pages/about-page/about-page';
import { RecipesPage } from './pages/recipes-page/recipes-page';
import { RecipeDetailPage } from './pages/recipe-detail-page/recipe-detail-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { PantryPage } from './pages/pantry-page/pantry-page';
import { PlannerPage } from './pages/planner-page/planner-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'recetas', component: RecipesPage },
  { path: 'recetas/:id', component: RecipeDetailPage },
  { path: 'mi-cocina', component: DashboardPage },
  { path: 'mi-cocina/despensa', component: PantryPage },
  { path: 'mi-cocina/planificador', component: PlannerPage },
  { path: 'login', component: LoginPage },
  { path: 'registro', component: RegisterPage },
  { path: 'sobre', component: AboutPage },
  { path: 'style-guide', component: StyleGuidePage },
];
