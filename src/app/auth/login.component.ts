import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { faEye, faEyeSlash, faLock, faEnvelope, faExclamationCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  rememberMe = false;
  showPassword = false;



  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.showPassword ? 'text' : 'password';
    }
  }

  login(): void {
    this.errorMessage = '';
    this.loading = true;

    // Simulate API call
    setTimeout(() => {
      if (this.email === 'admin@katabank.com' && this.password === 'admin') {
        this.authService.setRole('admin');
        if (this.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ email: this.email }));
        }
        this.router.navigate(['/dashboard-admin']);
      } else if (this.email === 'client@katabank.com' && this.password === 'client') {
        this.authService.setRole('client');
        if (this.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ email: this.email }));
        }
        this.router.navigate(['/dashboard-client']);
      } else {
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
      }

      this.loading = false;
    }, 1500);
  }

  
}