import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/Authservice/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponent } from './shared/conformModal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoading: boolean = false; 
  constructor(private router: Router,private AuthService: AuthService,private modalService: NgbModal, ) {}
  showDropdown = false;
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  shouldShowNavbar(): boolean {
    // Hide navbar on the login page
    return this.router.url !== '/login';
  }
  logout() {
    this.isLoading = true;
    // Clear local storage
    const logoutModal = this.modalService.open(SharedComponent);
    // set the action message
    logoutModal.componentInstance.actionMessage = 'logout';
    logoutModal.componentInstance.employee = '';
    logoutModal.result.then((result) => {
      if (result === true) {
        setTimeout(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']); // Navigate to the login page
          this.isLoading = false;
        }, 2000); 
      }
    });
  }
}
