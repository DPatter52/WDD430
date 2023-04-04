import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

import { ReviewListComponent } from './reviews/review-list/review-list.component';

import { FavoritesComponent } from './favorites/favorites.component';
import { FavoriteEditComponent } from './favorites/favorite-edit/favorite-edit.component';
import { FavoriteDetailComponent } from './favorites/favorite-detail/favorite-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/favorites', pathMatch: 'full' },
  {
    path: 'favorites',
    component: FavoritesComponent,
    children: [
      { path: 'new', component: FavoriteEditComponent },
      { path: ':id', component: FavoriteDetailComponent },
      { path: ':id/edit', component: FavoriteEditComponent },
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
