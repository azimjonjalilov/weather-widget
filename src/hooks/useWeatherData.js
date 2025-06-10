import { useReducer, useEffect, useCallback, useRef } from "react";
import { weatherReducer, initialState } from "../reducers/weatherReducer";
import { throttle } from "../utils/throttle";

import {
  FETCH_WEATHER,
  CHANGE_CITY,
  TOGGLE_UNIT,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
} from "../reducers/actionTypes";

import { fetchWeatherAPI } from "../services/weatherService";

export function useWeatherData(initialRefreshRate = 10) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const { city, unit } = state;

  const refreshRateRef = useRef(initialRefreshRate * 1000); // ms
  const intervalRef = useRef(null);

  // Throttled API call
  const throttledFetch = useCallback(
    throttle(async (city, unit) => {
      try {
        dispatch({ type: CLEAR_ERROR });
        const data = await fetchWeatherAPI(city, unit);

        dispatch({ type: FETCH_WEATHER, payload: data });
      } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.message });
      }
    }, 5000), // 5 sec throttle
    []
  );

  // API chaqiruv funksiyasi
  const fetchData = useCallback(() => {
    dispatch({ type: SET_LOADING });
    throttledFetch(city, unit);
  }, [city, unit, throttledFetch]);

  // Shaharga o‘zgartirish
  const changeCity = (newCity) => {
    dispatch({ type: CHANGE_CITY, payload: newCity });
  };

  // Birlikni almashtirish
  const toggleUnit = () => {
    dispatch({ type: TOGGLE_UNIT });
  };

  // Refresh rate o‘zgarganda intervalni yangilash
  const setRefreshRate = (seconds) => {
    refreshRateRef.current = seconds * 1000;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(fetchData, refreshRateRef.current);
  };

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, refreshRateRef.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  return {
    ...state, // city, unit, cityData, weatherData, error
    changeCity, // funksiyalar
    toggleUnit,
    reload: setRefreshRate,
  };
}
