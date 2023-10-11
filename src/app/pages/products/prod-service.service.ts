import { Injectable } from '@angular/core';
import { catchError, of, tap, Observable } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdService {

  constructor(private http:HttpClient) {

  }

  getproducts():Observable<any> {
    return this.http.get('http://localhost:8000/product');
  }

  updateproduct(id:number, product:any): Observable<any> {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`http://localhost:8000/product/update/${id}`,product);
  }

  deleteproductById(id: number):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`http://localhost:8000/product/delete/${id}`,httpOptions);
  }

  addproduct(product:any):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post('http://localhost:8000/product/create',product, httpOptions);
  }

   exportProducts(){
    return this.http.get('http://localhost:8000/product/export-csv');
   }

   importProducts(excelfile:any){
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post('http://localhost:8000/product/import',excelfile, httpOptions);
   }
}
