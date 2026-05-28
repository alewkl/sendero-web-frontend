import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'supervivencia', loadComponent: () => import('./pages/supervivencia/supervivencia.component').then(m => m.SupervivenciaComponent) },
  { path: 'campismo', loadComponent: () => import('./pages/campismo/campismo.component').then(m => m.CampismoComponent) },
  { path: 'navegacion', loadComponent: () => import('./pages/navegacion/navegacion.component').then(m => m.NavegacionComponent) },
  { path: 'nudos', loadComponent: () => import('./pages/nudos/nudos.component').then(m => m.NudosComponent) },
  { path: 'primeros-auxilios', loadComponent: () => import('./pages/primeros-auxilios/primeros-auxilios.component').then(m => m.PrimerosAuxiliosComponent) },
  { path: 'cocina', loadComponent: () => import('./pages/cocina/cocina.component').then(m => m.CocinaComponent) },
  { path: '**', redirectTo: '' }
];
