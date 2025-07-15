import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from './client.model';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-client.component.html',
  styleUrls: ['./list-client/list-client.css']
})
export class AddClientComponent {
  @Output() clientAdded = new EventEmitter<Client>();
  @Output() close = new EventEmitter<void>();

  client: Client = {
    codeClient: '',
    nom: '',
    prenom: '',
    numeroCompte: '',
    solde: 0
  };

  errorMessages = {
    codeClient: '',
    numeroCompte: '',
    solde: ''
  };

  ajouter() {
    this.errorMessages = { codeClient: '', numeroCompte: '', solde: '' };

    if (this.client.codeClient.length !== 6) {
      this.errorMessages.codeClient = 'Le code client doit contenir exactement 6 caractères.';
      return;
    }

    if (this.client.numeroCompte.length !== 18) {
      this.errorMessages.numeroCompte = 'Le numéro de compte doit contenir exactement 18 caractères.';
      return;
    }

    if (this.client.solde < 0) {
      this.errorMessages.solde = 'Le solde doit être positif ou nul.';
      return;
    }

    this.clientAdded.emit(this.client);
    this.client = { codeClient: '', nom: '', prenom: '', numeroCompte: '', solde: 0 };
    this.close.emit(); // Fermer la modale
  }
  fermerParClicExterieur(event: MouseEvent) {
  this.close.emit();
}

}
