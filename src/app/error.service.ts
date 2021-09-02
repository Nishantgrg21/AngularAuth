import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

handleError(err:HttpErrorResponse){
  if(!err.error || !err.error.error){
    return throwError('UNKNOWN');
  }else{
    return throwError(err.error.error.message);
  }
}


  errorsMessage={
    UNKNOWN:'An Unkown Error is Occured',
    EMAIL_EXISTS:'This email is already exixt, Please use another email',
    OPERATION_NOT_ALLOWED:'Password Signin is disabled for this project',
    TO_MANY_ATTEMPTS_TRY_LATER:'We have blocked all request from this development',
    EMAIL_NOT_FOUND:'There is no user record',
    INVALID_PASSWORD:'Password is invalid or User does not have a valid password',
    USER_DISABLED:' Your account is disabled by admin'
  }
}
