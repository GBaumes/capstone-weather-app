import { useWeather } from "../contexts/WeatherContext";
import { useEffect, useState } from "react";

import React from "react";
import WeatherImage from "./WeatherImage";

function processForecastList(list) {
  const forecastInfo = [];

  let currentDate = new Date().toDateString().slice(0, 10);
  let maxHighTemp = Number.MIN_SAFE_INTEGER;
  let minLowTemp = Number.MAX_SAFE_INTEGER;

  list.forEach((item) => {
    let date = new Date(item.dt * 1000).toDateString().slice(0, 10);
    let highTemp = item.main.temp_max;
    let lowTemp = item.main.temp_min;
    if (highTemp > maxHighTemp) {
      maxHighTemp = highTemp;
    }
    if (lowTemp < minLowTemp) {
      minLowTemp = lowTemp;
    }

    const conditionCounts = {};
    list.forEach((item) => {
      let dateCheck = new Date(item.dt * 1000).toDateString().slice(0, 10);
      if (dateCheck === date) {
        const weatherDescription = item.weather[0].main;

        if (conditionCounts[weatherDescription]) {
          conditionCounts[weatherDescription]++;
        } else {
          conditionCounts[weatherDescription] = 1;
        }
      }
    });
    let maxCount = 0;
    let dominantWeatherCondition = null;

    Object.keys(conditionCounts).forEach((condition) => {
      if (conditionCounts[condition] > maxCount) {
        maxCount = conditionCounts[condition];
        dominantWeatherCondition = condition;
      }
    });

    if (date !== currentDate) {
      const dailyForecastInfo = {
        date: date,
        maxTemp: Math.round(maxHighTemp),
        minTemp: Math.round(minLowTemp),
        condition: dominantWeatherCondition,
      };
      forecastInfo.push(dailyForecastInfo);
      currentDate = date;
      maxHighTemp = Number.MIN_SAFE_INTEGER;
      minLowTemp = Number.MAX_SAFE_INTEGER;
    }
  });

  return forecastInfo;
}

const Forecast = () => {
  const { weatherData, units } = useWeather();

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const getForecastData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiForecastURL = process.env.REACT_APP_API_FORECAST;

      try {
        const response = await fetch(
          apiForecastURL +
            `lat=${weatherData?.coord.lat}&lon=${weatherData?.coord.lon}&units=${units}&appid=${apiKey}` // Use the ? to check if it is null
        );
        const json = await response.json();

        if (!response.ok) {
          console.log("Error fetching forecast");
        }
        if (response.ok) {
          const list = json.list;
          const forecastArray = processForecastList(list);
          setForecast(forecastArray);
        }
      } catch (error) {
        console.log("Error caught fetching forecast: ", error);
      }
    };
    if (weatherData !== null) {
      getForecastData();
    }
  }, [units, weatherData]);

  if (weatherData !== null && forecast.length > 0) {
    return (
      <div className="container">
        <div className="display-5 text-center pb-2">5-Day Forecast</div>
        <div className="row justify-content-center">
          {forecast.map((day) => (
            <div key={day.date} className="col-12 col-lg-2">
              <div className="card text-center mb-4 border-0">
                <div className="card-body">
                  <strong className="card-title">{day.date}</strong>
                  {units === "imperial" ? (
                    <>
                      <p className="card-text">
                        <strong>High: </strong> {day.maxTemp}&deg;F
                        <br />
                        <strong>Low: </strong> {day.minTemp}&deg;F
                        <br />
                        {day.condition}
                        <br />
                        <WeatherImage condition={day.condition} />
                      </p>
                    </>
                  ) : (
                    units === "metric" && (
                      <>
                        <p className="card-text">
                          <strong>High: </strong> {day.maxTemp}&deg;C
                          <br />
                          <strong>Low: </strong> {day.minTemp}&deg;C
                          <br />
                          {day.condition}
                          <br />
                          <WeatherImage condition={day.condition} />
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Forecast;
