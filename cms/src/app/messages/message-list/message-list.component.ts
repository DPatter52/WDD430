import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  messages: Message[] = [];

  private subscription!: Subscription

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages();
    this.subscription = this.messageService.messageChangedEvent
    .subscribe((messagesList: Message[]) => {
      this.messages = messagesList;
    })
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
