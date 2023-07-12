import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import moment from "moment";
import "./styles.css";
import ForecastWeather from "../ForecastWeather/ForecastWeather";

interface CurrentWeatherProps {
  weatherData: any;
}
let appId = "9fcfbdb44f044cf6e60e027d2625530f";
const CurrentWeather = ({ weatherData }: CurrentWeatherProps) => {
  const [value, setValue] = useState<number>(0);
  const [forecastData, setForecastData] = useState([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${weatherData?.name}&appid=${appId}`
      );
      if (!response.ok) {
        throw new Error(`some issue at ${response.statusText}`);
      }
      const responseData = await response.json();

      console.log("response forecast", responseData?.list?.slice(0, 7));
      setForecastData(responseData.list?.slice(0, 7));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <div className="weather__container">
      <div className="weather__container--name flex">
        <h2 className="text-4xl font-bold tracking-tighter text-orange-950 py-2.5">
          {weatherData?.name}
        </h2>
        <img
          src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
          alt={weatherData?.weather[0].description}
        />

        {/* <h6>
          <span style={{ marginRight: "10px" }}>{weatherData?.coord?.lat}</span>
          <span>{weatherData?.coord?.lon}</span>
        </h6> */}
      </div>

      <span className="text-xs">
        {moment
          .utc(weatherData?.dt)
          .local()
          .format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </span>

      <div className="flex justify-between">
        <div className="weather__container--temperature">
          <p className="text-sm text-emerald-800">
            Current Temperature :
            <span className="text-2xl font-bold">
              {weatherData?.main?.temp}
            </span>
          </p>
          <p className="text-sm text-emerald-800">
            Maximum Temperature : <span>{weatherData?.main?.temp_max}</span>
          </p>
          <p className="text-sm text-emerald-800">
            Minimum Temperature : <span>{weatherData?.main?.temp_min}</span>
          </p>
        </div>
        <div className="weather__container--description">
          <p>{weatherData?.weather[0].main}</p>
          <p>{weatherData?.weather[0].description}</p>
        </div>
      </div>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Wind Speed" />
        <Tab label="Humidity" />
        <Tab label="Pressure" />
      </Tabs>
      <div className="p-4">
        {value === 0 && (
          <div>
            <p>
              Wind Speed :
              <span className="text-1xl font-bold">
                {weatherData?.wind?.speed}km/h
              </span>
            </p>
            <p>
              Wind degree :
              <span className="text-1xl font-bold">
                {weatherData?.wind?.deg}
              </span>
            </p>
          </div>
        )}
        {value === 1 && (
          <div>
            <p>
              Humidity :
              <span className="text-1xl font-bold">
                {weatherData?.main?.humidity}
              </span>
            </p>
          </div>
        )}
        {value === 2 && (
          <div>
            <p>
              pressure :
              <span className="text-1xl font-bold">
                {weatherData?.main?.pressure}km/h
              </span>
            </p>
          </div>
        )}
      </div>
      {forecastData.length > 0 && (
        <ForecastWeather forecastData={forecastData} />
      )}
    </div>
  );
};

export default CurrentWeather;
