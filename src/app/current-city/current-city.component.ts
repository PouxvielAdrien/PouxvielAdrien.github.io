/* CURRENT WEATHER (CITY) COMPONENT */

/* Import the application components and services */
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'
import { CurrentWeather } from '../current-weather';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-current-city',
  templateUrl: './current-city.component.html',
  styleUrls: ['./current-city.component.css']
})
export class CurrentCityComponent implements OnInit {

  /* Initialization of variables */
  weatherForm: any;
  myWeather = new CurrentWeather("", "", "", "")
  city: any;
  Unit: any;
  Lang: any;
  recherche = false;
  session: any;


  constructor(private ws: WeatherService) { }

  ngOnInit(): void {
    this.loadData();
    this.weatherForm = new FormGroup({
      'weatherCity': new FormControl(this.session, [Validators.required, Validators.minLength(4)]),
      'weatherUnit': new FormControl('', [Validators.required]),
      'weatherLang': new FormControl('en')
    });
  }

  /* Asynchronus function which collects the data from the form
  It's asynchronus to make sure the request to the API had the time to be made */
  async ShowCity() {
    this.city = this.weatherForm.value.weatherCity;
    this.Unit = this.weatherForm.value.weatherUnit;
    this.Lang = this.weatherForm.value.weatherLang;
    localStorage.setItem('SessionCC', JSON.stringify(this.city));
    await
      this.ws.CityWeather(this.city, this.Unit, this.Lang);

    /* It is necessary to  to check and create the temperatures in celcius 
    and farenheint because even passing the unit in the call of the API,
    the temperatures are still not in the good unit */
    if (this.Unit == 'metric') {
      this.myWeather = new CurrentWeather(this.ws.Data.name,
        this.ws.Data.temp_celcius,
        this.ws.Data.weather[0].icon,
        this.ws.Data.weather[0].description)
    }

    else {
      this.myWeather = new CurrentWeather(this.ws.Data.name,
        this.ws.Data.temp_imperial,
        this.ws.Data.weather[0].icon,
        this.ws.Data.weather[0].description)
    }
    this.recherche = true;
  }

  /* Function which allows to store in localStorage the last Latitude and Longitude selected by the user */
  loadData() {
    let temporary: any;
    temporary = localStorage.getItem('SessionCC');
    this.session = JSON.parse(temporary);
  }
}
