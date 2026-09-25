"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CitySearch } from "@/components/CitySearch";
import { FavoritesBar } from "@/components/FavoritesBar";
import { HeroWeatherCard } from "@/components/HeroWeatherCard";
import { MetricsGrid } from "@/components/MetricsGrid";
import { HourlyForecast } from "@/components/HourlyForecast";
import { WeatherChart } from "@/components/WeatherChart";
import { DailyForecast } from "@/components/DailyForecast";
import { SettingsModal } from "@/components/SettingsModal";
import { WeatherSkeleton } from "@/components/WeatherSkeleton";
import { useWeather } from "@/hooks/useWeather";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useFavorites } from "@/hooks/useFavorites";
import { WeatherUnit } from "@/types/weather";
import { AlertCircle } from "lucide-react";

export function WeatherDashboard() {
  const [unit, setUnit] = useState<WeatherUnit>("metric");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(10);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Geolocation
  const { coords, loading: gpsLoading, error: gpsError, getPosition, resetCoords } = useGeolocation();

  // Weather Hook
  const {
    data,
    loading: weatherLoading,
    error: weatherError,
    city,
    changeCity,
    refresh,
  } = useWeather({
    initialCity: "Namangan",
    lat: coords?.lat,
    lon: coords?.lon,
    unit,
    autoRefreshInterval: refreshInterval,
  });

  // Favorites Hook
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Dark mode class handler
  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("weatherpulse_theme") === "dark" ||
      (!localStorage.getItem("weatherpulse_theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("weatherpulse_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("weatherpulse_theme", "light");
      }
      return next;
    });
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const handleGpsClick = async () => {
    try {
      await getPosition();
    } catch (e) {
      console.warn("GPS failed", e);
    }
  };

  const handleSelectCity = (newCity: string) => {
    resetCoords();
    changeCity(newCity);
  };

  const handleAddCurrentToFavorites = () => {
    if (!data) return;
    if (isFavorite(data.current.city)) {
      removeFavorite(data.current.city);
    } else {
      addFavorite({
        name: data.current.city,
        country: data.current.country,
        temp: data.current.temp,
        condition: data.current.condition,
        icon: data.current.icon,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50/30 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Bar */}
        <Header
          unit={unit}
          onToggleUnit={toggleUnit}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onGpsClick={handleGpsClick}
          gpsLoading={gpsLoading}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onRefresh={refresh}
          refreshing={weatherLoading}
        />

        {/* Search Bar & City Selector */}
        <CitySearch
          onSelectCity={handleSelectCity}
          currentCity={data?.current.city || city}
        />

        {/* Favorites Bar */}
        <FavoritesBar
          favorites={favorites}
          currentCity={data?.current.city || city}
          onSelectCity={handleSelectCity}
          onRemoveFavorite={removeFavorite}
          onAddCurrent={handleAddCurrentToFavorites}
          isCurrentFavorite={isFavorite(data?.current.city || city)}
        />

        {/* Alerts / Notice if Fallback or Error */}
        {data?.isFallback && (
          <div className="flex items-center gap-2 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              Tarmoq yoki API kalit cheklovi sababli ma'lumotlar zaxira (namoyish) rejimidan ko'rsatilmoqda.
            </span>
          </div>
        )}

        {gpsError && (
          <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs sm:text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}

        {weatherError && (
          <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs sm:text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{weatherError}</span>
          </div>
        )}

        {/* Main Content Area */}
        {weatherLoading && !data ? (
          <WeatherSkeleton />
        ) : data ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Grid: Hero Weather Card & Key Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6">
                <HeroWeatherCard weather={data.current} unit={unit} />
              </div>
              <div className="lg:col-span-6">
                <MetricsGrid weather={data.current} unit={unit} />
              </div>
            </div>

            {/* Middle Section: Hourly Forecast Horizontal Scroll */}
            <HourlyForecast hourly={data.hourly} unit={unit} />

            {/* Bottom Grid: Temperature Dynamics Chart & 5-Day Forecast */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <WeatherChart hourly={data.hourly} unit={unit} isDark={isDark} />
              </div>
              <div className="lg:col-span-5">
                <DailyForecast daily={data.daily} unit={unit} />
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <footer className="pt-6 pb-2 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>
            WeatherPulse © {new Date().getFullYear()} • OpenWeatherMap API orqali ta'minlangan
          </p>
        </footer>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        unit={unit}
        onChangeUnit={setUnit}
        interval={refreshInterval}
        onChangeInterval={setRefreshInterval}
      />
    </div>
  );
}
