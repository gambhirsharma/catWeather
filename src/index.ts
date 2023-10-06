// blessed doesn't support ES6 import/export module :(
const blessed = require("blessed");
import { Command } from "commander";
import chalk from 'chalk';

import { ICON } from "./asciiART.ts";
import {
  convertUnixTimestampTo24Hour,
  convertTimezoneToUTC,
  roundoffTemp,
} from "../libs/converter.ts";

const lat = 27.3549;
const lon = 95.315201;

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Bun.env.API_KEY}&units=metric`
    );
    return await response.json();
  } catch (e) {
    return console.log(`Error in getWeather: ${e}`);
  }
}
let res = await getWeather();

const { main, description,icon } = res.weather[0];
const {
  temp,
  feels_like,
  humidity,
  pressure,
  temp_min,
  temp_max,
  sea_level,
  grnd_level,
} = res.main;
const { country, sunrise, sunset } = res.sys;
const { speed } = res.wind;
const { timezone, name } = res;

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
  content: `${ICON[icon].icon}`,
});

const upperRightText = blessed.text({
  parent: upperRightVerticalSplit,
  top: 1,
  left: 1,
  width: "100%-4",
  height: "100%-2",
  content: `${main}, ${description}\n${roundoffTemp(
    temp
  )} °C\n${speed} m/s \nAir Quality Index: ${sea_level}`,
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
  content: `Feels like: ${roundoffTemp(
    feels_like
  )} °C \nHumidity: ${humidity}% \nAir Pressure: ${pressure} hPa \nMin Temp: ${roundoffTemp(
    temp_min
  )} °C\nMax Temp: ${roundoffTemp(temp_max)} °C`,
});

const lowerRightText = blessed.text({
  parent: lowerRightSplit,
  top: 1,
  left: 1,
  width: "100%-4",
  height: "100%",
  content: `TimeZone: ${convertTimezoneToUTC(
    timezone
  )} \nSun rise: ${convertUnixTimestampTo24Hour(
    sunrise
  )} \nSun set: ${convertUnixTimestampTo24Hour(sunset)} \n${name}, ${country}`,
});

// Handling keypress to exit the program
screen.key(["q", "C-c"], (ch, key) => {
  return process.exit(0);
});

// Render the screen
screen.render();
