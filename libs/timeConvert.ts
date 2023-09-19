// function to convert UNIX timestamp into 24 hr clock
export default function convertUnixTimestampTo24Hour(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
