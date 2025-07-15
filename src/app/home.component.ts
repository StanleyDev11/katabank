import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToLogin() {
    // Pour l'instant on redirige vers un seul login général
    // Tu pourras plus tard faire une détection automatique
    this.router.navigate(['/login']);
  }
}
