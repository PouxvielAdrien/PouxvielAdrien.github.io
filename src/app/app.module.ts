/* APP-MODULE */

/* Import the application components and modules */
import { NgModule } from '@angular/core';
import{NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import{NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeatherService } from './_core/services/weather.service';
import { CurrentCityComponent } from './current-city/current-city.component';
import { ForecastCoordComponent } from './forecast-coord/forecast-coord.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import {FavoritesCitiesService} from "@core/services/favorites-cities.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentCityComponent,
    ForecastCoordComponent,
    NotfoundComponent,
    GeolocationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    WeatherService,
    FavoritesCitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
