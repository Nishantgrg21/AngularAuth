import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  Form!: FormGroup;
  editMode:boolean = true;

  constructor( private formbuilder: FormBuilder,private router:Router, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.Form = this.formbuilder.group({
      name: ['Edit Name'],
      pictureUrl: ['Edit Photo'],
    })

    this.ActivatedRoute.queryParamMap.subscribe(res=>{
      let qParams = res.get('EditMode');
      if(qParams!=null){
        this.editMode = true;
      }else{
        this.editMode = false;
      }
   
    })
  }
  

  onSubmit(){
    console.log(this.Form);
  }

  onDiscard(){
    this.Form.reset();
    this.router.navigate([],{queryParams:{EditMode:null}});

  }

  onEditProfile(){
    
  }

}
