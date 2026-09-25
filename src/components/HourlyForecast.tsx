"use client";

import React, { useRef } from "react";
import { HourlyForecastItem, WeatherUnit } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Droplets, Wind, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { translations, Language } from "@/lib/i18n";

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  unit: WeatherUnit;
  lang?: Language;
}

export function HourlyForecast({ hourly, unit, lang = "uz" }: HourlyForecastProps) {
  const t = translations[lang] || translations.uz;
  const tempUnit = unit === "metric" ? "°" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/40 dark:border-slate-800/80 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/10 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              {t.hourlyTitle}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400">{t.hourlySubtitle}</p>
          </div>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 shadow-sm transition-all active:scale-95"
            title="Oldinga"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 shadow-sm transition-all active:scale-95"
            title="Keyingisi"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 24-Hour Slider */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
      >
        {hourly.map((item, idx) => {
          const isNow = idx === 0;
          return (
            <div
              key={`${item.dt}-${idx}`}
              className={`flex flex-col items-center justify-between min-w-[76px] sm:min-w-[84px] py-3 sm:py-3.5 px-2 sm:px-2.5 rounded-2xl border snap-start transition-all duration-200 group shrink-0 ${
                isNow
                  ? "bg-gradient-to-b from-sky-500/15 via-indigo-500/10 to-transparent border-sky-400/50 shadow-md shadow-sky-500/10"
                  : "bg-white/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-slate-200/60 dark:border-slate-700/60 hover:shadow-sm"
              }`}
            >
              {/* Hour time */}
              <span
                className={`text-xs font-semibold ${
                  isNow
                    ? "text-sky-600 dark:text-sky-400 font-bold"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {isNow ? t.today : item.time}
              </span>

              {/* Weather SVG Icon */}
              <div className="my-2.5 transform group-hover:scale-110 transition-transform">
                <WeatherIcon
                  code={item.icon}
                  condition={item.condition}
                  size={32}
                />
              </div>

              {/* Temperature */}
              <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                {item.temp}{tempUnit}
              </span>

              {/* Precipitation & Wind info */}
              <div className="flex flex-col items-center gap-1 mt-2 w-full pt-1.5 border-t border-slate-200/40 dark:border-slate-700/40">
                <div className="flex items-center gap-0.5 text-[11px] font-medium text-sky-500">
                  <Droplets className="w-3 h-3 shrink-0" />
                  <span>{item.pop}%</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-slate-400">
                  <Wind className="w-2.5 h-2.5 shrink-0" />
                  <span>{item.wind_speed}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
