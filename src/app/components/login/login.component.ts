import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import Validation from './validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('error')error!:ElementRef;
  submitted = false;
  myform:FormGroup;
  constructor(private auth:AuthGuard,private builder:FormBuilder, private http:HttpClient,private router:Router) {
    this.myform=this.builder.group({
      email:this.builder.control('',[Validators.required,Validators.email]),
      password:this.builder.control('',[Validators.required]),
    });

  }

   get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }
  onReset(){
    this.submitted = false;
    //this.myform.reset();
  }

  ngOnInit(): void {

  }
  submit(){
    this.submitted = true;
    console.log(this.myform.value)
    this.http.post('http://localhost:8000/login', this.myform.value).subscribe(
      {
        next:(response)=>
        {
          console.log(response)
          this.auth.isloggedin=true;
          this.router.navigate(['/dashboard']);
        },
        error:(error)=>
        {
          this.error.nativeElement.innerhtml="error";
          console.log(error);
        }
      });
  }

}
