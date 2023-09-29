import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/Authservice/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor is called.');
    const token = this.authService.getToken();
    console.log("token",token)

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        console.log('Error status:', error.status);
        if (error.status === 401 || error.status === 404) {
            this.router.navigate(['/login']); 
        }
        throw error;
      })
    );
  }
}
