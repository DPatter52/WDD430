import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(2, 'Chores', 'Need to take the garbage out!', 'Angela Patterson'),
    new Message(3, 'New Idea', 'Hey I got cool idea for a project, come out to the garage.', 'John Patterson'),
  ];


  constructor() {
 
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }


}
