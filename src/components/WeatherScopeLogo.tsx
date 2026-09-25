import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function WeatherScopeLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="scopeSun" x1="10" y1="8" x2="34" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="scopeCloud" x1="14" y1="18" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="scopeRing" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" />
          <stop offset="0.5" stopColor="#6366F1" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Radar Scope Outer Pulse Rings */}
      <circle cx="24" cy="24" r="21" stroke="url(#scopeRing)" strokeWidth="2" strokeDasharray="5 3" opacity="0.75" />
      <circle cx="24" cy="24" r="16" stroke="url(#scopeRing)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

      {/* Golden Sun */}
      <circle cx="20" cy="18" r="9" fill="url(#scopeSun)" />
      
      {/* Sun Ray Beams */}
      <path d="M20 5V8M20 28V31M7 18H10M30 18H33M11 9L13 11M27 25L29 27M11 27L13 25M27 11L29 9" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

      {/* Modern Glossy Cloud */}
      <path
        d="M17 34C14.79 34 13 32.21 13 30C13 28.14 14.28 26.58 16.03 26.13C16.01 25.76 16 25.38 16 25C16 20.58 19.58 17 24 17C27.56 17 30.6 19.32 31.64 22.56C32.18 22.21 32.82 22 33.5 22C35.43 22 37 23.57 37 25.5C37 25.75 36.97 26 36.92 26.23C38.68 26.96 40 28.81 40 31C40 33.76 37.76 36 35 36H17Z"
        fill="url(#scopeCloud)"
      />

      {/* Scope Radar Sweep Pointer Line */}
      <line x1="24" y1="24" x2="38" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <circle cx="38" cy="12" r="2.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
    </svg>
  );
}
