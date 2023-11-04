import { AuthGuard } from './../../auth.guard';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from '../login/validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitted=false;
  myform:FormGroup;
  constructor(private router:Router,private builder:FormBuilder, private http:HttpClient) {
    this.myform=this.builder.group({
      name:this.builder.control('',[Validators.required,Validators.minLength(3)]),
      email:this.builder.control('',[Validators.required,Validators.email]),
      password:this.builder.control('',[Validators.required,Validators.minLength(6)]),
      confirmpassword:this.builder.control('',[Validators.required])
    },
    {
      validators: [Validation.match('password', 'confirmpassword')]
    }
    );
   }

  onReset(){
    this.submitted = false;
    //this.myform.reset();
  }

   submit(){
    this.submitted = true;
    console.log(this.myform.value)
    this.http.post('http://localhost:8000/register', this.myform.value).subscribe(
      {
        next:(response)=>
        {
          console.log(response)
          this.router.navigate(['/login']);
        },
        error:console.log
      });

  }

  ngOnInit(): void {
  }

}
