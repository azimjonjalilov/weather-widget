"use client";

import React from "react";
import { HourlyForecastItem, WeatherUnit } from "@/types/weather";
import { Droplets } from "lucide-react";

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  unit: WeatherUnit;
}

export function HourlyForecast({ hourly, unit }: HourlyForecastProps) {
  const tempUnit = unit === "metric" ? "°" : "°F";

  return (
    <div className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-white/30 dark:border-slate-800/70 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Soatlik prognoz (24 soat)
        </h3>
        <span className="text-xs text-slate-400">3 soatlik interval</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {hourly.map((item, idx) => (
          <div
            key={`${item.dt}-${idx}`}
            className="flex flex-col items-center min-w-[76px] p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:bg-sky-50 dark:hover:bg-slate-700/80 transition-all duration-200 group"
          >
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {idx === 0 ? "Hozir" : item.time}
            </span>

            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
              width={40}
              height={40}
              className="w-10 h-10 my-1 group-hover:scale-110 transition-transform"
            />

            <span className="text-base font-bold text-slate-800 dark:text-slate-100">
              {item.temp}{tempUnit}
            </span>

            <div className="flex items-center gap-0.5 text-[11px] text-sky-500 font-medium mt-1">
              <Droplets className="w-3 h-3" />
              <span>{item.pop}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
