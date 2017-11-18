import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  public products = [
    { id: 1, name: 'Apple MacBook 12\'\' 1.2GHz/8GB/256GB SSD/HD 615 (gwiezdna szarość)', price: '6499', currency: 'PLN'},
    { id: 2, name: 'Apple MacBook Air 13\'\' 1.8GHz/8GB/128GB SSD/HD 6000 - model 2017', price: '3799', currency: 'PLN'},
    { id: 3, name: 'Apple MacBook Pro 13\'\' 2.3GHz/8GB/128GB SSD/Iris Plus 640 (gwiezdna szarość)', price: '6799', currency: 'PLN'},
    { id: 4, name: 'Apple iMac 21.5\'\' 2.3GHz/8GB/1TB/Iris Plus 640', price: '5499', currency: 'PLN'},
    { id: 5, name: 'Apple iMac 21.5\'\' 2.3GHz/16GB/1TB Fusion Drive/Iris Plus 640', price: '6939', currency: 'PLN'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
