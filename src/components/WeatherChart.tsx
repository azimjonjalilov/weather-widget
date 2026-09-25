"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HourlyForecastItem, WeatherUnit } from "@/types/weather";

interface WeatherChartProps {
  hourly: HourlyForecastItem[];
  unit: WeatherUnit;
  isDark: boolean;
}

export function WeatherChart({ hourly, unit, isDark }: WeatherChartProps) {
  const [mounted, setMounted] = useState(false);
  const tempUnit = unit === "metric" ? "°C" : "°F";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hourly || hourly.length === 0) {
    return (
      <div className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-white/30 dark:border-slate-800/70 shadow-sm">
        <div className="h-64 w-full bg-slate-100/50 dark:bg-slate-800/40 rounded-2xl animate-pulse" />
      </div>
    );
  }

  const chartData = hourly.map((item) => ({
    time: item.time,
    temp: item.temp,
    feels_like: item.feels_like,
    pop: item.pop,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs">
          <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
          <p className="text-sky-600 dark:text-sky-400 font-bold">
            Harorat: {payload[0].value}{tempUnit}
          </p>
          {payload[1] && (
            <p className="text-indigo-500 font-medium">
              His etilishi: {payload[1].value}{tempUnit}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-white/30 dark:border-slate-800/70 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Harorat dinamikasi
          </h3>
          <p className="text-xs text-slate-400">Kun davomidagi o'zgarish grafigi</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-sky-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Harorat</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span>His etilishi</span>
          </div>
        </div>
      </div>

      <div className="h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height={224}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="feelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke={isDark ? "#64748b" : "#94a3b8"}
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={isDark ? "#64748b" : "#94a3b8"}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit={tempUnit}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#0ea5e9"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#tempGradient)"
            />
            <Area
              type="monotone"
              dataKey="feels_like"
              stroke="#818cf8"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#feelGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
