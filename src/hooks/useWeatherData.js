import { useReducer, useEffect, useCallback } from "react";
import { weatherReducer, initialState } from "../reducers/weatherReducer";
import {
  FETCH_WEATHER,
  CHANGE_CITY,
  TOGGLE_UNIT,
  SET_ERROR,
  CLEAR_ERROR,
} from "../reducers/actionTypes";

import { fetchWeatherData } from "../services/weatherService"; // bu API yoki mock’ni chaqiradi

export function useWeatherData() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const loadWeather = useCallback(async () => {
    try {
      dispatch({ type: CLEAR_ERROR });

      const data = await fetchWeatherData(state.city, state.unit);

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
    ...state, // city, unit, weatherData, error
    changeCity, // funksiyalar
    toggleUnit,
    reload: loadWeather,
  };
}
