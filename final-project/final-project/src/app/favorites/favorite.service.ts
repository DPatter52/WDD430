import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Favorite } from "./favorite.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
  export class FavoriteService {
    favorites: Favorite[] = [];
    favoriteSelectedEvent = new EventEmitter<Favorite>();
    favoriteChangedEvent = new Subject<Favorite[]>();
    maxfavoriteId: number;
  
    constructor(private httpClient: HttpClient) {
      this.maxfavoriteId = this.getMaxId();
    }
  
    sortAndSend() {
      this.favorites.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.favoriteChangedEvent.next(this.favorites.slice());
    }
  
    setfavorites(favorites: Favorite[]) {
      this.favorites = favorites;
      this.favoriteChangedEvent.next(this.favorites.slice());
    }
  
    storefavorites(favorites: Favorite[]) {
      const favoritesString = JSON.stringify(favorites);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      this.httpClient
        .put(
          'https://wdd430-server-default-rtdb.firebaseio.com/favorites.json',
          favoritesString,
          { headers }
        )
        .subscribe(
          (response) => {
            console.log('favorites have been saved', response);
          },
          (error) => {
            console.error('Error saving favorites: ', error);
          }
        );
      this.favoriteChangedEvent.next(this.favorites.slice());
    }
  
    getfavorites() {
      this.httpClient.get('http://localhost:3000/favorites').subscribe(
        (favorites: Favorite[]) => {
          this.favorites = favorites;
          this.maxfavoriteId = this.getMaxId();
          this.favorites.sort((a, b) => (a.name > b.name ? 1 : -1));
          this.favoriteChangedEvent.next(this.favorites.slice());
        },
        (error: any) => {
          console.error('Error getting favorites:', error);
        }
      );
    }
  
    getfavorite(id: string): Favorite {
      for (const favorite of this.favorites)
        if (favorite.id == id) {
          return favorite;
        }
      return null;
    }
  
    getMaxId(): number {
      let maxId = 0;
  
      for (const favorite of this.favorites) {
        var currentId = +favorite.id;
  
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
      return maxId;
    }
  
    addfavorite(favorite: Favorite) {
      if (!favorite) {
        return;
      }
  
      favorite.id = '';
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      this.httpClient
        .post<{ message: String; favorite: Favorite }>(
          'http://localhost:3000/favorites',
          favorite,
          { headers: headers }
        )
        .subscribe((responseData) => {
          this.favorites.push(responseData.favorite);
          this.sortAndSend();
        });
  

    }
  
    updatefavorite(originalfavorite: Favorite, newfavorite: Favorite) {
      if (!originalfavorite || !newfavorite) {
        return;
      }
  
      const pos = this.favorites.findIndex((d) => d.id === originalfavorite.id);
      if (pos < 0) {
        return;
      }
  
      newfavorite.id = originalfavorite.id;
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      this.httpClient
        .put(
          'http://localhost:3000/favorites/' + originalfavorite.id,
          newfavorite,
          { headers: headers }
        )
        .subscribe((response: Response) => {
          this.favorites[pos] = newfavorite;
          this.sortAndSend();
        });

    }
  
    deletefavorite(favorite: Favorite) {
      if (!favorite) {
        return;
      }
  
      const pos = this.favorites.findIndex((d) => d.id === favorite.id);
  
      if (pos < 0) {
        return;
      }
  
      this.httpClient
        .delete('http://localhost:3000/favorites/' + favorite.id)
        .subscribe((response: Response) => {
          this.favorites.splice(pos, 1);
          this.sortAndSend();
        });

    }
  }
  