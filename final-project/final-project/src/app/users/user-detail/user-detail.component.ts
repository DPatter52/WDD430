import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  user: User;
  users: User[] = [new User('', '', '', '', '')];
  id: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.user = this.userService.getUser(this.id);
    });
  }

  onEditUser() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.userService.deleteUser(this.user);
    this.router.navigate(['/users']);
  }
}
