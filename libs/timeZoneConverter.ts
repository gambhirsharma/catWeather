export default function convertTimezoneToUTC(timezone) {
  const sign = (timezone < 0 ? '-' : '+');
  const absTimezone = Math.abs(timezone);
  
  const hours = Math.floor(absTimezone / 3600);
  const minutes = Math.floor((absTimezone % 3600) / 60);

  return `UTC ${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}