/* WEATHER CITY COMPONENT */

/* Import the application components and services */
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../_core/services/weather.service'
import { CurrentWeather } from '../_core/models/current-weather';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Forecast } from '../_core/models/forecast';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {WeatherUnit} from "@core/models";
import {finalize} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-current-city',
  templateUrl: './current-city.component.html',
  styleUrls: ['./current-city.component.css']
})
export class CurrentCityComponent implements OnInit {

  /* Initialization of variables */
  weatherForm: FormGroup;
  currentWeather: CurrentWeather | null = null;
  isSearching = false;
  sessionCityName: string = "";
  dataForcasted: Forecast[] = [];
  unit:string ="";
  lang:string="";
  city:string="";

  params: HttpParams | null = null;


  constructor(private ws: WeatherService, private http: HttpClient, private router:Router, private route:ActivatedRoute) {
    this.weatherForm = new FormGroup({
      weatherCity: new FormControl("", [Validators.required, Validators.minLength(4)]),
      weatherUnit: new FormControl('metric'),
      weatherLang: new FormControl('en')
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.weatherForm.setValue({weatherCity: this.sessionCityName, weatherUnit: "metric", weatherLang: "en" })


    //TODO Initialisation of the city
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
  async showCity() {
    this.isSearching = true;
    this.dataForcasted.splice(0, this.dataForcasted.length);
    localStorage.setItem('SessionCC', JSON.stringify(this.cityFormValue));



    /* old version */
    //await this.ws.CityWeather(this.cityFormValue, this.unitFormValue, this.langFormValue);

    this.ws.callWeatherCityApi(this.cityFormValue,
      this.unitFormValue,
      this.langFormValue)
      .pipe(
      finalize(()=> this.isSearching = false)
      )
      .subscribe(data => {
        this.currentWeather = data;
        if(this.unitFormValue == 'imperial'){
          this.currentWeather.temp = ((this.currentWeather.temp - 273)* 9/5 + 32);
        }
        else{
          this.currentWeather.temp = this.currentWeather.temp - 273;
        }
        console.log("this.currentWeather:", this.currentWeather);
      });

    await this.ws.CityForecast(this.cityFormValue, this.unitFormValue, this.langFormValue)
    this.dataForcasted = this.ws.dataForcasted;
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

  public changingQueryParams() {
    this.router.navigate(
        ['/'],
        {queryParams: {
            city: this.cityFormValue,
            unit: this.unitFormValue,
            lang: this.langFormValue}});
  }
}
