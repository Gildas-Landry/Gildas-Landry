import { Observable } from 'rxjs';
import {EventEmitter} from '@angular/core'
import { Component, ViewChild, OnInit,Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProdService } from '../products/prod-service.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  displayedColumns = ['bulk_selling_price', 'retail_selling_price','quantity_sold','date_sold','action'];
  dataSource = new MatTableDataSource<any>;

ngOnInit(): void {
  this.getPurchaseList();
}

constructor(private dialog:MatDialog, private prodservice:ProdService){

}

@ViewChild(MatSort) sort!: MatSort;
@ViewChild('paginator') paginator !: MatPaginator;

purchase!:Purchase[];

 quantitysold:number=0;
getPurchaseList(){
  this.prodservice.getProductSold().subscribe(
    {
      next: (response) =>
      {
        this.dataSource=new MatTableDataSource<any>(response);
        console.log('list of products sold',response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        this.purchase=response;

        for(let i=0;i<=response.length-1;i++){

          this.quantitysold=this.quantitysold+response[i].quantity_sold;
        }
      },
        error:console.log
      });
}
openModal2(data:any){
  const dialogRef=this.dialog.open(DeleteComponent,{
    data,
    width:'310px',
    height:'180px',
});
dialogRef.afterClosed().subscribe({
  next: (val)=>{

    if(val){
      this.getPurchaseList();
    }
  },
})
}

tablename="purchase";
data!:any[];
deletePurchase(row:any){
  this.data=[row,this.tablename]
    this.openModal2(this.data)
}

applyFilter(filterValue:string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

clearSearchResult(filterValue:string){
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue =filterValue.replace(filterValue," "); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = "";

}

closeSidenav(){
  document.querySelector('.side-nav')?.classList.add('max-desktop:hidden');
  document.querySelector('.body')?.classList.remove('max-desktop:blur-sm');
  document.querySelector('.body')?.classList.remove('max-desktop:h-screen');
}


}
export interface Purchase{
  id:number;
  sale_id:number;
  product_id:number;
  quantity_sold:number;
  retail_selling_price:number;
  bulk_selling_price:number;
  date_sold:string;
}




