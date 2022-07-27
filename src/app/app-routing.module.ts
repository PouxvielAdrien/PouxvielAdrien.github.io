/* APP-ROUTING */

/* Import the application components and modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentCityComponent } from './current-city/current-city.component';
import { ForecastCoordComponent } from './forecast-coord/forecast-coord.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import {FavoritesCitiesComponent} from "./favorites-cities/favorites-cities.component";

/* Routes definition and export */
const WeatherRouting: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'city' },
  { path: 'geolocation', component: GeolocationComponent },
  { path: 'city', component: CurrentCityComponent },
  { path: 'coord', component: ForecastCoordComponent },
  { path: 'favorites', component: FavoritesCitiesComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: 'city' },
];

@NgModule({
  imports: [RouterModule.forRoot(WeatherRouting)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


