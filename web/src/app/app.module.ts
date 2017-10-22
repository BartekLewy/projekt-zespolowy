import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from "./auth.guard";
import { UserService } from "./user.service";
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { DiscountComponent } from './discount/discount.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {
    component: DashboardComponent,
    canActivate: [AuthGuard],
    path: 'dashboard',
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    CartComponent,
    DiscountComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
