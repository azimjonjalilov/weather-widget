# 🌦️ WeatherInfo PRO — Aniq Ob-havo Platformasi

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat&logo=tailwind_css)](https://tailwindcss.com/)

WeatherInfo — O'zbekiston viloyatlari va butun dunyo bo'yicha real vaqt rejimida har soatlik (24 soat) va 5 kunlik aniq ob-havo ma'lumotlarini taqdim etuvchi zamonaviy, xavfsiz va yuqori tezlikdagi platforma.

---

## ✨ Asosiy Imkoniyatlar (Features)

- 📍 **Avtomatik Geolocation**: Sayt ochilishi bilan foydalanuvchining aniq GPS koordinatalari bo'yicha joriy ob-havoni yuklash.
- ⏰ **24 Soatlik To'liq Prognoz**: Har bir alohida soat uchun harorat, shamol tezligi, yog'ingarchilik ehtimoli va SVG dinamik ikonkalar.
- 📊 **Apple Weather uslubidagi 5 kunlik prognoz**: Min-Max harorat gradient barlari.
- 📈 **Interaktiv Recharts Grafigi**: Kun davomidagi harorat va his etilishi dinamikasi egri chizig'i.
- 🌐 **3 Ta Tilda To'liq Qo'llab-quvvatlash**: O'zbekcha (UZ), Ruscha (RU), Inglizcha (EN) — xalqaro texnik terminlar saqlangan holda.
- 🔍 **Davlat va Viloyat bo'yicha Jonli Qidiruv**: OpenWeatherMap Geocoding API + O'zbekistonning barcha 12 ta viloyati, Toshkent shahri va Qoraqalpog'iston.
- ⌨️ **Klaviatura Boshqaruvi**: `⌘K` / `Ctrl+K` tezkor qidiruv, `↑` va `↓` strelkalari bilan navigatsiya.
- ⭐ **Sevimli Shaharlar**: Brauzer `localStorage` xotirasida saqlanuvchi shahar kartochkalari.
- 🎨 **Glassmorphism & Dinamik Osmon Fonlari**: Ob-havo holatiga qarab avtomatik o'zgaruvchi gradientlar va Dark/Light rejim.
- 🛡️ **Xavfsiz Arxitektura**: OWM API kalitini mijozdan yashiruvchi Server Route Handler (`/api/weather`), CSP va HSTS xavfsizlik sarlavhalari.

---

## 🛠 Texnologiyalar Steki

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Kutubxona**: React 19
- **Til**: TypeScript (100% strict type-safe)
- **Styling**: Tailwind CSS
- **Ikonkalar**: Vektor SVG + Lucide React
- **Vizualizatsiya**: Recharts
- **API**: OpenWeatherMap API & Geocoding API

---

## 🚀 O'rnatish va Ishga Tushirish

1. Repozitoriyani klon qiling:
```bash
git clone https://github.com/azimjonjalilov/weather-dashboard-widget.git
cd weather-dashboard-widget
```

2. Bog'liqliklarni o'rnating:
```bash
npm install
```

3. `.env.local` faylini yarating va API kalitingizni kiriting:
```env
OWM_API_KEY=your_openweathermap_api_key_here
```

4. Ishga tushiring:
```bash
npm run dev
```

Brauzeringizda **http://localhost:3000** manzilini oching.

---

## 👨‍💻 Muallif

**Azimjon Jalilov** — Frontend / Fullstack Developer  
📎 [GitHub Profile](https://github.com/azimjonjalilov)
