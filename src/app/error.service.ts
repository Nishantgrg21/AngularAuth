import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  errorsMessage={
    UNKNOWN:'Unkown Error Occured',
    EMAIL_EXISTS:'This email is already exixt, Please use another email',
    OPERATION_NOT_ALLOWED:'Password Signin is disabled for this project',
    TO_MANY_ATTEMPTS_TRY_LATER:'We have blocked all request from this development',
    EMAIL_NOT_FOUND:'There is no user record',
    INVALID_PASSWORD:'Password is invalid',
    USER_DISABLED:' Your account is disabled by admin'
  }
}
