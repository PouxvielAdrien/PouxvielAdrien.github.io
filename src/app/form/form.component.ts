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
  sessionLat: number | null =null;
  sessionLon: number | null =null;

  private queryParamsSubscription: Subscription | null = null;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    if(this.typeOfForm =='city') {
      this.weatherForm = new FormGroup({
        weatherCity: new FormControl("", [Validators.required]),
        weatherUnit: new FormControl('metric'),
        weatherLang: new FormControl('en')
      });
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
    }

    if (this.typeOfForm == 'coord') {
      this.weatherForm = new FormGroup({
        weatherLat: new FormControl("", [Validators.required]),
        weatherLon: new FormControl("", [Validators.required]),
        weatherUnit: new FormControl('metric'),
        weatherLang: new FormControl('en')
      });
      this.loadData();
      this.queryParamsSubscription = this.route.queryParamMap
        .subscribe(params => {
          const lat = params.get('lat');
          const lon = params.get('lon');
          if (lat && lon){
            this.weatherForm!.setValue({weatherLat: lat, weatherLon: lon, weatherUnit: "metric", weatherLang: "en" })
          }
          else{
            this.weatherForm!.setValue({weatherLat: this.sessionLat, weatherLon: this.sessionLon, weatherUnit: "metric", weatherLang: "en" })
          }
        });
    }

    if (this.typeOfForm == 'location') {
      this.weatherForm = new FormGroup({
        weatherUnit: new FormControl('metric'),
        weatherLang: new FormControl('en')
      });
    }


  }


  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }

  get cityFormValue():string{
    return this.weatherForm!.get("weatherCity")?.value
  }

  get latFormValue():string{
    return this.weatherForm!.get("weatherLat")?.value
  }

  get lonFormValue():string{
    return this.weatherForm!.get("weatherLon")?.value
  }

  get unitFormValue():WeatherUnit{
    return this.weatherForm!.get("weatherUnit")?.value
  }

  get langFormValue():string{
    return this.weatherForm!.get("weatherLang")?.value
  }

  onShowWeather() {
    if(this.typeOfForm =='city') {
      localStorage.setItem('cityLocalyStored', JSON.stringify(this.cityFormValue));
      }

    if(this.typeOfForm =='coord') {
      localStorage.setItem('SessionLat', JSON.stringify(this.latFormValue));
      localStorage.setItem('SessionLon', JSON.stringify(this.lonFormValue));;
      }

    this.formResearch = false
  }

  loadData() {
    if(this.typeOfForm =='city') {
      let cityLocalyStored: string | null;
      cityLocalyStored = localStorage.getItem('cityLocalyStored');
      if (cityLocalyStored) {
        this.sessionCityName = JSON.parse(cityLocalyStored);
      }
    }

    if(this.typeOfForm =='coord') {
      let latLocalyStored: string | null;
      let lonLocalyStored: string | null;

      latLocalyStored = localStorage.getItem('SessionLat');
      lonLocalyStored = localStorage.getItem('SessionLon');
      if (latLocalyStored){
        this.sessionLat = JSON.parse(latLocalyStored);
      }
      if (lonLocalyStored){
        this.sessionLon = JSON.parse(lonLocalyStored);
      }
    }
  }

  onNewResearch(stateOfResearch: boolean){
    this.formResearch = stateOfResearch
  }

}
