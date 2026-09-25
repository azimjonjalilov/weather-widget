import React from "react";

export function WeatherSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-64 sm:h-72 w-full rounded-3xl bg-slate-200/70 dark:bg-slate-800/60 backdrop-blur-md" />

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-slate-200/60 dark:bg-slate-800/50"
          />
        ))}
      </div>

      {/* Forecast & Chart Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-72 rounded-2xl bg-slate-200/60 dark:bg-slate-800/50" />
        <div className="h-72 rounded-2xl bg-slate-200/60 dark:bg-slate-800/50" />
      </div>
    </div>
  );
}
