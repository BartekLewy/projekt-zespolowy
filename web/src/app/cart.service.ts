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

  constructor() {
    const products = JSON.parse(localStorage.getItem('products'));
    if (products !== null) {
      products.forEach((value, index) => {
        this.addProduct(value);
      });

      this.fullPrice.next(localStorage.getItem('price'));
      this.productsCount.next(localStorage.getItem('productsCount'));
    } else {
      this.fullPrice.next(0);
      this.productsCount.next(0);
    }

  }

  public addProduct(product) {
    this.products.push(product);

    let price = 0;
    this.products.forEach((item, index) => {
      price += item.price;
    });

    localStorage.setItem('products', JSON.stringify(this.products));
    localStorage.setItem('price', price);
    localStorage.setItem('productsCount', this.products.length);

    this.fullPrice.next(price);
    this.productsCount.next(this.products.length);

  }

  public removeProduct(product) {
    this.products.forEach((item, index) => {
      if (product === item) {
        localStorage.setItem('price', localStorage.getItem('price') - item.price);
        this.products.splice(index, 1);
      }
    });

    console.log(this.products);

    localStorage.setItem('products', JSON.stringify(this.products));
    localStorage.setItem('productsCount', this.products.length);

    this.productsCount.next(this.products.length);
    this.fullPrice.next(localStorage.getItem('price'));

  }

  public getProducts() {
    return this.products;
  }

  public getProductsCount() {
    return this.products.length;
  }

}
