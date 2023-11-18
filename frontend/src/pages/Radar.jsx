import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

const Radar = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const baselayer = new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      }),
    });

    const precipitationLayer = new TileLayer({
      source: new XYZ({
        url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
        attributions: "Map data © OpenWeatherMap",
        maxZoom: 18,
      }),
    });

    const map = new Map({
      target: "map",
      layers: [baselayer, precipitationLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      // Clean up resources
      map.dispose();
    };
  }, [apiKey]);

  return (
    <div className="container">
      <div id="map" style={{ width: "100%", height: "85vh" }}></div>
    </div>
  );
};

export default Radar;
