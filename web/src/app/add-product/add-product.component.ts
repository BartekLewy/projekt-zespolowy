import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  API = 'http://localhost:8000';
  sent = false;
  picture = null;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      amount: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required],
      picture: ['']
    });
  }

  uploadFile(event) {
    let filetypes = /jpeg|jpg|png|gif|webp|svg|tiff/;

    for (let pic of event.srcElement.files) {
      let mimetype = filetypes.test(pic.type);
      let extname = filetypes.test(pic.name.toLocaleLowerCase());

      if (mimetype && extname) {
        this.picture = pic;
      }
    }
  }

  onSubmit() {
    const payload = new FormData();

    console.log(this.form.value);

    for (const name of Object.getOwnPropertyNames(this.form.value)) {
      payload.append(name, Object.getOwnPropertyDescriptor(this.form.value, name).value);
    }
    payload.append('picture', this.picture);

    this.http.post(this.API + '/product', payload, {
      headers: new HttpHeaders().set('Authentication', 'Bearer ' + localStorage.getItem('userToken'))
    }).subscribe(
      res => {
        this.sent = true;
      },
      err => {
        console.log(err);
      }
    );
  }

}
