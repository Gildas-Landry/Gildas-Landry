import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
myform:FormGroup;
  constructor(private builder:FormBuilder, private http:HttpClient) {
    this.myform=this.builder.group({
      email:'',
      password:''
    });
   }

  ngOnInit(): void {

  }
  submit(){
   console.log(this.myform.value)
    this.http.post('http://localhost:8000/login', this.myform.value).subscribe({next:(response)=>console.log(response),error:console.log});
}

}
