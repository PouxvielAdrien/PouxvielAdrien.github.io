import {WeatherUnit} from "@core/models/global";

export interface ContentOfForm {
  weatherCity?:string;
  weatherLat?:string;
  weatherLon?:string;
  weatherUnit:WeatherUnit;
  weatherLang:string;

}
