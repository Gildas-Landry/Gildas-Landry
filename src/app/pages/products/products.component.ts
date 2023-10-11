import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProdPopupComponent } from './prod-popup/prod-popup.component';
import { ProdService } from './prod-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['id','product_name','selling_price','product_image','retail_quantity_stocked','category_id','Action'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatSort)sort!: MatSort;
  @ViewChild(MatPaginator)paginator!: MatPaginator;


  constructor( private dialog:MatDialog ,private http:HttpClient, private prodservice:ProdService) {

  }

  ngOnInit(): void {
    this.getProduct();
  }

  openModal(){
    const dialogRef=this.dialog.open(ProdPopupComponent,{
      width:'50%',
      height:'400px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getProduct();
        }
      },
    })
  }

  exportProduct(){
    window.open('http://localhost:8000/product/export-x');
  }

  // exportProduct(){
  //   import("xlsx").then(xlsx =>{
  //     const worksheet=xlsx.utils.json_to_sheet([this.http.get('http://localhost:8000/product/export-csv')]);
  //     const workbook={Sheets: {'data':worksheet},SheetNames:['data']};
  //     const excelBuffer: any=xlsx.write(workbook,{bookType:'xlsx',type:'array'});
  //     this.saveAsExcelFile(excelBuffer,"products");
  //   });
  // }

    // return this.http.get('http://localhost:8000/product/export-csv')
    // this.prodservice.exportProducts().subscribe({next:(response) =>{console.log('succesfull',response)},error:console.log});

  getProduct(){
    this.prodservice.getproducts().subscribe(
      {
        next: (response) =>
        {
          this.dataSource=new MatTableDataSource<Element>(response);
          console.log('list of products',response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort=this.sort;
        },
          error:console.log
        });
  }

  editProduct(data:any){
    const  dialogRef= this.dialog.open(ProdPopupComponent,{data,});
     dialogRef.afterClosed().subscribe({
       next: (val)=>{
         if(val){
           this.getProduct();
           console.log('there is data');
         }
       },
     })
  }

  deleteProduct(id:number){

    this.prodservice.deleteproductById(id).subscribe(
    {
        next: (response)=>
        {
          console.log(this.getProduct());
          alert('Are you sure to delete this Product?');
          this.getProduct();
        },

    })
  }

  importProduct(file:any){
    this.prodservice.importProducts(file).subscribe(next =>{console.log('succesfull')},
    error =>{console.log('erroe')}
    )
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
