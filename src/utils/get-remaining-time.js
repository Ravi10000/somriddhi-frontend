export default function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((total / 1000) % 60);
  let minutes = Math.floor((total / 1000 / 60) % 60);
  let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  let days = Math.floor(total / (1000 * 60 * 60 * 24));

  seconds = seconds.toString().length < 2 ? `0${seconds}` : seconds;
  minutes = minutes.toString().length < 2 ? `0${minutes}` : minutes;
  hours = hours.toString().length < 2 ? `0${hours}` : hours;

  hours = hours < 1 ? "00" : hours;
  minutes = minutes < 1 ? "00" : minutes;
  seconds = seconds < 1 ? "00" : seconds;
  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}
