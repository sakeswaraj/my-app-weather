import { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import CircularProgress from "@mui/material/CircularProgress";
import "./app.css";

let appId = "9fcfbdb44f044cf6e60e027d2625530f";

function App() {
  const [city, setCity] = useState<string>("");
  const [debouncedCity, setDebouncedCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedCity(city);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [city]);

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${debouncedCity}&appid=${appId}`
      );
      if (!response.ok) {
        throw new Error(`some issue at ${response.statusText}`);
      }
      const responseData = await response.json();
      setData(responseData);
      console.log("response", responseData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCityName = (event: any) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    fetchWeather();
  }, [debouncedCity]);

  return (
    <main className="app__container">
      <section>
        <label htmlFor="city">Enter City</label>
        <input
          type="text"
          value={city}
          onChange={handleCityName}
          id="city"
          name="city"
        />
      </section>

      {data && <CurrentWeather weatherData={data} />}
    </main>
  );
}

export default App;
