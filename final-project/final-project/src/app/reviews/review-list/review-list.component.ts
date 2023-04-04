import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from '../review.model';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent {
  reviews: Review[] = [];

  private subscription!: Subscription;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviews();
    this.subscription = this.reviewService.reviewChangedEvent.subscribe(
      (reviewList: Review[]) => {
        this.reviews = reviewList;
      }
    );
  }

  onAddReview(review: Review) {
    this.reviews.push(review);
  }
}
