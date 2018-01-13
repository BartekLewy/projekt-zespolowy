import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private products = [];

  public addToCart(product) {
    this.products.push(product);
  }

  public getProductsFromCart() {
    return this.products;
  }

  public getCountProductsFromCart() {
    return this.products.length;
  }
}
