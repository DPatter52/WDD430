import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import {
  ActivatedRoute,
  Params,
  Router,
} from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = { ...this.originalContact };
      if (this.contact.group) {
        this.groupContacts = { ...this.groupContacts };
      }
    });
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }
}
