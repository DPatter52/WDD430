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

  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a.sender < b.sender) {
        return -1;
      }
      if (a.sender > b.sender) {
        return 1;
      }
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }

  
  // getMessages(): Observable<Message[]> {
  //   //return this.messages.slice();
  //   return this.httpClient
  //     .get<Message[]>('http://localhost:3000/messages')
  //     .pipe(
  //       tap((messages: Message[]) => {
  //         this.messages = messages;
  //         console.log(Message);
  //         this.maxMessageId = this.getMaxId();
  //         //console.log(this.getMaxId)
  //         this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
  //         this.messageChangedEvent.next(this.messages.slice());
  //       }),
  //       catchError((error) => {
  //         console.error(error);
  //         return throwError(error);
  //       })
  //     );
  // }

  getMessages() {
    this.httpClient
      .get('http://localhost:3000/messages')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => (a.sender > b.sender ? 1 : -1));
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
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: String; messages: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.messages);
        this.sortAndSend();
      });

    // --OLD CODE--
    // this.maxMessageId++;
    // message.id = this.maxMessageId.toString();
    // this.messages.push(message);
    // const messagesListClone = this.messages.slice();
    // this.storeMessages(messagesListClone);
  }
}
