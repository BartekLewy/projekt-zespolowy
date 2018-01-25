import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private alive = true;

  finalPrice: number;
  productsCount: number;

  constructor(private cartService: CartService) {
    cartService.fullPrice$.takeWhile(() => this.alive).subscribe(
      finalPrice => {
        this.finalPrice = finalPrice;
      }
    );

    cartService.producstCount$.takeWhile(() => this.alive).subscribe(
      productsCount => {
        this.productsCount = productsCount;
      }
    );
  }

  ngOnInit() {
    this.finalPrice = Number(localStorage.getItem('price')) || 0;
    this.productsCount = Number(localStorage.getItem('productsCount')) || 0;
  }


}
