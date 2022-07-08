interface WeatherData {
    description:string;
    icon:string;
}
interface ListData {
  main:{temp_max:number, temp_min:number}
  weather:WeatherData[];
  dt_txt:string;
}

export interface WeatherApiResponse {
    weather:WeatherData[];
    name:string;
    main:{temp:number, temp_min:number, temp_max:number}
}

export interface ForecastApiResponse {
  list:ListData[];
}
