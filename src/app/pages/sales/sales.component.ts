import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProdService } from '../products/prod-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProdPopupComponent } from '../products/prod-popup/prod-popup.component';
import { SalePopupComponent } from './sale-popup/sale-popup.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  ngOnInit(): void {
    this.getSales();
  }

  displayedColumns = ['id', 'sellers_name', 'customer_name', 'customer_address','action'];
  dataSource = new MatTableDataSource<any>;
  constructor(private dialog:MatDialog, private prodservice:ProdService){

  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator !: MatPaginator;


  getSales(){
    this.prodservice.getsales().subscribe(
      {
        next: (response) =>
        {
          this.dataSource=new MatTableDataSource<Element>(response);
          console.log('list of sales',response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort=this.sort;
        },
          error:console.log
        });
  }
  openModal(){
    const dialogRef=this.dialog.open(SalePopupComponent,{
      width:'400px',
      height:'450px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getSales();
        }
      },
    })
  }

  editSale(data:any){
    const dialogRef= this.dialog.open(SalePopupComponent,{
      data,
      width:'400px',
      height:'550px',
    });
     dialogRef.afterClosed().subscribe({
       next: (val)=>{
         if(val){
           this.getSales();
           console.log('there is data');
         }
       },
     })
  }
  openModal2(data:any){

    const dialogRef=this.dialog.open(DeleteComponent,{
        data,
        width:'310px',
        height:'150px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        console.log(data.id)
        if(val){
          this.getSales();
        }
      },
    })
  }
  data!:any[];
  tablename="sale";

  deleteSale(idrow:any){
    this.data=[idrow,this.tablename]
    this.openModal2(this.data);
    console.log(idrow.id)
  }

  // deleteSale(id:number){
  //   this.prodservice.deleteSaleById(id).subscribe(
  //     {
  //         next: (response)=>
  //         {
  //           console.log(this.getSales());
  //           alert('Are you sure to delete this sale ?');
  //           this.getSales();
  //         },

  //     })
  // }

  applyFilter(filterValue:string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  clearSearchResult(filterValue:any){
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



