"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WeatherResponse, WeatherUnit } from "@/types/weather";

interface UseWeatherProps {
  initialCity?: string;
  lat?: number | null;
  lon?: number | null;
  unit: WeatherUnit;
  autoRefreshInterval: number; // in minutes
}

export function useWeather({
  initialCity = "Toshkent",
  lat,
  lon,
  unit,
  autoRefreshInterval = 10,
}: UseWeatherProps) {
  const [city, setCity] = useState<string>(initialCity);
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const unitRef = useRef(unit);
  unitRef.current = unit;

  const fetchWeather = useCallback(async (cityName?: string, coords?: { lat: number; lon: number }) => {
    setLoading(true);
    setError(null);
    try {
      let query = "";
      if (coords && coords.lat && coords.lon) {
        query = `lat=${coords.lat}&lon=${coords.lon}&unit=${unitRef.current}`;
      } else {
        const targetCity = cityName || city;
        query = `city=${encodeURIComponent(targetCity)}&unit=${unitRef.current}`;
      }

      const res = await fetch(`/api/weather?${query}`);
      if (!res.ok) {
        throw new Error("Ob-havo ma'lumotlarini yuklashda xatolik yuz berdi");
      }
      const weatherData: WeatherResponse = await res.json();
      setData(weatherData);
      setLastRefreshed(new Date());
    } catch (err: any) {
      console.warn("Weather fetch error:", err?.message || err);
      setError(err?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }, [city]);

  // Initial fetch or when city/coords/unit changes
  useEffect(() => {
    if (lat && lon) {
      fetchWeather(undefined, { lat, lon });
    } else {
      fetchWeather(city);
    }
  }, [city, lat, lon, unit, fetchWeather]);

  // Auto refresh interval timer
  useEffect(() => {
    if (!autoRefreshInterval || autoRefreshInterval <= 0) return;

    const intervalMs = autoRefreshInterval * 60 * 1000;
    const timer = setInterval(() => {
      if (lat && lon) {
        fetchWeather(undefined, { lat, lon });
      } else {
        fetchWeather(city);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoRefreshInterval, city, lat, lon, fetchWeather]);

  const changeCity = (newCity: string) => {
    setCity(newCity);
  };

  const refresh = () => {
    if (lat && lon) {
      fetchWeather(undefined, { lat, lon });
    } else {
      fetchWeather(city);
    }
  };

  return {
    data,
    loading,
    error,
    city,
    changeCity,
    refresh,
    lastRefreshed,
  };
}
