import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ContentOfForm, TYPE_OF_FORM, Weather, WeatherUnit} from "@core/models";
import {WeatherService} from "@core/services/weather.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FavoritesCitiesService} from "@core/services/favorites-cities.service";
import {finalize, Subscription} from "rxjs";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  @Input() contentOfForm:ContentOfForm |null=null;
  @Input() favCityPicked:string = "";
  @Input() typeOfForm: TYPE_OF_FORM | null = null;
  @Output() newFormDisplay = new EventEmitter<ContentOfForm>();
  currentWeather: Weather | null = null;
  isSearching = false;
  locationDenied = true;
  queryParamsSubscription: Subscription | null = null;
  sessionFavCityName: string[] =[];
  weathers:Weather[] | null = null;
  readonly TYPE_OF_FORM = TYPE_OF_FORM;


  constructor(private ws: WeatherService,
              private http: HttpClient,
              private router:Router,
              private route:ActivatedRoute,
              protected fc: FavoritesCitiesService) {}

  ngOnInit(): void {
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.CITY: {
        this.isSearching = true;
        localStorage.setItem('cityLocalyStored', JSON.stringify(this.contentOfForm?.weatherCity));
          this.ws.getCurrentWeatherWithCityApi(
            this.contentOfForm?.weatherCity!,
            this.contentOfForm?.weatherUnit!,
            this.contentOfForm?.weatherLang!)
            .pipe(
              finalize(()=> this.isSearching = false)
            )
            .subscribe(data => {
              this.currentWeather = data,
              this.fc.onCheckIfFavCityForColorOfStar(this.fc.favoritesCities, this.currentWeather.cityName!);
            });

          this.ws.getForecastWeatherWithCityApi(
            this.contentOfForm?.weatherCity!,
            this.contentOfForm?.weatherUnit!,
            this.contentOfForm?.weatherLang!)
            .pipe(
              finalize(()=> this.isSearching = false)
            )
            .subscribe(data => {
              this.weathers = data.weathers;
            });

          this.changingQueryParams();
        break;
      }

      case TYPE_OF_FORM.COORD: {
        this.isSearching = true;
        localStorage.setItem('SessionLat', JSON.stringify(this.contentOfForm?.weatherLat!));
        localStorage.setItem('SessionLon', JSON.stringify(this.contentOfForm?.weatherLon!));
          this.ws.getCurrentWeatherWithCoordApi(
            this.contentOfForm?.weatherLat!,
            this.contentOfForm?.weatherLon!,
            this.contentOfForm?.weatherUnit!,
            this.contentOfForm?.weatherLang!)
            .pipe(
              finalize(()=> this.isSearching = false)
            )
            .subscribe(data => {
              this.currentWeather = data,
                this.fc.onCheckIfFavCityForColorOfStar(this.fc.favoritesCities, this.currentWeather.cityName!);
            });

          this.ws.getForecastWithCoordApi(
            this.contentOfForm?.weatherLat!,
            this.contentOfForm?.weatherLon!,
            this.contentOfForm?.weatherUnit!,
            this.contentOfForm?.weatherLang!)
            .pipe(
              finalize(()=> this.isSearching = false)
            )
            .subscribe(data => {
              this.weathers = data;
            });
          this.changingQueryParams();
        break;
      }

      case TYPE_OF_FORM.LOCATION: {
        if ("geolocation" in navigator) {
          this.isSearching = true;
          navigator.geolocation.getCurrentPosition(
            (succes) => {
              this.ws.getWeatherByLocation(succes.coords.latitude,
                succes.coords.longitude,
                this.contentOfForm!.weatherUnit,
                this.contentOfForm!.weatherLang)
                .pipe(
                  finalize(()=> this.isSearching = false)
                )
                .subscribe(data => {
                  this.currentWeather = data,
                    this.fc.onCheckIfFavCityForColorOfStar(this.fc.favoritesCities, this.currentWeather.cityName!);

                });
            },
            (error) => {
              this.isSearching = false;
              if (error.code == error.PERMISSION_DENIED) {
                this.locationDenied = false;
                //TODO manage errors
              }
            })
        }
        this.changingQueryParams()
        break;
      }

      case TYPE_OF_FORM.FAVORITE: {
        this.isSearching = true;
        this.ws.getCurrentWeatherWithCityApi(
          this.favCityPicked,
          "metric",
          "en")
          .pipe(
            finalize(()=> this.isSearching = false)
          )
          .subscribe(data => {
            this.currentWeather = data,
              this.fc.onCheckIfFavCityForColorOfStar(this.fc.favoritesCities, this.currentWeather.cityName!);
          });

        this.ws.getForecastWeatherWithCityApi(
          this.favCityPicked,
          "metric",
          "en")
          .pipe(
            finalize(()=> this.isSearching = false)
          )
          .subscribe(data => {
            this.weathers = data.weathers;
          });
        break;
      }
    }
  }

  ngOnDestroy(): void{
    this.queryParamsSubscription?.unsubscribe();
  }

  onSaveCities(){
    this.fc.onSaveCities(this.fc.favoritesCities, this.currentWeather!.cityName!)
    this.fc.onCheckIfFavCityForColorOfStar(this.fc.favoritesCities, this.currentWeather!.cityName!)
  }

  onNewResearch(){
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.CITY: {
        this.contentOfForm!.weatherCity = "";
        break;
      }
      case TYPE_OF_FORM.COORD: {
        this.contentOfForm!.weatherLat = "";
        this.contentOfForm!.weatherLon = "";
        break;
      }

      case TYPE_OF_FORM.LOCATION: {
        this.contentOfForm!.weatherUnit = "";
        this.contentOfForm!.weatherLang = "";
        break;

      }
    }
    this.newFormDisplay.emit(this.contentOfForm!)
  }

  changingQueryParams() {
    switch(this.typeOfForm) {
      case TYPE_OF_FORM.CITY: {
        this.router.navigate(
          [],
          {queryParams:{
              city: this.contentOfForm?.weatherCity,
              unit: this.contentOfForm?.weatherUnit,
              lang: this.contentOfForm?.weatherLang},
            relativeTo: this.route});
        break;
      }

      case TYPE_OF_FORM.COORD: {
        this.router.navigate(
          [],
          {queryParams:{
              lat: this.contentOfForm?.weatherLat,
              lon: this.contentOfForm?.weatherLon,
              unit: this.contentOfForm?.weatherUnit,
              lang: this.contentOfForm?.weatherLang},
            relativeTo: this.route});
        break;
      }
      case TYPE_OF_FORM.LOCATION: {
        this.router.navigate(
          [],
          {queryParams:{
              unit: this.contentOfForm?.weatherUnit,
              lang: this.contentOfForm?.weatherLang},
            relativeTo: this.route});
        break;
      }
    }
  }
}
