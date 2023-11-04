import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template:`
  <div class="mt-[300px] center ">
    <div class="text-red-500 text-center text-[70px] ">404 ERROR</div>
    <div class="text-center text-[30px] mt-10" routerLink="/">
      Retourner a l'acueil
    </div>
  </div>
`,
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
}
