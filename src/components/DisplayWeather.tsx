import { MainWrapper } from "./styles.module";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

const DisplayWeather = () => {
  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input type="text" placeholder="Enter a city " />
          <div className="searchCircle">
            <AiOutlineSearch className="searchIcon" />
          </div>
        </div>
        <div className="weatherArea">
          <h1> Beruit </h1>
          <span> NZ </span>
          <div className="icon">icon</div>
          <h1>18c</h1>
          <h2>cloudy</h2>
        </div>

        <div className="bottomInfoArea">
          <div className="humidityLevel">
            <WiHumidity className="humidityIcon" />
            <div className="humidInfo">
              <h3> 60% </h3>
              <p>Humidity</p>
            </div>
          </div>

          <div className="wind">
            <FaWind className="windIcon" />
            <div className="windInfo">
              <h3> 2.35 Km/h </h3>
              <p>wind speed </p>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;
