import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CartService {

  private products = [];
  private fullPrice = new Subject<any>();
  private productsCount = new Subject<any>();

  fullPrice$ = this.fullPrice.asObservable();
  producstCount$ = this.productsCount.asObservable();

  constructor() {}

  public addProduct(product) {
    this.products.push(product);

    let price = 0;
    this.products.forEach((item, index) => {
      price += item.price;
    });

    this.fullPrice.next(price);
    this.productsCount.next(this.products.length);

  }

  public removeProduct(product) {
    this.products.forEach((item, index) => {
      if (product === item) {
        this.products.slice(index, 1);
      }
    });

    this.productsCount.next(this.products.length);
  }

  public getProducts() {
    return this.products;
  }

  public getProductsCount() {
    return this.products.length;
  }

}
