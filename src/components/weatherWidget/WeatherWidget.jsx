import React, { useState, useEffect } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";

import Header from "../header/Header";
import WeatherDisplay from "../weatherDisplay/WeatherDisplay";
import CitySelector from "../citySelector/CitySelector";
import ForecastList from "../forecastList/ForecastList";
import DataVisualization from "../dataVisualization/DataVisualization";
import SettingsPanel from "../settingsPanel/SettingsPanel";

import styles from "./WeatherWidget.module.css";
import { MdSettingsSuggest } from "react-icons/md";

const WeatherWidget = () => {
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [isSetting, setIsSetting] = useState(false);
  const {
    city,
    unit,
    weatherData,
    forecastData,
    cityData,
    error,
    changeCity,
    toggleUnit,
    reload,
  } = useWeatherData();

  useEffect(() => {
    const intervalId = setInterval(() => {
      reload();
    }, refreshInterval * 3000);

    return () => clearInterval(intervalId);
  }, [refreshInterval, reload]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.section}>
        <CitySelector city={city} changeCity={changeCity} />

        <button
          className={styles.settingBtn}
          onClick={() => setIsSetting((prev) => !prev)}
        >
          <MdSettingsSuggest className={styles.settingIcon} />
        </button>
      </div>
      <SettingsPanel
        isSetting={isSetting}
        unit={unit}
        toggleUnit={toggleUnit}
        reload={reload}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
      />

      {weatherData ? (
        <>
          <WeatherDisplay data={weatherData} unit={unit} cityData={cityData} />
          <ForecastList forecast={forecastData.slice(1)} unit={unit} />
          <DataVisualization data={forecastData.slice(1)} unit={unit} />
        </>
      ) : (
        <p>Yuklanmoqda...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
