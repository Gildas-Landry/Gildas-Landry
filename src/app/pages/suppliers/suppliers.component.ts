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
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
listsuppliers!:Supplier[];
  ngOnInit(){
   // this.fetchSuppliers();

  }
  constructor(private dialog:MatDialog, private master:MasterService){}
  openModal(){
    this.dialog.open(PopupComponent,{
      width:'50%',
      height:'400px',
      data:{
        title:'Supplier Add'
      },

    })
  };

  displayedColumns:string[] = ['id','name','address','phone_number','email','action'];
dataSource:any;

  fetchSuppliers(){
    this.master.getSuppliers().subscribe(next=> {
    this.listsuppliers=next;
   // this.dataSource=this.listsuppliers;
    this.dataSource=new MatTableDataSource(this.listsuppliers);
    console.log('list of suppliers',this.listsuppliers);
  },
  error => console.log('bigg error')
  )
}

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
// export interface Supplier {
//   id: number;
//   name: string;
//   email: string;
//   phone_number: string;
//   address:string;
// }
// const SUPPLIER_DATA:Supplier[]=[
//  {id: 1, name: 'Hydrogen', email: 'tsa@bd.com', phone_number: '+237 654637829', address:'mile1'},]
//   {id: 2, name: 'Helium', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 3, name: 'Lithium', email:'yooeei@gmail.cm',  phone:'+577886868', address: 'pass2' },
//   {id: 4, name: 'Beryllium', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 5, name: 'Boron', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 6, name: 'Carbon', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 7, name: 'Nitrogen', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 8, name: 'Oxygen', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 9, name: 'Fluorine', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 10, name: 'Neon', email:'yooeei@gmail.cm',  phone:'+577886868', address: 'pass2'},
//   {id: 11, name: 'Sodium', email:'yooeei@gmail.cm',  phone:'+577886868', address: 'pass2'},
//   {id: 12, name: 'Magnesium', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 13, name: 'Aluminum', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 14, name: 'Silicon', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 15, name: 'Phosphorus', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 16, name: 'Sulfur', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 17, name: 'Chlorine', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 18, name: 'Argon', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 19, name: 'Potassium', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
//   {id: 20, name: 'Calcium', email:'yooeei@gmail.cm', phone:'+577886868', address: 'pass2'},
// ];
