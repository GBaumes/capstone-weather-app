import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("");

  const setWeather = (data) => {
    setWeatherData(data);
  };

  const setUnitType = (unit) => {
    setUnits(unit);
  };

  return (
    <WeatherContext.Provider
      value={{ weatherData, setWeather, units, setUnitType }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
