# WEATHER-APP #

##  Access to the Application  ##
### GitHub Pages ###
You can click on this link to access the application hosted live on GitHub Pages : [Weather-App Link](https://pouxvieladrien.github.io/) 

            https://pouxvieladrien.github.io/
            
### Local Server ###
You can run the command "ng serve" to open the Weather-App on your [localhost](http://localhost:4200/)

## Description of the Project ##
- Description : This is a weather forecast web application hosted in Github Pages which will display the current weather and a weather forecast for a place (city, coordinates) entered by the user.
- Technologies used : Angular, Bootstrap, JSON API : OpenWeatherMap
- Functionalities implemented : 

          - Search by entering the city name or geographic coordinates
          - The results include the current weather in the metric or imperial system as a user's choice, as well as the forecast for up to 5 days ahead 
          - Users can select the language of the results (default English)
             (Note : 5 Days Forecast is the limit of the free OpenWeather API)
          - Displayed information include the appropriate images for the weather provided by www.openweathermap.org
          - If users come back to the app after closing the browser, the app remembers the last city selected


## Running unit and e2e tests ##

That was the most complicated part for me to do because I'm not used with testing. 
I executed some unit tests via Karma. They all succeeded but I think I could have done more, even if I don't really understand what should be tested or not.

I had some issues with e2e tests because of an invalid installed module on my computer that prevents me from running e2e with cypress.
I should have test some scenarios where I will have displayed the weather by passing in various components. I still tried to think of some simple e2e tests : 

     it('e2e are running empty, please implement', () => {
        expect(page);
      });
      
     /* Component that contains a form, a button which is disabled and then enable if some inputs are not empty */
     describe('current-city component', function() {
      it('should contain an input text', function() {
        expect(page.getInput().isPresent()).toBe(true);
      });

       it('should contain a button disabled as default', function() {
        const button = page.getSearchButton();
        expect(button.isPresent()).toBe(true);
        expect(button.getAttribute('disabled')).toBeDefined();
        expect(button.getText()).toEqual('Search');
       });

      it('should get button enable when input is not empty', function() {
        const input = page.getInput();
        const button = page.getSearchButton();
        input.sendKeys('Rome');
        expect(button.getAttribute('disabled')).toBeNull();
       });
       
## Conclusion ##
I think I was able to do the main goals but I will have to look more into the unit and e2e tests.

## Author ##
Adrien Pouxviel
