import {WeatherUnit} from "@core/models/global";
import {ForecastApiResponse} from "@core/models/weather-api-response";


export class Forecast {
    constructor(public day:string,
                public icon:string,
                public tempMax:number,
                public tempMin: number,
                public lang:string="en",
                public unit:WeatherUnit="metric"){}
    }

/* export const constructForecastFromApiData = (data:ForecastApiResponse, lang:string, unit:WeatherUnit):Forecast => {
  for (let i = 0; i <= (data.list.length) - 1; i += 8) {
    const temporary = new Forecast(
      data.list[i].dt_txt,
      data.list[i].weather[0].icon,
      data.list[i].main.temp_max,
      data.list[i].main.temp_min)
    //Forecast[].push(temporary);

    //return Forecast[]
}
  */

