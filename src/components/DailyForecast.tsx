"use client";

import React from "react";
import { DailyForecastItem, WeatherUnit } from "@/types/weather";
import { ArrowDown, ArrowUp, Droplets } from "lucide-react";

interface DailyForecastProps {
  daily: DailyForecastItem[];
  unit: WeatherUnit;
}

export function DailyForecast({ daily, unit }: DailyForecastProps) {
  const tempUnit = unit === "metric" ? "°" : "°F";

  return (
    <div className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-white/30 dark:border-slate-800/70 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          5 kunlik prognoz
        </h3>
        <span className="text-xs text-slate-400">Kunlik o'rtacha</span>
      </div>

      <div className="space-y-2.5">
        {daily.map((item, idx) => (
          <div
            key={`${item.date}-${idx}`}
            className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:bg-sky-50/70 dark:hover:bg-slate-700/70 transition-all duration-200"
          >
            {/* Day name & Date */}
            <div className="w-28">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
                {item.dayName}
              </span>
              <span className="text-xs text-slate-400 block">{item.date}</span>
            </div>

            {/* Condition Icon & Description */}
            <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.description}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 capitalize hidden sm:inline">
                {item.description}
              </span>
            </div>

            {/* Precipitation if > 0 */}
            <div className="flex items-center gap-1 text-xs text-sky-500 w-16 justify-end">
              {item.pop > 0 && (
                <>
                  <Droplets className="w-3 h-3" />
                  <span>{item.pop}%</span>
                </>
              )}
            </div>

            {/* Min / Max Temperature Bar */}
            <div className="flex items-center gap-3 w-28 justify-end">
              <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                <ArrowUp className="w-3 h-3 text-red-500" />
                <span>{item.temp_max}{tempUnit}</span>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-400">
                <ArrowDown className="w-3 h-3 text-sky-500" />
                <span>{item.temp_min}{tempUnit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
