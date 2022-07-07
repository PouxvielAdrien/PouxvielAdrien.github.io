/* APP-ROUTING */

/* Import the application components and modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentCityComponent } from './current-city/current-city.component';
import { ForecastCoordComponent } from './forecast-coord/forecast-coord.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GeolocationComponent } from './geolocation/geolocation.component';

/* Routes definition and export */
const WeatherRouting: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'City' },
  { path: 'Geolocation', component: GeolocationComponent },
  { path: 'City', component: CurrentCityComponent },
  { path: 'Coord', component: ForecastCoordComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(WeatherRouting)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


