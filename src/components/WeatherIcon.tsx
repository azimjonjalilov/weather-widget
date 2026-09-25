"use client";

import React from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  CloudDrizzle,
  Moon,
  CloudMoon,
} from "lucide-react";

interface WeatherIconProps {
  code?: string;
  condition?: string;
  size?: number;
  className?: string;
  isNight?: boolean;
}

export function WeatherIcon({
  code = "01d",
  condition = "Clear",
  size = 36,
  className = "",
  isNight = false,
}: WeatherIconProps) {
  const c = (condition || "").toLowerCase();
  const rawCode = (code || "01d").toLowerCase();
  const isNightTime = isNight || rawCode.endsWith("n");

  // 1. Chaqmoq / Momaqaldiroq (Thunderstorm: 11d, 11n)
  if (rawCode.startsWith("11") || c.includes("thunder") || c.includes("storm")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudLightning
          size={size}
          className="text-amber-400 fill-amber-400/30 drop-shadow-md animate-pulse"
        />
      </div>
    );
  }

  // 2. Qor (Snow: 13d, 13n)
  if (rawCode.startsWith("13") || c.includes("snow") || c.includes("ice") || c.includes("sleet")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Snowflake
          size={size}
          className="text-sky-300 fill-sky-300/30 drop-shadow-md animate-spin-slow"
        />
      </div>
    );
  }

  // 3. Kuchli Yomg'ir (Rain: 10d, 10n)
  if (rawCode.startsWith("10") || (c.includes("rain") && !c.includes("drizzle") && !c.includes("light"))) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudRain
          size={size}
          className="text-blue-500 fill-blue-500/20 drop-shadow-md"
        />
      </div>
    );
  }

  // 4. Mayda yomg'ir / Shivalash (Drizzle: 09d, 09n)
  if (rawCode.startsWith("09") || c.includes("drizzle") || c.includes("light rain") || c.includes("shower")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudDrizzle
          size={size}
          className="text-cyan-400 fill-cyan-400/20 drop-shadow-md"
        />
      </div>
    );
  }

  // 5. Tuman / Tutun (Mist, Fog, Haze, Dust: 50d, 50n)
  if (rawCode.startsWith("50") || c.includes("mist") || c.includes("fog") || c.includes("haze") || c.includes("dust") || c.includes("smoke")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudFog
          size={size}
          className="text-slate-400 fill-slate-400/25 drop-shadow-sm"
        />
      </div>
    );
  }

  // 6. Qalin bulut / Overcast (Broken / Scattered clouds: 03d, 03n, 04d, 04n)
  if (rawCode.startsWith("04") || rawCode.startsWith("03") || c.includes("overcast") || c.includes("broken clouds") || c.includes("scattered")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Cloud
          size={size}
          className="text-slate-400 dark:text-slate-300 fill-slate-300/35 drop-shadow-md"
        />
      </div>
    );
  }

  // 7. Qisman bulutli (Few clouds: 02d, 02n)
  if (rawCode.startsWith("02") || c.includes("few clouds") || (c.includes("clouds") && !c.includes("broken") && !c.includes("overcast"))) {
    if (isNightTime) {
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <CloudMoon
            size={size}
            className="text-indigo-300 fill-indigo-300/25 drop-shadow-md"
          />
        </div>
      );
    }
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudSun
          size={size}
          className="text-amber-500 fill-amber-400/30 drop-shadow-md"
        />
      </div>
    );
  }

  // 8. Ochiq osmon (Clear sky: 01d, 01n)
  if (isNightTime) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Moon
          size={size}
          className="text-amber-200 fill-amber-200/30 drop-shadow-lg"
        />
      </div>
    );
  }

  // Standart kunduzgi ochiq quyosh
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Sun
        size={size}
        className="text-amber-500 fill-amber-400/35 drop-shadow-lg animate-spin-slow"
      />
    </div>
  );
}
