import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from './client.model';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./list-client/list-client.css']
})
export class EditClientComponent {
  @Input() client: Client = { codeClient: '', nom: '', prenom: '', numeroCompte: '', solde: 0 };
  @Output() clientUpdated = new EventEmitter<Client>();
  @Output() close = new EventEmitter<void>();

  errorMessage: string = '';

  modifier() {
    this.errorMessage = '';

    if (this.client.numeroCompte.length !== 18) {
      this.errorMessage = 'Le numéro de compte doit contenir exactement 18 caractères.';
      return;
    }

    if (this.client.solde < 0) {
      this.errorMessage = 'Le solde doit être positif ou nul.';
      return;
    }

    this.clientUpdated.emit(this.client);
    this.close.emit(); // Fermer la modale après modification
  }

  fermerParClicExterieur(event: MouseEvent) {
    this.close.emit();
  }
}
