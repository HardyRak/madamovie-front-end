import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) { }
  
    login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/client/auth/login`, credentials).pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.token);
        })
      );
    }
    
    save(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/utilisateur/ajout`, credentials).pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.token);
        })
      );
    }


    logout() {
      localStorage.removeItem('access_token');
      this.router.navigate(['login']);
    }
    
    public get loggedIn(): boolean {
      return localStorage.getItem('access_token') !== null;
    }

    decodeToken(token: string): any {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
      }
    }

    getDecodedToken(): any {
      const token = localStorage.getItem('access_token'); 
      if (token) {
        return this.decodeToken(token);
      }
      return null;
    }


}
