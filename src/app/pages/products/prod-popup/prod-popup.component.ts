
import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit,NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SuppliersComponent } from 'src/app/pages/suppliers/suppliers.component';
import { ProdService } from '../prod-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CategoriesService } from '../../categories/categories.service.ts.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-prod-popup',
  templateUrl: './prod-popup.component.html',
  styleUrls: ['./prod-popup.component.css']
})
export class ProdPopupComponent implements OnInit {

  selectedFile!: ImageSnippet;
  productForm:FormGroup;
  constructor(@Inject (MAT_DIALOG_DATA) public data:any ,private ref:MatDialogRef<ProdPopupComponent>
  ,private prodservice:ProdService, private http:HttpClient,private router:Router,private builder:FormBuilder,
  private dialogRef:MatDialogRef<SuppliersComponent>,public snackBar:MatSnackBar,private catservice:CategoriesService)
  {

    this.productForm=this.builder.group(
  {

    product_name:'',
    product_image:'',
    retail_quantity_stocked:'',
    selling_price:'',
    category_id:'',
    bulk_quantity_stocked:'',
    cost_price:''
  });
   }
category!:Category[];
   getCategory(){
    this.catservice.getcategories().subscribe({
      next:(response)=>
      {
        this.category=response;
      },
      error:console.log

    })
   }
   openSnackBar(message: string,action:string) {
    this.snackBar.open(message,action, {
      duration: 4000,
    });
  }


  ngOnInit(): void {
    this.productForm.patchValue(this.data);
    this.getCategory();
  }
  closePopup(){
    this.ref.close();
  }


  savePrroduct(){
    if(this.productForm.valid){
      const file:Blob = this.productForm.get('product_image')!.value;
      // if (file) {
      //   const reader = new FileReader();

      //   reader.onload = (event: any) => {
      //     // Set the image source to the base64 data
      //     this.productForm.controls['product_image'].setValue(event.target.result);
      //   };

      //   // Read the selected file as a base64 data
      //   reader.readAsDataURL(file);
      // }
      if(!this.data){
        console.log(this.productForm.value)
        this.prodservice.addproduct(this.productForm.value).subscribe(() =>
        {
          this.openSnackBar("Product","Product added succesfully !!");
          this.dialogRef.close(true);
        })
      }
      else{
        this.prodservice.updateproduct(this.data.id,this.productForm.value).subscribe(() =>
        {
          this.openSnackBar("Product","Product Updated succesfully !!");
          this.dialogRef.close(true);
          console.log('successfully updated data');
        })

      }
    }

  }
}
export interface Category{
  id:number;
  category_name:string;
  description:string;
}
