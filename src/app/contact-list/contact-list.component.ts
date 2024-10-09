import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../servicios/contact.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../model/contact.interface';
import { concat } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export default class ContactListComponent implements OnInit {
  
  private contactService = inject(ContactService)

  contacts: Contact[] = [];

  ngOnInit(): void {
    this.loadAll();
}

  loadAll(){
    this.contactService.list()
    .subscribe(contacts => {
    this.contacts = contacts;
    console.log(this.contacts)
  });
  }

  deleteContact(concat: Contact){
    this.contactService.delete(concat.id).subscribe(() =>
     {this.loadAll();

    });
  }


}
