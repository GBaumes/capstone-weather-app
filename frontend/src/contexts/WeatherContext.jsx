import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("");
  const [geoData, setGeoData] = useState(null);

  const setWeather = (data) => {
    setWeatherData(data);
  };

  const setUnitType = (unit) => {
    setUnits(unit);
  };

  const setGeo = (data) => {
    setGeoData(data);
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeather,
        units,
        setUnitType,
        geoData,
        setGeo,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
