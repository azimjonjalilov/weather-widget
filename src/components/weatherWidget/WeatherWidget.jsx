import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useWeatherData } from "../../hooks/useWeatherData";
import WeatherDisplay from "../weatherDisplay/WeatherDisplay";
import CitySelector from "../citySelector/CitySelector";
import styles from "./WeatherWidget.module.css";

const WeatherWidget = () => {
  const { theme, toggleTheme } = useTheme();
  const { city, unit, weatherData, error, changeCity, toggleUnit, reload } =
    useWeatherData();

  return (
    <div className={styles.container}>
      <h2>Weather Widget ({theme} mode)</h2>
      <button onClick={toggleTheme}>Rejimni almashtirish</button>

      <CitySelector city={city} changeCity={changeCity} />

      <div>
        <p>
          <strong>Shahar:</strong> {city}
        </p>
        <p>
          <strong>Birlik:</strong> {unit === "metric" ? "°C" : "°F"}
        </p>

        {error && <p className={styles.error}>⚠️ {error}</p>}

        <button onClick={toggleUnit}>Birlikni almashtirish</button>
        <button onClick={() => changeCity("London")}>London</button>
        <button onClick={reload}>Qayta yuklash</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {weatherData ? (
          <>
            <WeatherDisplay data={weatherData} unit={unit} />
          </>
        ) : (
          <p>Yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
