import { Supplier } from './../../Supplier';
import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit,NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/master.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata:any;
  listsuppliers!:Supplier[]
  supplierForm:FormGroup
  suppliers!:Supplier;
  constructor(@Inject (MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<PopupComponent>
  ,private master:MasterService, private http:HttpClient,private router:Router,private builder:FormBuilder)
  {


   }

  ngOnInit(): void {

    this.inputdata=this.data;
  }
  closePopup(){
    this.ref.close();
  }
  myform=this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    address:this.builder.control(''),
    phone:this.builder.control(''),
    email:this.builder.control(''),
    picture:this.builder.control('')
  });


  saveSupplier(){
     this.master.addSupplier(this.suppliers).subscribe(() =>{
      console.log('successfully added data');
      this.router.navigate(["/dashboard/suppliers"]);
  })

  }
}
