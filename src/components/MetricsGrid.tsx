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

interface MetricsGridProps {
  weather: CurrentWeather;
  unit: WeatherUnit;
}

export function MetricsGrid({ weather, unit }: MetricsGridProps) {
  const [mounted, setMounted] = useState(false);
  const isC = unit === "metric";
  const speedUnit = isC ? "m/s" : "mph";

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatSunTime = (timestamp: number) => {
    if (!timestamp || !mounted) return "--:--";
    try {
      return new Date(timestamp * 1000).toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "--:--";
    }
  };

  const getWindDirectionName = (deg: number) => {
    const directions = ["Shimol", "Sh.-Sharq", "Sharq", "J.-Sharq", "Janub", "J.-G'arb", "G'arb", "Sh.-G'arb"];
    const index = Math.round((deg || 0) / 45) % 8;
    return directions[index];
  };

  const metrics = [
    {
      id: "wind",
      title: "Shamol tezligi",
      value: `${weather.wind_speed} ${speedUnit}`,
      sub: `${getWindDirectionName(weather.wind_deg)} (${weather.wind_deg}°)`,
      icon: Wind,
      color: "from-blue-500 to-sky-400",
      accent: "text-sky-500",
    },
    {
      id: "humidity",
      title: "Havo namligi",
      value: `${weather.humidity}%`,
      sub: weather.humidity > 60 ? "Yuqori namlik" : "Qulay holat",
      icon: Droplets,
      color: "from-cyan-500 to-blue-500",
      accent: "text-cyan-500",
    },
    {
      id: "pressure",
      title: "Atmosfera bosimi",
      value: `${weather.pressure} hPa`,
      sub: "Normal: 1013 hPa",
      icon: Gauge,
      color: "from-violet-500 to-indigo-500",
      accent: "text-indigo-500",
    },
    {
      id: "visibility",
      title: "Ko'rinuvchanlik",
      value: `${((weather.visibility || 10000) / 1000).toFixed(1)} km`,
      sub: (weather.visibility || 10000) > 8000 ? "Juda yaxshi" : "Cheklangan",
      icon: Eye,
      color: "from-emerald-500 to-teal-400",
      accent: "text-emerald-500",
    },
    {
      id: "clouds",
      title: "Bulutlilik",
      value: `${weather.clouds}%`,
      sub: weather.clouds > 50 ? "Qalin bulutlar" : "Ochiq osmon",
      icon: Cloud,
      color: "from-slate-500 to-zinc-400",
      accent: "text-slate-400",
    },
    {
      id: "sun",
      title: "Quyosh chiqishi / botishi",
      value: formatSunTime(weather.sunrise),
      sub: `Botishi: ${formatSunTime(weather.sunset)}`,
      icon: Sunrise,
      color: "from-amber-500 to-orange-400",
      accent: "text-amber-500",
      isSun: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/30 dark:border-slate-800/70 shadow-sm hover:shadow-md hover:border-sky-300/40 dark:hover:border-slate-700 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-tr ${item.color} text-white shadow-sm`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div
                className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100"
                suppressHydrationWarning={item.isSun}
              >
                {item.value}
              </div>
              <div
                className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate"
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
