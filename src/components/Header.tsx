"use client";

import React from "react";
import { CloudSun, Navigation, Moon, Sun, Settings, RefreshCw } from "lucide-react";
import { WeatherUnit } from "@/types/weather";

interface HeaderProps {
  unit: WeatherUnit;
  onToggleUnit: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onGpsClick: () => void;
  gpsLoading: boolean;
  onOpenSettings: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export function Header({
  unit,
  onToggleUnit,
  isDark,
  onToggleTheme,
  onGpsClick,
  gpsLoading,
  onOpenSettings,
  onRefresh,
  refreshing,
}: HeaderProps) {
  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white/50 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/40 dark:border-slate-800/80 shadow-sm transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-2xl shadow-md shadow-sky-500/20 text-white animate-float">
          <CloudSun className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
            WeatherPulse
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Aniqlik va zamonaviy ob-havo
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* GPS Button */}
        <button
          onClick={onGpsClick}
          disabled={gpsLoading}
          title="Mening joylashuvim"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-sky-50 dark:bg-slate-800/80 hover:bg-sky-100 dark:hover:bg-slate-700/80 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-slate-700 transition-all duration-200 active:scale-95 disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${gpsLoading ? "animate-spin text-sky-500" : ""}`} />
          <span className="hidden md:inline">Joylashuv</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          title="Yangilash"
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-all duration-200 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-indigo-500" : ""}`} />
        </button>

        {/* Unit Toggle */}
        <button
          onClick={onToggleUnit}
          className="px-3.5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-sm hover:opacity-90 active:scale-95 transition-all duration-200"
          title="Birlikni o'zgartirish"
        >
          {unit === "metric" ? "°C" : "°F"}
        </button>

        {/* Dark/Light Mode */}
        <button
          onClick={onToggleTheme}
          title={isDark ? "Yorug' rejim" : "Tungi rejim"}
          className="p-2.5 rounded-xl text-slate-600 dark:text-amber-400 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-all duration-200 active:scale-95"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Settings Modal Trigger */}
        <button
          onClick={onOpenSettings}
          title="Sozlamalar"
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-all duration-200 active:scale-95"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
