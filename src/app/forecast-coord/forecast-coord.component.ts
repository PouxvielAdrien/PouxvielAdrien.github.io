/* WEATHER FORECAST (COORDINATES) COMPONENT */

/* Import the application components and services */
import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service'
import { FormGroup, FormControl } from '@angular/forms';
import { Forecast } from '../forecast';

@Component({
  selector: 'app-forecast-coord',
  templateUrl: './forecast-coord.component.html',
  styleUrls: ['./forecast-coord.component.css']
})
export class ForecastCoordComponent implements OnInit {

  /* Initialization of variables */
  DataFor: Forecast[] = [];
  forecastForm: any;
  lat:any;
  lon:any;
  Unit:any;
  Lang:any;
  sessionLat:any
  sessionLon:any
 
  constructor(private ws:WeatherService) { }

  ngOnInit(): void {
    this.loadData();
    this.forecastForm = new FormGroup({
      forecastLat: new FormControl(this.sessionLat),
      forecastLon: new FormControl(this.sessionLon),
      forecastUnit: new FormControl(''),
      forecastLang: new FormControl('en')}) 
  }

  /* Asynchronus function which collects the data from the form
  It's asynchronus to make sure the request to the API had the time to be made */
  async ShowForecast(){
    this.DataFor.splice(0,this.DataFor.length);
    this.lat=this.forecastForm.value.forecastLat;
    this.lon=this.forecastForm.value.forecastLon;
    this.Unit=this.forecastForm.value.forecastUnit;
    this.Lang=this.forecastForm.value.forecastLang;
    localStorage.setItem('SessionFCoordLat', JSON.stringify(this.lat));
    localStorage.setItem('SessionFCoordLon', JSON.stringify(this.lon));
    await this.ws.CoordForecast(this.lat,this.lon, this.Unit, this.Lang)
    this.DataFor = this.ws.DataFor;
  }

  /* Function which allows to store in localStorage the last Latitude and Longitude selected by the user */
  loadData(){
    let temporary:any;
    temporary = localStorage.getItem('SessionFCoordLat');
    this.sessionLat = JSON.parse(temporary);
    temporary = localStorage.getItem('SessionFCoordLon');
    this.sessionLon = JSON.parse(temporary);
  }
}
