import { program } from "commander";
import convertUnixTimestampTo24Hour from "../libs/timeConvert";
import convertTimezoneToUTC from "../libs/timeZoneConverter";
import roundoffTemp from "../libs/roundoffTemp";
// import { blessed } from "blessed";
const blessed = require("blessed");

import { ICON } from "./asciiART.ts";

const lat = 27.3549;
const lon = 95.315201;

const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Bun.env.API_KEY}&units=metric`
);

const res = await response.json();

// right-top
const weatherMain = res.weather[0].main;
const weatherDesc = res.weather[0].description;
const temp = roundoffTemp(res.main.temp);

const windSpeed = res.wind.speed;

const placeName = res.name;
const countryName = res.sys.country;

// left-bottom
const feelLike = roundoffTemp(res.main.feels_like);
const humidity = res.main.humidity;
const airPressure = res.main.pressure;
const minTemp = roundoffTemp(res.main.temp_min);
const maxTemp = roundoffTemp(res.main.temp_max);

// right-bottom
const timeZone = convertTimezoneToUTC(res.timezone);
const sunRise = convertUnixTimestampTo24Hour(res.sys.sunrise);
const sunSet = convertUnixTimestampTo24Hour(res.sys.sunset);
const seaLevel = res.main.sea_level;
const groundLevel = res.main.grnd_level;

// console.log(countryName);

// program
//  .name("Weather CLI")
//  .description("CLI base weather app.")
//  .version('0.0.1')

// program.action
// console.log(`${placeName}, ${countryName}`)

const screen = blessed.screen({
  smartCSR: true,
  title: "My CLI Program",
});

// Create a horizontal split window
const horizontalSplit = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: "50%",
  orientation: "horizontal",
  // border: {
  //   type: 'line',
  // },
});

// Create two vertical split windows within the upper horizontal split window
const upperLeftVerticalSplit = blessed.box({
  parent: horizontalSplit,
  top: 0,
  left: 0,
  width: "40%",
  height: "100%",
  orientation: "vertical",
  // border: {
  //   type: 'line',
  // },
});

const upperRightVerticalSplit = blessed.box({
  parent: horizontalSplit,
  top: 0,
  left: "40%",
  width: "60%",
  height: "100%",
  orientation: "vertical",
  // border: {
  //   type: 'line',
  // },
});

// Create text widgets for each split window
const upperLeftText = blessed.text({
  parent: upperLeftVerticalSplit,
  top: 1,
  left: 1,
  width: "90%-4",
  height: "100%",
  content: `${ICON["10d"].icon}`,
});

const upperRightText = blessed.text({
  parent: upperRightVerticalSplit,
  top: 1,
  left: 1,
  width: "100%-4",
  height: "100%-2",
  content: `${weatherMain}, ${weatherDesc}\n${temp} °C\n${windSpeed} m/s \nAir Quality Index: ${seaLevel}`,
});

// Create two horizontal split windows below the upper horizontal split window
const lowerLeftSplit = blessed.box({
  parent: horizontalSplit,
  top: "50%",
  left: 0,
  width: "50%",
  height: "50%-1",
  orientation: "horizontal",
  // border: {
  //   type: 'line',
  // },
});

const lowerRightSplit = blessed.box({
  parent: horizontalSplit,
  top: "50%",
  left: "50%",
  width: "50%",
  height: "50%-1",
  orientation: "horizontal",
  // border: {
  //   type: 'line',
  // },
});

// Create text widgets for the lower horizontal split windows
const lowerLeftText = blessed.text({
  parent: lowerLeftSplit,
  top: 1,
  left: 1,
  width: "100%-4",
  height: "100%",
  content: `Feels like: ${feelLike} °C \nHumidity: ${humidity}% \nAir Pressure: ${airPressure} hPa \nMin Temp: ${minTemp} °C\nMax Temp: ${maxTemp} °C`,
});

const lowerRightText = blessed.text({
  parent: lowerRightSplit,
  top: 1,
  left: 1,
  width: "100%-4",
  height: "100%",
  content: `TimeZone: ${timeZone} \nSun rise: ${sunRise} \nSun set: ${sunSet} \n${placeName}, ${countryName}`,
});

// Handling keypress to exit the program
screen.key(["q", "C-c"], (ch, key) => {
  return process.exit(0);
});

// Render the screen
screen.render();
