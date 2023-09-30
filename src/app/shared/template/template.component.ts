import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showSidenav(){
   document.querySelector('.side-nav')?.classList.remove('max-desktop:hidden');
   document.querySelector('.body')?.classList.add('max-desktop:blur-sm');
  document.querySelector('.body')?.classList.add('max-desktop:h-screen');
  document.querySelector('.side-nav')?.classList.remove('max-desktop:shadow-lg');
  }
  closeSidenav(){
    document.querySelector('.side-nav')?.classList.add('max-desktop:hidden');
    document.querySelector('.body')?.classList.remove('max-desktop:blur-sm');
    document.querySelector('.body')?.classList.remove('max-desktop:h-screen');
  }

}
