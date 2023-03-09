import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService],
})
export class ContactsComponent implements OnInit, OnDestroy {
  selectedContact: Contact;
  private subscription: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.subscription = this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
