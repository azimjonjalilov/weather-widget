"use client";

import { useState, useEffect } from "react";
import { FavoriteCity } from "@/types/weather";

const STORAGE_KEY = "weatherpulse_favorites";

const DEFAULT_FAVORITES: FavoriteCity[] = [];

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites(DEFAULT_FAVORITES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FAVORITES));
      }
    } catch (e) {
      console.error("LocalStorage error:", e);
      setFavorites(DEFAULT_FAVORITES);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addFavorite = (city: { name: string; country?: string; temp?: number; condition?: string; icon?: string }) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.name.toLowerCase() === city.name.toLowerCase())) {
        return prev;
      }
      const updated = [
        ...prev,
        {
          id: Date.now().toString(),
          name: city.name,
          country: city.country || "",
          temp: city.temp,
          condition: city.condition,
          icon: city.icon,
        },
      ];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeFavorite = (name: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.name.toLowerCase() !== name.toLowerCase());
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isFavorite = (cityName: string) => {
    return favorites.some((f) => f.name.toLowerCase() === cityName.toLowerCase());
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    isLoaded,
  };
}
