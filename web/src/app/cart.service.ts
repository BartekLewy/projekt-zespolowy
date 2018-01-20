import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  private products = [];

  constructor() {}

  public addProduct(product) {
    this.products.push(product);
    console.log(this.products);
  }

}
