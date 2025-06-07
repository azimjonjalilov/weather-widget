import {
  FETCH_WEATHER,
  CHANGE_CITY,
  TOGGLE_UNIT,
  SET_ERROR,
  CLEAR_ERROR,
} from "./actionTypes";

export const initialState = {
  city: "Tashkent",
  unit: "metric", // 'metric' = Celsius, 'imperial' = Fahrenheit
  weatherData: null,
  error: null,
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
        error: null,
      };

    case CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
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
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
