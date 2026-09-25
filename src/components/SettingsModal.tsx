"use client";

import React from "react";
import { X, Sliders, Check } from "lucide-react";
import { WeatherUnit } from "@/types/weather";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: WeatherUnit;
  onChangeUnit: (unit: WeatherUnit) => void;
  interval: number;
  onChangeInterval: (min: number) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  unit,
  onChangeUnit,
  interval,
  onChangeInterval,
}: SettingsModalProps) {
  if (!isOpen) return null;

  const intervals = [
    { label: "O'chirilgan", value: 0 },
    { label: "Har 5 daqiqada", value: 5 },
    { label: "Har 10 daqiqada", value: 10 },
    { label: "Har 30 daqiqada", value: 30 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Ilova Sozlamalari
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Temperature Unit */}
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Harorat Birligi
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChangeUnit("metric")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm border transition-all ${
                unit === "metric"
                  ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {unit === "metric" && <Check className="w-4 h-4" />}
              <span>Selsiy (°C, m/s)</span>
            </button>
            <button
              onClick={() => onChangeUnit("imperial")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm border transition-all ${
                unit === "imperial"
                  ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {unit === "imperial" && <Check className="w-4 h-4" />}
              <span>Farengeyt (°F, mph)</span>
            </button>
          </div>
        </div>

        {/* Auto Refresh Interval */}
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Avtomatik Yangilanish Intervali
          </label>
          <div className="space-y-1.5">
            {intervals.map((item) => (
              <button
                key={item.value}
                onClick={() => onChangeInterval(item.value)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  interval === item.value
                    ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span>{item.label}</span>
                {interval === item.value && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:opacity-90 transition-all"
          >
            Tayyor
          </button>
        </div>
      </div>
    </div>
  );
}
