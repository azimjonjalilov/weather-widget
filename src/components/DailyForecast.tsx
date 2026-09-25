"use client";

import React from "react";
import { DailyForecastItem, WeatherUnit } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Calendar, Droplets, Wind, Waves, Sun, Moon } from "lucide-react";
import { translations, Language } from "@/lib/i18n";

interface DailyForecastProps {
  daily: DailyForecastItem[];
  unit: WeatherUnit;
  lang?: Language;
}

export function DailyForecast({ daily, unit, lang = "uz" }: DailyForecastProps) {
  const t = translations[lang] || translations.uz;
  const tempUnit = unit === "metric" ? "°" : "°F";
  const localeMap = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };

  return (
    <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/40 dark:border-slate-800/80 shadow-lg">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 sm:p-2 rounded-2xl bg-gradient-to-tr from-sky-500/15 to-indigo-500/15 text-sky-500 dark:text-sky-400 shrink-0">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              {t.dailyTitle}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400">{t.dailySubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-sky-500/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            5 {lang === "en" ? "days" : lang === "ru" ? "дней" : "kun"}
          </span>
        </div>
      </div>

      {/* 5-Day Responsive Cards Container (Swipeable on mobile, 5 columns on tablet/desktop) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-5 gap-3 sm:gap-2.5 md:gap-3.5 lg:gap-4 pb-2 sm:pb-0 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {daily.map((item, idx) => {
          const isToday = idx === 0;
          const dayTitle = isToday ? t.today : t.weekDays[item.dayIndex] || "Kun";

          const formattedDate = item.dateRaw
            ? new Date(item.dateRaw).toLocaleDateString(localeMap[lang] || "uz-UZ", {
                month: "short",
                day: "numeric",
              })
            : item.date;

          return (
            <div
              key={`${item.date}-${idx}`}
              className={`flex flex-col justify-between min-w-[170px] sm:min-w-0 flex-1 snap-start p-3.5 sm:p-3 md:p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden ${
                isToday
                  ? "bg-gradient-to-b from-sky-500/10 via-white/80 to-white/60 dark:from-sky-950/40 dark:via-slate-800/80 dark:to-slate-800/60 border-sky-400/50 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/30"
                  : "bg-white/60 dark:bg-slate-800/50 hover:bg-white/90 dark:hover:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 shadow-sm"
              }`}
            >
              {/* Top: Day and Date */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/40 dark:border-slate-700/40">
                <span
                  className={`text-xs sm:text-sm font-black tracking-tight truncate ${
                    isToday ? "text-sky-600 dark:text-sky-400" : "text-slate-800 dark:text-slate-100"
                  }`}
                >
                  {dayTitle}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 shrink-0 ml-1">
                  {formattedDate}
                </span>
              </div>

              {/* Center: Weather Icon & Description */}
              <div className="my-2.5 sm:my-3 flex flex-col items-center justify-center text-center">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 mb-1.5 sm:mb-2 transform group-hover:scale-110 transition-transform">
                  <WeatherIcon
                    code={item.icon}
                    condition={item.condition}
                    size={36}
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold capitalize text-slate-600 dark:text-slate-300 line-clamp-1">
                  {item.description}
                </span>
              </div>

              {/* Day & Night Clear Badges */}
              <div className="grid grid-cols-2 gap-1 sm:gap-1.5 my-2 p-1 sm:p-1.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/60">
                {/* Kunduzi */}
                <div className="flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20">
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-0.5">
                    <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{t.dayTime}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                    +{item.temp_max}{tempUnit}
                  </span>
                </div>

                {/* Kechasi */}
                <div className="flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-500/20">
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 mb-0.5">
                    <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-500 shrink-0" />
                    <span className="truncate">{t.nightTime}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                    +{item.temp_min}{tempUnit}
                  </span>
                </div>
              </div>

              {/* Bottom: Mini Metrics Badges */}
              <div className="pt-2 sm:pt-2.5 mt-1 border-t border-slate-200/40 dark:border-slate-700/40 grid grid-cols-3 gap-1 text-center text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {/* Precipitation */}
                <div className="flex flex-col items-center" title="Precipitation">
                  <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-500 mb-0.5" />
                  <span>{item.pop}%</span>
                </div>
                {/* Wind */}
                <div className="flex flex-col items-center" title="Wind">
                  <Wind className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-400 mb-0.5" />
                  <span>{item.wind_speed}</span>
                </div>
                {/* Humidity */}
                <div className="flex flex-col items-center" title="Humidity">
                  <Waves className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-500 mb-0.5" />
                  <span>{item.humidity}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
