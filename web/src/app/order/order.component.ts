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
  discountCode = null;
  discountLoading = false;

  done: boolean;

  products = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    public cartService: CartService
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

    this.done = false;
  }

  ngOnInit() {
    this.products = this.cartService.getProducts();
  }

  addOrder(order) {

    const result = [];
    const ids = [];

    this.products.forEach(x => {
      if (ids.indexOf(x.id) < 0) {
        ids.push(x.id);
      }

      if (ids.indexOf(x._id) < 0) {
        ids.push(x._id);
      }
    });

    ids.forEach(id => {
      const res = this.products.filter(x => {
        if (typeof id !== 'undefined') {
          return (x.id === id || x._id === id) && id !== 'undefined';
        }
      });
      if (typeof id !== 'undefined') {
        result.push({item: id, count: res.length});
      }
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
      products: result,
      discountCode: this.discountCode.code, /// na razie można oba zahardkodować na null
      discountValue: this.discountCode.value
    };

    console.log(body);

    this.httpClient.post(this.API + '/order', body).subscribe(
      data => {
        this.cartService.clean();
        this.done = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadDiscountCode() {
    this.rForm.controls['discountCode'].markAsUntouched();
    if (this.discountCode !== null) {
        return true;
    }
    this.discountLoading = true;

    this.httpClient.get(this.API + '/discount/' + this.rForm.controls['discountCode'].value).subscribe(
      data => {
        this.discountLoading = false;
        this.discountCode = data.data;
        console.log(data);
      },
      err => {
        this.discountLoading = false;
        this.discountCode = null;
      },
    );
    return true;
  }

  getPriceSum() {
    let price = 0;

    for (let p of this.products) {
      price += p.price;
    }

    return price;
  }
}
