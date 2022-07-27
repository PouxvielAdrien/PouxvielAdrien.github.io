export type WeatherUnit = 'metric' | 'imperial' | ''

export enum TYPE_OF_FORM {
  CITY,
  COORD,
  LOCATION,
  FAVORITE
}
export const MAX_FAVORITE_CITY = 5
export const MIN_FAVORITE_CITY = 1
export const API_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'
export const API_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

