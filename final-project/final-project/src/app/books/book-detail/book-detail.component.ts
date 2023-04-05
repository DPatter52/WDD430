import { Component } from '@angular/core';

import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  book: Book;
  books: Book[] = [new Book('', '', '', '')];
  id: string;
  nativeWindow: any;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRefService: WindRefService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.book = this.bookService.getBook(this.id);
      this.nativeWindow = this.windowRefService.getNativeWindow();
    });
  }

  onView() {
    if (this.book.imageUrl) {
      this.nativeWindow.open(this.book.imageUrl);
    }
  }

  onEditBook() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.bookService.deleteBook(this.book);
    this.router.navigate(['/books']);
  }
}

