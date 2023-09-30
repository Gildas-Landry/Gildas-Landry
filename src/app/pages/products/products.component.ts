import {  OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {

  displayedColumns = ['Id', 'Name', 'Image', 'Stocked','Selling_Price','Action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

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
  Id: number;
  Name: string;
  Image: string;
  Stocked: number;
  Selling_Price:number;

}
const ELEMENT_DATA: Element[] = [
  {Id: 1, Name: 'Hydrogen', Image: 'reythh', Stocked:9, Selling_Price:12223},
  {Id: 2, Name: 'Helium', Image:'yooeei@gmail.cm', Stocked:7, Selling_Price: 1000},
  {Id: 3, Name: 'Lithium', Image:'yooeei@gmail.cm',  Stocked:8, Selling_Price: 1000 },
  {Id: 4, Name: 'Beryllium', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 5, Name: 'Boron', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 6, Name: 'Carbon', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 7, Name: 'Nitrogen', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 8, Name: 'Oxygen', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 9, Name: 'Fluorine', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 10,Name: 'Neon', Image:'yooeei@gmail.cm',  Stocked:8, Selling_Price: 1000},
  {Id: 11, Name: 'Sodium', Image:'yooeei@gmail.cm',  Stocked:8, Selling_Price: 1000},
  {Id: 12, Name: 'Magnesium', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 13, Name: 'Aluminum', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 14, Name: 'Silicon', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 15, Name: 'Phosphorus', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 16, Name: 'Sulfur', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 17, Name: 'Chlorine', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 18, Name: 'Argon', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 19, Name: 'Potassium', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000},
  {Id: 20, Name: 'Calcium', Image:'yooeei@gmail.cm', Stocked:8, Selling_Price: 1000}

];

