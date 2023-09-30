import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
  showSidenav(){
    document.querySelector('.side-nav')?.classList.remove('max-desktop:hidden');
    document.querySelector('.body')?.classList.add('blur-sm');
   }
   closeSidenav(){
     document.querySelector('.side-nav')?.classList.add('max-desktop:hidden');
   }
    title = 'StockManage';
}
