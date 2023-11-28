/*
  Radar.jsx - Page for rendering the weather radar.
  Calls the OpenLayer Library and generates an interactive map which the layer from the
  OpenWeather weather map 1.0 API can put the layer on top of the visualize the data with a map.
*/
import { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Actual rendered component
const Radar = () => {
  // apikey
  const apiKey = process.env.REACT_APP_API_KEY;

  // useState the is set the current layer selected
  const [currentLayer, setCurrentLayer] = useState("precipitation_new");

  // useState for the layerName which will be displayed in the dropdown
  const [layerName, setLayerName] = useState("rain");

  // Event handler for when the user selects a new map from the dropdown.
  const handleLayerChange = (event) => {
    switch (event.target.value) {
      case "precipitation_new":
        setLayerName("rain");
        break;
      case "clouds_new":
        setLayerName("cloud");
        break;
      case "pressure_new":
        setLayerName("pressure");
        break;
      case "wind_new":
        setLayerName("wind");
        break;
      case "temp_new":
        setLayerName("temperature");
        break;
      default:
        setLayerName(null);
    }

    setCurrentLayer(event.target.value);
  };

  // UseEffect which updates whenever a new layer is chosen.
  useEffect(() => {
    const baselayer = new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      }),
    });

    const openWeatherLayer = new TileLayer({
      source: new XYZ({
        url: `https://tile.openweathermap.org/map/${currentLayer}/{z}/{x}/{y}.png?appid=${apiKey}`,
        attributions: "Map data © OpenWeatherMap",
        maxZoom: 18,
      }),
    });

    const map = new Map({
      target: "map",
      layers: [baselayer, openWeatherLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      // Clean up resources
      map.dispose();
    };
  }, [apiKey, currentLayer]);

  // html rendered
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1>{capitalizeFirstLetter(layerName)} Map</h1>
      <select
        className="form-select w-25 mb-2"
        onChange={handleLayerChange}
        value={currentLayer}
      >
        <option value="precipitation_new">Rain</option>
        <option value="clouds_new">Clouds</option>
        <option value="pressure_new">Pressure</option>
        <option value="wind_new">Wind</option>
        <option value="temp_new">Temp</option>
      </select>
      <p>Current world {layerName} map.</p>
      <div id="map" style={{ width: "100%", height: "75vh" }}></div>
    </div>
  );
};

export default Radar;
