/* WEATHER FORECAST (CITY) COMPONENT */

/* Import the application components and services */
import { Component, OnInit, } from '@angular/core';
import { WeatherService } from '../_core/services/weather.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Forecast } from '../_core/models/forecast';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  /* Initialization of variables */
  DataFor: Forecast[] = [];
  forecastForm: any;
  city: any;
  Unit: any;
  Lang: any;
  session: any;
  recherche = false;

  constructor(private ws: WeatherService) { }

  ngOnInit(): void {
    this.loadData();
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl(this.session, [Validators.required, Validators.minLength(4)]),
      forecastUnit: new FormControl('metric'),
      forecastLang: new FormControl('en')
    });
  }

  /* Asynchronus function which collects the data from the form
  It's asynchronus to make sure the request to the API had the time to be made */
  async ShowForecast() {
    this.DataFor.splice(0, this.DataFor.length);
    this.city = this.forecastForm.value.forecastCity;
    this.Unit = this.forecastForm.value.forecastUnit;
    this.Lang = this.forecastForm.value.forecastLang;
    localStorage.setItem('SessionFCity', JSON.stringify(this.city));
    await this.ws.CityForecast(this.city, this.Unit, this.Lang)
    this.DataFor = this.ws.DataFor;
    this.recherche = true;
  }

  /* Function which allows to store in localStorage the last Latitude and Longitude selected by the user */
  loadData() {
    let temporary: any;
    temporary = localStorage.getItem('SessionFCity');
    this.session = JSON.parse(temporary);
  }
}
