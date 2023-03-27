import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId: number;

  constructor(private httpClient: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  // Old Method
  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }
  storeContacts(contacts: Contact[]) {
    const contactsString = JSON.stringify(contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.httpClient
      .put(
        'https://wdd430-server-default-rtdb.firebaseio.com/contacts.json',
        contactsString,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log('Contacts have been saved', response);
        },
        (error) => {
          console.error('Error saving contacts: ', error);
        }
      );
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    this.httpClient
      .get('https://wdd430-server-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error getting contacts:', error);
        }
      );
  }



  getContact(id: string): Contact {
    for (const contact of this.contacts)
      if (contact.id === id) {
        return contact;
      }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      var currentId = +contact.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact == null || newContact == undefined) {
      return;
    }

    this.maxContactId++;
    console.log(this.maxContactId);

    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (contact === undefined || contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
  }
}
