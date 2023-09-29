import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { SharedComponent } from 'src/app/shared/conformModal.component';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  userForm!: FormGroup;
  @Input() currentUser: any;
  userList: any[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.currentUser?.id],
      firstName: [
        this.currentUser ? this.currentUser.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.currentUser ? this.currentUser.lastName : '',
        Validators.required,
      ],
      email: [
        this.currentUser ? this.currentUser.email : '',
        [Validators.required],
      ],
      password: [
        this.currentUser ? this.currentUser.password : '',
        [Validators.required],
      ],
      confirmPassword: [
        this.currentUser ? this.currentUser.confirmPassword : '',
        [Validators.required],
      ],
      
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log(formData,"sdhcjsdg")
      this.apiService.addUser(formData).subscribe(
           (newUser: any) => {
          console.log('Response from addUser API:', newUser);
          this.userList.push(newUser);
          console.log('User added:', newUser);
          this.activeModal.close(newUser);
        },
        (error) => {
          console.error('Connection failed:', error);
        }
      );
      }      
  }
  cancel() {
    this.activeModal.dismiss();


    }  }


