import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }

  getContacts(): Observable<any> { 
    const url = 'http://localhost:30030/contacts/getAll';
    const headers = new HttpHeaders();
    return this.http.get<any>(url, {headers});
  }
}
