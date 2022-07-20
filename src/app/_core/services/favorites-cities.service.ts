import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FavoritesCitiesService {

  favoritesCities: string[] =[];
  iconFullFill = false;

  constructor(private router:Router,
              private route:ActivatedRoute,) {}

  onSaveCities(listOfFavoritesCities:string[], cityToAdd:string) {
    if((!listOfFavoritesCities.includes(cityToAdd)) && listOfFavoritesCities.length<=5){
      listOfFavoritesCities.push(cityToAdd)
    }
    else{
      const index: number = listOfFavoritesCities.indexOf(cityToAdd);
      if (index !== -1) {
        listOfFavoritesCities.splice(index, 1);
      }
    }
    this.favoritesCities=listOfFavoritesCities;
    localStorage.setItem('sessionFavCity', JSON.stringify(this.favoritesCities));
  }

  onPickFavCity(favoriteCityPicked:string){
    this.router.navigate(
      [],
      {queryParams:{
          city: favoriteCityPicked},
        relativeTo: this.route});
  }

  onCheckIfCityIsInList(listOfFavoritesCities:string[], cityToAdd:string) {
    if(listOfFavoritesCities.includes(cityToAdd)){
      this.iconFullFill=true;
    }
    else{
      this.iconFullFill=false;
    }
  }

}







