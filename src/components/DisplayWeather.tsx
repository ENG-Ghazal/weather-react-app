import React from "react";
import "./styles.css";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import axios from "axios";
import {
  BsCloudFill,
  BsCloudFogFill,
  BsCloudRainFill,
  BsSunFill,
} from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { RiLoader2Fill } from "react-icons/ri";

interface WeatherDataProps {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}
const DisplayWeather = () => {
  const api_endpoint = "https://api.openweathermap.org/data/2.5/";
  const api_key = "29320b7d071058e3d290d18a32dda3e6";
  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [city, setCity] = React.useState("");

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    try{
        const url = `${api_endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
    }
    catch(error) {
      console.error(error);
    }
  };

  const fetchCityWeather = async (city: string) => {
    try {
      const url = `${api_endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
      const response = await axios.get(url);
      const currentCityWeather: WeatherDataProps = response.data;
      return {currentCityWeather};
    } catch (error) {
      console.error("No data found", error);
      throw error;
    }
  };

  const handleSearchCity = async () =>{
    console.log("clicked")
    if(city.trim() === ""){
      return ;
    }
      try {
         const {currentCityWeather} = await fetchCityWeather(city);
         console.log("data for city ",currentCityWeather);
         setWeatherData(currentCityWeather);

      }
      catch(error) {
        console.error(error);
      }
  }
  const iconCanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsCloudRainFill />;
        iconColor = "#272829";
        break;
      case "Clear":
        iconElement = <BsSunFill />;
        iconColor = "#ffc436";
        break;
      case "Clouds":
        iconElement = <BsCloudFill />;
        iconColor = "#102c57";
        break;
      case "Mist":
        iconElement = <BsCloudFogFill />;
        iconColor = "#279eff";
        break;

      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7b2869";
    }
    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          console.log(currentWeather);
          setWeatherData(currentWeather);
          setIsLoading(true);
        }
      );
    });
  }, []);

  return (
    <div className="mainWrapper">
      <div className="container">
        <div className="searchArea">
          <input
            type="text"
            placeholder="Enter a city "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="searchCircle" onClick={handleSearchCity}>
            <AiOutlineSearch className="searchIcon" />
          </div>
        </div>
        {weatherData && isLoading ? (
          <>
            <div className="weatherArea">
              <h1> {weatherData.name} </h1>
              <span> {weatherData.sys.country} </span>
              <div className="icon">
                {iconCanger(weatherData.weather[0].main)}
              </div>
              <h1>{weatherData.main.temp}c</h1>
              <h2>{weatherData.weather[0].main}</h2>
            </div>
            <div className="bottomInfoArea">
              <div className="humidityLevel">
                <WiHumidity className="humidityIcon" />
                <div className="humidInfo">
                  <h3> {weatherData.main.humidity}%</h3>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind">
                <FaWind className="windIcon" />
                <div className="windInfo">
                  <h3> {weatherData.wind.speed} Km/h </h3>
                  <p>wind speed </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="loading">
            <RiLoader2Fill className="loadingIcon" />
            <p> loading ... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayWeather;
