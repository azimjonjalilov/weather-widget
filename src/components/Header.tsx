"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navigation, Moon, Sun, Settings, RefreshCw, Languages, ChevronDown } from "lucide-react";
import { WeatherUnit } from "@/types/weather";
import { AuraCastLogo } from "@/components/AuraCastLogo";
import { Language, translations } from "@/lib/i18n";

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
  lang: Language;
  onChangeLang: (lang: Language) => void;
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
  lang,
  onChangeLang,
}: HeaderProps) {
  const t = translations[lang] || translations.uz;
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "uz", label: "O'zbek", flag: "UZ" },
    { code: "ru", label: "Русский", flag: "RU" },
    { code: "en", label: "English", flag: "GB" },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-slate-800/80 shadow-lg transition-all duration-300">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="p-1 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-sky-500/20 to-indigo-500/20 shadow-md shadow-sky-500/10">
          <AuraCastLogo size={38} className="animate-float" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-500 via-sky-500 to-indigo-500 dark:from-amber-400 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
              {t.appName}
            </h1>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-sky-500/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-400 tracking-wider">
              PRO
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {t.appTagline}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Language Selector Dropdown */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 shadow-sm transition-all"
            title="Tilni o'zgartirish"
          >
            <Languages className="w-3.5 h-3.5 text-sky-500" />
            <span className="uppercase">{lang}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 top-full mt-1.5 z-50 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 p-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onChangeLang(l.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    lang === l.code
                      ? "bg-sky-500 text-white font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{l.label}</span>
                  <span className="text-[10px] font-mono opacity-70">[{l.flag}]</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GPS Location Button */}
        <button
          onClick={onGpsClick}
          disabled={gpsLoading}
          title={t.locationBtn}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/60 transition-all duration-200 active:scale-95 disabled:opacity-50"
        >
          <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? "animate-spin text-sky-500" : ""}`} />
          <span className="hidden md:inline">{gpsLoading ? t.locationLoading : t.locationBtn}</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          title={t.refreshBtn}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-sky-500" : ""}`} />
        </button>

        {/* Unit Toggle */}
        <button
          onClick={onToggleUnit}
          className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm hover:opacity-90 active:scale-95 transition-all duration-200"
          title="Harorat birligi"
        >
          {unit === "metric" ? "°C" : "°F"}
        </button>

        {/* Dark/Light Mode */}
        <button
          onClick={onToggleTheme}
          title={isDark ? t.themeLight : t.themeDark}
          className="p-2 rounded-xl text-slate-600 dark:text-amber-400 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-all active:scale-95"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Settings Modal */}
        <button
          onClick={onOpenSettings}
          title={t.settingsTitle}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-all active:scale-95"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
