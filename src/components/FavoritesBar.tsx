"use client";

import React from "react";
import { Star, MapPin, X } from "lucide-react";
import { FavoriteCity } from "@/types/weather";

interface FavoritesBarProps {
  favorites: FavoriteCity[];
  currentCity: string;
  onSelectCity: (name: string) => void;
  onRemoveFavorite: (name: string) => void;
  onAddCurrent: () => void;
  isCurrentFavorite: boolean;
}

export function FavoritesBar({
  favorites,
  currentCity,
  onSelectCity,
  onRemoveFavorite,
  onAddCurrent,
  isCurrentFavorite,
}: FavoritesBarProps) {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
      {/* Add / Favorited Button */}
      <button
        onClick={onAddCurrent}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
          isCurrentFavorite
            ? "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800/80 shadow-sm"
            : "bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
        }`}
      >
        <Star className={`w-3.5 h-3.5 ${isCurrentFavorite ? "fill-amber-500 text-amber-500" : ""}`} />
        <span>{isCurrentFavorite ? "Saqlangan" : "Sevimliga qo'shish"}</span>
      </button>

      {/* Favorite Chips */}
      {favorites.map((fav, idx) => {
        const isActive = fav.name.toLowerCase() === (currentCity || "").toLowerCase();
        return (
          <div
            key={`${fav.id || fav.name}-${idx}`}
            className={`group flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent shadow-sm shadow-sky-500/20"
                : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200/70 dark:border-slate-700/70 hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            <button
              onClick={() => onSelectCity(fav.name)}
              className="flex items-center gap-1.5 focus:outline-none"
            >
              <MapPin className={`w-3 h-3 ${isActive ? "text-white" : "text-sky-500"}`} />
              <span>{fav.name}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite(fav.name);
              }}
              className={`p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors ${
                isActive ? "text-white" : "text-slate-400 hover:text-slate-600"
              }`}
              title="O'chirish"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
