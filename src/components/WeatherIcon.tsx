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
  size = 40,
  className = "",
  isNight = false,
}: WeatherIconProps) {
  const c = condition.toLowerCase();
  const isNightCode = code.endsWith("n") || isNight;

  // 1. Chaqmoq / Thunderstorm
  if (code.startsWith("11") || c.includes("thunder")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudLightning
          size={size}
          className="text-amber-400 fill-amber-400/20 drop-shadow-md animate-pulse"
        />
      </div>
    );
  }

  // 2. Qor / Snow
  if (code.startsWith("13") || c.includes("snow")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Snowflake
          size={size}
          className="text-sky-200 fill-sky-200/30 drop-shadow-md animate-spin-slow"
        />
      </div>
    );
  }

  // 3. Kuchli Yomg'ir / Rain
  if (code.startsWith("10") || c.includes("heavy rain")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudRain
          size={size}
          className="text-blue-400 fill-blue-400/20 drop-shadow-md"
        />
      </div>
    );
  }

  // 4. Mayda yomg'ir / Drizzle
  if (code.startsWith("09") || c.includes("rain") || c.includes("drizzle")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudDrizzle
          size={size}
          className="text-sky-400 fill-sky-400/20 drop-shadow-md"
        />
      </div>
    );
  }

  // 5. Tuman / Mist / Fog / Haze
  if (code.startsWith("50") || c.includes("mist") || c.includes("fog") || c.includes("haze")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudFog
          size={size}
          className="text-slate-300 fill-slate-300/20 drop-shadow-sm"
        />
      </div>
    );
  }

  // 6. Qalin bulut / Broken clouds
  if (code.startsWith("04") || code.startsWith("03") || c.includes("cloud")) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Cloud
          size={size}
          className="text-slate-300 dark:text-slate-200 fill-slate-300/30 drop-shadow-md"
        />
      </div>
    );
  }

  // 7. Qisman bulutli / Few clouds
  if (code.startsWith("02")) {
    if (isNightCode) {
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <CloudMoon
            size={size}
            className="text-indigo-200 fill-indigo-200/20 drop-shadow-md"
          />
        </div>
      );
    }
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <CloudSun
          size={size}
          className="text-amber-400 fill-amber-400/30 drop-shadow-md"
        />
      </div>
    );
  }

  // 8. Ochiq osmon / Clear Sky
  if (isNightCode) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Moon
          size={size}
          className="text-amber-200 fill-amber-200/20 drop-shadow-md"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Sun
        size={size}
        className="text-amber-400 fill-amber-400/30 drop-shadow-lg animate-spin-slow"
      />
    </div>
  );
}
