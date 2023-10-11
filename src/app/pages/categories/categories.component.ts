import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Supplier } from 'src/app/Supplier';
import { CatPopupComponent } from './cat-popup/cat-popup.component';
import { CategoriesService } from './categories.service.ts.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  displayedColumns = ['id', 'category_name', 'description','action'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatSort)sort!: MatSort;
  @ViewChild(MatPaginator)paginator!: MatPaginator;


  constructor( private dialog:MatDialog ,private catservice:CategoriesService) {

  }

  ngOnInit(): void {
    this.getCategory();
  }

  openModal(){
    const dialogRef=this.dialog.open(CatPopupComponent,{
      width:'50%',
      height:'400px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getCategory();
        }
      },
    })
  }


  getCategory(){
    this.catservice.getcategories().subscribe(
      {
        next: (response) =>
        {
          this.dataSource=new MatTableDataSource<Element>(response);
          console.log('categories',response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort=this.sort;
        },
          error:console.log
        });
  }

  editCategory(data:any){
    const  dialogRef= this.dialog.open(CatPopupComponent,{data,});
     dialogRef.afterClosed().subscribe({
       next: (val)=>{
         if(val){
           this.getCategory();
           console.log('there is data');
         }
       },
     })
   }


  deleteCategory(id:number){

    this.catservice.deletecategoryById(id).subscribe(
    {
        next: (response)=>
        {
          console.log(this.getCategory());
          alert('Are you sure to delete this category?');
          this.getCategory();
        },
      //error:console.log
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

  closeSidenav(){
    document.querySelector('.side-nav')?.classList.add('max-desktop:hidden');
    document.querySelector('.body')?.classList.remove('max-desktop:blur-sm');
    document.querySelector('.body')?.classList.remove('max-desktop:h-screen');
  }

}
