import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userService;

  private router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
    if(this.userService.isUserLogged()) {
      this.router.navigate(['login']);
    }
  }

}
