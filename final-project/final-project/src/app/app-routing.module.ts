import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

import { ReviewListComponent } from './reviews/review-list/review-list.component';

import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    component: BooksComponent,
    children: [
      { path: 'new', component: BookEditComponent },
      { path: ':id', component: BookDetailComponent },
      { path: ':id/edit', component: BookEditComponent },
    ],
  },

  { path: 'reviews', component: ReviewListComponent },

  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: 'new', component: UserEditComponent },
      { path: ':id', component: UserDetailComponent },
      { path: ':id/edit', component: UserEditComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
