import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { Review } from '../review.model';
import { ReviewService } from '../review.service';


@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css']
})
export class ReviewEditComponent {
  @ViewChild('book') subjectInputRef: ElementRef;
  @ViewChild('review') reviewInputRef: ElementRef;
  @Output() addReviewEvent = new EventEmitter<Review>();

  currentSender: string = '7';

  constructor(private reviewService: ReviewService) {

  }

  onSendReview() {
    const book = this.subjectInputRef.nativeElement.value;
    const msgText = this.reviewInputRef.nativeElement.value;
    const newReview = new Review("1", book ,msgText, this.currentSender);
    this.reviewService.addReview(newReview);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.reviewInputRef.nativeElement.value = '';
  }

}
