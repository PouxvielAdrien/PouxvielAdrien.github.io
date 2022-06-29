/* CURRENT WEATHER (COORDINATES) COMPONENT */

/* Import the application components and services */
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'
import { CurrentWeather } from '../current-weather';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  /* Initialization of variables */
  myWeather = new CurrentWeather("", "", "", "")
  lat: any;
  lon: any;
  Unit: any;
  Lang: any;
  recherche = false;
  weatherForm: any;
  sessionLat: any
  sessionLon: any

  constructor(private ws: WeatherService) { }

  ngOnInit(): void {
    this.loadData();
    this.weatherForm = new FormGroup({
      weatherLat: new FormControl(this.sessionLat),
      weatherLon: new FormControl(this.sessionLon),
      weatherUnit: new FormControl(''),
      weatherLang: new FormControl('en')
    });
  }

  /* Asynchronus function which collects the data from the form
  It's asynchronus to make sure the request to the API had the time to be made */
  async ShowCoord() {
    this.lat = this.weatherForm.value.weatherLat;
    this.lon = this.weatherForm.value.weatherLon;
    this.Unit = this.weatherForm.value.weatherUnit;
    this.Lang = this.weatherForm.value.weatherLang;
    localStorage.setItem('SessionCCoordLat', JSON.stringify(this.lat));
    localStorage.setItem('SessionCCoordLon', JSON.stringify(this.lon));
    await this.ws.CoordWeather(this.lat, this.lon, this.Unit, this.Lang);

    /* It is necessary to  to check and create the temperatures in celcius 
    and farenheint because even passing the unit in the call of the API,
    the temperatures are still not in the good unit */
    if (this.Unit == 'metric') {
      this.myWeather = new CurrentWeather(this.ws.Data.name,
        this.ws.Data.temp_celcius,
        this.ws.Data.weather[0].icon,
        this.ws.Data.weather[0].description);
    }

    else {
      this.myWeather = new CurrentWeather(this.ws.Data.name,
        this.ws.Data.temp_imperial,
        this.ws.Data.weather[0].icon,
        this.ws.Data.weather[0].description);
    }
    this.recherche = true;
  }

  /* Function which allows to store in localStorage the last Latitude and Longitude selected by the user */
  loadData() {
    let temporary: any;
    temporary = localStorage.getItem('SessionCCoordLat');
    this.sessionLat = JSON.parse(temporary);
    temporary = localStorage.getItem('SessionCCoordLon');
    this.sessionLon = JSON.parse(temporary);
  }
}
