"use client";

import React from "react";
import { DailyForecastItem, WeatherUnit } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Calendar, Droplets, Wind, Waves } from "lucide-react";
import { translations, Language } from "@/lib/i18n";

interface DailyForecastProps {
  daily: DailyForecastItem[];
  unit: WeatherUnit;
  lang?: Language;
}

export function DailyForecast({ daily, unit, lang = "uz" }: DailyForecastProps) {
  const t = translations[lang] || translations.uz;
  const tempUnit = unit === "metric" ? "°" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

  // Umumiy min va max haroratlarni bar uchun hisoblash
  const allMins = daily.map((d) => d.temp_min);
  const allMaxs = daily.map((d) => d.temp_max);
  const globalMin = Math.min(...allMins, 0);
  const globalMax = Math.max(...allMaxs, 35);
  const tempRange = Math.max(1, globalMax - globalMin);

  return (
    <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/40 dark:border-slate-800/80 shadow-lg">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-gradient-to-tr from-sky-500/15 to-indigo-500/15 text-sky-500 dark:text-sky-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              {t.dailyTitle}
            </h3>
            <p className="text-xs text-slate-400">{t.dailySubtitle}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
          5 kunlik to'liq sharh
        </span>
      </div>

      {/* 5-Day Cards Grid: Desktopda 5 ustun, mobilda gorizontal silliq slider */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {daily.map((item, idx) => {
          const isToday = idx === 0;

          // Apple weather style bar position
          const leftPercent = Math.max(0, Math.min(100, ((item.temp_min - globalMin) / tempRange) * 100));
          const widthPercent = Math.max(15, Math.min(100 - leftPercent, ((item.temp_max - item.temp_min) / tempRange) * 100));

          return (
            <div
              key={`${item.date}-${idx}`}
              className={`flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden ${
                isToday
                  ? "bg-gradient-to-b from-sky-500/10 via-white/80 to-white/60 dark:from-sky-950/40 dark:via-slate-800/80 dark:to-slate-800/60 border-sky-400/50 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/30"
                  : "bg-white/60 dark:bg-slate-800/50 hover:bg-white/90 dark:hover:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 shadow-sm"
              }`}
            >
              {/* Top: Day and Date */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/40 dark:border-slate-700/40">
                <span
                  className={`text-sm font-black tracking-tight ${
                    isToday ? "text-sky-600 dark:text-sky-400" : "text-slate-800 dark:text-slate-100"
                  }`}
                >
                  {isToday ? t.today : item.dayName}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {item.date}
                </span>
              </div>

              {/* Center: Large Weather Icon & Description */}
              <div className="my-3 flex flex-col items-center justify-center text-center">
                <div className="p-2.5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 mb-2 transform group-hover:scale-110 transition-transform">
                  <WeatherIcon
                    code={item.icon}
                    condition={item.condition}
                    size={42}
                  />
                </div>
                <span className="text-xs font-semibold capitalize text-slate-600 dark:text-slate-300 line-clamp-1">
                  {item.description}
                </span>
              </div>

              {/* Temperature Min / Max */}
              <div className="space-y-1.5 my-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-rose-500 flex items-center">
                    ↑ {item.temp_max}{tempUnit}
                  </span>
                  <span className="text-sky-500 flex items-center">
                    ↓ {item.temp_min}{tempUnit}
                  </span>
                </div>

                {/* Progress Gradient Bar */}
                <div className="relative h-2 w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500 shadow-sm"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>
              </div>

              {/* Bottom: Mini Metrics Badges */}
              <div className="pt-2.5 mt-1 border-t border-slate-200/40 dark:border-slate-700/40 grid grid-cols-3 gap-1 text-center text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {/* Precipitation */}
                <div className="flex flex-col items-center" title="Yog'ingarchilik ehtimoli">
                  <Droplets className="w-3 h-3 text-sky-500 mb-0.5" />
                  <span>{item.pop}%</span>
                </div>
                {/* Wind */}
                <div className="flex flex-col items-center" title="Shamol tezligi">
                  <Wind className="w-3 h-3 text-indigo-400 mb-0.5" />
                  <span>{item.wind_speed}</span>
                </div>
                {/* Humidity */}
                <div className="flex flex-col items-center" title="Namlik">
                  <Waves className="w-3 h-3 text-cyan-500 mb-0.5" />
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
