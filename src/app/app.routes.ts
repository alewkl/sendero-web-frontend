import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'supervivencia', loadComponent: () => import('./pages/supervivencia/supervivencia.component').then(m => m.SupervivenciaComponent) },
  { path: 'campismo', loadComponent: () => import('./pages/campismo/campismo.component').then(m => m.CampismoComponent) },
  { path: 'navegacion', loadComponent: () => import('./pages/navegacion/navegacion.component').then(m => m.NavegacionComponent) },
  { path: 'nudos', loadComponent: () => import('./pages/nudos/nudos.component').then(m => m.NudosComponent) },
  { path: 'primeros-auxilios', loadComponent: () => import('./pages/primeros-auxilios/primeros-auxilios.component').then(m => m.PrimerosAuxiliosComponent) },
  { path: 'cocina', loadComponent: () => import('./pages/cocina/cocina.component').then(m => m.CocinaComponent) },
  { path: 'checklist', loadComponent: () => import('./pages/checklist/checklist.component').then(m => m.ChecklistComponent) },
  { path: 'botanica', loadComponent: () => import('./pages/botanica/botanica.component').then(m => m.BotanicaComponent) },
  { path: 'meteorologia', loadComponent: () => import('./pages/meteorologia/meteorologia.component').then(m => m.MeteorologiaComponent) },
  { path: 'quiz', loadComponent: () => import('./pages/quiz/quiz.component').then(m => m.QuizComponent) },
  { path: '**', redirectTo: '' }
];
