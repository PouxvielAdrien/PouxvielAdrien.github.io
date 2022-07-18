/* WEATHER CITY COMPONENT */

/* Import the application components and services */
import {Component, OnDestroy, OnInit} from '@angular/core';
import { WeatherService } from '../_core/services/weather.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {HttpClient, HttpParams} from '@angular/common/http';
import {WeatherUnit} from "@core/models";
import {finalize, Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {Weather} from "@core/models";

@Component({
  selector: 'app-current-city',
  templateUrl: './current-city.component.html',
  styleUrls: ['./current-city.component.css']
})
export class CurrentCityComponent implements OnInit, OnDestroy {

  /* Initialization of variables */
  weatherForm: FormGroup;
  isSearching = false;
  sessionCityName: string = "";
  currentWeather: Weather | null = null;
  weathers:Weather[] | null = null;
  private queryParamsSubscription: Subscription | null = null;

  favoriteCities: string[] =[];



  constructor(private ws: WeatherService, private http: HttpClient, private router:Router, private route:ActivatedRoute) {
    this.weatherForm = new FormGroup({
      weatherCity: new FormControl("", [Validators.required, Validators.minLength(4)]),
      weatherUnit: new FormControl('metric'),
      weatherLang: new FormControl('en')
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.queryParamsSubscription = this.route.queryParamMap
      .subscribe(params => {
          //console.log("queryparams", params);
        const city = params.get('city');
        if (city){
          this.weatherForm.setValue({weatherCity: city, weatherUnit: "metric", weatherLang: "en" })
        }
        else{
          this.weatherForm.setValue({weatherCity: this.sessionCityName, weatherUnit: "metric", weatherLang: "en" })
        }
      });
  }

  ngOnDestroy(): void{
    this.queryParamsSubscription?.unsubscribe();
  }

  get cityFormValue():string{
    return this.weatherForm.get("weatherCity")?.value
  }

  get unitFormValue():WeatherUnit{
    return this.weatherForm.get("weatherUnit")?.value
  }

  get langFormValue():string{
    return this.weatherForm.get("weatherLang")?.value
  }

  /* Asynchronus function which collects the data from the form
  It's asynchronus to make sure the request to the API had the time to be made */
  onShowWeather() {
    this.isSearching = true;
    //this.dataForcasted.splice(0, this.dataForcasted.length);
    localStorage.setItem('SessionCC', JSON.stringify(this.cityFormValue));

    /* old version */
    //await this.ws.CityWeather(this.cityFormValue, this.unitFormValue, this.langFormValue);

    this.ws.getCurrentWeatherWithCityApi(this.cityFormValue,
      this.unitFormValue,
      this.langFormValue)
      .pipe(
      finalize(()=> this.isSearching = false)
      )
      .subscribe(data => {
        this.currentWeather = data;

        console.log("this.currentWeather:", this.currentWeather);
      });

    // await this.ws.CityForecast(this.cityFormValue, this.unitFormValue, this.langFormValue)
    // this.dataForcasted = this.ws.dataForcasted;

    this.ws.getForecastWeatherWithCityApi(
      this.cityFormValue,
      this.unitFormValue,
      this.langFormValue)
      .pipe(
        finalize(()=> this.isSearching = false)
      )
      .subscribe(data => {
        console.log("Data: ", data)
        this.weathers = data.weathers;
        console.log("WEATHERS_city_Component", this.weathers)});

    this.changingQueryParams()
   }

  /* Function which allows to store in localStorage the last Latitude and Longitude selected by the user */
  loadData() {
    let cityLocalyStored: string | null;
    cityLocalyStored = localStorage.getItem('SessionCC');
    if (cityLocalyStored){
      this.sessionCityName = JSON.parse(cityLocalyStored);
    }
  }

  changingQueryParams() {
    this.router.navigate(
        [],
        {queryParams:{
            city: this.cityFormValue,
            unit: this.unitFormValue,
            lang: this.langFormValue},
          relativeTo: this.route});
  }

  onSaveCities() {
    console.log("favoriteCities before : ", this.favoriteCities)
    this.favoriteCities?.push(this.cityFormValue);
    console.log("favoriteCities after : ", this.favoriteCities)

    //Todo : if a city is already in the favorite list
  }
}

