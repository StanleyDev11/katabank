import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  stats = {
    clients: 12,
    transactions: 20,
    alerts: 5
  };

  
  currentDate = new Date();

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  goToClient() {
    this.router.navigate(['/client']);
  }

  

  recupererFacture() {
    this.router.navigate(['/facture/rechercher']);
  }

  effectuerPaiement() {
    this.router.navigate(['/paiement/creer']);
  }

  

  voirHistoriquePaiements() {
    this.router.navigate(['/paiement/transaction']);
  }

  
  
}
