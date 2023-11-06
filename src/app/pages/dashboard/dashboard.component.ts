import { getLocaleDateFormat } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild,Input,Output } from '@angular/core';
import { PurchaseComponent } from '../purchase/purchase.component';
import { SendDataService } from 'src/app/services/send-data.service';
import { ProdService } from '../products/prod-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('date')date!:ElementRef;
  constructor(private prodservice:ProdService,private http:HttpClient) { }
  quantitysold:number=0;
  quantitysupplied:number=0;
  monthlyearn:number=0;
  ngOnInit(): void {
    
    this.http.get('http://localhost:8000/purchase/mearning').subscribe({
      next:(response)=>{
        this.monthlyearn=+response;
        console.log(this.monthlyearn)
      },
      error:console.log
    })
    this.prodservice.getProductSold().subscribe(
      {
        next: (response) =>
        {
          for(let i=0;i<=response.length-1;i++){

            this.quantitysold=this.quantitysold+response[i].quantity_sold;
          }

        },
          error:console.log
        });


    this.prodservice.getProductsSupplied().subscribe(
      {
        next: (response) =>
        {
          for(let i=0;i<=response.length-1;i++){

            this.quantitysupplied=this.quantitysupplied+response[i].quantity_supplied;
          }
        },
          error:console.log
        });

  }

  setTime(){
    const today=new Date();
    let hour=today.getHours();
    let min=today.getMinutes();
    let sec=today.getSeconds();
    this.date.nativeElement.value=hour+':'+min+':'+sec;
    //setTimeout(this.setTime,1000);
}
  ngAfterViewInit(){
    const today=new Date()
    let hour=today.getHours();
    let min=today.getMinutes();
    let sec=today.getSeconds();

    let date=new Date();
    let month=date.getMonth()+1;
    this.date.nativeElement.value = date.getDate()+'/'+month+'/'+date.getFullYear()+'  '+hour+':'+':'+min+':'+sec;

  }

  closeSidenav(){
    document.querySelector('.side-nav')?.classList.add('max-desktop:hidden');
    document.querySelector('.body')?.classList.remove('max-desktop:blur-sm');
    document.querySelector('.body')?.classList.remove('max-desktop:h-screen');
  }

}
