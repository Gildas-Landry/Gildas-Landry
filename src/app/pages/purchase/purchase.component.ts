import { Observable } from 'rxjs';

import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { MasterService } from 'src/app/master.service';
import { Supplier } from 'src/app/Supplier';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
//listpurchase:Purchase[];
  ngOnInit(){
    //this.fetchSuppliers();
  }
  constructor(private dialog:MatDialog, private master:MasterService){
   // this.listpurchase=[];
  }
  openModal(){
      //this.listpurchase=[];
      this.dialog.open(PopupComponent,{
      width:'50%',
      height:'400px',
      data:{
        title:'Supplier Add'
      },
    })
  };

  displayedColumns:string[] = ['quantity_supplied','expire_date','bulk_price','date_supplied','action'];
dataSource:any=[];

//   fetchPurchase(){
//    // this.http.get('http:localhost:8000/purchase').subscribe(next=> {
//    //this.listpurchase=next;
//    //this.dataSource=this.listpurchase;
//     this.dataSource= new MatTableDataSource(this.listpurchase);
//     console.log('list of suppliers',this.listpurchase);
//   },
//   error => console.log('bigg error')
//   )
// }

  //dataSource = new MatTableDataSource<Supplier>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
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
