import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from 'src/shared/dropdown.directive';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewEditComponent } from './reviews/review-edit/review-edit.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookListComponent } from './books/book-list/book-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from './reviews/review.service';
import { AppRoutingModule } from './app-routing.module';
import { BookService } from './books/book.service';
import { DateDirective } from 'src/shared/date.directive';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    BooksComponent,
    ReviewsComponent,
    ReviewEditComponent,
    ReviewItemComponent,
    ReviewListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookItemComponent,
    BookListComponent,
    DateDirective

  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ReviewService, BookService],
  bootstrap: [AppComponent],
})
export class AppModule { }
