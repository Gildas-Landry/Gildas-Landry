import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdService } from '../../products/prod-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalesComponent } from '../sales.component';
import { SnackbarService } from 'src/app/snackbar.service';
import { MasterService } from 'src/app/master.service';

@Component({
  selector: 'app-sale-popup',
  templateUrl: './sale-popup.component.html',
})
export class SalePopupComponent implements OnInit {



    saleForm:FormGroup;
    constructor(@Inject (MAT_DIALOG_DATA) public data:any ,private ref:MatDialogRef<SalePopupComponent>
    ,private prodservice:ProdService, private http:HttpClient,private router:Router,private builder:FormBuilder,
    private dialogRef:MatDialogRef<SalesComponent>, private sb:SnackbarService, private master:MasterService)
    {

      this.saleForm=this.builder.group(
    {
      sellers_name:'',
      customer_name:'',
      customer_address:'',

    });
     }

    ngOnInit(): void {
      this.saleForm.patchValue(this.data);
    }
    closePopup(){
      this.ref.close();
    }

    saveSale(){
      if(this.saleForm.valid){
        if(!this.data){
          console.log(this.saleForm.value)
          this.master.addSale(this.saleForm.value).subscribe(() =>
          {
            this.sb.openSnackBar("Sale","Sale added succesfully !!");
            this.dialogRef.close(true);
          })
        }
        else{
          this.prodservice.updateSale(this.data.id,this.saleForm.value).subscribe(() =>
          {
            this.sb.openSnackBar("Sale","Sale table updated succesfully !!");
            this.dialogRef.close(true);

          })

        }
      }

    }
  }



