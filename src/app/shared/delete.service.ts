import { Injectable, inject } from '@angular/core';
import { DeleteComponent } from './delete/delete.component';
import { ProdService } from '../pages/products/prod-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  @inject (MAT_DIALOG_DATA) public data:any
  constructor(private prodservice:ProdService,private dialog:MatDialog) { }


}
