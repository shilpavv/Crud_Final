import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AuthService } from './Authservice/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  addEmployee(data: any) {
     // Get authentication headers from AuthService
    const headers = this.authService.getHeaders(); 
    return this.http.post<any>(`http://localhost:8000/employees`, data, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error adding employee data:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getEmployee() {
    const headers = this.authService.getHeaders(); 
    return this.http.get(`http://localhost:8000/employees`, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching employee data:', error);
        return throwError(() => new Error(error));
      })
    );
  }
  updateEmployee(id: number, updatedData: any) {
    return this.http.put(`http://localhost:8000/employees/${id}`, updatedData).pipe(
      catchError((error: any) => {
        console.error('Error Updating employee data:', error);
        return throwError(() => new Error(error));
      })
    );
  }
  
  deactivateEmployee(employeeId: number) {
    return this.http.post<any>(`http://localhost:8000/employees/${employeeId}`, { active: false });
  }
  DeleteEmployee(id: number) {
    return this.http.delete(`${environment.apiUrl}/employee/` + id);
  }
  addUser(data: any) {
    return this.http.post<any>(`http://localhost:8000/user`, data).pipe(
    catchError((error: any) => {
     console.error('Error adding user data:', error);
     return throwError(() => new Error(error));
   })
    )
 }
 getUser() {
  return this.http.get(`http://localhost:8000/user`).pipe(
    catchError((error: any) => {
      console.error('Error fetching user data:', error);
      return throwError(() => new Error(error));
    })
  );
}


}