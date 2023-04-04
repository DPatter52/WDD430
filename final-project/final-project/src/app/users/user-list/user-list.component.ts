import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  term: string;
  private subscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers();
    this.subscription = this.userService.userChangedEvent.subscribe(
      (usersList: User[]) => {
        this.users = usersList;
      }
    );
  }

  search(value: string) {
    this.term = value;
  }
}
