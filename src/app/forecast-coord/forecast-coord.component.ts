/* WEATHER FORECAST (COORDINATES) COMPONENT */

/* Import the application components and services */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../_core/services/weather.service'
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Forecast } from '../_core/models/forecast';
import { ForecastFetch } from '../_core/models/forecast-fetch';
import { CurrentWeather } from '../_core/models/current-weather';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Weather, WeatherUnit} from "@core/models";
import {finalize, Subscription} from "rxjs";

@Component({
  selector: 'app-forecast-coord',
  templateUrl: './forecast-coord.component.html',
  styleUrls: ['./forecast-coord.component.css']
})
export class ForecastCoordComponent implements OnInit, OnDestroy {

  /* Initialization of variables */
  //DataFor: ForecastFetch[] = [];
  forecastForm: FormGroup;
  isSearching = false;

  sessionLat: number = 0;
  sessionLon: number = 0;

  //myWeather = new CurrentWeather("", 0,0,0,"", "");

  currentWeather: CurrentWeather | null = null;
  weathers:Weather[] | null = null;
  params: HttpParams | null = null;
  private queryParamsSubscription: Subscription | null = null;

  constructor(private ws:WeatherService, private http: HttpClient, private router:Router, private route:ActivatedRoute) {
    this.forecastForm = new FormGroup({
      forecastLat: new FormControl("", [Validators.required]),
      forecastLon: new FormControl("", [Validators.required]),
      forecastUnit: new FormControl('metric'),
      forecastLang: new FormControl('en')})
  }


  ngOnInit(): void {
    this.loadData();
    this.queryParamsSubscription = this.route.queryParamMap
      .subscribe(params => {
        console.log("queryparams", params);
        const lat = params.get('lat');
        const lon = params.get('lon');
        if (lat && lon){
          console.log("QUERRY PARAMS")
          this.forecastForm.setValue({forecastLat: lat, forecastLon: lon, forecastUnit: "metric", forecastLang: "en" })
        }
        else{
          console.log("NO QUERRY PARAMS")
          this.forecastForm.setValue({forecastLat: this.sessionLat, forecastLon: this.sessionLon, forecastUnit: "metric", forecastLang: "en" })
        }
      });
  }

  ngOnDestroy(): void{
    this.queryParamsSubscription?.unsubscribe();
  }

  get latFormValue():string{
    return this.forecastForm.get("forecastLat")?.value
  }
  get lonFormValue():string{
    return this.forecastForm.get("forecastLon")?.value
  }

  get unitFormValue():WeatherUnit{
    return this.forecastForm.get("forecastUnit")?.value
  }

  get langFormValue():string{
    return this.forecastForm.get("forecastLang")?.value
  }

  ShowForecast(){
    // this.DataFor.splice(0,this.DataFor.length);
    this.isSearching = true;
    localStorage.setItem('SessionLat', JSON.stringify(this.latFormValue));
    localStorage.setItem('SessionLon', JSON.stringify(this.lonFormValue));

    // await this.ws.CoordForecast(this.lat,this.lon, this.Unit, this.Lang);
    // this.DataFor = this.ws.dataForcasted;
    // await this.ws.CoordWeather(this.lat, this.lon, this.Unit, this.Lang);

  this.ws.getWeatherCoordApi(
    this.latFormValue,
    this.lonFormValue,
    this.unitFormValue,
    this.langFormValue)
    .pipe(
      finalize(()=> this.isSearching = false)
    )
    .subscribe(data => {
      this.currentWeather = data;
      console.log("DATA Current Weather", data)
      if(this.unitFormValue == 'imperial'){
        this.currentWeather.temp = ((this.currentWeather.temp - 273)* 9/5 + 32);
      }
      else{
        this.currentWeather.temp = this.currentWeather.temp - 273;
      }
      console.log("this.currentWeather:", this.currentWeather);
    });


    this.ws.getForecastCoordApi(
      this.latFormValue,
      this.lonFormValue,
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

  changingQueryParams() {
    this.router.navigate(
      [],
      {queryParams:{
          lat: this.latFormValue,
          lon: this.lonFormValue,
          unit: this.unitFormValue,
          lang: this.langFormValue},
        relativeTo: this.route});
  }
}
