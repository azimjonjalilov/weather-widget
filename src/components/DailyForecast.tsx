"use client";

import React from "react";
import { DailyForecastItem, WeatherUnit } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Calendar, Droplets } from "lucide-react";
import { translations, Language } from "@/lib/i18n";

interface DailyForecastProps {
  daily: DailyForecastItem[];
  unit: WeatherUnit;
  lang?: Language;
}

export function DailyForecast({ daily, unit, lang = "uz" }: DailyForecastProps) {
  const t = translations[lang] || translations.uz;
  const tempUnit = unit === "metric" ? "°" : "°F";

  // Umumiy min va max haroratlarni bar uchun hisoblash
  const allMins = daily.map((d) => d.temp_min);
  const allMaxs = daily.map((d) => d.temp_max);
  const globalMin = Math.min(...allMins, 0);
  const globalMax = Math.max(...allMaxs, 35);
  const tempRange = Math.max(1, globalMax - globalMin);

  return (
    <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/40 dark:border-slate-800/80 shadow-lg flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              {t.dailyTitle}
            </h3>
            <p className="text-xs text-slate-400">{t.dailySubtitle}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          5 kun
        </span>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {daily.map((item, idx) => {
          const isToday = idx === 0;

          // Apple weather style bar position
          const leftPercent = Math.max(0, Math.min(100, ((item.temp_min - globalMin) / tempRange) * 100));
          const widthPercent = Math.max(15, Math.min(100 - leftPercent, ((item.temp_max - item.temp_min) / tempRange) * 100));

          return (
            <div
              key={`${item.date}-${idx}`}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 group ${
                isToday
                  ? "bg-white/80 dark:bg-slate-800/80 border-sky-400/30 shadow-sm"
                  : "bg-white/40 dark:bg-slate-800/40 hover:bg-white/70 dark:hover:bg-slate-800/70 border-slate-200/50 dark:border-slate-700/50"
              }`}
            >
              {/* Day Name & Date */}
              <div className="w-24 sm:w-28 shrink-0">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">
                  {isToday ? t.today : item.dayName}
                </span>
                <span className="text-xs text-slate-400 block">{item.date}</span>
              </div>

              {/* Icon & Pop */}
              <div className="flex items-center gap-2 w-20 sm:w-24 justify-center shrink-0">
                <WeatherIcon
                  code={item.icon}
                  condition={item.condition}
                  size={26}
                />
                {item.pop > 10 && (
                  <span className="flex items-center text-[11px] font-semibold text-sky-500">
                    <Droplets className="w-3 h-3" />
                    {item.pop}%
                  </span>
                )}
              </div>

              {/* Temperature Bar (Apple Weather Style) */}
              <div className="flex items-center gap-3 flex-1 max-w-[200px] sm:max-w-xs justify-end">
                <span className="text-xs font-semibold text-slate-400 w-7 text-right">
                  {item.temp_min}{tempUnit}
                </span>

                {/* Gradient Bar Track */}
                <div className="relative h-2 flex-1 bg-slate-200/80 dark:bg-slate-700/80 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500 shadow-sm"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 w-7">
                  {item.temp_max}{tempUnit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
