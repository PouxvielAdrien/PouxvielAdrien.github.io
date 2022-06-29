/* WEATHER SERVICE */

/* Import the application components and services */
import { Injectable } from '@angular/core';
import { Forecast } from './forecast';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  /* Initialization of variables */
  Data: any;
  DataFor: Forecast[] = [];
  Langage = '';
  Unit = '';
  ok: any;

  constructor() { }

  /* Different requests to the OpenWeatherMap API with the Langage, the Unit, the City Name or the Lagitude and the Longitude as parameters
  These functions are asynchronous so that there are no errors while the request is being made 
  I Used the fetch method to make these calls */

  /* Request for the Current Weather (Coordinates) */
  async CoordWeather(lat: string, lon: string, unit: string, lang: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=8a2870746354b988e645d9ae3f604075&unit=${unit}`)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setWeatherData(data)
          })
        }
        else {
          console.log("ERROR");
          return response.ok
        }
        return
      })
  }

  /* Request for the Current Weather (City) */
  async CityWeather(city: string, unit: string, langage: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a2870746354b988e645d9ae3f604075&unit=${unit}&lang=${langage}`)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setWeatherData(data)
          })
        }
        else {
          console.log("ERROR");
          return response.ok
        }
        return
      })

  }

  /* Request for the Weather Forecast (City) */
  async CityForecast(city: string, unit: string, lang: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?&lang=${lang}&units=${unit}&q=${city}&appid=8a2870746354b988e645d9ae3f604075`)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setForecastData(data)
          })
        }
        else {
          console.log("ERROR");
          return response.ok
        }
        return
      })
  }

  /* Request for the Weather Forecast (Coordinates) */
  async CoordForecast(lat: string, lon: any, unit: string, lang: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}&units=${unit}&appid=8a2870746354b988e645d9ae3f604075`)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setForecastData(data)
          })
        }
        else {
          console.log("ERROR");
          return response.ok
        }
        return
      })
  }

  /* Set Functions allow to define the data which will be used */
  setForecastData(data: any) {
    this.Data = data;
    for (let i = 0; i <= (this.Data.list.length) - 1; i += 8) {
      const temporary = new Forecast(this.Data.list[i].dt_txt,
        this.Data.list[i].weather[0].icon,
        this.Data.list[i].main.temp_max,
        this.Data.list[i].main.temp_min)
      this.DataFor.push(temporary);
    }
    return this.DataFor
  }

  /* Even though the unit passed during the request, the API did not seem to return the temperatures with the correct unit. I had to convert them */
  setWeatherData(data: any) {
    this.Data = data;
    this.Data.temp_celcius = (this.Data.main.temp - 273).toFixed(0);
    this.Data.temp_imperial = ((this.Data.temp_celcius) * 9 / 5 + 32).toFixed(0);
    return this.Data;
  }

  async Fetch() {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=8a2870746354b988e645d9ae3f604075`)
      .then(response => {
        this.ok = response.ok
        return this.ok
      })
  }


}




