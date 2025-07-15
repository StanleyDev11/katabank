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
    clients: 1248,
    transactions: 342,
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
  
}
