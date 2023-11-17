import CityForm from "../components/CityForm";
import WeatherInfo from "../components/WeatherInfo";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <CityForm />
        </div>
        <WeatherInfo />
      </div>
    </div>

    // Search Box
  );
};

export default Home;
