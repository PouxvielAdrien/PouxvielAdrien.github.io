import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import { WeatherService } from '../_core/services/weather.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {HttpClient, HttpParams} from '@angular/common/http';
import {WeatherUnit} from "@core/models";
import {finalize, Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {Weather} from "@core/models";
import {FavoritesCitiesService} from "@core/services/favorites-cities.service";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  @Input() typeOfForm = '';

  weatherForm: FormGroup|null = null;
  formResearch = true;
  sessionCityName: string = "";

  private queryParamsSubscription: Subscription | null = null;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    if(this.typeOfForm =='city') {
      this.weatherForm = new FormGroup({
        weatherCity: new FormControl("", [Validators.required, Validators.minLength(4)]),
        weatherUnit: new FormControl('metric'),
        weatherLang: new FormControl('en')
      });
    }

    this.loadData();
    this.queryParamsSubscription = this.route.queryParamMap
      .subscribe(params => {
        const city = params.get('city');
        if (city){
          this.weatherForm!.setValue({weatherCity: city, weatherUnit: "metric", weatherLang: "en" })
        }
        else{
          this.weatherForm!.setValue({weatherCity: this.sessionCityName, weatherUnit: "metric", weatherLang: "en" })
        }
      });

    // if (this.typeOfForm == 'coord') {
    //   this.weatherForm = new FormGroup({
    //     weatherLat: new FormControl("", [Validators.required]),
    //     weatherLon: new FormControl("", [Validators.required]),
    //     weatherUnit: new FormControl('metric'),
    //     weatherLang: new FormControl('en')
    //   });
    // }

    // switch(this.typeOfForm) {
    //   case 'city': {
    //     //statements;
    //     break;
    //   }
    //   case 'coord': {
    //     //statements;
    //     break;
    //   }
    // }
  }


  ngOnDestroy() {
  }

  get cityFormValue():string{
    return this.weatherForm!.get("weatherCity")?.value
  }

  get unitFormValue():WeatherUnit{
    return this.weatherForm!.get("weatherUnit")?.value
  }

  get langFormValue():string{
    return this.weatherForm!.get("weatherLang")?.value
  }

  onShowWeather() {
    localStorage.setItem('cityLocalyStored', JSON.stringify(this.cityFormValue));
    this.formResearch = false;
  }

  loadData() {
    let cityLocalyStored: string | null;
    cityLocalyStored = localStorage.getItem('cityLocalyStored');
    if (cityLocalyStored) {
      this.sessionCityName = JSON.parse(cityLocalyStored);
    }
  }

  onNewResearch(stateOfResearch: boolean){
    this.formResearch = stateOfResearch
  }

}
