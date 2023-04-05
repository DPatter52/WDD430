import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  book: Book;
  originalBook: Book;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id == undefined || this.id == null) {
        this.editMode = false;
        return;
      }
      this.originalBook = this.bookService.getBook(this.id);

      if (this.originalBook == undefined || this.originalBook == null) {
        return;
      }
      this.editMode = true;
      this.book = JSON.parse(JSON.stringify(this.originalBook));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newBook = new Book(
      value.id,
      value.name,
      value.description,
      value.imageUrl
    );
    if (this.editMode) {
      this.bookService.updateBook(this.originalBook, newBook);
    } else {
      this.bookService.addBook(newBook);
    }
    this.router.navigate(['/books'])
  }

  onCancel() {
    this.router.navigate(['/books'], { relativeTo: this.route });
  }
}
