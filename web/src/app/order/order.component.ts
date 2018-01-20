import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  rForm: FormGroup;
  post: any;

  products = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private cartService: CartService
  ) {
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
    this.products = this.cartService.getProducts();
  }

  addOrder(order) {
    console.log(order);
  }

}
