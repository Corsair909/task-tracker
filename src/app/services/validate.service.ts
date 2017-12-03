import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.firstname || user.lastname || user.email || user.password) {
      return false;
    } else {
      return true;
    }
  }

}
