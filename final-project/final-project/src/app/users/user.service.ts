import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSelectedEvent = new Subject<User>();
  userChangedEvent = new Subject<User[]>();
  users: User[] = [];
  maxUserId: number;

  constructor(private httpClient: HttpClient) {
    this.maxUserId = this.getMaxId();
  }

  sortAndSend() {
    this.users.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.userChangedEvent.next(this.users.slice());
  }

  storeUsers(users: User[]) {
    const usersString = JSON.stringify(users);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.httpClient
      .put(
        'https://wdd430-server-default-rtdb.firebaseio.com/Users.json',
        usersString,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log('Users have been saved', response);
        },
        (error) => {
          console.error('Error saving Users: ', error);
        }
      );
    this.userChangedEvent.next(this.users.slice());
  }

  getUsers() {
    return this.httpClient.get<User[]>('http://localhost:3000/Users').subscribe(
      (Users: User[]) => {
        this.users = Users;
        this.maxUserId = this.getMaxId();
        this.users.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.userChangedEvent.next(this.users.slice());
      },
      (error: any) => {
        console.error('Error getting Users:', error);
      }
    );
  }

  getUser(id: string): User {
    for (const user of this.users)
      if (user.id == id) {
        return user;
      }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const user of this.users) {
      var currentId = +user.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addUser(user: User) {
    if (!user) {
      return;
    }

    user.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: String; user: User }>(
        'http://localhost:3000/Users',
        user,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.users.push(responseData.user);
        this.sortAndSend();
      });
  }

  updateUser(originalUser: User, newUser: User) {
    if (!originalUser || !newUser) {
      return;
    }

    const pos = this.users.findIndex((d) => d.id === originalUser.id);
    if (pos < 0) {
      return;
    }

    newUser.id = originalUser.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .put('http://localhost:3000/Users/' + originalUser.id, newUser, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.users[pos] = newUser;
        this.sortAndSend();
      });
  }

  deleteUser(user: User) {
    if (!user) {
      return;
    }

    const pos = this.users.findIndex((d) => d.id === user.id);

    if (pos < 0) {
      return;
    }

    this.httpClient
      .delete('http://localhost:3000/Users/' + user.id)
      .subscribe((response: Response) => {
        this.users.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
