import { Component } from '@angular/core';
import { Favorite } from '../favorite.model';
import { FavoriteService } from '../favorite.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  favorites: Favorite[] = [];

  private subscription!: Subscription;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.favoriteService.getfavorites();
    this.subscription = this.favoriteService.favoriteChangedEvent
    .subscribe((favoritesList: Favorite[]) => {
      this.favorites = favoritesList;
    })
  }

}
