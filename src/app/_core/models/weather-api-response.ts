export interface WeatherApiResponse {
  weather:{ id:number;
    main:string;
    description:string;
    icon:string;}[];
    name:string;
    main:{temp:number, temp_min:number, temp_max:number}
}





