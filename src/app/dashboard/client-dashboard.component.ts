import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {

  constructor(private router: Router) {}

  recupererFacture() {
    this.router.navigate(['/facture/rechercher']);
  }

  effectuerPaiement() {
    this.router.navigate(['/paiement/creer']);
  }

  voirHistoriquePaiements() {
    this.router.navigate(['/paiements']);
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}
