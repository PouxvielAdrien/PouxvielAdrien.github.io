interface WeatherDataDto {
    description:string;
    icon:string;
}
interface ListDataDto {
  main:{temp_max:number, temp_min:number}
  weather:WeatherDataDto[];
  dt_txt:string;
}

export interface WeatherApiResponse {
    weather:WeatherDataDto[];
    name:string;
    main:{temp:number, temp_min:number, temp_max:number}
}

export interface ForecastDto{
  list:ListDataDto[];
}

// Complete ForecastDto with all Data received
