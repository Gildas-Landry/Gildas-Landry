//import { Observable } from 'rxjs';
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { MasterService } from 'src/app/master.service';
import { Supplier } from 'src/app/Supplier';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})

export class SuppliersComponent implements OnInit {
  displayedColumns:string[] = ['id','name','address','phone_number','email','supplier_picture','action'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    this.fetchSuppliers();
  }

  constructor(private dialog:MatDialog, private master:MasterService){

  }

  openModal(){
    const dialogRef=this.dialog.open(PopupComponent,{
      width:'50%',
      height:'400px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.fetchSuppliers();
        }
      },
    })
  }

  fetchSuppliers(){
      this.master.getSuppliers().subscribe({next: (res) => {
      this.dataSource= new MatTableDataSource<Supplier>(res);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      console.log('list of suppliers',res);
    },
        error: console.log
    })
  }

  editSupplier(data:any){
   const  dialogRef= this.dialog.open(PopupComponent,{
      data:data
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.fetchSuppliers();
        }
      },
    })
  }

  deleteSupplier(id:number){

    this.master.deleteSupplierById(id).subscribe(
    {
        next: (response)=>
        {
          console.log(this.fetchSuppliers());
          alert('Are you sure to delete this supplier?');
          this.fetchSuppliers();
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

