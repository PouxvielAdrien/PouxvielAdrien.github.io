/* APP-ROUTING */

/* Import the application components and modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CurrentCityComponent } from './current-city/current-city.component';
import { ForecastCoordComponent } from './forecast-coord/forecast-coord.component';
import { NotfoundComponent } from './notfound/notfound.component';

/* Routes definition and export */
const WeatherRouting: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'CurrentCity' },
  { path: 'CurrentCoord', component: CurrentComponent },
  { path: 'ForecastCity', component: ForecastComponent },
  { path: 'CurrentCity', component: CurrentCityComponent },
  { path: 'ForecastCoord', component: ForecastCoordComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(WeatherRouting)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

