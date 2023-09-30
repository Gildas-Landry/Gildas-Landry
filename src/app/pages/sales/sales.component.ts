import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  ngOnInit(): void {
  }

  displayedColumns = ['id', 'sellers_name', 'customer_name', 'customer_address','action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  constructor(){

  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator !: MatPaginator;

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
export interface Element {
  id: number;
  sellers_name: string;
  customer_name: string;
  customer_address:string;

}
const ELEMENT_DATA: Element[] = [
  {id: 1, sellers_name: 'landryy', customer_address:'reteygdv332', customer_name:'landryre'}
];


