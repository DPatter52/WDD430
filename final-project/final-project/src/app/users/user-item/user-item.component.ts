import { Component, Input} from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
@Input() user: User;

constructor(private userService: UserService) {}
}
