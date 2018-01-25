import {Component, Input, OnInit} from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() products = [];
  @Input() summary = false;
  @Input() discountValue = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products = this.cartService.getProducts();
  }

  removeProduct(product) {
       this.cartService.removeProduct(product);
  }

  clean() {
    this.cartService.clean();
  }
}
