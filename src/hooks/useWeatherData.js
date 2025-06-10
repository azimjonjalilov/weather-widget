import { useReducer, useEffect, useCallback } from "react";
import { weatherReducer, initialState } from "../reducers/weatherReducer";
import {
  FETCH_WEATHER,
  CHANGE_CITY,
  TOGGLE_UNIT,
  SET_ERROR,
  CLEAR_ERROR,
} from "../reducers/actionTypes";

import { fetchWeatherAPI } from "../services/weatherService";

export function useWeatherData() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const loadWeather = useCallback(async () => {
    try {
      dispatch({ type: CLEAR_ERROR });

      const data = await fetchWeatherAPI(state.city, state.unit);

      dispatch({
        type: FETCH_WEATHER,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Weather ma'lumotlarini olishda xatolik yuz berdi.",
      });
    }
  }, [state.city, state.unit]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const changeCity = (city) => {
    dispatch({ type: CHANGE_CITY, payload: city });
  };

  const toggleUnit = () => {
    dispatch({ type: TOGGLE_UNIT });
  };

  return {
    ...state, // city, unit, cityData, weatherData, error
    changeCity, // funksiyalar
    toggleUnit,
    reload: loadWeather,
  };
}
