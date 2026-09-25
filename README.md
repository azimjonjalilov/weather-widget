# 🌦️ WeatherInfo PRO — Zamonaviy Ob-havo Platformasi

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat&logo=tailwind_css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**WeatherInfo** — O'zbekiston viloyatlari va butun dunyo bo'ylab real vaqt rejimida har soatlik (24 soat) va 5 kunlik aniq ob-havo ma'lumotlarini taqdim etuvchi zamonaviy, tezkor va xavfsiz platforma.

---

## ✨ Asosiy Imkoniyatlar (Key Features)

- 📍 **Avtomatik Geolocation**: Sayt ochilishi bilanoq foydalanuvchining aniq GPS koordinatalari bo'yicha joriy ob-havoni bir zumda yuklash.
- ⏰ **24 Soatlik Aniq Soatlik Prognoz**: Har bir alohida soat uchun real ob-havo holatiga (kunduzgi quyosh yoki tungi oy/bulut) mos keluvchi dinamik SVG vektor ikonkalar, harorat, yog'ingarchilik ehtimoli va shamol tezligi.
- 📅 **5 Kunlik Interaktiv Kartalar (Showcase Grid)**: Har bir kun uchun:
  - ☀️ **Kunduzgi harorat** (aniq iliq oltin badge)
  - 🌙 **Tungi harorat** (sokin moviy badge)
  - 💧 Yog'ingarchilik ehtimoli, 💨 shamol tezligi va 🌊 namlik darajasi.
- 📈 **Interaktiv Harorat Grafigi (Recharts AreaChart)**: Kun davomidagi harorat va his etilishi dinamikasini ko'rsatuvchi silliq gradientli egri chiziq va interaktiv tooltip.
- 🌐 **3 Ta Tilda To'liq Qo'llab-quvvatlash**:
  - 🇺🇿 **O'zbekcha** (UZ)
  - 🇷🇺 **Русский** (RU)
  - 🇬🇧 **English** (EN)
  *(Xalqaro texnik terminlar: `hPa`, `m/s`, `mph`, `°C`, `°F`, `km`, `PRO` o'zgarishsiz saqlanadi)*.
- 🔍 **Davlat va Viloyat bo'yicha Jonli Qidiruv**: OpenWeatherMap Geocoding API orqali faqat davlat va viloyat darajasida toza qidiruv + O'zbekistonning barcha 12 ta viloyati, Toshkent shahri va Qoraqalpog'iston Respublikasi.
- ⌨️ **Klaviatura Boshqaruvi (Spotlight UX)**: `⌘K` / `Ctrl+K` tezkor qidiruv, `↑` va `↓` strelkalari orqali natijalar bo'ylab navigatsiya.
- ⭐ **Sevimli Shaharlar (Favorites)**: Brauzerning `localStorage` xotirasida saqlanuvchi tezkor shahar chiplari.
- 🎨 **Glassmorphism & Dinamik Osmon Fonlari**: Ob-havo holatiga qarab avtomatik o'zgaruvchi gradientlar va Dark / Light rejim.
- 🛡️ **Xavfsiz Arxitektura**: OWM API kalitini mijozdan yashiruvchi Server Route Handler (`/api/weather`), Clickjacking himoyasi (`X-Frame-Options: SAMEORIGIN`), HSTS va no-sniff sarlavhalari.

---

## 🛠 Texnologiyalar Steki (Tech Stack)

| Yo'nalish | Texnologiya |
| :--- | :--- |
| **Framework** | **Next.js 16 (App Router, Turbopack)** |
| **Kutubxona** | **React 19** |
| **Dasturlash Tili** | **TypeScript 5 (100% strict type-safe)** |
| **Styling** | **Tailwind CSS** (Glassmorphism & Dark Mode) |
| **Ikonkalar** | **Dinamik SVG Vektor Ikonkalar + Lucide React** |
| **Grafiklar** | **Recharts** (AreaChart) |
| **API** | **OpenWeatherMap One Call & Geocoding API** |

---

## 🚀 O'rnatish va Ishga Tushirish (Installation)

1. Repozitoriyani klon qiling:
```bash
git clone https://github.com/azimjonjalilov/weather-widget.git
cd weather-widget
```

2. Bog'liqliklarni o'rnating:
```bash
npm install
```

3. `.env.local` faylini yarating va OpenWeatherMap API kalitingizni kiriting:
```env
OWM_API_KEY=your_openweathermap_api_key_here
```
*(Namunaviy fayl sifatida `.env.example` mavjud).*

4. Dasturni ishga tushiring:
```bash
npm run dev
```

Brauzeringizda **[http://localhost:3000](http://localhost:3000)** manzilini oching.

5. Production uchun yig'ish (Build):
```bash
npm run build
npm run start
```

---

## 📂 Papkalar Tuzilishi (Project Structure)

```plaintext
src/
├── app/
│   ├── api/
│   │   ├── geo/route.ts         # Jonli viloyat/davlat qidiruvi (Geocoding API)
│   │   └── weather/route.ts     # Xavfsiz OWM API Proxy & 24h interpolyatsiya
│   ├── icon.svg                 # Vektor Favicon
│   ├── manifest.ts              # PWA Web Manifest
│   ├── robots.ts & sitemap.ts   # SEO qidiruv tizimlari indeksatsiyasi
│   ├── globals.css              # Tailwind global uslublar
│   ├── layout.tsx               # Root Layout, SEO metadata, ThemeProvider
│   └── page.tsx                 # Asosiy sahifa
├── components/
│   ├── Header.tsx               # Logo, til tanlash, GPS, C/F va Dark mode
│   ├── CitySearch.tsx           # Jonli qidiruv, ⌘K, oxirgi qidiruvlar tarixi
│   ├── FavoritesBar.tsx         # Sevimli shaharlar chiplari
│   ├── HeroWeatherCard.tsx      # Joriy harorat, osmon holati, dinamik gradient
│   ├── MetricsGrid.tsx          # Shamol, namlik, bosim, ko'rinuvchanlik, quyosh
│   ├── HourlyForecast.tsx       # 24 soatlik har soatlik silliq slider
│   ├── DailyForecast.tsx        # 5 kunlik kartalar (Kunduz/Tun ko'rsatkichlari)
│   ├── WeatherChart.tsx         # Harorat dinamikasi silliq grafigi
│   ├── SettingsModal.tsx        # Yangilanish intervali va birliklar sozlamasi
│   ├── WeatherIcon.tsx          # Sifatli SVG ob-havo vektor ikonkalari
│   └── WeatherScopeLogo.tsx     # WeatherInfo rasmiy logotipi
├── hooks/
│   ├── useWeather.ts            # Ob-havoni yuklash, kesh va ko'p tilli boshqaruv
│   ├── useGeolocation.ts        # Avtomatik GPS geolokatsiyani aniqlash
│   └── useFavorites.ts          # Sevimli shaharlar (LocalStorage)
├── lib/
│   └── i18n.ts                  # 3 ta tildagi (UZ, RU, EN) to'liq lug'at
└── types/
    └── weather.ts               # Qat'iy TypeScript interfeyslari
```

---

## 👨‍💻 Muallif (Author)

**Azimjon Jalilov** — Frontend / Fullstack Developer  
📎 [GitHub Profile](https://github.com/azimjonjalilov)
