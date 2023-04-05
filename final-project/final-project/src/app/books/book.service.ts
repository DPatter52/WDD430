import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "./book.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
  export class BookService {
    books: Book[] = [];
    bookSelectedEvent = new EventEmitter<Book>();
    bookChangedEvent = new Subject<Book[]>();
    maxbookId: number;
  
    constructor(private httpClient: HttpClient) {
      this.maxbookId = this.getMaxId();
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
  
    setBooks(books: Book[]) {
      this.books = books;
      this.bookChangedEvent.next(this.books.slice());
    }
  
    storeBooks(books: Book[]) {
      const booksString = JSON.stringify(books);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      this.httpClient
        .put(
          'https://wdd430-server-default-rtdb.firebaseio.com/books.json',
          booksString,
          { headers }
        )
        .subscribe(
          (response) => {
            console.log('books have been saved', response);
          },
          (error) => {
            console.error('Error saving books: ', error);
          }
        );
      this.bookChangedEvent.next(this.books.slice());
    }
  
    getBooks() {
      this.httpClient.get('http://localhost:3000/books').subscribe(
        (books: Book[]) => {
          this.books = books;
          this.maxbookId = this.getMaxId();
          this.books.sort((a, b) => (a.name > b.name ? 1 : -1));
          this.bookChangedEvent.next(this.books.slice());
        },
        (error: any) => {
          console.error('Error getting books:', error);
        }
      );
    }
  
    getBook(id: string): Book {
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
        .post<{ message: String; book: Book }>(
          'http://localhost:3000/books',
          book,
          { headers: headers }
        )
        .subscribe((responseData) => {
          this.books.push(responseData.book);
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
        .put(
          'http://localhost:3000/books/' + originalbook.id,
          newbook,
          { headers: headers }
        )
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
  