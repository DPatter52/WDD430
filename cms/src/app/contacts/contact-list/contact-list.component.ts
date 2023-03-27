import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  term: string;
  private subscription!: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }

  search(value: string) {
    this.term = value;
  }
}
