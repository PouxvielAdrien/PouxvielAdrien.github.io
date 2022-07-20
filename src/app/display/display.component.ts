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
  @Input() unitFromForm:WeatherUnit|null=null;
  @Input() langFromForm = '';
  @Input() displayResearchFromForm :boolean|null=null;
  @Output() newResearchEvent = new EventEmitter<boolean>();

  isSearching = false;
  currentWeather: Weather | null = null;
  weathers:Weather[] | null = null;
  sessionFavCityName: string[] =[];
  public queryParamsSubscription: Subscription | null = null;

  constructor(private ws: WeatherService,
              private http: HttpClient,
              private router:Router,
              private route:ActivatedRoute,
              protected fc: FavoritesCitiesService) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void{
    this.queryParamsSubscription?.unsubscribe();
  }

  onSaveCities(){
    this.fc.onSaveCities(this.fc.favoritesCities, this.cityNameFromForm)
    this.fc.onCheckIfCityIsInList(this.fc.favoritesCities, this.cityNameFromForm)
  }

  onPickFavCity(favoriteCityPicked:string){
    this.fc.onPickFavCity(favoriteCityPicked)
  }

  onNewResearch(){
    this.displayResearchFromForm = true;
    this.newResearchEvent.emit(this.displayResearchFromForm);
  }

  changingQueryParams() {
    this.router.navigate(
      [],
      {queryParams:{
          city: this.cityNameFromForm,
          unit: this.unitFromForm,
          lang: this.langFromForm},
        relativeTo: this.route});
  }
}
