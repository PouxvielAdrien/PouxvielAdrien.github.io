/* Import the application components and services */
import { Component, OnInit } from '@angular/core';
import { CurrentWeather, WeatherApiResponse, WeatherService, WeatherUnit } from '../_core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Forecast } from '../_core/models/forecast';
import { finalize } from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent {


  currentWeather: CurrentWeather | null = null;
  geoForm: FormGroup;
  locationDenied = true;
  isSearching = false;
  params: HttpParams | null = null;



  constructor(private ws: WeatherService) {
    this.geoForm = new FormGroup({
      geoUnit: new FormControl('metric'),
      geoLang: new FormControl('en')
    });
  }


  get unitFormValue():WeatherUnit{
    return this.geoForm.get("geoUnit")?.value
  }

  get langFormValue():string{
    return this.geoForm.get("geoLang")?.value
  }

  setGeoLocation() {
    if ("geolocation" in navigator) {
      this.isSearching = true;
      navigator.geolocation.getCurrentPosition(
        (succes) => {
          this.ws.getWeatherByLocation(succes.coords.latitude,
            succes.coords.longitude,
             this.unitFormValue,
             this.langFormValue)
             .pipe(
              finalize(()=> this.isSearching = false)
             )
            .subscribe(data => {
              this.currentWeather = data;
            });
          },

        (error) => {
          this.isSearching = false;
          if (error.code == error.PERMISSION_DENIED) {
            this.locationDenied = false;
            //TODO
          }
        })
    }
    this.changingQueryParams()
  }

  onSubmitGeoLocation() {
    this.setGeoLocation();
  }

  changingQueryParams() {
    this.params!
      .set('unit', this.unitFormValue)
      .set('lang', this.langFormValue)
    console.log("query params : ",this.params);
    console.log("GET",this.params!.get("city"));

  }
}
