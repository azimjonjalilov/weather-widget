"use client";

import React, { useState, useEffect } from "react";
import {
  Wind,
  Droplets,
  Gauge,
  Eye,
  Cloud,
  Sunrise,
} from "lucide-react";
import { CurrentWeather, WeatherUnit } from "@/types/weather";
import { Language, translations } from "@/lib/i18n";

interface MetricsGridProps {
  weather: CurrentWeather;
  unit: WeatherUnit;
  lang?: Language;
}

export function MetricsGrid({ weather, unit, lang = "uz" }: MetricsGridProps) {
  const t = translations[lang] || translations.uz;
  const [mounted, setMounted] = useState(false);
  const isC = unit === "metric";
  const speedUnit = isC ? "m/s" : "mph";

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatSunTime = (timestamp: number) => {
    if (!timestamp || !mounted) return "--:--";
    try {
      const localeMap = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };
      return new Date(timestamp * 1000).toLocaleTimeString(localeMap[lang] || "uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "--:--";
    }
  };

  const getWindDirectionName = (deg: number) => {
    const directions = t.windDirections;
    const index = Math.round((deg || 0) / 45) % 8;
    return directions[index];
  };

  const metrics = [
    {
      id: "wind",
      title: t.windSpeed,
      value: `${weather.wind_speed} ${speedUnit}`,
      sub: `${getWindDirectionName(weather.wind_deg)} (${weather.wind_deg}°)`,
      icon: Wind,
      color: "from-blue-500 to-sky-400",
      accent: "text-sky-500",
    },
    {
      id: "humidity",
      title: t.humidity,
      value: `${weather.humidity}%`,
      sub: weather.humidity > 60 ? t.highHumidity : t.comfortable,
      icon: Droplets,
      color: "from-cyan-500 to-blue-500",
      accent: "text-cyan-500",
    },
    {
      id: "pressure",
      title: t.pressure,
      value: `${weather.pressure} hPa`,
      sub: t.normalPressure,
      icon: Gauge,
      color: "from-violet-500 to-indigo-500",
      accent: "text-indigo-500",
    },
    {
      id: "visibility",
      title: t.visibility,
      value: `${((weather.visibility || 10000) / 1000).toFixed(1)} km`,
      sub: (weather.visibility || 10000) > 8000 ? t.veryGood : t.limited,
      icon: Eye,
      color: "from-emerald-500 to-teal-400",
      accent: "text-emerald-500",
    },
    {
      id: "clouds",
      title: t.cloudiness,
      value: `${weather.clouds}%`,
      sub: weather.clouds > 50 ? t.denseClouds : t.clearSky,
      icon: Cloud,
      color: "from-slate-500 to-zinc-400",
      accent: "text-slate-400",
    },
    {
      id: "sun",
      title: t.sunTimes,
      value: formatSunTime(weather.sunrise),
      sub: `${t.sunsetPrefix}: ${formatSunTime(weather.sunset)}`,
      icon: Sunrise,
      color: "from-amber-500 to-orange-400",
      accent: "text-amber-500",
      isSun: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex flex-col justify-between p-3.5 sm:p-4 md:p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-sky-300/40 dark:hover:border-slate-700 transition-all duration-200 min-w-0"
          >
            <div className="flex items-center justify-between gap-1 mb-2.5 sm:mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">
                {item.title}
              </span>
              <div className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-tr ${item.color} text-white shadow-sm shrink-0`}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            <div className="min-w-0">
              <div
                className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 dark:text-slate-100 font-mono tracking-tight truncate"
                suppressHydrationWarning={item.isSun}
              >
                {item.value}
              </div>
              <div
                className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 truncate font-medium"
                suppressHydrationWarning={item.isSun}
              >
                {item.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
