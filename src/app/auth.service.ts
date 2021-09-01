import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthResponse } from './auth-response.interface';
import { config } from './config';
import { user } from './user.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // create a subject 
  user = new Subject<user>();

  constructor(private http:HttpClient) { }

  // Signup Method
  signUp(email: any,password: any){
   return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{
      email:email,
      password:password,
      returnSecureToken:true
    
    })
  }


  // Login Method
  SignIn(email: any,password: any){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{
      email:email,
      password:password,
      returnSecureToken:true
    })
  }

  // Create a Authantication Method

 private authentaticUser(email: any, userId: any, token: any,expiresIn: any){

  const expiratinDate = new Date(new Date().getTime() + expiresIn*1000);
    const users = new user(email,userId,token,expiratinDate);

    this.user.next(users);
  }
}
