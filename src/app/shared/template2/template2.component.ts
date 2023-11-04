import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./template2.component.css']
})
export class Template2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
