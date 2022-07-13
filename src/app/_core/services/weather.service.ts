/* WEATHER SERVICE */

/* Import the application components and services */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  API_FORECAST_URL,
  API_WEATHER_URL,
  constructWeatherFromApiData,
  CurrentWeather,
  Forecast, ForecastDto,
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
  answer: any;

  apiKey = '8a2870746354b988e645d9ae3f604075'

  constructor(private http:HttpClient) { }

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




