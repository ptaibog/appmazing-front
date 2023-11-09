import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
  name: string;
  firstsurname: string;
  secondsurname: string;
  phonenumber: number;
  mail: string;

  constructor(private router: Router, private contactsService: ContactsService) { }

  ngOnInit() {
  }

  newContact(){
    const contact = {
      name: this.name,
      firstsurname: this.firstsurname,
      secondsurname: this.secondsurname,
      phonenumber: this.phonenumber,
      mail: this.mail
    }
    this.contactsService.newContact(contact);
    this.navigateToHome();
  }

  cancelInsert(){
    this.navigateToHome();
  }

  navigateToHome(){
    this.router.navigate(['/contacts']);
  }

}
