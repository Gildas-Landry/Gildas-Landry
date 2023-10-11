import { Injectable } from '@angular/core';
import { catchError, of, tap, Observable } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  //REST_API: string="http://localhost:8000/category/create";
 // httpHeaders = new HttpHeaders().set('content-type','application/json');

  constructor(private http:HttpClient) {

  }

  getcategories():Observable<any> {
    return this.http.get('http://localhost:8000/category');
  }

  updatecategory(id:number, category:any): Observable<any> {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`http://localhost:8000/category/update/${id}`,category);
  }

  deletecategoryById(id: number):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`http://localhost:8000/category/delete/${id}`,httpOptions);
  }

  addcategory(category:any):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post('http://localhost:8000/category/create',category, httpOptions);
  }

}
