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
  @ViewChild('name') nameInputRef: ElementRef;
  @Output() addReviewEvent = new EventEmitter<Review>();

  currentSender: string = '7';

  date = new Date();

  constructor(private reviewService: ReviewService) {
    
  }

  onSendReview() {
    const book = this.subjectInputRef.nativeElement.value;
    const msgText = this.reviewInputRef.nativeElement.value;
    const name = this.nameInputRef.nativeElement.value;
    const date = this.date.toLocaleDateString();
    const newReview = new Review("1", book ,msgText, name, date);
    this.reviewService.addReview(newReview);
    console.log(newReview)
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.reviewInputRef.nativeElement.value = '';
    this.nameInputRef.nativeElement.value = '';
  }

}
