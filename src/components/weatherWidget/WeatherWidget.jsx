import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useWeatherData } from "../../hooks/useWeatherData";
import WeatherDisplay from "../weatherDisplay/WeatherDisplay";
import CitySelector from "../citySelector/CitySelector";
import ForecastList from "../forecastList/ForecastList";
import DataVisualization from "../dataVisualization/DataVisualization";
import SettingsPanel from "../settingsPanel/SettingsPanel";

import styles from "./WeatherWidget.module.css";
import mockForecastData from "../../data/mockForecastData";
import { formatForecastForChart } from "../../utils/formatForecast";

const WeatherWidget = () => {
  const { theme, toggleTheme } = useTheme();
  const [refreshInterval, setRefreshInterval] = useState(60);
  const { city, unit, weatherData, error, changeCity, toggleUnit, reload } =
    useWeatherData();

  const chartData = formatForecastForChart(mockForecastData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      reload();
    }, refreshInterval * 1000);

    return () => clearInterval(intervalId);
  }, [refreshInterval, reload]);

  return (
    <div className={styles.container}>
      <h2>Weather Widget ({theme} mode)</h2>
      <button onClick={toggleTheme}>Rejimni almashtirish</button>

      <CitySelector city={city} changeCity={changeCity} />

      <SettingsPanel
        unit={unit}
        toggleUnit={toggleUnit}
        reload={reload}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
      />

      <div>
        <p>
          <strong>Shahar:</strong> {city}
        </p>
        <p>
          <strong>Birlik:</strong> {unit === "metric" ? "°C" : "°F"}
        </p>

        {error && <p className={styles.error}>⚠️ {error}</p>}

        <button onClick={() => changeCity("London")}>London</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {weatherData ? (
          <>
            <WeatherDisplay data={weatherData} unit={unit} />
            <ForecastList forecast={mockForecastData} unit={unit} />
            <DataVisualization data={chartData} unit={unit} />
          </>
        ) : (
          <p>Yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
