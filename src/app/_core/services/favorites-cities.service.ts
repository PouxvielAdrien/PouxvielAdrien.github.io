import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {MAX_FAVORITE_CITY} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class FavoritesCitiesService {

  favoritesCities: string[] =[];
  starIcon = false;

  constructor(private router:Router,
              private route:ActivatedRoute,) {}

  onSaveCities(listOfFavoritesCities:string[], cityToAdd:string) {
    if(this.isCityAddedAsFavorite(listOfFavoritesCities,cityToAdd) && this.canAddCity(listOfFavoritesCities)){
      listOfFavoritesCities.push(cityToAdd),
        this.starIcon=true;

    }
    else{
      const index: number = listOfFavoritesCities.indexOf(cityToAdd);
      if (index !== -1) {
        listOfFavoritesCities.splice(index, 1),
          this.starIcon=false;
      }
    }
    this.favoritesCities=listOfFavoritesCities;
    localStorage.setItem('sessionFavCity', JSON.stringify(this.favoritesCities));
  }

  isCityAddedAsFavorite(listOfFavoritesCities:string[], cityToAdd:string){
    if(!listOfFavoritesCities.includes(cityToAdd)){
      return true
    }
    else{
      return false
    }
  }

  canAddCity(listOfFavoritesCities:string[]){
    if(listOfFavoritesCities.length<=MAX_FAVORITE_CITY){
      return true
    }
    else{
      return false
    }
  }


  onCheckIfFavCityForColorOfStar(listOfFavoritesCities:string[], cityToAdd:string) {
    if(listOfFavoritesCities.includes(cityToAdd)){
      this.starIcon=true;
    }
    else{
      this.starIcon=false;
    }
  }

}







