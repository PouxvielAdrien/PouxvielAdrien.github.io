/* HEADER COMPONENT */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FavoritesCitiesService} from "@core/services/favorites-cities.service";
import {WeatherUnit} from "@core/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerResearch = true;
  defaultUnit:WeatherUnit="metric";
  defaultLang="en";
  cityPicked:string|null=null;
  sessionFavCityName: string[] =[];
  cityOnInit:string[] = [];


  @Output() formEvent = new EventEmitter<boolean>();

  constructor(protected fc: FavoritesCitiesService) { }

  ngOnInit(): void {
    this.loadCities();
  }

  onPickFavCity(favoriteCityPicked:string){
    this.cityPicked=favoriteCityPicked;
    this.fc.onPickFavCity(favoriteCityPicked)
    this.headerResearch=false;
  }

  onNewResearch(stateOfResearch: boolean){
    this.headerResearch = stateOfResearch;
    this.formEvent.emit(this.headerResearch)
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
}
