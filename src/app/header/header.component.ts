/* HEADER COMPONENT */

import { Component, OnInit } from '@angular/core';
import {FavoritesCitiesService} from "@core/services/favorites-cities.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(protected fc: FavoritesCitiesService) { }

  ngOnInit(): void {
  }

  onPickFavCity(favoriteCityPicked:string){
    this.fc.onPickFavCity(favoriteCityPicked)
  }

}
