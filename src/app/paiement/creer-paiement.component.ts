import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creer-paiement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creer-paiement.component.html',
  styleUrls: ['./creer-paiement.component.css']
})
export class CreerPaiementComponent {
  paiement = {
    codeClient: '',
    numeroFacture: '',
    modePaiement: '',
    montant: '',
    datePaiement: ''
  };

  paymentMethods = [
    { value: 'ESPECE', label: 'Espèce', icon: 'fas fa-money-bill-wave' },
    { value: 'VIREMENT', label: 'Virement', icon: 'fas fa-exchange-alt' },
    { value: 'CHEQUE', label: 'Chèque', icon: 'fas fa-money-check' },
    { value: 'CHEQUE_CERTIFIE_CONFRERE', label: 'Chèque certifié', icon: 'fas fa-certificate' }
  ];

  clientSearch = '';
  clients: any[] = [];
  selectedClientName = '';

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state?.['facture']) {
      this.paiement.numeroFacture = state['facture'].reference;
      this.paiement.montant = state['facture'].montant;
    }
  }

  retourDashboard() {
    this.router.navigate(['/dashboard-admin']);
  }

  rechercherClient() {
    if (this.clientSearch.length < 2) {
      this.clients = [];
      return;
    }

    this.http
      .get<any[]>(`http://localhost:8081/api/clients/recherche?nom=${this.clientSearch}`)
      .subscribe({
        next: (data) => (this.clients = data),
        error: () => (this.clients = [])
      });
  }

  selectionnerClient(client: any) {
    this.paiement.codeClient = client.codeClient;
    this.selectedClientName = client.nom;
  }

  effectuerPaiement() {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.paiement.datePaiement = new Date().toISOString().split('T')[0];

    this.http.post<any>('http://localhost:8084/api/paiements', this.paiement).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Paiement effectué avec succès';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors du paiement';
        this.loading = false;
      }
    });
  }
}