"use client";

import React, { useState, useEffect } from "react";
import { CurrentWeather, WeatherUnit } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { ArrowDown, ArrowUp, Calendar, MapPin, Eye, Droplets, Wind } from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface HeroWeatherCardProps {
  weather: CurrentWeather;
  unit: WeatherUnit;
  lang?: Language;
}

export function HeroWeatherCard({ weather, unit, lang = "uz" }: HeroWeatherCardProps) {
  const t = translations[lang] || translations.uz;
  const [mounted, setMounted] = useState(false);
  const isC = unit === "metric";
  const tempUnit = isC ? "°C" : "°F";
  const speedUnit = isC ? "m/s" : "mph";

  useEffect(() => {
    setMounted(true);
  }, []);

  const getConditionGradient = (condition: string) => {
    const c = (condition || "").toLowerCase();
    if (c.includes("rain") || c.includes("drizzle")) {
      return "from-blue-700/90 via-sky-700/80 to-slate-800/90";
    }
    if (c.includes("cloud")) {
      return "from-slate-700/90 via-sky-800/80 to-indigo-900/90";
    }
    if (c.includes("snow")) {
      return "from-cyan-700/90 via-sky-600/80 to-slate-700/90";
    }
    if (c.includes("thunder")) {
      return "from-purple-950/95 via-indigo-950/85 to-slate-950/95";
    }
    return "from-sky-500/90 via-indigo-600/85 to-purple-600/90";
  };

  const localeMap = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };
  const formattedDate = mounted && weather.dt
    ? new Date(weather.dt * 1000).toLocaleDateString(localeMap[lang] || "uz-UZ", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : t.today;

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-white overflow-hidden shadow-2xl bg-gradient-to-br ${getConditionGradient(
        weather.condition
      )} backdrop-blur-2xl border border-white/20 transition-all duration-500`}
    >
      {/* Decorative Blur Circles */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        {/* City, Date, Temp */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 sm:p-2 rounded-xl bg-white/20 backdrop-blur-md shadow-sm shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight truncate">
              {weather.city}, {weather.country}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-white/85 text-xs sm:text-sm font-medium">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200 shrink-0" />
            <span className="capitalize" suppressHydrationWarning>{formattedDate}</span>
          </div>

          {/* Temperature and Condition Description */}
          <div className="mt-4 sm:mt-6 flex items-baseline gap-3 sm:gap-4 flex-wrap">
            <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter drop-shadow-md">
              {weather.temp}{tempUnit}
            </span>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-bold capitalize text-white/95 leading-tight">
                {weather.description}
              </span>
              <span className="text-xs sm:text-sm text-white/80 mt-0.5">
                {t.feelsLike}: {weather.feels_like}{tempUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Vector SVG Weather Icon & Min/Max */}
        <div className="flex sm:flex-col items-center md:items-end justify-between sm:justify-center gap-3 sm:gap-4 shrink-0">
          <div className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/15 shadow-inner">
            <WeatherIcon
              code={weather.icon}
              condition={weather.condition}
              size={64}
              className="drop-shadow-xl"
            />
          </div>

          {/* Min / Max Temp Badges */}
          <div className="flex items-center gap-2.5 sm:gap-3 bg-black/25 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-white/10 shadow-sm">
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-emerald-300">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{weather.temp_max}{tempUnit}</span>
            </div>
            <div className="w-[1px] h-3.5 bg-white/20" />
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-cyan-200">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>{weather.temp_min}{tempUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Quick Stats Footer */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center">
        <div className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-white/85 truncate">
            <Wind className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-200 shrink-0" />
            <span className="truncate">{t.windSpeed}</span>
          </div>
          <span className="text-xs sm:text-sm md:text-base font-bold mt-0.5 truncate">
            {weather.wind_speed} {speedUnit}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-white/85 truncate">
            <Droplets className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-200 shrink-0" />
            <span className="truncate">{t.humidity}</span>
          </div>
          <span className="text-xs sm:text-sm md:text-base font-bold mt-0.5 truncate">
            {weather.humidity}%
          </span>
        </div>
        <div className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-white/85 truncate">
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-200 shrink-0" />
            <span className="truncate">{t.visibility}</span>
          </div>
          <span className="text-xs sm:text-sm md:text-base font-bold mt-0.5 truncate">
            {((weather.visibility || 10000) / 1000).toFixed(1)} km
          </span>
        </div>
      </div>
    </div>
  );
}
