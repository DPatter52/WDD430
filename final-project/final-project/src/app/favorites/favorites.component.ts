import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favorite } from './favorite.model';
import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  selectedFavorite: Favorite;
  private subscription!: Subscription;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.subscription = this.favoriteService.favoriteSelectedEvent.subscribe(
      (favorite: Favorite) => {
        this.selectedFavorite = favorite;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
