import { Component, Output, Input } from '@angular/core';
import { UserService } from 'src/app/users/user.service';

import { Review } from '../review.model';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css'],
})
export class ReviewItemComponent {
  @Output() reviewSender: string;
  @Input() review: Review;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const user: User = this.userService.getUser(this.review.sender);
    this.reviewSender = user.name;
  }
}
