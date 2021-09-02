import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AuthAngular';
  autoSignIn:any;
  isLoggedIn = false;

  constructor(private _authService:AuthService){}

  ngOnInit(){
    this._authService.user.subscribe(res=>{

      // Method 1
      // if(res){
      //   this.isLoggedIn = true;
      // }else{
      //   this.isLoggedIn = false;
      // }

       // Method 2
      // this.isLoggedIn =!res ? false : true;

          // Method 3
          this.isLoggedIn = !!res;
    });
this._authService.autoSignIn();
   
  }
}
