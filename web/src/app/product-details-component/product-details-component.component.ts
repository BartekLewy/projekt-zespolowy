import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details-component',
  templateUrl: './product-details-component.component.html',
  styleUrls: ['./product-details-component.component.css']
})
export class ProductDetailsComponentComponent implements OnInit {

  id = null;
  product = {};
  API = 'http://localhost:8000';

  constructor(private route: ActivatedRoute, private http: HttpClient, private cartService: CartService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.id !== null) {
      this.http.get(this.API + '/product/' + this.id).subscribe(
        response => {
          this.product = response.data;
          console.log(this.product);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //todo: dokleic 404
    }
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }

}
