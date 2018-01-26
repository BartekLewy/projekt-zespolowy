import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  API = 'http://localhost:8000';
  results = {};

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.http.get(this.API + '/product').subscribe(
      data => {
        this.results = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  addProduct(product) {
    this.cartService.addProduct(product);
  }

  isLoggedIn() {
    return localStorage.getItem('userToken') !== null;
  }

  deleteProduct(itemId) {
    this.http.delete(this.API + '/product/' + itemId).subscribe(
      res => {
        this.http.get(this.API + '/product').subscribe(
          data => {
            this.results = data;
          },
          err => {
            console.log(err);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

}
