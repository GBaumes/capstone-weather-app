const WeatherImage = ({ condition }) => {
  switch (condition) {
    case "Thunderstorm":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/storm--v1.png"
          alt="storm--v1"
        />
      );
    case "Drizzle":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/rain--v1.png"
          alt="rain--v1"
        />
      );
    case "Rain":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/rain--v1.png"
          alt="rain--v1"
        />
      );
    case "Mist":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/rain--v1.png"
          alt="rain--v1"
        />
      );
    case "Snow":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/snow--v1.png"
          alt="snow--v1"
        />
      );
    case "Smoke":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/fog-day--v1.png"
          alt="fog-day--v1"
        />
      );
    case "Haze":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/fog-day--v1.png"
          alt="fog-day--v1"
        />
      );
    case "Squall":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/fog-day--v1.png"
          alt="fog-day--v1"
        />
      );
    case "Fog":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/fog-day--v1.png"
          alt="fog-day--v1"
        />
      );
    case "Dust" || "Sand" || "Ash":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/dust.png"
          alt="dust"
        />
      );
    case "Tornado":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/tornado.png"
          alt="tornado"
        />
      );
    case "Clear":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/sun--v1.png"
          alt="sun--v1"
        />
      );
    case "Clouds":
      return (
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/clouds.png"
          alt="clouds"
        />
      );
    default:
      return null;
  }
};

export default WeatherImage;
