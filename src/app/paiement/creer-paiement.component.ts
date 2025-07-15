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

clientSearch = '';
clients: any[] = [];

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
this.clientSearch = client.nom;
this.clients = [];
}

effectuerPaiement() {
this.successMessage = '';
this.errorMessage = '';
this.loading = true;

// ⏱️ Générer automatiquement la date de paiement au format YYYY-MM-DD
this.paiement.datePaiement = new Date().toISOString().split('T')[0];

// Appel REST (plus de SOAP)
this.http.post('http://localhost:8084/api/paiements', this.paiement).subscribe({
next: () => {
this.successMessage = '✅ Paiement effectué avec succès';
this.loading = false;
setTimeout(() => this.router.navigate(['/dashboard-client']), 2000);
},
error: () => {
this.errorMessage = '❌ Échec du paiement';
this.loading = false;
}
});
}
}