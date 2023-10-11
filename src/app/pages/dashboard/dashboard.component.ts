import { getLocaleDateFormat } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('date')date!:ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  setTime(){
    const today=new Date()
    let hour=today.getHours();
    let min=today.getMinutes();
    let sec=today.getSeconds();
    this.date.nativeElement.value=hour+':'+min+':'+sec;
 //  setTimeout(this.setTime,1000);
}
  ngAfterViewInit(){
    let date=new Date();
    let month=date.getMonth()+1;
    //let time=date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

    this.date.nativeElement.value = date.getDate()+'/'+month+'/'+date.getFullYear()+" "+this.setTime();
   // setInterval(this.setTime,1000);
  }

  closeSidenav(){
    document.querySelector('.side-nav')?.classList.add('max-desktop:hidden');
    document.querySelector('.body')?.classList.remove('max-desktop:blur-sm');
    document.querySelector('.body')?.classList.remove('max-desktop:h-screen');
  }

}
