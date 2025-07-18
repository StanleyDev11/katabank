import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client.model';
import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddClientComponent } from '../add-client.component';
import { EditClientComponent } from '../edit-client.component';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [
    DecimalPipe,
    NgFor,
    FormsModule,
    NgClass,
    NgIf,
    AddClientComponent,
    EditClientComponent
  ],
  templateUrl: './list-client.html',
  styleUrls: ['./list-client.css']
})
export class ListClientComponent implements OnInit {
  clients: Client[] = [];
  searchText = '';
  showAddModal = false;
  clientToEdit: Client | null = null;
  clientToDelete: Client | null = null;
  showDeleteConfirmModal = false;
  showCrudButtons = false;
  adminCode = '';
  showAdminPrompt = false;

  messageSuccess: string = '';
  messageError: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (res: any) => {
        if (res && Array.isArray(res.data)) {
          this.clients = res.data;
          this.showMessage(res.message || 'Clients chargés avec succès', 'success');
        } else {
          this.clients = [];
          this.showMessage('Réponse inattendue du backend', 'error');
        }
      },
      error: (err: any) => {
        console.error('Erreur chargement clients :', err);
        this.clients = [];
        this.showMessage("Erreur lors du chargement des clients", 'error');
      }
    });
  }

  get filteredClients(): Client[] {
    return this.clients.filter(c =>
      `${c.nom} ${c.prenom} ${c.codeClient} ${c.numeroCompte}`
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard-admin']);
  }

  ajouterClient(): void {
    this.showAddModal = true;
  }

  onClientAdded(client: Client): void {
    this.clientService.create(client).subscribe({
      next: (res: any) => {
        this.clients.push(res.data || res);
        this.showAddModal = false;
        this.showMessage(res.message || "Client ajouté avec succès", 'success');
      },
      error: (err) => {
        this.showMessage(err?.error?.message || "Erreur lors de l'ajout du client", 'error');
      }
    });
  }

  modifierClient(client: Client): void {
    this.clientToEdit = { ...client };
  }

  onClientUpdated(client: Client): void {
    this.clientService.update(client.codeClient, client).subscribe({
      next: (res: any) => {
        const updated = res.data || res;
        const index = this.clients.findIndex(c => c.codeClient === updated.codeClient);
        if (index !== -1) {
          this.clients[index] = updated;
        }
        this.clientToEdit = null;
        this.showMessage(res.message || "Client modifié avec succès", 'success');
      },
      error: (err) => {
        this.showMessage(err?.error?.message || "Erreur lors de la modification", 'error');
      }
    });
  }

  supprimerClient(codeClient: string): void {
    const client = this.clients.find(c => c.codeClient === codeClient);
    if (client) {
      this.clientToDelete = client;
      this.showDeleteConfirmModal = true;
    }
  }

  confirmerSuppression(): void {
    if (!this.clientToDelete) return;

    this.clientService.delete(this.clientToDelete.codeClient).subscribe({
      next: (res: any) => {
        this.clients = this.clients.filter(c => c.codeClient !== this.clientToDelete?.codeClient);
        this.clientToDelete = null;
        this.showDeleteConfirmModal = false;
        this.showMessage(res?.message || "Client supprimé avec succès", 'success');
      },
      error: (err) => {
        this.showMessage(err?.error?.message || "Erreur lors de la suppression", 'error');
        this.showDeleteConfirmModal = false;
      }
    });
  }

  

  annulerSuppression(): void {
    this.clientToDelete = null;
    this.showDeleteConfirmModal = false;
  }

  toggleAdminPrompt(): void {
    this.showAdminPrompt = true;
  }

  validerCodeAdmin(): void {
    if (this.adminCode === 'admin') {
      this.showCrudButtons = true;
      this.showAdminPrompt = false;
      this.showMessage("Mode Admin activé", 'success');
    } else {
      this.showMessage("Code incorrect", 'error');
      this.adminCode = '';
    }
  }

 

  //  Fonction pour afficher un message et l'effacer après 5 sec
  private showMessage(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      this.messageSuccess = message;
    } else {
      this.messageError = message;
    }
    setTimeout(() => {
      this.messageSuccess = '';
      this.messageError = '';
    }, 5000);
  }
  reloadPage(): void {
  // Solution 1: Rechargement simple
  window.location.reload();
  }
}
