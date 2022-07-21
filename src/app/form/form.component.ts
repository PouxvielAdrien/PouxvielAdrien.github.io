import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContentOfForm, TYPE_OF_FORM, WeatherUnit} from "@core/models";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  @Input() typeOfForm: TYPE_OF_FORM = TYPE_OF_FORM.CITY;
  @Output() submittedResults = new EventEmitter<ContentOfForm>();
  formResearch = true;
  queryParamsSubscription: Subscription | null = null;
  sessionCityName: string = "";
  sessionLat: number | null =null;
  sessionLon: number | null =null;
  weatherForm: FormGroup|null = null;



  readonly TYPE_OF_FORM = TYPE_OF_FORM

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.CITY: {
        this.weatherForm = new FormGroup({
          weatherCity: new FormControl("", [Validators.required]),
          weatherUnit: new FormControl('metric'),
          weatherLang: new FormControl('en')
        });
        this.loadData();
        this.queryParamsSubscription = this.route.queryParamMap
          .subscribe(params => {
            const city = params.get('city');
            const lang = params.get('lang');
            const unit = params.get('unit');
            if (city && unit && lang){
              this.weatherForm!.setValue({weatherCity: city, weatherUnit: unit, weatherLang: lang })
            }
            else{
              this.weatherForm!.setValue({weatherCity: this.sessionCityName, weatherUnit: "metric", weatherLang: "en" })
            }
          });
        break;
      }

      case TYPE_OF_FORM.COORD: {
        this.weatherForm = new FormGroup({
          weatherLat: new FormControl("", [Validators.required]),
          weatherLon: new FormControl("", [Validators.required]),
          weatherUnit: new FormControl('metric'),
          weatherLang: new FormControl('en')
        });
        this.loadData();
        this.queryParamsSubscription = this.route.queryParamMap
          .subscribe(params => {
            const lat = params.get('lat');
            const lon = params.get('lon');
            if (lat && lon){
              this.weatherForm!.setValue({weatherLat: lat, weatherLon: lon, weatherUnit: "metric", weatherLang: "en" })
            }
            else{
              this.weatherForm!.setValue({weatherLat: this.sessionLat, weatherLon: this.sessionLon, weatherUnit: "metric", weatherLang: "en" })
            }
          });
        break;
      }

      case TYPE_OF_FORM.LOCATION: {
        this.weatherForm = new FormGroup({
          weatherUnit: new FormControl('metric'),
          weatherLang: new FormControl('en')
        });
        break;
      }
    }
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }

  get cityFormValue():string{
    return this.weatherForm!.get("weatherCity")?.value
  }

  get latFormValue():string{
    return this.weatherForm!.get("weatherLat")?.value
  }

  get lonFormValue():string{
    return this.weatherForm!.get("weatherLon")?.value
  }

  get unitFormValue():WeatherUnit{
    return this.weatherForm!.get("weatherUnit")?.value
  }

  get langFormValue():string{
    return this.weatherForm!.get("weatherLang")?.value
  }

  onShowWeather() {
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.CITY: {
        localStorage.setItem('cityLocalyStored', JSON.stringify(this.cityFormValue));
        break;
      }

      case TYPE_OF_FORM.COORD: {
        localStorage.setItem('SessionLat', JSON.stringify(this.latFormValue));
        localStorage.setItem('SessionLon', JSON.stringify(this.lonFormValue));;
        break;
      }
    }
    this.submittedResults.emit(this.weatherForm?.value);
  }

  loadData() {
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.CITY: {
        let cityLocalyStored: string | null;
        cityLocalyStored = localStorage.getItem('cityLocalyStored');
        if (cityLocalyStored) {
          this.sessionCityName = JSON.parse(cityLocalyStored);
        }
        break;
      }

      case TYPE_OF_FORM.COORD: {
        let latLocalyStored: string | null;
        let lonLocalyStored: string | null;
        latLocalyStored = localStorage.getItem('SessionLat');
        lonLocalyStored = localStorage.getItem('SessionLon');
        if (latLocalyStored){
          this.sessionLat = JSON.parse(latLocalyStored);
        }
        if (lonLocalyStored){
          this.sessionLon = JSON.parse(lonLocalyStored);
        }
        break;
      }
    }
  }

  onNewResearch(stateOfResearch: boolean){
    this.formResearch = stateOfResearch
  }


}
