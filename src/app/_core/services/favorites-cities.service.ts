import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FavoritesCitiesService {

  favoritesCities: string[] =["Lyon"];
  iconFullFill = false;

  constructor(private router:Router,
              private route:ActivatedRoute,) {}

  onSaveCities(listOfFavoritesCities:string[], cityToAdd:string) {
    console.log("favoriteCities before Add: ", listOfFavoritesCities)

    if((!listOfFavoritesCities.includes(cityToAdd)) && listOfFavoritesCities.length<=5){
      listOfFavoritesCities.push(cityToAdd)
      console.log("New city added")
    }
    else{
      const index: number = listOfFavoritesCities.indexOf(cityToAdd);
      if (index !== -1) {
        listOfFavoritesCities.splice(index, 1);
      }
    }
    console.log("favoriteCities after Add: ", listOfFavoritesCities)
  }

  /**
   * Todo :
   *        one click to submit
   */

  onPickFavCity(favoriteCityPicked:string){
    console.log("City chosen")
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







