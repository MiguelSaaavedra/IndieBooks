import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio.page').then(m => m.InicioPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./pages/carrito/carrito.page').then(m => m.CarritoPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
    canActivate: [AuthGuard]
  }
];
