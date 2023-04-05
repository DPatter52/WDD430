import { Component, Output, Input, OnInit } from '@angular/core';


import { Review } from '../review.model';


@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css'],
})
export class ReviewItemComponent implements OnInit{
  @Output() reviewSender: string;
  @Input() review: Review;

  constructor() {}

  ngOnInit() {
 
  }
}
