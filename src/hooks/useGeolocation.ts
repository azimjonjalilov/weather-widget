"use client";

import { useState, useCallback } from "react";
import { Coordinates } from "@/types/weather";

interface GeolocationState {
  coords: Coordinates | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    loading: false,
    error: null,
  });

  const getPosition = useCallback((): Promise<Coordinates> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !navigator.geolocation) {
        const errorMsg = "Geolokatsiya brauzeringiz tomonidan qo'llab-quvvatlanmaydi";
        setState({ coords: null, loading: false, error: errorMsg });
        reject(new Error(errorMsg));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: Coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setState({ coords, loading: false, error: null });
          resolve(coords);
        },
        (error) => {
          let errorMsg = "Joylashuvni aniqlab bo'lmadi";
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = "Geolokatsiyaga ruxsat berilmadi";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = "Joylashuv ma'lumoti mavjud emas";
          } else if (error.code === error.TIMEOUT) {
            errorMsg = "So'rov vaqti tugadi";
          }
          setState({ coords: null, loading: false, error: errorMsg });
          reject(new Error(errorMsg));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, []);

  const resetCoords = () => {
    setState({ coords: null, loading: false, error: null });
  };

  return {
    coords: state.coords,
    loading: state.loading,
    error: state.error,
    getPosition,
    resetCoords,
  };
}
