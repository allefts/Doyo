const emojis = {
  cloud: "☁️",
  sun: "☀️",
  night: "🌕",
  rainCloudThunder: "⛈️",
  rainCloud: "🌧️",
  sunCloud: "🌤️",
  snow: "❄️",
  earth: "🌎",
};

const isDay = () => {
  let currTime = new Date().getHours();
  let day = true;

  currTime > 18 ? (day = false) : (day = true);

  return day;
};

export const tempToEmoji = (main) => {
  //Receives a temp main and returns corresponding emoji/icon
  let emoji = "";
  switch (main) {
    case "Clear":
      emoji = isDay() ? emojis.sun : emojis.night;
      break;
    case "Clouds":
      emoji = emojis.cloud;
      break;
    case "Thundestorm":
      emoji = emojis.rainCloudThunder;
      break;
    case "Rain":
      emoji = emojis.rainCloud;
      break;
    case "Drizzle":
      emoji = emojis.rainCloud;
      break;
    case "Snow":
      emoji = emojis.snow;
      break;
    default:
      emoji = emojis.earth;
      break;
  }

  return emoji;
};
