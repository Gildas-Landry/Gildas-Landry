import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns = ['id', 'category_name', 'description','action'];
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
  id: number;
  category_name: string;
  description:string;

}
const ELEMENT_DATA: Element[] = [
  {id: 1, category_name: 'shopping', description:'ici vous retrouvriez tout ce qui concerne la beaute'},
  {id: 2, category_name: 'food', description:'ici vous retrouvriez tout ce qui concerne la nourriture' },
  {id: 3, category_name: 'house', description:'Here you will see all about household equipments ' },
  {id: 4, category_name: 'school',description:'ici vous retrouvriez tout ce qui concerne la beaute' },
  {id: 5, category_name: 'hahhhhsh', description:'ici vous retrouvriez tout ce qui concerne la beaute' },
  {id: 6, category_name: 'Chgdgdg', description:'ici vous retrouvriez tout ce qui concerne la beaute' },
  {id: 7, category_name: 'uyuegd', description:'ici vous retrouvriez tout ce qui concerne la beaute'},
  {id: 8, category_name: 'yu4yuehge', description:'hello woldd'},
  {id: 9, category_name: 'iuyiyuee',description:'ici vous retrouvriez tout ce qui concerne la beaute' }
];
