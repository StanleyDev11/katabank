import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },

{ path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },

{
path: 'dashboard-admin',
loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
canActivate: [authGuard]
},
{
path: 'dashboard-client',
loadComponent: () => import('./dashboard/client-dashboard.component').then(m => m.ClientDashboardComponent),
canActivate: [authGuard]
},


{
path: 'client',
loadComponent: () => import('./client/list-client/list-client').then(m => m.ListClientComponent),
canActivate: [authGuard]
},

{
  path: 'facture/rechercher',
  loadComponent: () => import('./facture/rechercher-facture.component').then(m => m.RechercherFactureComponent),
  canActivate: [authGuard]
},

{
  path: 'paiement/creer',
  loadComponent: () => import('./paiement/creer-paiement.component').then(m => m.CreerPaiementComponent),
  canActivate: [authGuard]
},

{
  path: 'paiement/transaction',
  loadComponent: () => import('./paiement/transaction-list.component').then(m => m.TransactionListComponent),
  canActivate: [authGuard]
}



];