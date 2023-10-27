# How to run this application on my local machine?

  ### 1. Fork & Clone the repository
  ```
  git clone https://github.com/<YourUserName>/catWeather.git
  ```

  ### 2. Install the dependencies
  ```
  cd catWeather
  ```
  ```
  bun install
  ```

  ### 4. Set up the env
  - Now you need to things to run the program i.e. the API key and the Geolocation Coordinates. 
  - First rname the `example.env` file to `.env`
  - Now go to [OpenWeatherMap.org](https://openweathermap.org/) and get your API keys and past them int `.env` in front of the `API_KEY=`
  - Next, we need the coordinates of your location. You can find the coordinates of your location from [LatLong.net](https://latlong.net) and past them in the `.env` file accordingly.

### Start the service
Now to start the application 
```
bun run dev
```