import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(userName: string, password: string) {
    return this.http.post<{ data: { token: string } }>('http://localhost:8000/login', { userName, password }).pipe(
      map(response => {
         // Check if the response contains a token
        if (response.data && response.data.token) {
          console.log("Login successful!");
          // Save the token in localStorage
          localStorage.setItem('token', response.data.token);
          console.log("response.data.token",response.data.token);
        } else {
          console.error("Login failed!");
        }
        return response;
      }),
      catchError(error => {
        console.error("error:", error);
        throw error; 
      })
    );
  }
   // Function to retrieve the stored authentication token from local storage
   getToken() {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return token;
  }
    // Function to create HTTP headers with the authentication token
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }  
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    
  }
}