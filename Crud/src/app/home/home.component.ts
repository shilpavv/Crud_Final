import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/Authservice/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true; 
  constructor(private authService: AuthService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false; 
    }, 2000);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
// getLoggedUserName() {
//   const loggedUser = localStorage.getItem('loggedUser');
//   if (loggedUser) {
//     const user = JSON.parse(loggedUser);
//     return user.name;
//   }
//   return ''; // Return an empty string if user data is not found
// }