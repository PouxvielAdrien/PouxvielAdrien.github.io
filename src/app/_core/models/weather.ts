import {WeatherDto} from "@core/models/dtos";
import {WeatherUnit} from "@core/models/global";

export class Weather {
  tempMin:number | null = null;
  tempMax:number | null = null;
  tempCurrent:number | null = null;
  icon:string|null =null;
  date:Date|null=null;
  cityName:string|null = null;
  description: string | null = null;
  lang:string|null = null;
  unit:WeatherUnit;


  constructor(weatherDto:WeatherDto, defaultCityName:string = "Some Location", unit:WeatherUnit, lang:string) {
    this.tempMin = weatherDto.main.temp_min;
    this.tempMax = weatherDto.main.temp_max;
    this.tempCurrent = weatherDto.main.temp;
    this.icon = weatherDto.weather[0].icon;
    this.date =  new Date(weatherDto.dt_txt);
    this.cityName = weatherDto.name || defaultCityName;
    this.description = weatherDto.weather[0].description;
    this.unit=unit;
    this.lang=lang;
  }

  getDisplayWeatherUnit():'°C' | '°F' | undefined {
    switch (this.unit) {
      case 'imperial': {
        return '°F'
      }
      case 'metric': {
        return '°C'
      }
    }
    return
  }
}
