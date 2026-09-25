# 🌦️ WeatherInfo PRO — Real-Time Weather Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat&logo=tailwind_css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**WeatherInfo PRO** is a modern, responsive, and high-performance weather intelligence application. Powered by Next.js 16 (App Router & Turbopack), React 19, TypeScript, and OpenWeatherMap APIs, it delivers hyper-accurate 24-hour hourly breakdowns and 5-day weather forecasts across regions of Uzbekistan and worldwide.

---

## ✨ Key Features

- 📍 **Instant Auto-Geolocation**: Automatically detects the user's real-time GPS coordinates upon opening the app and delivers precise local weather data.
- ⏰ **24-Hour Continuous Hourly Forecast**: Full breakdown for every individual hour featuring dynamic day/night vector SVG icons, temperature, precipitation chance (`💧 %`), and wind speed.
- 📅 **5-Day Interactive Showcase Cards**: Redesigned intuitive forecast cards featuring:
  - ☀️ **Day Temperature** badge (warm golden highlight)
  - 🌙 **Night Temperature** badge (cool indigo highlight)
  - 💧 Rain probability, 💨 wind velocity, and 🌊 relative humidity.
- 📈 **Interactive Temperature Curve (Recharts AreaChart)**: Continuous smooth temperature and "feels-like" trendlines with interactive glassmorphism tooltips.
- 🌐 **Full 3-Language Internationalization (i18n)**:
  - 🇺🇿 **Uzbek** (O'zbekcha)
  - 🇷🇺 **Russian** (Русский)
  - 🇬🇧 **English** (English)  
  *(International technical terms such as `hPa`, `m/s`, `mph`, `°C`, `°F`, `km`, `PRO` are preserved intact)*.
- 🔍 **Country & Province Live Autocomplete**: Real-time server-side Geocoding API filtering exclusively by country and state/province + complete coverage of all 12 regions of Uzbekistan, Tashkent city, and Karakalpakstan.
- ⌨️ **Keyboard Navigation (Spotlight / Raycast UX)**: Global `⌘K` / `Ctrl+K` shortcut to focus search, with `↑` and `↓` arrow keys to navigate suggestions.
- ⭐ **Favorite Cities**: Persistent quick-access city chips saved directly to `localStorage`.
- 🎨 **Glassmorphism & Dynamic Sky Gradients**: Adaptive color palettes and gradients that respond to real-time atmospheric conditions (Sunny, Overcast, Rain, Snow, Thunderstorm) with Dark & Light theme support.
- 🛡️ **Enterprise Security Standards**: Server Route Handler (`/api/weather`) that securely encapsulates OpenWeatherMap API keys, enforced with strict HTTP security headers (HSTS, X-Frame-Options Clickjacking defense, CSP, and no-sniff policies).

---

## 🛠 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | **Next.js 16 (App Router, Turbopack)** |
| **Library** | **React 19** |
| **Language** | **TypeScript 5 (Strict type-safe)** |
| **Styling** | **Tailwind CSS (Glassmorphism & Dark Mode)** |
| **Icons** | **Dynamic SVG Vector Weather Icons + Lucide React** |
| **Visualization** | **Recharts (AreaChart)** |
| **Data APIs** | **OpenWeatherMap One Call & Direct Geocoding API** |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.17 or later recommended).

### Installation

1. Clone the repository:
```bash
git clone https://github.com/azimjonjalilov/weather-widget.git
cd weather-widget
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
```env
OWM_API_KEY=your_openweathermap_api_key_here
```
*(Reference provided in `.env.example`).*

4. Run the development server:
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

5. Build for production:
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```plaintext
src/
├── app/
│   ├── api/
│   │   ├── geo/route.ts         # Server Geocoding API (Country & Province search)
│   │   └── weather/route.ts     # Secure OWM API Proxy & 24h hourly interpolation
│   ├── icon.svg                 # Vector Favicon
│   ├── manifest.ts              # PWA Web App Manifest
│   ├── robots.ts & sitemap.ts   # SEO indexing configuration
│   ├── globals.css              # Tailwind global styling & glassmorphism
│   ├── layout.tsx               # Root layout, OpenGraph & SEO metadata
│   └── page.tsx                 # Main dashboard view
├── components/
│   ├── Header.tsx               # Brand logo, language switcher, GPS, C/F & theme toggle
│   ├── CitySearch.tsx           # Live search, ⌘K shortcut, recent searches history
│   ├── FavoritesBar.tsx         # Saved favorite locations
│   ├── HeroWeatherCard.tsx      # Current conditions, large temp, atmospheric gradient
│   ├── MetricsGrid.tsx          # Wind compass, humidity, pressure, visibility, sunrise/sunset
│   ├── HourlyForecast.tsx       # 24-hour horizontal scrollable slider
│   ├── DailyForecast.tsx        # 5-day showcase cards with Day/Night badges
│   ├── WeatherChart.tsx         # Recharts temperature & feels-like curve
│   ├── SettingsModal.tsx        # Auto-refresh interval & unit configuration
│   ├── WeatherIcon.tsx          # Dynamic SVG vector weather icon renderer
│   └── WeatherScopeLogo.tsx     # Official WeatherInfo vector logo
├── hooks/
│   ├── useWeather.ts            # Weather data fetching, caching & multilingual synchronization
│   ├── useGeolocation.ts        # HTML5 Geolocation API hook
│   └── useFavorites.ts          # LocalStorage-backed favorites management
├── lib/
│   └── i18n.ts                  # Comprehensive 3-language dictionary (UZ, RU, EN)
└── types/
    └── weather.ts               # Strict TypeScript interfaces & types
```

---

## 👨‍💻 Author

**Azimjon Jalilov** — Fullstack Developer  
🌐 [Website: azimjonjalilov.uz](https://azimjonjalilov.uz)  
📎 [GitHub Profile](https://github.com/azimjonjalilov)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
