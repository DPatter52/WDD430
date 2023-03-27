import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  private messages: Message[] = [];
  maxMessageId: number;

  constructor(private httpClient: HttpClient) {
    this.messages = MOCKMESSAGES;
  }
  // Old Method
  // getMessages(){
  //   return this.messages.slice();
  // }

  getMessages() {
    this.httpClient
      .get('https://wdd430-server-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => (a.id > b.id ? 1 : -1));
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Error getting messages:', error);
        }
      );
  }

  storeMessages(messages: Message[]) {
    const messagesString = JSON.stringify(messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.httpClient
      .put(
        'https://wdd430-server-default-rtdb.firebaseio.com/messages.json',
        messagesString,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log('messages have been saved', response);
        },
        (error) => {
          console.error('Error saving messages: ', error);
        }
      );
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      var currentId = +message.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessage(id: string) {
    for (const message of this.messages)
      if (message.id === id) {
        return message;
      }
    return null;
  }

  addMessage(message: Message) {
    if (message == null || message == undefined) {
      return;
    }

    this.maxMessageId++;

    message.id = this.maxMessageId.toString();

    this.messages.push(message);
    const messagesListClone = this.messages.slice();

    this.storeMessages(messagesListClone);
  }
}
