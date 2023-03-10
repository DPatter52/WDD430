import { Component, Input } from '@angular/core';
import { ContactService } from 'app/contacts/contact.service';
import { Message } from '../message.model';
import { Contact } from 'app/contacts/contact.model';


@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent {
  messageSender: string;
  @Input() message: Message;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact: Contact = this.contactService.getContact(
      this.message.sender
    );
    this.messageSender = contact.name;
  }
}
