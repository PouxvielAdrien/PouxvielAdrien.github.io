import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TYPE_OF_FORM} from "@core/models";

@Component({
  selector: 'app-favorites-cities',
  templateUrl: './favorites-cities.component.html',
  styleUrls: ['./favorites-cities.component.css']
})
export class FavoritesCitiesComponent implements OnInit, OnDestroy {

  favCityPicked:string="";
  queryParamsSubscription: Subscription | null = null;
  readonly TYPE_OF_FORM = TYPE_OF_FORM;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParamMap
      .subscribe(params => {
        const city = params.get('city');
        if (city){
          this.favCityPicked = city;
        }
      });
  }

  ngOnDestroy(): void{
    this.queryParamsSubscription?.unsubscribe();
  }
}
