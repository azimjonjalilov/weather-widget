import {
  FETCH_WEATHER,
  CHANGE_CITY,
  TOGGLE_UNIT,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
} from "./actionTypes";

export const initialState = {
  city: "Tashkent",
  cityData: null,
  unit: "metric", // 'metric' = Celsius, 'imperial' = Fahrenheit
  weatherData: null,
  forecastData: null,
  error: null,
  loading: false,
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      const { city, list } = action.payload;

      function getWeatherDataForDay(date, data) {
        const result = data.filter((item) => item.dt_txt.startsWith(date));

        let temp_min = result[0].main.temp_min;
        let temp_max = result[0].main.temp_max;
        let description =
          result[Math.floor(result.length / 2)].weather[0].description;
        let icon = result[Math.floor(result.length / 2)].weather[0].icon;

        for (let i = 0; i < result.length; i++) {
          if (temp_min > result[i].main.temp_min) {
            temp_min = result[i].main.temp_min;
          }
          if (temp_max < result[i].main.temp_max) {
            temp_max = result[i].main.temp_max;
          }
        }

        let temp_avg = (temp_min + temp_max) / 2;
        temp_avg = +temp_avg.toFixed(2);

        return {
          date,
          temp_min,
          temp_max,
          temp_avg,
          description,
          icon,
        };
      }

      const formatDate = (data) => {
        const seenDates = [];
        const forecastData = [];

        for (const item of data) {
          const date = item.dt_txt.split(" ")[0];
          if (!seenDates.includes(date)) {
            seenDates.push(date);
            forecastData.push(getWeatherDataForDay(date, data));
          }
        }

        return forecastData;
      };

      const forecastData = formatDate(list);

      return {
        ...state,
        cityData: city,
        weatherData: list[0],
        forecastData,
        error: null,
        loading: false,
      };

    case CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
        loading: true,
      };

    case TOGGLE_UNIT:
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
