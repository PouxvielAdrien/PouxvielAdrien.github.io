import { WeatherUnit } from "./global";
import { WeatherApiResponse } from "./weather-api-response";

export class CurrentWeather {

    constructor(public cityName:string,
                public temp:number,
                public temp_max:number,
                public temp_min:number,
                public icon:string,
                public weatherKind:string,
                public lang:string="en",
                public unit:WeatherUnit="metric"){}
}




export const constructWeatherFromApiData = (data:WeatherApiResponse, lang:string, unit:WeatherUnit):CurrentWeather => {
    return new CurrentWeather(data.name,data.main.temp,data.main.temp_max, data.main.temp_min, data.weather[0].icon, data.weather[0].description, lang, unit )

}
