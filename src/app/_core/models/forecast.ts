import {WeatherUnit} from "@core/models/global";
import {Weather} from "@core/models/weather";
import {ForecastDto} from "@core/models/dtos";

export class Forecast {

  weathers : Weather[]= [];


  constructor(forecastDto: ForecastDto,
               lang:string="en",
               unit:WeatherUnit="metric"){


   /** list.dt_txt -> dates of type Date. Return dates **/
   const dates = forecastDto.list.map(e=>{
     return new Date(e.dt_txt)
   })

    const uniqueDates:Date[] = []

    /** sort the dates to get only unique dates (6) **/
    dates.forEach(d=>{
      if(!uniqueDates.some(uD=>uD.getFullYear()===d.getFullYear()&&uD.getMonth()===d.getMonth()&&uD.getDate()===d.getDate())){
        // add element
        uniqueDates.push(d)
      }
    })

    /** 6 unique dates **/
    //console.log("UNIQUE DATES :",uniqueDates);
    uniqueDates.forEach(uD=>{
      const weathersDataForDate = forecastDto.list.filter(e => {
        const date = new Date (e.dt_txt)
        return date.getDate() == uD.getDate()
      })
       /** weatherData for each Day **/
       //console.log("weathersForDate",weathersDataForDate)

      /** Keep only tempMin and tempMax for each day **/
        const  tempMin=weathersDataForDate.reduce((wfd1, wfd2)=>{
        if(wfd1.main.temp_min <= wfd2.main.temp_min){
          return wfd1
        }
        else{
          return wfd2
        }
        }).main.temp_min

      const tempMax=weathersDataForDate.reduce((wfd1, wfd2)=>{
        if(wfd1.main.temp_min <= wfd2.main.temp_min){
          return wfd2
        }
        else{
          return wfd1
        }
      }).main.temp_min


        // console.log("tempMin : ", tempMin)
        // console.log("tempMax : ", tempMax)
        //TODO put tempMin and Max in an object that will be put in an array (1 Day per object)
        weathersDataForDate[0].main.temp_min = tempMin
        weathersDataForDate[0].main.temp_max = tempMax
        // console.log("weathersDataForDate[0]",weathersDataForDate[0])

        this.weathers.push(new Weather(weathersDataForDate[0]))
        // console.log("sixDaysWeatherData",this.sixDaysWeatherData)
        // console.log("First Day temp Min",this.sixDaysWeatherData[0].main.temp_min)

    })
    //console.log("WEATHERS",this.weathers)
  }
}


