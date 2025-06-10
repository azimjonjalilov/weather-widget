import React from "react";
import styles from "./ForecastList.module.css";

const ForecastList = ({ forecast, unit }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={styles.container}>
      {forecast.map((day) => {
        const date = new Date(day.date);
        const dayOfWeek = days[date.getDay()];

        const icon = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
        return (
          <div key={day.date} className={styles.card}>
            <p>
              <strong>{day.date}</strong>
            </p>
            <p>
              <strong>{dayOfWeek}</strong>
            </p>
            <img src={icon} alt={day.description} />
            <p>{day.description}</p>
            <p>
              Min: {day.temp_min}°{unit === "metric" ? "C" : "F"}
            </p>
            <p>
              Max: {day.temp_max}°{unit === "metric" ? "C" : "F"}
            </p>
            <p>
              Avg: {day.temp_avg}°{unit === "metric" ? "C" : "F"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastList;
