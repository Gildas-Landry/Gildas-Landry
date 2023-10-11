
import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit,NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/master.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CategoriesComponent } from '../categories.component';
import { CategoriesService } from '../categories.service.ts.service';

@Component({
  selector: 'app-cat-popup',
  templateUrl: './cat-popup.component.html',
  styleUrls: ['./cat-popup.component.css']
})
export class CatPopupComponent implements OnInit {


  catForm:FormGroup;

  constructor(@Inject (MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<CatPopupComponent>,
  private catservice:CategoriesService, private http:HttpClient,private router:Router,private builder:FormBuilder,
  private dialogRef:MatDialogRef<CategoriesComponent>)
  {

    this.catForm=this.builder.group(
      {
        category_name:'',
        description:'',
      });
   }

   ngOnInit():void{
    console.log(this.data)
    this.catForm.patchValue(this.data);
   }

  closePopup(){
    this.ref.close();
  }

  saveCategory(){
    if(this.catForm.valid){
      if(!this.data){
        console.log(this.catForm.value)
        this.catservice.addcategory(this.catForm.value).subscribe(() =>
        {
          alert('category added succesfully');
          this.dialogRef.close(true);
          console.log('successfully added data');
        })
      }
      else{
        this.catservice.updatecategory(this.data.id,this.catForm.value).subscribe(() =>
        {
          alert('category updated succesfully');
          this.dialogRef.close(true);
          console.log('successfully updated data');
        })

      }
    }

  }
}

