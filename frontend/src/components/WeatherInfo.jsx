import React from "react";
import { useWeather } from "../contexts/WeatherContext";
import WeatherImage from "./WeatherImage";

const getLocalTime = (time, timezone) => {
  const date = new Date((time + timezone) * 1000);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const amOrpm = hours >= 12 ? "PM" : "AM";

  const hours12 = hours % 12 || 12; // handle midnight 0 as 12

  const formattedTime = `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${amOrpm}`;

  return formattedTime;
};

const WeatherInfo = () => {
  const { weatherData, units } = useWeather();

  return (
    <div className="container">
      {units === "imperial" && weatherData ? (
        <>
          <div className="row justify-content-center align-items-center">
            <div className="col-6 text-end">
              <h1>{Math.round(weatherData.main.temp)}&deg;F</h1>
              <p>
                <strong>High: </strong> {Math.round(weatherData.main.temp_max)}
                &deg;F
                <br />
                <strong>Low: </strong> {Math.round(weatherData.main.temp_min)}
                &deg;F
                <br />
                <strong>Condition: </strong> {weatherData.weather[0].main}
              </p>
            </div>
            <div className="col-6 text-start">
              <WeatherImage />
            </div>
          </div>
          <div className="row justify-content-center align-items center">
            <div className="col-sm-6 col-lg-2 text-lg-center text-sm-end text-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/cloud.png"
                alt="cloud"
              />
              <p>
                <strong>Cloud %</strong>
                <br />
                {weatherData.clouds.all}%
              </p>
            </div>
            <div className="col-sm-6 col-lg-2 text-lg-center text-sm-start text-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/96/windsock--v1.png"
                alt="windsock--v1"
              />
              <p>
                <strong>Wind</strong>
                <br />
                {Math.round(weatherData.wind.speed)} mph
              </p>
            </div>
            <div className="col-sm-6 col-lg-2 text-lg-center text-sm-end text-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/96/hygrometer.png"
                alt="hygrometer"
              />
              <p>
                <strong>Humidity</strong>
                <br />
                {weatherData.main.humidity}%
              </p>
            </div>
            <div className="col-sm-6 col-lg-2 text-lg-center text-sm-start text-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/atmospheric-pressure.png"
                alt="atmospheric-pressure"
              />
              <p>
                <strong>Pressure</strong>
                <br />
                {weatherData.main.pressure} hPa
              </p>
            </div>
            <div className="col-sm-6 col-lg-2 text-lg-center text-sm-end text-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/sunrise.png"
                alt="sunrise"
              />
              <p>
                <strong>Sunrise</strong>
                <br />
                {getLocalTime(weatherData.sys.sunrise, weatherData.timezone)}
              </p>
            </div>
            <div className="col-sm-6 col-lg-2 text-lg-center text-sm-start text-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/sunset.png"
                alt="sunset"
              />
              <p>
                <strong>Sunset</strong>
                <br />
                {getLocalTime(weatherData.sys.sunset, weatherData.timezone)}
              </p>
            </div>
          </div>
        </>
      ) : (
        units === "metric" &&
        weatherData && (
          <>
            <div className="row justify-content-center align-items-center">
              <div className="col-6 text-end">
                <h1>{Math.round(weatherData.main.temp)}&deg;C</h1>
                <p>
                  <strong>High: </strong>{" "}
                  {Math.round(weatherData.main.temp_max)}
                  &deg;C
                  <br />
                  <strong>Low: </strong> {Math.round(weatherData.main.temp_min)}
                  &deg;C
                  <br />
                  <strong>Condition: </strong> {weatherData.weather[0].main}
                </p>
              </div>
              <div className="col-6 text-start">
                <WeatherImage />
              </div>
            </div>
            <div className="row justify-content-center align-items center">
              <div className="col-sm-6 col-lg-2 text-lg-center text-sm-end text-center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/cloud.png"
                  alt="cloud"
                />
                <p>
                  <strong>Cloud %</strong>
                  <br />
                  {weatherData.clouds.all}%
                </p>
              </div>
              <div className="col-sm-6 col-lg-2 text-lg-center text-sm-start text-center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/96/windsock--v1.png"
                  alt="windsock--v1"
                />
                <p>
                  <strong>Wind</strong>
                  <br />
                  {Math.round(weatherData.wind.speed)} kph
                </p>
              </div>
              <div className="col-sm-6 col-lg-2 text-lg-center text-sm-end text-center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/96/hygrometer.png"
                  alt="hygrometer"
                />
                <p>
                  <strong>Humidity</strong>
                  <br />
                  {weatherData.main.humidity}%
                </p>
              </div>
              <div className="col-sm-6 col-lg-2 text-lg-center text-sm-start text-center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/atmospheric-pressure.png"
                  alt="atmospheric-pressure"
                />
                <p>
                  <strong>Pressure</strong>
                  <br />
                  {weatherData.main.pressure} hPa
                </p>
              </div>
              <div className="col-sm-6 col-lg-2 text-lg-center text-sm-end text-center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/sunrise.png"
                  alt="sunrise"
                />
                <p>
                  <strong>Sunrise</strong>
                  <br />
                  {getLocalTime(weatherData.sys.sunrise, weatherData.timezone)}
                </p>
              </div>
              <div className="col-sm-6 col-lg-2 text-lg-center text-sm-start text-center">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/sunset.png"
                  alt="sunset"
                />
                <p>
                  <strong>Sunset</strong>
                  <br />
                  {getLocalTime(weatherData.sys.sunset, weatherData.timezone)}
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default WeatherInfo;
