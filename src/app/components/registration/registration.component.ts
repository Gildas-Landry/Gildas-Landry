import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myform:FormGroup;
  constructor(private builder:FormBuilder, private http:HttpClient) {
    this.myform=this.builder.group({
      email:'',
      password:''
    });
   }

   submit(){
    console.log(this.myform.value)
     this.http.post('http://localhost:8000/register', this.myform.value).subscribe({next:(response)=>console.log(response),error:console.log});
 }

  ngOnInit(): void {
  }

}
