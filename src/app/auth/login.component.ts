import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
selector: 'app-login',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
email = '';
password = '';
loading = false;
errorMessage = '';

constructor(private router: Router, private authService: AuthService) {}

login() {
this.errorMessage = '';
this.loading = true;


setTimeout(() => {
  if (this.email === 'admin@katabank.com' && this.password === 'admin') {
    this.authService.setRole('admin');
    this.router.navigate(['/dashboard-admin']);
  } else if (this.email === 'client@katabank.com' && this.password === 'client') {
    this.authService.setRole('client');
    this.router.navigate(['/dashboard-client']);
  } else {
    this.errorMessage = 'Identifiants incorrects.';
  }

  this.loading = false;
}, 1000);
}
}