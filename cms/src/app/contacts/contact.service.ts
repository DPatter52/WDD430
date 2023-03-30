import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { application } from 'express';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private httpClient: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactChangedEvent.next(this.contacts.slice());
  }

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
    return this.httpClient.get<Contact[]>('http://localhost:3000/contacts').subscribe(
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

  
  // getContacts(): Observable<Contact[]> {
  //   return this.httpClient.get<Contact[]>('http://localhost:27017/contacts').pipe(
  //     map((contact: Contact[]) => {
  //       return contact.map(d => new Contact( d.id, d.name, d.email, d.phone, d.imageUrl, d.group));
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(error);
  //       return throwError(error);
  //     })
  //   );
  // }

  getContact(id: string): Contact {
    for (const contact of this.contacts)
      if (contact.id == id) {
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

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: String; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });

    // --OLD CODE--
    // this.maxContactId++;
    // console.log(this.maxContactId);

    // newContact.id = this.maxContactId.toString();
    // this.contacts.push(newContact);
    // const contactsListClone = this.contacts.slice();
    // this.storeContacts(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });

    // --OLD CODE--
    // this.contacts[pos] = newContact;
    // const contactsListClone = this.contacts.slice();
    // this.storeContacts(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    this.httpClient
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
    // --OLD CODE--
    // this.contacts.splice(pos, 1);
    // const contactsListClone = this.contacts.slice();
    // this.storeContacts(contactsListClone);
  }
}
