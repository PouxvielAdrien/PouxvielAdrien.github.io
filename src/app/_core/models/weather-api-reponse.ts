interface WeatherData {
    description:string;
    icon:string;
}



export interface WeatherApiReponse {
    weather:WeatherData[];
    name:string;
    main:{temp:number}

}