import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { DiscountComponent } from './discount/discount.component';
import { HeaderComponent } from './header/header.component';

import { AuthGuard } from "./auth.guard";
import { UserService } from "./user.service";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RegulationsComponent } from './regulations/regulations.component'

const appRoutes: Routes = [
  {
    component: DashboardComponent,
    canActivate: [AuthGuard],
    path: 'dashboard',
  },
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'regulations', component: RegulationsComponent }
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
    HeaderComponent,
    BreadcrumbsComponent,
    RegulationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    NgbModule.forRoot()
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
