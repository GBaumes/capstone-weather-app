/*
  Home.jsx - Page for rendering the home page and weather info when called.
*/
import CityForm from "../components/CityForm";
import Forecast from "../components/Forecast";
import WeatherInfo from "../components/WeatherInfo";

const Home = () => {
  return (
    <div className="home">
      <CityForm />
      <WeatherInfo />
      <Forecast />
    </div>
  );
};

export default Home;
