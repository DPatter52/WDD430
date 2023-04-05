import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from './book.model';
import { BookService } from './book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  selectedbook: Book;
  private subscription!: Subscription;

  constructor(private booksService: BookService) {}

  ngOnInit() {
    this.subscription = this.booksService.bookSelectedEvent.subscribe(
      (book: Book) => {
        this.selectedbook = book;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
