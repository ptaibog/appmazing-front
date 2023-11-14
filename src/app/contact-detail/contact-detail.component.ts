import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: any;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.contactsService.getContact(this.route.snapshot.params['id']).subscribe(data =>{
      this.contact = data;
    });
  }

  editContact(){
    this.router.navigate(['/contact/edit', this.route.snapshot.params['id']]);
  }

  closeContact(){
    this.router.navigate(['/contacts']);
  }

}
