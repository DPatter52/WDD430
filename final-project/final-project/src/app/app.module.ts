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
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookListComponent } from './books/book-list/book-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from './reviews/review.service';
import { UserService } from './users/user.service';
import { AppRoutingModule } from './app-routing.module';
import { BookService } from './books/book.service';



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
    UsersComponent,
    UserDetailComponent,
    UserEditComponent,
    UserItemComponent,
    UserListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookItemComponent,
    BookListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ReviewService, UserService, BookService],
  bootstrap: [AppComponent],
})
export class AppModule { }
