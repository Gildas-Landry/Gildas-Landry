import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from './../../snackbar.service';
import { ProdService } from './../products/prod-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  @ViewChild(MatSort)sort!: MatSort;
  @ViewChild(MatPaginator)paginator!: MatPaginator;

  saleForm:FormGroup;
  displayedColumns = ['id','product_name','selling_price','retail_quantity_stocked','Action'];
  dataSource!:MatTableDataSource<any>;
  constructor(private dialog:MatDialog, private sb:SnackbarService ,private prodservice:ProdService,private bd:FormBuilder) {
    this.saleForm=this.bd.group({
      bulk_selling_price:'',
      retail_selling_price:'',
      quantity_sold:'',
      date_sold:'',
      product_id:'',
      sale_id:''
    })
   }

  ngOnInit(): void {
    this.getProduct();
    this.getSale();
  }

  saveProductsold(){
    if(this.saleForm.valid){
      console.log(this.saleForm.value)
      this.prodservice.addproductsold(this.saleForm.value).subscribe(() =>
      {
        this.getProduct();
        this.sb.openSnackBar("Product", "Product sold succesfully !!");
        this.saleForm.setValue(
        {
          bulk_selling_price:'',
          retail_selling_price:'',
          quantity_sold:'',
          date_sold:'',
          product_id:'',
          sale_id:''
        });

      })
      // this.saleForm=this.bd.group({
      //   bulk_selling_price:['',Validators.required],
      //   retail_selling_price:['',Validators.required],
      //   quantity_sold:['',Validators.required],
      //   date_sold:['',Validators.required],
      //   product_id:['',Validators.required],
      //   sale_id:['',Validators.required]
      // })

    }
  }
product!:Product[];

  getProduct(){
    this.prodservice.getproducts().subscribe(
      {
        next: (response) =>
        {
          this.dataSource=new MatTableDataSource<Element>(response);
          console.log('list of products',response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort=this.sort;
          this.product=response;
        },
          error:console.log
      });
  }

  sales!:Sale[];
    getSale(){
      this.prodservice.getsales().subscribe({
        next:(response) =>{
          console.log('list of sales ',response)
          this.sales=response;
        },
        error:console.log
      })
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

  openDialog(data:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      data,
      width:'310px',
      height:'150px',
  });
  dialogRef.afterClosed().subscribe({
    next: (val)=>{
      if(val){
        this.getProduct();
      }
    },
  })
  }
data!:any[];
tablename="product";
  deleteProduct(row:any){
    this.data=[row,this.tablename]
    this.openDialog(this.data)
  }

  registerSale(){

  }

  closeSidenav(){
    document.querySelector('.side-nav')?.classList.add('max-desktop:hidden');
    document.querySelector('.body')?.classList.remove('max-desktop:blur-sm');
    document.querySelector('.body')?.classList.remove('max-desktop:h-screen');
  }
}
  export interface Product{
      product_name:string;
      category_id:string;
      cost_price:number;
      product_image:string;
      bulk_quantity_stocked:number;
      retail_quantity_stocked:number;
      selling_price:number;
      id:number;
  }
  export interface Sale{
    id:number;
    sellers_name:string;
    customer_name:string;
    customer_address:string;
  }
