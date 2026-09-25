"use client";

import React from "react";
import { X, Sliders, Check } from "lucide-react";
import { WeatherUnit } from "@/types/weather";
import { Language, translations } from "@/lib/i18n";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: WeatherUnit;
  onChangeUnit: (unit: WeatherUnit) => void;
  interval: number;
  onChangeInterval: (min: number) => void;
  lang?: Language;
}

export function SettingsModal({
  isOpen,
  onClose,
  unit,
  onChangeUnit,
  interval,
  onChangeInterval,
  lang = "uz",
}: SettingsModalProps) {
  if (!isOpen) return null;
  const t = translations[lang] || translations.uz;

  const intervals = [
    { label: t.intervalOff, value: 0 },
    { label: t.interval5m, value: 5 },
    { label: t.interval10m, value: 10 },
    { label: t.interval30m, value: 30 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              {t.settingsTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Temperature Unit */}
        <div className="mt-4 sm:mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            {t.settingsTempUnit}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChangeUnit("metric")}
              className={`flex items-center justify-center gap-2 py-3 sm:py-2.5 rounded-xl font-semibold text-xs border transition-all ${
                unit === "metric"
                  ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {unit === "metric" && <Check className="w-4 h-4" />}
              <span>{t.unitC}</span>
            </button>
            <button
              onClick={() => onChangeUnit("imperial")}
              className={`flex items-center justify-center gap-2 py-3 sm:py-2.5 rounded-xl font-semibold text-xs border transition-all ${
                unit === "imperial"
                  ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {unit === "imperial" && <Check className="w-4 h-4" />}
              <span>{t.unitF}</span>
            </button>
          </div>
        </div>

        {/* Auto Refresh Interval */}
        <div className="mt-4 sm:mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            {t.settingsInterval}
          </label>
          <div className="space-y-1.5">
            {intervals.map((item) => (
              <button
                key={item.value}
                onClick={() => onChangeInterval(item.value)}
                className={`w-full flex items-center justify-between px-4 py-3 sm:py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  interval === item.value
                    ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span>{item.label}</span>
                {interval === item.value && <Check className="w-4 h-4 text-sky-600 dark:text-sky-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:opacity-90 transition-all active:scale-95"
          >
            {t.settingsDone}
          </button>
        </div>
      </div>
    </div>
  );
}
