import React, { useState } from "react";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

const CityForm = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label for="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            aria-describedby="cityHelp"
            placeholder="Enter city name here"
          />

          <label for="country">Country</label>
          <CountryDropdown
            id="country"
            className="form-control"
            value={country}
            onChange={(val) => {
              setCountry(val);
            }}
          />

          <label for="region">Region</label>
          <RegionDropdown
            id="region"
            className="form-control"
            country={country}
            value={region}
            onChange={(val) => {
              setRegion(val);
            }}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CityForm;
