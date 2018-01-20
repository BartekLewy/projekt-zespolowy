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

  API = 'http://localhost:8000';

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
      'phone': [null, Validators.required],
      'discountCode' : [null],
    });
  }

  ngOnInit() {
    this.products = this.cartService.getProducts();
  }

  addOrder(order) {
    console.log(order);

    const products = [ 
    ];

    this.products.forEach((value, index) => {
      const id = value.id || value._id;
      this.products[id] = {id: id, count: 0 };
    });

    const body = {
      firstName: order.firstName,
      lastName: order.lastName,
      street: order.street,
      localNumber: order.localNumber,
      postalCode: order.postalCode,
      email: order.email,
      city: order.city,
      phone: order.phone,
      products: products
    };

    this.httpClient.post(this.API + '/order', body).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
