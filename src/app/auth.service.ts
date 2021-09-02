import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { tap ,catchError} from 'rxjs/operators';
import { AuthResponse } from './auth-response.interface';
import { config } from './config';
import { ErrorService } from './error.service';
import { User } from './user.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // create a subject 
  user = new Subject<User>();

  constructor(private http:HttpClient, private _errService:ErrorService) { }

  // Signup Method
  signUp(email: any,password: any){
   return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(err=>{
      return this._errService.handleError(err)
    }),tap(res=>{
      this.authentaticUser(res.email,res.idToken,res.localId,+res.expiresIn)
    })
    )
  }


  // Login Method
  SignIn(email: any,password: any){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(err=>{
      return this._errService.handleError(err)
    }),tap(res=>{
      this.authentaticUser(res.email,res.idToken,res.localId,+res.expiresIn)
    })
    )
  }

  // Create a Authantication Method

 private authentaticUser(email: any, userId: any, token: any,expiresIn: any){

  const expiratinDate = new Date(new Date().getTime() + expiresIn*1000);
    const users = new User(email,userId,token,expiratinDate);
    console.log('user => ',users);
    this.user.next(users);
  }
}
