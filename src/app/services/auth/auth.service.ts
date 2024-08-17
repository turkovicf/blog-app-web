import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.staging';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Zameni sa svojim URL-om

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('jwtToken', response.token);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/Register`, { username, email, password });
  }

  // Proverava da li je korisnik prijavljen
  isLoggedIn(): boolean {
    return this.isAuthenticated(); // Možeš koristiti isAuthenticated ili napraviti logiku ovde
  }



  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);

      return decodedToken.role === 'Admin';
    }
    
    return false;
  }
}
