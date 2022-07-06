/* Import the application components and services */
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../_core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Forecast } from '../_core/models/forecast';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {
  Lat: any;
  Lon: any;
  Unit: any;
  Lang: any;

  geoForm: any;
  geoData: any;
  geoCityName: any;
  geoTemp: any;
  geoIcon: any;
  geoKind: any;

  locationDenied = true;
  recherche = false;



  constructor(private ws: WeatherService) { }

  ngOnInit(): void {
    this.geoForm = new FormGroup({
      geoUnit: new FormControl('metric'),
      geoLang: new FormControl('fr')
    });
    this.Unit = this.geoForm.value.geoUnit;
    this.Lang = this.geoForm.value.geoLang;
    this.SetGeoLocation();

  }

  SetGeoLocation() {
    if ("geolocation" in navigator) {
      this.Unit = this.geoForm.value.geoUnit;
      this.Lang = this.geoForm.value.geoLang;
      console.log("Langue: ", this.Lang);
      navigator.geolocation.watchPosition(
        (succes) => {
          this.Lat = succes.coords.latitude;
          this.Lon = succes.coords.longitude;
          this.ws.getWeatherByLocation(this.Lat, this.Lon, this.Unit, this.Lang)
            .subscribe(data => {
              this.geoData = data;
            });

            return this.geoData
          },

        (error) => {
          if (error.code == error.PERMISSION_DENIED) {
            this.locationDenied = false;
          }
        })
    }
    
  }

  SubmitGeoLocation() {
    this.SetGeoLocation();
    if (this.Unit == 'metric') {
      this.geoTemp = this.geoData.main.temp.toFixed(0);
    }

    else {
      this.geoTemp = ((this.geoData.main.temp) * 9 / 5 + 32).toFixed(0);
    }

    this.geoCityName = this.geoData.name;
    this.geoIcon = this.geoData.weather[0].icon;
    this.geoKind = this.geoData.weather[0].description;
    console.log("geoData : ", this.geoData);
    this.recherche = true;
  }

}
