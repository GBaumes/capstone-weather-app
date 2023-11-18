import { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

const Radar = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [currentLayer, setCurrentLayer] = useState("precipitation_new");

  const handleLayerChange = (event) => {
    setCurrentLayer(event.target.value);
  };

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

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h1>{currentLayer} Map</h1>
      <select
        className="form-select w-25 mb-2"
        onChange={handleLayerChange}
        value={currentLayer}
      >
        <option value="precipitation_new">Precipitation</option>
        <option value="clouds_new">Clouds</option>
        <option value="pressure_new">Pressure</option>
        <option value="wind_new">Wind</option>
        <option value="temp_new">Tenperature</option>
      </select>
      <p>Current world {currentLayer} map.</p>
      <div id="map" style={{ width: "100%", height: "85vh" }}></div>
    </div>
  );
};

export default Radar;