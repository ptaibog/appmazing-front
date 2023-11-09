import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts(): Observable<any> { 
    const url = 'http://localhost:30030/products/getAll';
    const headers = new HttpHeaders();
    return this.http.get<any>(url, {headers});
  }
  getProduct(p_id: number): Observable<any>{
    const url = 'http://localhost:30030/products/get';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({id: p_id});
    return this.http.post(url, body, {headers});
  }
}
