import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartService } from './cart.service';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';
import { ProductDetailsComponentComponent } from './product-details-component/product-details-component.component';
import { OrderComponent } from './order/order.component';

const appRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponentComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    ContactComponent,
    PageNotFoundComponent,
    RememberPasswordComponent,
    ProductDetailsComponentComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CartService],
  bootstrap: [
    AppComponent,
    CartComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    PageNotFoundComponent,
    OrderComponent
  ]
})
export class AppModule { }
