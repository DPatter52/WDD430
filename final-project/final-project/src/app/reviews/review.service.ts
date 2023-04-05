import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from './review.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  reviewChangedEvent = new Subject<Review[]>();
  reviews: Review[] = [];
  maxReviewId: number;

  constructor(private httpClient: HttpClient) {
    this.maxReviewId = this.getMaxId();
  }

  sortAndSend() {
    this.reviews.sort((a, b) => {
      if (a.sender < b.sender) {
        return -1;
      }
      if (a.sender > b.sender) {
        return 1;
      }
      return 0;
    });
    this.reviewChangedEvent.next(this.reviews.slice());
  }

  getReviews() {
    return this.httpClient.get('http://localhost:3000/reviews').subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
        this.maxReviewId = this.getMaxId();
        this.reviews.sort((a, b) => (a.sender > b.sender ? 1 : -1));
        this.reviewChangedEvent.next(this.reviews.slice());
      },
      (error: any) => {
        console.error('Error getting reviews:', error);
      }
    );
  }

  getReview(id: string) {
    for (const review of this.reviews)
      if (review.id === id) {
        return review;
      }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const review of this.reviews) {
      var currentId = +review.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addReview(review: Review) {
    if (!review) {
      return;
    }

    review.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ review: String; reviews: Review }>(
        'http://localhost:3000/reviews',
        review,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.reviews.push(responseData.reviews);
        this.sortAndSend();
      });
  }
}
