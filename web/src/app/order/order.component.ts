import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  rForm: FormGroup;
  post: any;

  constructor(private formBuilder: FormBuilder) {
    this.rForm = formBuilder.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'street' : [null, Validators.required],
      'localNumber' : [null, Validators.required],
      'postalCode' : [null, Validators.required],
      'email' : [null, Validators.required],
      'city' : [null, Validators.required],
      'discountCode' : [null],
    });
  }

  ngOnInit() {
  }

  addOrder(order) {
    console.log(order);
  }

}
