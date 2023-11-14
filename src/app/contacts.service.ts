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
// c_id puede sercualqwuier nombre pero pone eso para referirse a contact
  getContact(c_id: number): Observable<any>{
    const url = 'http://localhost:30030/contacts/get';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({id: c_id});
    return this.http.post(url, body, {headers});
  }

  newContact(contact: any): void{
    const url = 'http://localhost:30030/contacts/add';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = contact;
    this.http.post(url, body, {headers}).subscribe();
  }

  updateContact(contact: any):void{
    const url = 'http://localhost:30030/contacts/update';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = contact;
    this.http.put(url, body, {headers}).subscribe();
  }
}
