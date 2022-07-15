/* WEATHER SERVICE */

/* Import the application components and services */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  API_FORECAST_URL,
  API_WEATHER_URL,
  Forecast, ForecastDto, Weather, WeatherDto,
  WeatherUnit
} from '../models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  apiKey = '8a2870746354b988e645d9ae3f604075'

  constructor(private http:HttpClient) { }

  getWeatherByLocation(lat:number, lon:number, unit: WeatherUnit, lang:string):Observable<Weather>{
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('appid', this.apiKey)
    .set('units', unit)
    .set('lang', lang)
    return this.http.get<WeatherDto>(API_WEATHER_URL, {params})
    .pipe(
      map(response => new Weather(response,'city', unit, lang))
      )
  }

  getCurrentWeatherWithCityApi(city: string, unit: WeatherUnit, lang: string):Observable<Weather>{
    let params = new HttpParams()
      .set('q', city)
      .set('units', unit)
      .set('lang', lang)
      .set('appid', this.apiKey)
    return this.http.get<ForecastDto>(API_FORECAST_URL, {params})
      .pipe(
        map(response => new Forecast(response, lang, unit)),
        map(forecast => forecast.weathers[0])
      )
  }

  getCurrentWeatherWithCoordApi(lat: string, lon:string, unit: WeatherUnit, lang: string):Observable<Weather>{
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', unit)
      .set('lang', lang)
      .set('appid', this.apiKey)
    return this.http.get<ForecastDto>(API_FORECAST_URL, {params})
      .pipe(
        map(response => new Forecast(response, lang, unit)),
        map(forecast => forecast.weathers[0])
      )

  }


  getForecastWeatherWithCityApi(city:string, unit: WeatherUnit, lang:string):Observable<Forecast>{
    let params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', unit)
      .set('lang', lang)
    return this.http.get<ForecastDto>(API_FORECAST_URL, {params})
      .pipe(
        map(response => new Forecast(response, lang, unit))
      )
  }


  getForecastWithCoordApi(lat: string, lon:string, units: WeatherUnit, lang:string):Observable<Weather[]>{
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKey)
      .set('units', units)
      .set('lang', lang)
    return this.http.get<ForecastDto>(API_FORECAST_URL, {params})
      .pipe(
        map(response => new Forecast(response, lang, units)),
        map(forecast => forecast.weathers)
      )

  }
}



