import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user: User;
  orgininalUser: User;
  editMode: boolean = false;
  id: string;
  isInvalid = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id == undefined || this.id == null) {
        this.editMode = false;
        return;
      }
      this.orgininalUser = this.userService.getUser(this.id);

      if (!this.orgininalUser) {
        return;
      }
      this.editMode = true;
      this.user = JSON.parse(JSON.stringify(this.orgininalUser));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newUser = new User(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl
    );
    if (this.editMode) {
      this.userService.updateUser(this.orgininalUser, newUser);
    } else {
      this.userService.addUser(newUser);
    }

    this.router.navigate(['/users']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidUser(newUser: User) {
    if(!newUser) {
      return (this.isInvalid = true);
    }
    if (this.user && newUser.id === this.user.id) {
      return (this.isInvalid = true);
    }
    return (this.isInvalid = false);
  }
}
