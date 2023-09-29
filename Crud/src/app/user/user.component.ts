import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userList: any[] = [];

  constructor(private modalService: NgbModal, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  openModal(id?: any) {
    const openModal = this.modalService.open(UserModalComponent);
    openModal.componentInstance.id = id;
    openModal.componentInstance.userList = this.userList;
  }

  fetchData() {
    this.apiService.getUser().subscribe(
      (response: any) => {
        if ((response.users)) {
          this.userList = response.users;
        } else {
          console.error('Invalid response', response);
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
}
