import { Injectable } from '@angular/core';
import { ProdService } from '../pages/products/prod-service.service';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  public quantitysold=0;
  public quantitysupplied=0;
  constructor(private prodservice:ProdService) { }

  getList(){
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

  getPurchaseList(){
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
  }
}
