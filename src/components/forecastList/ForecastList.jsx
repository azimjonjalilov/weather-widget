import React from "react";
import styles from "./ForecastList.module.css";

const ForecastList = ({ forecast, unit }) => {
  return (
    <div className={styles.container}>
      {forecast.map((day) => (
        <div key={day.date} className={styles.card}>
          <p>
            <strong>{new Date(day.date).toDateString()}</strong>
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.description}
          />
          <p>{day.description}</p>
          <p>
            Min: {day.temp_min}°{unit === "metric" ? "C" : "F"}
          </p>
          <p>Max: {day.temp_max}°</p>
          <p>Avg: {day.temp_avg}°</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;
