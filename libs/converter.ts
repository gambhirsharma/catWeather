// convert times in sec to UTC +/-
export function convertTimezoneToUTC(timezone) {
  const sign = timezone < 0 ? "-" : "+";
  const absTimezone = Math.abs(timezone);

  const hours = Math.floor(absTimezone / 3600);
  const minutes = Math.floor((absTimezone % 3600) / 60);

  return `UTC ${sign}${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

// function to convert UNIX timestamp into 24 hr clock
export function convertUnixTimestampTo24Hour(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

// round off temp
export function roundoffTemp(num) {
  return Math.round(num);
}
