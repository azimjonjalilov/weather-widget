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
import { Language, translations } from "@/lib/i18n";
import { AlertCircle } from "lucide-react";

export function WeatherDashboard() {
  const [unit, setUnit] = useState<WeatherUnit>("metric");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>("uz");
  const [refreshInterval, setRefreshInterval] = useState<number>(10);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const t = translations[lang] || translations.uz;

  // Geolocation
  const { coords, loading: gpsLoading, error: gpsError, getPosition, resetCoords } = useGeolocation();

  // Weather Hook with dynamic language
  const {
    data,
    loading: weatherLoading,
    error: weatherError,
    city,
    changeCity,
    refresh,
  } = useWeather({
    initialCity: "Toshkent",
    lat: coords?.lat,
    lon: coords?.lon,
    unit,
    autoRefreshInterval: refreshInterval,
    lang,
  });

  // Favorites Hook
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  // 1. Sayt ishga tushganda avtomatik ravishda Geolocation bo'yicha ma'lumot olish
  useEffect(() => {
    if (navigator.geolocation) {
      getPosition().catch(() => {});
    }
  }, [getPosition]);

  // Dark mode & Language persistence
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("weatherscope_theme") || localStorage.getItem("auracast_theme");
      const isDarkMode =
        savedTheme === "dark" ||
        (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      const savedLang = (localStorage.getItem("weatherscope_lang") || localStorage.getItem("auracast_lang")) as Language;
      if (savedLang && (savedLang === "uz" || savedLang === "ru" || savedLang === "en")) {
        setLang(savedLang);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("weatherscope_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("weatherscope_theme", "light");
      }
      return next;
    });
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem("weatherscope_lang", newLang);
    } catch (e) {
      console.error(e);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
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
          lang={lang}
          onChangeLang={handleLanguageChange}
        />

        {/* Search Bar & City Selector */}
        <CitySearch
          onSelectCity={handleSelectCity}
          currentCity={data?.current.city || city}
          lang={lang}
        />

        {/* Favorites Bar */}
        <FavoritesBar
          favorites={favorites}
          currentCity={data?.current.city || city}
          onSelectCity={handleSelectCity}
          onRemoveFavorite={removeFavorite}
          onAddCurrent={handleAddCurrentToFavorites}
          isCurrentFavorite={isFavorite(data?.current.city || city)}
          lang={lang}
        />

        {/* Alerts / Notice if Fallback or Error */}
        {data?.isFallback && (
          <div className="flex items-center gap-2 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{t.fallbackNotice}</span>
          </div>
        )}

        {gpsError && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-600 dark:text-red-400">
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
                <HeroWeatherCard weather={data.current} unit={unit} lang={lang} />
              </div>
              <div className="lg:col-span-6">
                <MetricsGrid weather={data.current} unit={unit} lang={lang} />
              </div>
            </div>

            {/* Middle Section: Hourly Forecast (24 Hours) Horizontal Slider */}
            <HourlyForecast hourly={data.hourly} unit={unit} lang={lang} />

            {/* 5-Day Forecast Showcase Cards (5 Responsive Columns) */}
            <DailyForecast daily={data.daily} unit={unit} lang={lang} />

            {/* Temperature Dynamics Chart */}
            <WeatherChart hourly={data.hourly} unit={unit} isDark={isDark} lang={lang} />
          </div>
        ) : null}

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-xs text-slate-400 dark:text-slate-500 space-y-1">
          <p className="font-medium">
            {t.appName} PRO © {new Date().getFullYear()} • OpenWeatherMap Engine
          </p>
          <p className="text-[11px] opacity-75">
            Designed for precision & clarity. Built with Next.js & TypeScript.
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
        lang={lang}
      />
    </div>
  );
}
