import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders = [];

  API = 'http://localhost:8000';

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {
    if (localStorage.getItem('userToken') === null) {
      this.router.navigate(['login']);
    }

    this.httpClient.get(this.API + '/order').subscribe(
      data => {
        data.forEach(element => {
          this.orders.push(element.data);
        });
      }
    );
  }

}
