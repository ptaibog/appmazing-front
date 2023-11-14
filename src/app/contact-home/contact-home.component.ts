import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent implements OnInit{
  contacts: any = [];
  constructor(private contactsService: ContactsService, private router: Router){}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe(data =>{
      this.contacts = data;
    })
  }

  openDetailForm(row: any){
    this.router.navigate(['/contact', row.id]);
  }

  editContactDetail(contact: any){
    this.router.navigate(['/contact/edit', contact]);
  }

  displayedColumns: string[] = ['id', 'name', 'firstsurname', 'secondsurname', 'phonenumber', 'mail', 'actions'];
  
}
