
import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit,NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SuppliersComponent } from 'src/app/pages/suppliers/suppliers.component';
import { ProdService } from '../prod-service.service';
@Component({
  selector: 'app-prod-popup',
  templateUrl: './prod-popup.component.html',
  styleUrls: ['./prod-popup.component.css']
})
export class ProdPopupComponent implements OnInit {
  productForm:FormGroup;
  constructor(@Inject (MAT_DIALOG_DATA) public data:any ,private ref:MatDialogRef<ProdPopupComponent>
  ,private prodservice:ProdService, private http:HttpClient,private router:Router,private builder:FormBuilder,
  private dialogRef:MatDialogRef<SuppliersComponent>)
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

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
  }
  closePopup(){
    this.ref.close();
  }

  saveSupplier(){
    if(this.productForm.valid){
      if(!this.data){
        console.log(this.productForm.value)
        this.prodservice.addproduct(this.productForm.value).subscribe(() =>
        {
          alert('Supplier added succesfully');
          this.dialogRef.close(true);
          console.log('successfully added data');
        })
      }
      else{
        this.prodservice.updateproduct(this.data.id,this.productForm.value).subscribe(() =>
        {
          alert('Supplier updated succesfully');
          this.dialogRef.close(true);
          console.log('successfully updated data');
        })

      }
    }

  }
}
