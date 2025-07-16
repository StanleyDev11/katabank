import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Payment {
  codeClient: string;
  numeroFacture: string;
  modePaiement: string;
  montant: number;
  datePaiement: string;
}

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  selectedPayment: Payment | null = null;
  
  // Filtres
  searchTerm = '';
  startDate = '';
  endDate = '';
  selectedMode = '';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  
  // Tri
  sortColumn = 'datePaiement';
  sortDirection = 'desc';
  
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
  this.loading = true;
  this.http.get<{ message: string, data: Payment[] }>('http://localhost:8084/api/paiements')
    .subscribe({
      next: (response) => {
        console.log('Réponse complète :', response);
        this.payments = Array.isArray(response.data) ? response.data : [];
        this.filterPayments();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des paiements :', error);
        this.payments = [];
        this.filterPayments();
        this.loading = false;
      }
    });
}


  filterPayments(): void {
    let filtered = [...this.payments];
    
    // Filtre par recherche texte
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.codeClient.toLowerCase().includes(term) || 
        p.numeroFacture.toLowerCase().includes(term)
      );
    }
    
    // Filtre par date
    if (this.startDate) {
      const start = new Date(this.startDate);
      filtered = filtered.filter(p => new Date(p.datePaiement) >= start);
    }
    
    if (this.endDate) {
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(p => new Date(p.datePaiement) <= end);
    }
    
    // Filtre par mode de paiement
    if (this.selectedMode) {
      filtered = filtered.filter(p => p.modePaiement === this.selectedMode);
    }
    
    // Tri
    filtered.sort((a, b) => {
  const key = this.sortColumn as keyof Payment;
  if (a[key] < b[key]) {
    return this.sortDirection === 'asc' ? -1 : 1;
  }
  if (a[key] > b[key]) {
    return this.sortDirection === 'asc' ? 1 : -1;
  }
  return 0;
});

    
    this.filteredPayments = filtered;
    this.updatePagination();
  }

  sortPayments(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filterPayments();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPayments.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  viewDetails(payment: Payment): void {
    this.selectedPayment = payment;
  }

  printReceipt(payment: Payment): void {
    console.log('Printing receipt for payment', payment);
    // Implémentez la logique d'impression ici
  }

  exportToExcel(): void {
    console.log('Exporting to Excel');
    // Implémentez l'export Excel ici
  }

  getModeLabel(mode: string): string {
    switch(mode) {
      case 'VIREMENT': return 'Virement';
      case 'ESPECE': return 'Espèce';
      case 'CHEQUE': return 'Chèque';
      case 'CHEQUE_CERTIFIE_CONFRERE': return 'Chèque certifié';
      default: return mode;
    }
  }

  getModeClass(mode: string): string {
    return mode.toLowerCase();
  }
}