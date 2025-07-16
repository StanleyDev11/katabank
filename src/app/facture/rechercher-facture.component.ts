import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
selector: 'app-rechercher-facture',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './rechercher-facture.component.html',
styleUrls: ['./rechercher-facture.component.css']
})
export class RechercherFactureComponent {
reference = '';
facture: any = null;
loading = false;
errorMessage = '';

constructor(private http: HttpClient, private router: Router) {}

rechercher() {
  this.loading = true;
  this.errorMessage = '';
  this.facture = null;

  // Appel du bon endpoint : POST vers /importer/{reference}
  this.http.post<any>(`http://localhost:8082/api/factures/importer/${this.reference}`, {}).subscribe({
    next: (response) => {
      this.loading = false;
      if (response.status === 'success' && response.data) {
        this.facture = response.data;
      } else {
        this.errorMessage = 'Facture non trouvée ou non importée.';
      }
    },
    error: (err) => {
      this.loading = false;
      this.errorMessage = 'Erreur lors de l\'importation de la facture.';
    }
  });
}

retourDashboard() {
    this.router.navigate(['/dashboard-admin']); // Adaptez le chemin selon votre route
  }

payerFacture() {
if (!this.facture) return;



// Redirige vers /paiement/creer avec les infos de la facture dans l'état de navigation
this.router.navigate(['/paiement/creer'], {
  state: {
    facture: this.facture
  }
});
}
}