
import { Injectable } from '@angular/core';
import {catchError, of, tap,} from 'rxjs';
import { HttpClient,HttpParams,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Supplier } from './Supplier';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  REST_API: string="http://localhost:8000/supplier/create";
  httpHeaders = new HttpHeaders().set('content-type','application/json');

constructor(private http:HttpClient) {

}

getSuppliers():Observable<Supplier[]> {
  return this.http.get<Supplier[]>('http://localhost:8000/supplier').pipe(tap((suppliers) => this.log(suppliers)),
  catchError((error) => this.handleError(error,[]))
  );
}

getSupplierById(Id:number):Observable<Supplier>{
  return this.http.get<Supplier>(`http://localhost:8000/supplier/${Id}`).pipe(tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, undefined))
  );
}
updateSupplier(id:number): Observable<Supplier|undefined> {
  const httpOptions={
    headers: new HttpHeaders({'Content-Type': 'application/json'})

  };
  return this.http.put('http://localhost:8000/supplier}',id, httpOptions).pipe(tap((response) =>this.log(response)),catchError((error)=>this.handleError(error,null)));
}
deleteSupplierById(id: number):Observable<null>{
  return this.http.delete<Supplier>(`localhost:8000/supplier/${id}`).pipe(tap((response) => this.log(response)),
  catchError((error) => this.handleError(error, undefined))
  );
}
addSupplier(supplier:Supplier):Observable<Supplier>{
  const httpOptions={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  return this.http.post<Supplier>('http://localhost:8000/supplier/create',supplier, httpOptions).pipe(tap((response) =>this.log(response)),catchError((error)=>this.handleError(error,null)));

}
private log(response: any){
  console.table(response);
}
private handleError(error: Error, errorValue:any){
  console.error(error);
  return of(errorValue);
}
}
