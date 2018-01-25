import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  API = 'http://localhost:8000';
  status: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.rForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  loginAction(credentials) {

    const body = {
      username: credentials.username,
      password: credentials.password
    };

    console.log(body);

    this.httpClient.post(this.API + '/login', body).subscribe(
      data => {
        localStorage.setItem('userToken', data.toString());
        this.status = true;
        this.router.navigateByUrl('/admin');
      },
      err => {
        this.status = false;
        console.log(err);
      }
    );
  }

}
