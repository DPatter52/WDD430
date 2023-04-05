import { Component } from '@angular/core';
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
  books: Book[] = [];

  private subscription!: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks();
    this.subscription = this.bookService.bookChangedEvent
    .subscribe((booksList: Book[]) => {
      this.books = booksList;
    })
  }

}
