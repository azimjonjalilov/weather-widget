"use client";

import React, { useState, useEffect } from "react";
import { CurrentWeather, WeatherUnit } from "@/types/weather";
import { ArrowDown, ArrowUp, Calendar, MapPin, Eye, Droplets, Wind } from "lucide-react";

interface HeroWeatherCardProps {
  weather: CurrentWeather;
  unit: WeatherUnit;
}

export function HeroWeatherCard({ weather, unit }: HeroWeatherCardProps) {
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
      return "from-blue-600/90 via-sky-600/80 to-slate-700/90";
    }
    if (c.includes("cloud")) {
      return "from-slate-600/90 via-sky-700/80 to-indigo-800/90";
    }
    if (c.includes("snow")) {
      return "from-cyan-600/90 via-sky-500/80 to-slate-600/90";
    }
    if (c.includes("thunder")) {
      return "from-purple-900/90 via-indigo-900/80 to-slate-900/90";
    }
    return "from-sky-500/90 via-indigo-600/85 to-purple-600/90";
  };

  const formattedDate = mounted && weather.dt
    ? new Date(weather.dt * 1000).toLocaleDateString("uz-UZ", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "Bugun";

  return (
    <div
      className={`relative w-full rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-2xl bg-gradient-to-br ${getConditionGradient(
        weather.condition
      )} backdrop-blur-xl border border-white/20 transition-all duration-500`}
    >
      {/* Decorative Blur Circles */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* City and Date */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
              <MapPin className="w-5 h-5 text-white" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {weather.city}, {weather.country}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span className="capitalize" suppressHydrationWarning>{formattedDate}</span>
          </div>

          {/* Temperature and Condition Description */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-6xl sm:text-7xl font-extrabold tracking-tighter drop-shadow-sm">
              {weather.temp}{tempUnit}
            </span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-semibold capitalize text-white/95">
                {weather.description}
              </span>
              <span className="text-xs sm:text-sm text-white/80">
                His etilishi: {weather.feels_like}{tempUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Large Weather Icon & Min/Max */}
        <div className="flex flex-col items-start md:items-end justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon || "01d"}@4x.png`}
              alt={weather.description || "weather"}
              width={112}
              height={112}
              className="w-28 h-28 -my-4 drop-shadow-md animate-float"
            />
          </div>

          {/* Min / Max Temp Badges */}
          <div className="flex items-center gap-3 mt-4 bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-300">
              <ArrowUp className="w-4 h-4" />
              <span>{weather.temp_max}{tempUnit}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1 text-sm font-medium text-cyan-200">
              <ArrowDown className="w-4 h-4" />
              <span>{weather.temp_min}{tempUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Quick Stats Footer */}
      <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-1 text-xs text-white/80">
            <Wind className="w-3.5 h-3.5" /> Shamol
          </div>
          <span className="text-sm sm:text-base font-semibold mt-0.5">
            {weather.wind_speed} {speedUnit}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-1 text-xs text-white/80">
            <Droplets className="w-3.5 h-3.5" /> Namlik
          </div>
          <span className="text-sm sm:text-base font-semibold mt-0.5">
            {weather.humidity}%
          </span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-1 text-xs text-white/80">
            <Eye className="w-3.5 h-3.5" /> Ko'rinish
          </div>
          <span className="text-sm sm:text-base font-semibold mt-0.5">
            {((weather.visibility || 10000) / 1000).toFixed(1)} km
          </span>
        </div>
      </div>
    </div>
  );
}
