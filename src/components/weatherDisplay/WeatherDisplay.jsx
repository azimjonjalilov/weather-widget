import styles from "./WeatherDisplay.module.css";

const WeatherDisplay = ({ data, unit, cityData }) => {
  const {
    dt_txt,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind,
  } = data;

  const date = dt_txt.split(" ")[0];

  const { name, country } = cityData;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className={styles.card}>
      <h3>
        {name}, {country} <br />
        {date}
      </h3>
      <img src={iconUrl} alt={weather[0].description} />
      <p>
        <strong>Havo:</strong> {weather[0].description}
      </p>
      <p>
        <strong>Temperatura:</strong> {temp}°{unit === "metric" ? "C" : "F"}
      </p>
      <p>
        <strong>His qilinadi:</strong> {feels_like}°
      </p>
      <p>
        <strong>Namlik:</strong> {humidity}%
      </p>
      <p>
        <strong>Bosim:</strong> {pressure} hPa
      </p>
      <p>
        <strong>Shamol tezligi:</strong> {wind.speed} m/s
      </p>
    </div>
  );
};

export default WeatherDisplay;
