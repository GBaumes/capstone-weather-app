/*
  CityFrom.jsx component which renders the form for user input. Uses different hooks to track
  the user input data and call the OpenWeather API and return the data pertaining to the
  user input as json.
  Also uses the WeatherContext.jsx file to track the user inputted data so that it can be used in
  other files.
*/
import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useWeather } from "../contexts/WeatherContext";

const CityForm = () => {
  // WeatherContext.jsx context for storing the data from the form.
  const { setWeather, setUnitType, setGeo, setWelcome, showWelcome } =
    useWeather();

  // useState hooks
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [units, setUnits] = useState("imperial");
  const [error, setError] = useState(null);

  /*
    handleSubmit function that is called when the user submits the form from the 
    rendered input using the button in the form or hitting the enter button.
  */
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page from reloading
    setWelcome(false);

    // env variables
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiURL = process.env.REACT_APP_API_URL;
    const apiGeo = process.env.REACT_APP_API_URL_GEO;

    // Set the units in the context
    setUnitType(units);

    // Check if the city input is empty
    if (city === "") {
      setError(400);
      return;
    }

    try {
      // API Call
      let response;
      // Open weather API only allows state lookup for US
      if (country !== "US") {
        response = await fetch(
          apiURL + `q=${city},${country}&units=${units}&appid=${apiKey}`
        );
      } else if (country === "US") {
        response = await fetch(
          apiURL +
            `q=${city},${state},${country}&units=${units}&appid=${apiKey}`
        );
      }

      // response turned into json
      const json = await response.json();

      // Check if the response is ok if not set an Error
      if (!response.ok) {
        setError(response.status);
        setWeather(null);
      }
      if (response.ok) {
        setWeather(json); // Set the weather data in the context
        setError(response.status);

        const responseGeo = await fetch(
          apiGeo +
            `lat=${json.coord.lat}&lon=${json.coord.lon}&limit=1&appid=${apiKey}`
        );

        const jsonGeo = await responseGeo.json();

        setGeo(jsonGeo);
      }
    } catch (tryError) {
      console.log(tryError);
    }
  };

  // rendered html
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center flex-column flex-lg-row">
          <div className="input-field d-flex flex-column align-items-center justify-content-center mb-3 text-center">
            <label htmlFor="city" className="form-label">
              City (required)
            </label>
            <input
              type="text"
              className="form-control w-75"
              id="city"
              aria-describedby="cityHelp"
              placeholder="Enter city name here"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>

          <div className="input-field d-flex flex-column align-items-center justify-content-center mb-3 text-center">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <CountryDropdown
              id="country"
              className="form-select w-75"
              valueType="short"
              value={country}
              onChange={(val) => {
                setCountry(val);
              }}
            />
          </div>
          {country === "US" && (
            <div className="input-field d-flex flex-column align-items-center justify-content-center mb-3 text-center">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <RegionDropdown
                id="state"
                className="form-select w-75"
                valueType="short"
                countryValueType="short"
                defaultOptionLabel="Select State"
                country={country}
                value={state}
                onChange={(val) => {
                  setState(val);
                }}
              />
            </div>
          )}
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="imperial"
              checked={units === "imperial"}
              onChange={(e) => {
                setUnits(e.target.id);
              }}
            />
            <label className="form-check-label me-2" htmlFor="imperial">
              &deg;F
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="metric"
              onChange={(e) => {
                setUnits(e.target.id);
              }}
            />
            <label className="form-check-label" htmlFor="metric">
              &deg;C
            </label>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <button className="btn btn-primary">Enter</button>
        </div>
      </form>
      {error === 400 ? (
        <div className="error text-center">
          Missing input please try again...
        </div>
      ) : (
        error === 404 && (
          <div className="error text-center">
            No city found please try again...
          </div>
        )
      )}

      {showWelcome && (
        <div>
          <h2 className="text-center">Welcome to my Weather App</h2>
          <p className="text-center">
            Please enter the name of the city you would like to find along with
            the country from the dropdown.
            <br />
            If the city is in the United States please select the state from the
            corresponding dropdown aswell.
            <br />
            <br />
            If you would like to view the radar map please select the option at
            the top of the page.
          </p>
        </div>
      )}
    </div>
  );
};

export default CityForm;
