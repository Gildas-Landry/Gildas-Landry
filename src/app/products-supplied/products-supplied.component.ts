import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProdService } from '../pages/products/prod-service.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteComponent } from '../shared/delete/delete.component';

@Component({
  selector: 'app-products-supplied',
  templateUrl: './products-supplied.component.html',
  styleUrls: ['./products-supplied.component.css']
})
export class ProductsSuppliedComponent implements OnInit {
  displayedColumns = ['quantity_supplied', 'expire_date','bulk_price','date_supplied','action'];
  dataSource = new MatTableDataSource<any>;

  ngOnInit(): void {
    this.getList();
  }

  constructor(private dialog:MatDialog, private prodservice:ProdService){

  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator !: MatPaginator;


  getList(){
    this.prodservice.getProductsSupplied().subscribe(
      {
        next: (response) =>
        {
          this.dataSource=new MatTableDataSource<any>(response);
          console.log('list of products supplied',response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort=this.sort;
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
          this.getList();
        }
      },
    })
  }

  tablename="delivery"
  data!:any[];

  deleteDelivery(row:any){
    this.data=[row,this.tablename];
            this.openModal2(this.data);


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
