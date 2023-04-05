import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [];
  bookSelectedEvent = new EventEmitter<Book>();
  bookChangedEvent = new Subject<Book[]>();
  maxBookId!: number;

  constructor(private httpClient: HttpClient) {
    this.maxBookId = this.getMaxId();
  }

  sortAndSend() {
    this.books.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.bookChangedEvent.next(this.books.slice());
  }

  getBooks() {
    this.httpClient
      .get<{ message: string; books: Book[] }>('http://localhost:3000/books')
      .subscribe(
        (booksData) => {
          this.books = booksData.books;
          this.maxBookId = this.getMaxId();
          this.books.sort((a, b) => (a.name > b.name ? 1 : -1));
          console.log(booksData);
          this.bookChangedEvent.next(this.books.slice());
        },
        (error: any) => {
          console.error('Error getting books:', error);
        }
      );
  }

  getBook(id: string) {
    for (const book of this.books)
      if (book.id == id) {
        return book;
      }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const book of this.books) {
      var currentId = +book.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  
  addBook(book: Book) {
    if (!book) {
      return;
    }

    book.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ book: String; books: Book }>(
        'http://localhost:3000/books',
        book,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.books.push(responseData.books);
        this.sortAndSend();
      });
  }

  updateBook(originalbook: Book, newbook: Book) {
    if (!originalbook || !newbook) {
      return;
    }

    const pos = this.books.findIndex((d) => d.id === originalbook.id);
    if (pos < 0) {
      return;
    }

    newbook.id = originalbook.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .put('http://localhost:3000/books/' + originalbook.id, newbook, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.books[pos] = newbook;
        this.sortAndSend();
      });
  }

  deleteBook(book: Book) {
    if (!book) {
      return;
    }

    const pos = this.books.findIndex((d) => d.id === book.id);

    if (pos < 0) {
      return;
    }

    this.httpClient
      .delete('http://localhost:3000/books/' + book.id)
      .subscribe((response: Response) => {
        this.books.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
