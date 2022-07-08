import { WeatherUnit } from "./global";
import { WeatherApiReponse } from "./weather-api-reponse";

export class CurrentWeather {

    constructor(public cityName:string,
                public temp:number,
                public icon:string,
                public weatherKind:string,
                public lang:string="en",
                public unit:WeatherUnit="metric"){}
}




export const constructWeatherFromApiData = (data:WeatherApiReponse, lang:string, unit:WeatherUnit):CurrentWeather => {
    return new CurrentWeather(data.name, data.main.temp_min, data.weather[0].icon, data.weather[0].description, lang, unit )

}
