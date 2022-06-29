# WEATHER-APP #

##  Access to the Application  ##
### GitHub Pages ###
You can click on this link to access the application hosted live on GitHub Pages : [Weather-App Link](https://pouxvieladrien.github.io/) 

            https://pouxvieladrien.github.io/
            
### Local Server ###
You can run the command "ng serve" to open the Weather-App on your [localhost](http://localhost:4200/)

## Description of the Project ##
- Description : This is a weather forecast web application hosted in Github Pages which will display the current weather and a forecast for a place (city, coordinates) entered by the user.
- Technologies used : Angular, Bootstrap, JSON API : OpenWeatherMap
- Functionalities implemented : 

          - Search by entering the city name or geographic coordinates
          - The results include the current weather in the metric or imperial system as a user's choice, as well as the forecast for up to 5 days ahead 
          - Users can select the language of the results (default English)
             (Note : 5 Days Forecast is the limit of the free OpenWeather API)
          - Displayed information include the appropriate images for the weather provided by www.openweathermap.org
          - If users come back to the app after closing the browser, the app remembers the last city selected


## Running unit and e2e tests ##

That was the most complicated part for me to do because I'm not used this testing. 
I executed some unit tests with Karma :


I Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Author ##
Adrien Pouxviel
