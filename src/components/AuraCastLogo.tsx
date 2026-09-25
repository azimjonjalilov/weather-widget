import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function AuraCastLogo({ className = "", size = 32 }: LogoProps) {
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
        <linearGradient id="auraSunGrad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#EC4899" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="auraSkyGrad" x1="12" y1="20" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Outer Atmosphere Glow Ring */}
      <circle cx="24" cy="24" r="21" stroke="url(#auraSunGrad)" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.85" />

      {/* Sun Core */}
      <circle cx="24" cy="24" r="14" fill="url(#auraSunGrad)" />

      {/* Atmospheric Wave / Cloud Curve */}
      <path
        d="M14 28C14 24.6863 16.6863 22 20 22C20.8 22 21.56 22.15 22.25 22.43C23.35 19.8 25.96 18 29 18C33.4183 18 37 21.5817 37 26C37 26.35 36.98 26.7 36.93 27.04C38.71 27.58 40 29.23 40 31.2C40 33.63 38.03 35.6 35.6 35.6H17.4C14.42 35.6 12 33.18 12 30.2C12 29.07 12.35 28.02 12.95 27.16"
        fill="url(#auraSkyGrad)"
        opacity="0.95"
      />
      <path
        d="M17 32C21 28 27 28 31 32"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
