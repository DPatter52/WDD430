import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  @Output() selectedBookEvent = new EventEmitter<Book>()
  books: Book[] = [];
  term: String = '';

  private subscription!: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    
    this.subscription = this.bookService.bookChangedEvent
    .subscribe((booksList: Book[]) => {
      this.books = booksList;
    })
    this.bookService.getBooks();
  }

  search(value:String) {
    this.term = value;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
