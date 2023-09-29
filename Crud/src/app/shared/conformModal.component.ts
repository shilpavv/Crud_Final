import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared',
  templateUrl: './conformModal.component.html',
  styleUrls: ['./conformModal.component.css']
})
export class SharedComponent  {
  @Input() employee :any;
  @Input() titleMessage :any;
  @Input() actionMessage :any; 
  @Input() login: boolean = false;
  

  constructor(public activeModal:NgbActiveModal){}

}

