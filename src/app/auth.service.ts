import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  private tokenExpirationTimer:any;

  constructor(private http:HttpClient, private _errService:ErrorService, private router:Router ) {
   
   }

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

  // Automatcally signin using local storage value
  autoSignIn(){
    const userData:any = JSON.parse(localStorage.getItem('loginUserData')|| '{}');
    //console.log(JSON.parse(userData));

    if(!userData){
      return;
    }

    const loggedInUser = new User(userData.email,userData.id, userData._token,new Date(userData._tokenExpiryDate));
    // check token is valid or not
    if(loggedInUser.token){
      this.user.next(loggedInUser);

      const expirationDuration= new Date(userData._tokenExpiryDate).getTime() - new Date().getTime();
      this.autoSignOut(expirationDuration);
    }
    
  }


  //Create a signout Method
  signOut(){
    this.user.next(null || undefined);
    this.router.navigate(['home']);
    localStorage.removeItem('loginUserData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

  }

  //Create a automatically signout Method
  autoSignOut(expirationDuration:number){
   this.tokenExpirationTimer =  setTimeout(()=>{
     this.signOut();
    },3000);

  }

  // Create a Authantication Method

 private authentaticUser(email: any, userId: any, token: any,expiresIn: any){

  const expiratinDate = new Date(new Date().getTime() + expiresIn*1000);
    const users = new User(email,userId,token,expiratinDate);
    console.log('user => ',users);
    this.user.next(users); // Store data in User Subject
    this.autoSignOut(expiresIn*1000);
    localStorage.setItem('loginUserData',JSON.stringify(users) );
  }
}


