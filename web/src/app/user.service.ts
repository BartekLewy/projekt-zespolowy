import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private userState;

  constructor() {
    this.userState = false;
  }

  isUserLogged() {
    return this.userState;
  }

  login() {
    this.userState = true;
  }

  logout() {
    this.userState = false;
  }

}
