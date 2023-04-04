import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from 'src/shared/dropdown.directive';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewEditComponent } from './reviews/review-edit/review-edit.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { FavoriteDetailComponent } from './favorites/favorite-detail/favorite-detail.component';
import { FavoriteEditComponent } from './favorites/favorite-edit/favorite-edit.component';
import { FavoriteItemComponent } from './favorites/favorite-item/favorite-item.component';
import { FavoriteListComponent } from './favorites/favorite-list/favorite-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from './reviews/review.service';
import { UserService } from './users/user.service';
import { AppRoutingModule } from './app-routing.module';
import { FavoriteService } from './favorites/favorite.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    FavoritesComponent,
    ReviewsComponent,
    ReviewEditComponent,
    ReviewItemComponent,
    ReviewListComponent,
    UsersComponent,
    UserDetailComponent,
    UserEditComponent,
    UserItemComponent,
    UserListComponent,
    FavoriteDetailComponent,
    FavoriteEditComponent,
    FavoriteItemComponent,
    FavoriteListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ReviewService, UserService, FavoriteService],
  bootstrap: [AppComponent],
})
export class AppModule { }
