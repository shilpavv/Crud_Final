import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/Authservice/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponent } from '../shared/conformModal.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthService,
    private modalService: NgbModal
  ) {}
  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password:['',Validators.required] 
    });
  }   
  userLogin() {
    const userName = this.loginForm.value.userName;
    const password = this.loginForm.value.password; 

    this.AuthService.login(userName,password).subscribe(
      (response: any) => {
        // Handle the response 
        if (response && response.data && response.data.token) {
          console.log('Login Successful', response);
          const loginModal = this.modalService.open(SharedComponent);
          loginModal.componentInstance.login = 'Login Successful';
          loginModal.result.then((result) => {
            if (result === true) {
              localStorage.setItem('loggedUser', JSON.stringify(response));
              this.router.navigate(['']);
            }
          });
        }
      },
      (err: any) => {
        console.log('Error:', err);
          if (err.status === 401) {
            const loginModal = this.modalService.open(SharedComponent);
            loginModal.componentInstance.login = 'Username or Password incorrect';
          } else {
            alert('Something went wrong');
          }
        } 
      );
  }
}   