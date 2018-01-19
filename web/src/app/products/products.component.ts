import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  API = 'http://localhost:8000';
  results = {};

  constructor(private http: HttpClient) {}

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

}
