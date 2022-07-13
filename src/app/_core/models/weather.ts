import {WeatherDto} from "@core/models/dtos";

export class Weather {
  tempMin:number | null = null;
  tempMax:number | null = null;
  icon:string|null =null;
  date:Date|null=null;



  constructor(weatherDto:WeatherDto ) {
    this.tempMin = weatherDto.main.temp_min;
    this.tempMax = weatherDto.main.temp_max;
    this.icon = weatherDto.weather[0].icon;
    this.date =  new Date(weatherDto.dt_txt);
  }
}
