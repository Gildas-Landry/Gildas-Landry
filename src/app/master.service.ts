import { Injectable } from '@angular/core';
import { catchError, of, tap, Observable } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) {

  }
  addSale(sale:any):Observable<any>{
    return this.http.post('http://localhost:8000/sale/create',sale);
  }
  getSuppliers():Observable<any> {
    return this.http.get('http://localhost:8000/supplier');
  }

  updateSupplier(id:number, supplier:any): Observable<any> {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`http://localhost:8000/supplier/update/${id}`,supplier);
  }

  deleteSupplierById(id: number):Observable<any>{
    return this.http.delete(`http://localhost:8000/supplier/delete/${id}`)
  }

  addSupplier(supplier:any):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post('http://localhost:8000/supplier/create',supplier, httpOptions);
  }

}
