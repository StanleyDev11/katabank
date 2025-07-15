import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class AuthService {
isAuthenticated(): boolean {
return !!localStorage.getItem('role');
}

setRole(role: string): void {
localStorage.setItem('role', role);
}

logout(): void {
localStorage.removeItem('role');
}
}