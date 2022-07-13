/* WEATHER SERVICE */

/* Import the application components and services */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  API_FORECAST_URL,
  API_WEATHER_URL,
  constructWeatherFromApiData,
  CurrentWeather,
  Forecast, ForecastDto, ForecastFetch,
  WeatherApiResponse,
  WeatherUnit
} from '../models';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  /* Initialization of variables */
  apiReponseData: any;
  dataForcasted: ForecastFetch[] = [];
  answer: any;

  apiKey = '8a2870746354b988e645d9ae3f604075'

  constructor(private http:HttpClient) { }

  /* Different requests to the OpenWeatherMap API with the Langage, the Unit, the City Name or the Lagitude and the Longitude as parameters
  These functions are asynchronous so that there are no errors while the request is being made
  I Used the fetch method to make these calls */

  /* FETCH METHODS */
  async CoordWeather(lat: string, lon: string, unit: string, lang: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=8a2870746354b988e645d9ae3f604075&unit=${unit}`)
      .then(response => response.json())
      .then(data => this.setWeatherData(data))
      .catch(error => console.log(error))
  }

  /* Request for the Current Weather (City) */
  async CityWeather(city: string, unit: string, lang: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a2870746354b988e645d9ae3f604075&unit=${unit}&lang=${lang}`)
      .then(response => response.json())
      .then(data => this.setWeatherData(data))
      .catch(error => console.log(error))
  }

  /* Even though the unit passed during the request, the API did not seem to return the temperatures with the correct unit. I had to convert them */
  setWeatherData(data: any) {
    this.apiReponseData = data;
    this.apiReponseData.temp_celcius = (this.apiReponseData.main.temp - 273).toFixed(0);
    this.apiReponseData.temp_imperial = ((this.apiReponseData.temp_celcius) * 9 / 5 + 32).toFixed(0);
    return this.apiReponseData;
  }

  /* Request for the Weather Forecast (City) */
  async CityForecast(city: string, unit: string, lang: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?&lang=${lang}&units=${unit}&q=${city}&appid=8a2870746354b988e645d9ae3f604075`)
      .then(response => response.json())
      .then(data => this.setForecastData(data))
      .catch(error => console.log(error))
  }

  /* Request for the Weather Forecast (Coordinates) */
  async CoordForecast(lat: string, lon: any, unit: WeatherUnit, lang: string) {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}&units=${unit}&appid=8a2870746354b988e645d9ae3f604075`)
      .then(response => response.json())
      .then(data => this.setForecastData(data))
      .catch(error => console.log(error))
  }

  /* Set Functions allow to define the data which will be used */
  setForecastData(data: any) {
    this.apiReponseData = data;
    for (let i = 0; i <= (this.apiReponseData.list.length) - 1; i += 8) {
      const temporary = new ForecastFetch(this.apiReponseData.list[i].dt_txt,
        this.apiReponseData.list[i].weather[0].icon,
        this.apiReponseData.list[i].main.temp_max,
        this.apiReponseData.list[i].main.temp_min)
      this.dataForcasted.push(temporary);
    }
    return this.dataForcasted
  }

  async Fetch() {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=8a2870746354b988e645d9ae3f604075`)
      .then(response => {
        this.answer = response.ok
        return this.answer
      })
  }

  /***** Angular HttpClientModule for API calls *****/
  getWeatherByLocation(lat:number, lon:number, units: WeatherUnit, lang:string):Observable<CurrentWeather>{
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('appid', this.apiKey)
    .set('units', units)
    .set('lang', lang)
    return this.http.get<WeatherApiResponse>(API_WEATHER_URL, {params})
    .pipe(
      map(response => constructWeatherFromApiData(response, lang, units))
      )
  }

  getWeatherCityApi(city: string, unit: WeatherUnit, lang: string):Observable<CurrentWeather>{
    let params = new HttpParams()
      .set('q', city)
      .set('unit', unit)
      .set('lang', lang)
      .set('appid', this.apiKey)
    return this.http.get<WeatherApiResponse>(API_WEATHER_URL, {params})
      .pipe(
        map(response => constructWeatherFromApiData(response, lang, unit))
      )
  }

  getForecastCityApi(city:string, units: WeatherUnit, lang:string):Observable<Forecast>{
    let params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', units)
      .set('lang', lang)
    return this.http.get<ForecastDto>(API_FORECAST_URL, {params})
      .pipe(
        map(response => new Forecast(response, lang, units))
      )
  }

  getWeatherCoordApi(lat: string, lon:string, unit: WeatherUnit, lang: string):Observable<CurrentWeather>{
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('unit', unit)
      .set('lang', lang)
      .set('appid', this.apiKey)
    return this.http.get<WeatherApiResponse>(API_WEATHER_URL, {params})
      .pipe(
        map(response => constructWeatherFromApiData(response, lang, unit))
      )
  }

  getForecastCoordApi(lat: string, lon:string, units: WeatherUnit, lang:string):Observable<Forecast>{
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKey)
      .set('units', units)
      .set('lang', lang)
    return this.http.get<ForecastDto>(API_FORECAST_URL, {params})
      .pipe(
        map(response => new Forecast(response, lang, units))
      )
  }



}




