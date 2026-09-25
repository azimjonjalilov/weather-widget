"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, MapPin, X, Clock, Loader2, Sparkles, Command, Globe2 } from "lucide-react";

interface CitySearchProps {
  onSelectCity: (city: string) => void;
  currentCity: string;
}

interface RegionResult {
  province: string;
  country: string;
  countryCode: string;
  queryName: string;
  lat?: number;
  lon?: number;
}

const RECENT_KEY = "weatherpulse_recent_regions";

// Dastlabki O'zbekiston viloyatlari ro'yxati
const UZBEKISTAN_PROVINCES: RegionResult[] = [
  { province: "Toshkent shahri", country: "O'zbekiston", countryCode: "UZ", queryName: "Tashkent" },
  { province: "Samarqand viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Samarkand" },
  { province: "Buxoro viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Bukhara" },
  { province: "Andijon viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Andijan" },
  { province: "Farg'ona viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Fergana" },
  { province: "Namangan viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Namangan" },
  { province: "Qashqadaryo viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Qarshi" },
  { province: "Surxondaryo viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Termez" },
  { province: "Xorazm viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Urgench" },
  { province: "Qoraqalpog'iston Respublikasi", country: "O'zbekiston", countryCode: "UZ", queryName: "Nukus" },
  { province: "Navoiy viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Navoiy" },
  { province: "Jizzax viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Jizzakh" },
  { province: "Sirdaryo viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Guliston" },
  { province: "Toshkent viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Chirchiq" },
];

function getCountryFlag(countryCode?: string) {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function CitySearch({ onSelectCity, currentCity }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResults, setApiResults] = useState<RegionResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<{ province: string; queryName: string; country: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Oxirgi qidirilgan viloyat va davlatlarni yuklash
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Tashqariga bosilganda yopish
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Jonli avtoto'ldirish (Faqat davlat va viloyat bo'yicha)
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setApiResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geo?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setApiResults(data.results || []);
        }
      } catch (err) {
        console.error("Geo search failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Oxirgi qidiruvlarga saqlash
  const saveToRecent = useCallback((item: { province: string; queryName: string; country: string }) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((p) => p.province.toLowerCase() !== item.province.toLowerCase());
      const updated = [item, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  const removeRecent = (e: React.MouseEvent, provinceName: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((p) => p.province.toLowerCase() !== provinceName.toLowerCase());
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelect = (item: RegionResult) => {
    onSelectCity(item.queryName);
    saveToRecent({ province: item.province, queryName: item.queryName, country: item.country });
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  // Ko'rsatiladigan ro'yxat (Query bo'lsa qidiruv natijalari, bo'lmasa O'zbekiston viloyatlari)
  const displayResults: RegionResult[] = query.trim().length >= 2
    ? apiResults.length > 0
      ? apiResults
      : UZBEKISTAN_PROVINCES.filter((item) =>
          item.province.toLowerCase().includes(query.toLowerCase()) ||
          item.country.toLowerCase().includes(query.toLowerCase())
        )
    : UZBEKISTAN_PROVINCES;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < displayResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayResults.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && displayResults[selectedIndex]) {
        handleSelect(displayResults[selectedIndex]);
      } else if (query.trim()) {
        onSelectCity(query.trim());
        setIsOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      {/* Input bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Davlat yoki viloyat nomini qidiring (masalan: Samarqand viloyati, O'zbekiston)..."
          className="w-full pl-11 pr-24 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 transition-all duration-200"
        />

        {/* Right side controls */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {isLoading && (
            <Loader2 className="w-4 h-4 text-sky-500 animate-spin mr-1" />
          )}

          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setApiResults([]);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <Command className="w-3 h-3" /> K
            </kbd>
          )}
        </div>
      </div>

      {/* Dropdown Ro'yxat */}
      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Oxirgi qidirilgan viloyatlar */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Oxirgi ko'rilgan viloyatlar
                </span>
                <button
                  type="button"
                  onClick={clearAllRecent}
                  className="text-[11px] font-normal text-slate-400 hover:text-red-500 transition-colors"
                >
                  Tozalash
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 px-2 pt-1 pb-1">
                {recentSearches.map((item) => (
                  <div
                    key={item.province}
                    onClick={() => handleSelect({ province: item.province, queryName: item.queryName, country: item.country, countryCode: "" })}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs rounded-lg cursor-pointer transition-colors"
                  >
                    <span>{item.province}</span>
                    <button
                      type="button"
                      onClick={(e) => removeRecent(e, item.province)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      title="O'chirish"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Header */}
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              {query.trim().length >= 2 ? (
                <>
                  <Globe2 className="w-3.5 h-3.5 text-sky-500" />
                  Viloyat va Davlat natijalari
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  O'zbekiston viloyatlari
                </>
              )}
            </span>
            <span className="text-[11px] text-slate-400">
              Tanlash: <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">↵ Enter</kbd>
            </span>
          </div>

          {/* Natijalar ro'yxati: Viloyat va Davlat */}
          <div className="max-h-64 overflow-y-auto p-1.5 space-y-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
            {displayResults.length > 0 ? (
              displayResults.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const isCurrent = currentCity.toLowerCase() === item.queryName.toLowerCase() ||
                                  currentCity.toLowerCase() === item.province.toLowerCase();

                return (
                  <button
                    key={`${item.province}-${item.countryCode}-${idx}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-all duration-150 ${
                      isSelected
                        ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl select-none">
                        {getCountryFlag(item.countryCode)}
                      </span>
                      <div>
                        {/* Viloyat nomi */}
                        <div className="font-semibold text-sm">
                          {item.province}
                        </div>
                        {/* Davlat nomi */}
                        <div
                          className={`text-xs flex items-center gap-1 ${
                            isSelected
                              ? "text-sky-100"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          <span>{item.country}</span>
                          {item.countryCode && (
                            <span className="opacity-75 font-mono">({item.countryCode})</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {isCurrent && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          isSelected
                            ? "bg-white text-sky-600"
                            : "bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400"
                        }`}
                      >
                        Joriy
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-6 text-center">
                <MapPin className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2 stroke-1" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  "{query}" bo'yicha viloyat yoki davlat topilmadi
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Viloyat yoki davlat nomini to'liqroq yozib ko'ring
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
