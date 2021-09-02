import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../auth-response.interface';
import { AuthService } from '../auth.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  Form!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private _authService: AuthService,
    private _errService: ErrorService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.Form = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }


  // Add switch mode in login and signup form
  loginMode: boolean = true;
  error: any;

  errorMsgs: any = this._errService.errorsMessage;

  onModeSwitch() {
    this.loginMode = !this.loginMode;
  }

  //Form Submit Button
  onSubmit() {
    console.log(this.Form);
    const email = this.Form.value.email;
    const password = this.Form.value.password;
    let authObservable: Observable<AuthResponse>;

    if (this.loginMode) {
      // Signup Response value
     authObservable =   this._authService.signUp(email, password)
    } else {
      // Logoin Response value 
      authObservable =  this._authService.SignIn(email, password)
    } 
    authObservable.subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['admin']);
      },
      err=>{
        console.log(err);
        //this.error = err.error.error.message;
        //this.error =this.errorMsgs[err.error.error.message];
        this.error = this.errorMsgs[err];
        
      }
    )

  }




}
