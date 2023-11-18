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

    // Search Box
  );
};

export default Home;
