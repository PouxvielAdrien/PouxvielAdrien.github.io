import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Weather, WeatherUnit} from "@core/models";
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
  @Input() cityNameFromForm = '';
  @Input() latFromForm = '';
  @Input() lonFromForm = '';
  @Input() unitFromForm:WeatherUnit|null=null;
  @Input() langFromForm = '';
  @Input() displayResearchFromForm :boolean|null=null;
  @Output() newResearchEvent = new EventEmitter<boolean>();
  @Input() typeOfForm = '';

  isSearching = false;
  currentWeather: Weather | null = null;
  weathers:Weather[] | null = null;
  sessionFavCityName: string[] =[];
  public queryParamsSubscription: Subscription | null = null;
  locationDenied = true;

  constructor(private ws: WeatherService,
              private http: HttpClient,
              private router:Router,
              private route:ActivatedRoute,
              protected fc: FavoritesCitiesService) {}

  ngOnInit(): void {
    if(this.typeOfForm =='city'){
      this.isSearching = true;
      localStorage.setItem('cityLocalyStored', JSON.stringify(this.cityNameFromForm));
      if(!this.displayResearchFromForm){
        this.ws.getCurrentWeatherWithCityApi(this.cityNameFromForm,
          this.unitFromForm!,
          this.langFromForm)
          .pipe(
            finalize(()=> this.isSearching = false)
          )
          .subscribe(data => {
            this.currentWeather = data;
          });

        this.ws.getForecastWeatherWithCityApi(
          this.cityNameFromForm,
          this.unitFromForm!,
          this.langFromForm)
          .pipe(
            finalize(()=> this.isSearching = false)
          )
          .subscribe(data => {
            this.weathers = data.weathers;});

        this.changingQueryParams();
        this.displayResearchFromForm = false;
        this.fc.onCheckIfCityIsInList(this.fc.favoritesCities, this.cityNameFromForm);
      }
    }

    if(this.typeOfForm =='coord'){
      this.isSearching = true;
      localStorage.setItem('SessionLat', JSON.stringify(this.latFromForm));
      localStorage.setItem('SessionLon', JSON.stringify(this.lonFromForm));
      if(!this.displayResearchFromForm){

        this.ws.getCurrentWeatherWithCoordApi(
          this.latFromForm,
          this.lonFromForm,
          this.unitFromForm!,
          this.langFromForm)
          .pipe(
            finalize(()=> this.isSearching = false)
          )
          .subscribe(data => {
            this.currentWeather = data,
            this.fc.onCheckIfCityIsInList(this.fc.favoritesCities, this.currentWeather.cityName!);
          });

        this.ws.getForecastWithCoordApi(
          this.latFromForm,
          this.lonFromForm,
          this.unitFromForm!,
          this.langFromForm)
          .pipe(
            finalize(()=> this.isSearching = false)
          )
          .subscribe(data => {
            console.log("Data: ", data)
            this.weathers = data;
          });
        this.changingQueryParams()
        this.displayResearchFromForm = false;
      }
    }

    if (this.typeOfForm == 'location'){
      if ("geolocation" in navigator) {
        this.isSearching = true;
        navigator.geolocation.getCurrentPosition(
          (succes) => {
            this.ws.getWeatherByLocation(succes.coords.latitude,
              succes.coords.longitude,
              this.unitFromForm!,
              this.langFromForm)
              .pipe(
                finalize(()=> this.isSearching = false)
              )
              .subscribe(data => {
                this.currentWeather = data,
                this.fc.onCheckIfCityIsInList(this.fc.favoritesCities, this.currentWeather.cityName!);

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
    }
  }

  ngOnDestroy(): void{
    this.queryParamsSubscription?.unsubscribe();
  }

  onSaveCities(){
    this.fc.onSaveCities(this.fc.favoritesCities, this.currentWeather!.cityName!)
    this.fc.onCheckIfCityIsInList(this.fc.favoritesCities, this.currentWeather!.cityName!)
  }

  onPickFavCity(favoriteCityPicked:string){
    this.fc.onPickFavCity(favoriteCityPicked)
  }

  onNewResearch(){
    this.displayResearchFromForm = true;
    this.newResearchEvent.emit(this.displayResearchFromForm);
  }

  changingQueryParams() {
    if(this.typeOfForm =='city'){
      this.router.navigate(
        [],
        {queryParams:{
            city: this.cityNameFromForm,
            unit: this.unitFromForm,
            lang: this.langFromForm},
          relativeTo: this.route});
    }

    if(this.typeOfForm =='coord'){
      this.router.navigate(
        [],
        {queryParams:{
            lat: this.latFromForm,
            lon: this.lonFromForm,
            unit: this.unitFromForm,
            lang: this.langFromForm},
          relativeTo: this.route});
    }

    if(this.typeOfForm =='location'){
      this.router.navigate(
        [],
        {queryParams:{
            unit: this.unitFromForm,
            lang: this.langFromForm},
          relativeTo: this.route});
    }

  }
}
