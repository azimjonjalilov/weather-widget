import { useState } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";
import styles from "./WeatherWidget.module.css";
import { MdSettingsSuggest } from "react-icons/md";

// import components
import Header from "../header/Header";
import CitySelector from "../citySelector/CitySelector";
import WeatherDisplay from "../weatherDisplay/WeatherDisplay";
import ForecastList from "../forecastList/ForecastList";
import DataVisualization from "../dataVisualization/DataVisualization";
import SettingsPanel from "../settingsPanel/SettingsPanel";
import Loading from "../loading/Loading";

const WeatherWidget = () => {
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
    loading,
    reload,
  } = useWeatherData();

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
        setIsSetting={setIsSetting}
        unit={unit}
        toggleUnit={toggleUnit}
        reload={reload}
      />

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {loading && <Loading />}

      {!loading && weatherData && (
        <>
          <WeatherDisplay data={weatherData} unit={unit} cityData={cityData} />
          <ForecastList forecast={forecastData.slice(1)} unit={unit} />
          <DataVisualization data={forecastData.slice(1)} unit={unit} />
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
