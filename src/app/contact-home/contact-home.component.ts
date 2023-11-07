import { Component } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  firstsurname: string;
  secondsurname: string;
  phonenumber: number;
  mail: string;
}

const ELEMENT_DATA: Contact[] = [
  {id: 1, name: 'Pablo',firstsurname: 'Taibo', secondsurname: 'Garcia', phonenumber: 678678678, mail: 'pablotaibo@gmail.com'},
  {id: 2, name: 'Juan',firstsurname: 'Lopez', secondsurname: 'Gonzalez', phonenumber: 672672672, mail: 'juangozlz@gmail.com'},
  {id: 3, name: 'Laura',firstsurname: 'Perez', secondsurname: 'De Abedul', phonenumber: 633633633, mail: 'lauradlab@gmail.com'},
  {id: 4, name: 'Julia',firstsurname: 'Rodriguez', secondsurname: 'Sevilla', phonenumber: 666666666, mail: 'rdriguz.sev@gmail.com'},
  {id: 5, name: 'Manuela',firstsurname: 'Dominguez', secondsurname: 'Arias', phonenumber: 679679679, mail: 'manuealdmgz@gmail.com'},
  {id: 6, name: 'Diego',firstsurname: 'Garcia', secondsurname: 'Garcia', phonenumber: 621621621, mail: 'diego.garcia@gmail.com'},
  {id: 7, name: 'Blanca',firstsurname: 'Suarez', secondsurname: 'Perez', phonenumber: 634634634, mail: 'suarezgrc@gmail.com'},
  {id: 8, name: 'Jorge',firstsurname: 'Perez', secondsurname: 'Garcia', phonenumber: 699697639, mail: 'jorge_garci@gmail.com'},
  {id: 9, name: 'Carlos',firstsurname: 'Sainz', secondsurname: 'Loquesea', phonenumber: 661661662, mail: 'sainzcarlos@gmail.com'},
  {id: 10, name: 'Fernando',firstsurname: 'Alonso', secondsurname: 'Nano', phonenumber: 633333333, mail: 'alonsomagic@gmail.com'},
];
@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent {

  displayedColumns: string[] = ['id', 'name', 'firstsurname', 'secondsurname', 'phonenumber', 'mail'];
  contacts = ELEMENT_DATA;
}
