import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders = [];

  API = 'http://localhost:8000';
  singleOrder = false;
  chosenOrder = null;
  statusUpdated = false;

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {
    if (localStorage.getItem('userToken') === null) {
      this.router.navigate(['login']);
    }

    this.httpClient.get(this.API + '/order').subscribe(
      data => {
        if (data instanceof Array){
          data.forEach(element => {
            this.orders.push(element.data);
          });
        }
      }
    );
  }
  showOrder(orderId) {
    this.httpClient.get(this.API + '/order/' + orderId).subscribe(
      data => {
        if (!isNullOrUndefined(data.data)) {
          this.chosenOrder = data.data;
          this.singleOrder = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateStatus() {
    this.httpClient.put(this.API + '/order/change/status/' + this.chosenOrder._id, {status: this.chosenOrder.orderStatus}).subscribe(
      res => {
        this.orders = [];
        this.httpClient.get(this.API + '/order').subscribe(
          data => {
            if (data instanceof Array) {
              data.forEach(element => {
                this.orders.push(element.data);
              });
            }
          }
        );
        this.statusUpdated = true;
    }, err => {
        this.statusUpdated = false;
        console.log(err);
      });
  }

}
