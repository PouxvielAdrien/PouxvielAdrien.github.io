/* HEADER COMPONENT */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FavoritesCitiesService} from "@core/services/favorites-cities.service";
import {MIN_FAVORITE_CITY, TYPE_OF_FORM, WeatherUnit} from "@core/models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() formEvent = new EventEmitter<boolean>();
  cityPicked:string|null=null;
  sessionFavCityName: string[] =[];
  readonly TYPE_OF_FORM= TYPE_OF_FORM;

  constructor(protected fc: FavoritesCitiesService,
              private router:Router,
              private route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.loadCities();
  }

  onPickFavCity(favoriteCityPicked:string){
    this.cityPicked=favoriteCityPicked;
    this.router.navigate(
      ["/favorites"],
      {queryParams:{
          city: favoriteCityPicked},
        });
  }

  loadCities() {
    let favCitiesLocalyStored: string[] = [];
    let favCity: string | null;
    favCity = localStorage.getItem('sessionFavCity');
    if(favCity){
      favCitiesLocalyStored.push(favCity!);
      favCitiesLocalyStored.forEach(fc=>{
        this.sessionFavCityName = JSON.parse(fc);
      });
      this.fc.favoritesCities = this.sessionFavCityName;
    }
  }

  canDisplayFavoriteButton(listOfFavoritesCities:string[]){
    if(listOfFavoritesCities.length>=MIN_FAVORITE_CITY){
      return true
    }
   else {
      return false
    }
  }
}
