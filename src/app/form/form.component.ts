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
  language:string|null = null;


  readonly TYPE_OF_FORM = TYPE_OF_FORM

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.language = $localize `en`;
    console.log(this.language)
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.CITY: {
        this.weatherForm = new FormGroup({
          weatherCity: new FormControl("", [Validators.required]),
          weatherUnit: new FormControl('metric'),
          weatherLang: new FormControl(this.language)
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
              this.weatherForm!.setValue({weatherCity: this.sessionCityName, weatherUnit: "metric", weatherLang: this.language})
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

  getFormControlValue(formControlName:string){
    return this.weatherForm!.get(formControlName)?.value
  }

  get cityFormValue():string{
    return  this.getFormControlValue('weatherCity')

  }

  get latFormValue():string{
    return  this.getFormControlValue('weatherLat')
  }

  get lonFormValue():string{
    return  this.getFormControlValue('weatherLon')
  }

  get unitFormValue():WeatherUnit{
    return  this.getFormControlValue('weatherUnit')
  }

  get langFormValue():string{
    return  this.getFormControlValue('weatherLang')
  }

  onShowWeather() {
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.COORD: {
        localStorage.setItem('SessionLat', JSON.stringify(this.latFormValue));
        localStorage.setItem('SessionLon', JSON.stringify(this.lonFormValue));;
        break;
      }
      default:
      case TYPE_OF_FORM.CITY: {
        localStorage.setItem('cityLocalyStored', JSON.stringify(this.cityFormValue));
        break;
      }
    }
    this.submittedResults.emit(this.weatherForm?.value);
  }

  loadData() {
    switch(this.typeOfForm) {
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

      default:
      case TYPE_OF_FORM.CITY: {
        let cityLocalyStored: string | null;
        cityLocalyStored = localStorage.getItem('cityLocalyStored');
        if (cityLocalyStored) {
          this.sessionCityName = JSON.parse(cityLocalyStored);
        }
        break;
      }

    }
  }

  onNewResearch(stateOfResearch: boolean){
    this.formResearch = stateOfResearch
  }


}
