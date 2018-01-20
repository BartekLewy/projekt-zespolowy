import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products = this.cartService.getProducts();
    // const tmpProducts = [];
    // this.cartService.getProducts().forEach((value, index) => {
    //   if (tmpProducts[value.id]) {
    //     tmpProducts[value.id].count++;
    //   } else {
    //     tmpProducts[value.id] = {
    //       name: value.name,
    //       price: value.price,
    //       count: 1,
    //       thumbnail: value.thumbnail
    //     };
    //   }
    // });

    // tmpProducts.forEach((value, index) => {
    //   console.log(value);
    //     this.products.push(value);
    // });
  }
}
