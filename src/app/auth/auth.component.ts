import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formbuilder:FormBuilder, 
    private _authService:AuthService,
    private _errService:ErrorService
    ) { }

  ngOnInit(): void {
    this.Form = this.formbuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
    })
  }


  // Add switch mode in login and signup form
  loginMode:boolean=true;
  error: any;

  errorMsgs: any=this._errService.errorsMessage ;

  onModeSwitch(){
    this.loginMode = !this.loginMode;
  }

//Form Submit Button
  onSubmit(){
    console.log(this.Form);  
    const email= this.Form.value.email;
    const password= this.Form.value.password;

    if(this.loginMode){
      // Signup Response value
     this._authService.signUp(email,password).subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
      // this.error = err.error.error.message; // show eoor message to the user
      this.error = this.errorMsgs[err.error.error.message]
    })
    
    }else{
      // Logoin Response value 
      this._authService.SignIn(email,password).subscribe(res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
        // this.error = err.error.error.message;
        this.error = this.errorMsgs[err.error.error.message]
        
      })
    }
    
  }




}
