/*
  Forecast.jsx component - Calls the OpenWeather Forecast API and processes the data
  recieved from the response in the json object, and then renders the forecast to the screen.
*/
import { useWeather } from "../contexts/WeatherContext";
import { useEffect, useState } from "react";

import React from "react";
import WeatherImage from "./WeatherImage";

/*
  processForecastList function - Processes the response from the api call and then
  collects the forecast data as an object for each day and stores it in an array.

  takes in a list of forecast data
*/
function processForecastList(list) {
  // create empty array
  const forecastInfo = [];

  // set currentDate equal to todays date
  // set min and max temps to high infinite number and low infinite number
  // this way when you encountry a lower or higher temp can store inside variable.
  let currentDate = new Date().toDateString().slice(0, 10);
  let maxHighTemp = Number.MIN_SAFE_INTEGER;
  let minLowTemp = Number.MAX_SAFE_INTEGER;

  // loop over each element in the passed list and store corresponding data.
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

    // create empty object
    const conditionCounts = {};

    // nest another loop for each day in the original list and get the max and min temps
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

    // Tally up the number of weather conditions and store the condition with the
    // most tallys gets stored as the daily condition.
    Object.keys(conditionCounts).forEach((condition) => {
      if (conditionCounts[condition] > maxCount) {
        maxCount = conditionCounts[condition];
        dominantWeatherCondition = condition;
      }
    });

    // If the date doesn't equal the current day then store the data in the dailyForecastInfo object
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

// Actualy Forecast component
const Forecast = () => {
  // Context for current data
  const { weatherData, units } = useWeather();

  // forecast array useState hook
  const [forecast, setForecast] = useState([]);

  // Update the forecast when a new weatherData occurs
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
