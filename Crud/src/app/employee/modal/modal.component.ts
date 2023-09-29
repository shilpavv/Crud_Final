import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() id: any;
  employeeForm!: FormGroup;
  @Input() currentEmployee: any;
  editMode = true;
  isDisabled: boolean = false;
  employeeList: any[] = [];
  isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
    // Create form controls with validation
  }
  ngOnInit(): void {
    this.editMode = !!this.id; // Set editMode based on id
    this.employeeForm = this.fb.group({
      id: [this.currentEmployee?.id],
      name: [
        this.currentEmployee ? this.currentEmployee.name : '',
        Validators.required,
      ],
      age: [
        this.currentEmployee ? this.currentEmployee.age : '',
        Validators.required,
      ],
      dob: [
        this.currentEmployee ? this.currentEmployee.dob : '',
        Validators.required,
      ],
      email: [
        this.currentEmployee ? this.currentEmployee.email : '',
        [Validators.required, Validators.email],
      ],
      mob: [
        this.currentEmployee ? this.currentEmployee.mob : '',
        Validators.required,
      ],
      gender: [
        this.currentEmployee ? this.currentEmployee.gender : '',
        Validators.required,
      ],
      department: [
        this.currentEmployee ? this.currentEmployee.department : '',
        Validators.required,
      ],
    });
  }
  submitForm(){
    if (this.employeeForm.valid) {
      this.activeModal.close(this.employeeForm.value)
      return;
    }else {
      Object.values(this.employeeForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
  cancel() {
    this.activeModal.close(false);
  }
}
  