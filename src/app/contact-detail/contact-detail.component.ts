import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: any;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.contactsService.getContact(this.route.snapshot.params['id']).subscribe(data =>{
      this.contact = data;
    });
  }

  openDeleteDialog(contactId: number): void{
    this.dialog.open(ContactDeleteComponent, {data: {contactId: contactId}});
  }

  editContact(){
    this.router.navigate(['/contact/edit', this.route.snapshot.params['id']]);
  }

  closeContact(){
    this.router.navigate(['/contacts']);
  }

}
