import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';


@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
@Input() book!: Book;
@Output() bookSelected = new EventEmitter();


constructor() {}

ngOnInit(): void {
  
}

onSelected() {
  this.bookSelected.emit();
}


}