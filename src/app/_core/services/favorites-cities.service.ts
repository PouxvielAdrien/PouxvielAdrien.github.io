import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {MAX_FAVORITE_CITY} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class FavoritesCitiesService {

  favoritesCities: string[] =[];

  constructor() {}

  onSaveCities(cityToAdd:string) {
    if(this.canAddCity(cityToAdd)){
      this.favoritesCities.push(cityToAdd);
    }
    else{
      const index: number = this.favoritesCities.indexOf(cityToAdd);
      if (index !== -1) {
        this.favoritesCities.splice(index, 1);
      }
    }
    localStorage.setItem('sessionFavCity', JSON.stringify(this.favoritesCities));
  }

  canAddCity(cityToAdd:string){
    if(!this.isCityAddedInFavorite(cityToAdd) && this.favoritesCities.length<=MAX_FAVORITE_CITY){
      return true
    }
    else{
      return false
    }
  }

  isCityAddedInFavorite(cityToAdd:string) {
    return this.favoritesCities.includes(cityToAdd);
  }

}







