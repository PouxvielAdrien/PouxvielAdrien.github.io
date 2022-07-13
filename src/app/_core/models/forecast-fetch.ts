import {WeatherUnit} from "@core/models/global";


export class ForecastFetch {
  constructor(public day:string,
              public icon:string,
              public tempMax:number,
              public tempMin: number,
              public lang:string="en",
              public unit:WeatherUnit="metric"){}
}
