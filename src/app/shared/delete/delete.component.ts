import { MasterService } from 'src/app/master.service';
import { ProdService } from './../../pages/products/prod-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/pages/categories/categories.service.ts.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private master:MasterService,private cat:CategoriesService,private snackBar: MatSnackBar,private dialogRef:MatDialogRef<ProductsComponent>,private prodservice:ProdService,@Inject (MAT_DIALOG_DATA) public data:any[],private ref:MatDialogRef<DeleteComponent>) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

    closePopup(){

      this.dialogRef.close();
    }

    message:string=this.data[1]+ " record";
  deletes(){
    if(this.data[1]=="product"){
      this.prodservice.deleteproductById(this.data[0].id).subscribe(
      {
          next: (response)=>
          {
            this.dialogRef.close(true);
           // this.prodservice.getproducts();
           this.openSnackBar(this.message,this.message+" deleted succesfully !!")
          },
          error:(error)=>{
            console.log("error 290");
          }
      })
    }

    if(this.data[1]=="purchase"){
      console.log(this.data[0].id)
      this.prodservice.deletePurchase(this.data[0].id).subscribe(
      {
          next: (response)=>
          {
            this.dialogRef.close(true);
           this.openSnackBar(this.message,this.message+" deleted succesfully !!")
          },
          error:(error)=>{
            console.log("error 290");
          }
      })
    }

    if(this.data[1]=="delivery"){
      console.log(this.data[0].id)
      this.prodservice.deleteDelivery(this.data[0].id).subscribe(
      {
          next: (response)=>
          {
            this.dialogRef.close(true);
           // this.prodservice.getproducts();
           this.openSnackBar(this.message,this.message+" deleted succesfully !!")
          },
          error:(error)=>{
            console.log("error 290");
          }
      })
    }

    if(this.data[1]=="product"){
      this.prodservice.deleteproductById(this.data[0].id).subscribe(
      {
          next: (response)=>
          {
            this.dialogRef.close(true);
           // this.prodservice.getproducts();
           this.openSnackBar(this.message,this.message+" deletd succesfully !!")
          },
          error:(error)=>{
            console.log("error 290");
          }
      })
    }
    if(this.data[1]=="sale"){
      this.prodservice.deleteSaleById(this.data[0].id).subscribe(
      {
          next: (response)=>
          {
            this.dialogRef.close(true);
           // this.prodservice.getproducts();
           this.openSnackBar(this.message,this.message+" deleted succesfully !!")
          },
          error:(error)=>{
            console.log("error 290");
          }
      })
    }

    if(this.data[1]=="category"){
      this.cat.deletecategoryById(this.data[0].id).subscribe(
      {
          next: (response)=>
          {
            this.dialogRef.close(true);
           // this.prodservice.getproducts();
           this.openSnackBar(this.message,this.message+" deleted succesfully !!")
          },
          error:(error)=>{
            console.log("error 290");
          }
      })
    }

    if(this.data[1]=="supplier"){
      this.master.deleteSupplierById(this.data[0].id).subscribe(
      {
          next: (response)=>
          {
            this.dialogRef.close(true);
           // this.prodservice.getproducts();
           this.openSnackBar(this.message,this.message+" deleted succesfully !!")
          },
          error:(error)=>{
            console.log("error 290");
          }
      })
    }
}




}
