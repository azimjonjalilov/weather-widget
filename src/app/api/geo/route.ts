import { NextRequest, NextResponse } from "next/server";

const OWM_API_KEY = process.env.OWM_API_KEY || "a9ae2ba11a4327cdc44e0838914137bc";

// Davlat kodlarini o'zbek tilidagi to'liq nomiga o'girish
const COUNTRY_NAMES: Record<string, string> = {
  UZ: "O'zbekiston",
  US: "AQSH",
  GB: "Buyuk Britaniya",
  AE: "BAA",
  TR: "Turkiya",
  DE: "Germaniya",
  FR: "Fransiya",
  JP: "Yaponiya",
  KR: "Janubiy Koreya",
  KZ: "Qozog'iston",
  RU: "Rossiya",
  CN: "Xitoy",
  IT: "Italiya",
  ES: "Ispaniya",
  CA: "Kanada",
};

// O'zbekistonning barcha 12 ta viloyati, Toshkent shahri va Qoraqalpog'iston
const UZBEKISTAN_REGIONS = [
  { province: "Toshkent shahri", country: "O'zbekiston", countryCode: "UZ", queryName: "Tashkent", lat: 41.2995, lon: 69.2401 },
  { province: "Samarqand viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Samarkand", lat: 39.6542, lon: 66.9597 },
  { province: "Buxoro viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Bukhara", lat: 39.7747, lon: 64.4286 },
  { province: "Andijon viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Andijan", lat: 40.7821, lon: 72.3442 },
  { province: "Farg'ona viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Fergana", lat: 40.3842, lon: 71.7843 },
  { province: "Namangan viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Namangan", lat: 40.9983, lon: 71.6726 },
  { province: "Qashqadaryo viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Qarshi", lat: 38.8606, lon: 65.7891 },
  { province: "Surxondaryo viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Termez", lat: 37.2242, lon: 67.2783 },
  { province: "Xorazm viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Urgench", lat: 41.5500, lon: 60.6333 },
  { province: "Qoraqalpog'iston Respublikasi", country: "O'zbekiston", countryCode: "UZ", queryName: "Nukus", lat: 42.4619, lon: 59.6166 },
  { province: "Navoiy viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Navoiy", lat: 40.0844, lon: 65.3792 },
  { province: "Jizzax viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Jizzakh", lat: 40.1158, lon: 67.8422 },
  { province: "Sirdaryo viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Guliston", lat: 40.4897, lon: 68.7844 },
  { province: "Toshkent viloyati", country: "O'zbekiston", countryCode: "UZ", queryName: "Chirchiq", lat: 41.4689, lon: 69.5822 },
];

// Asosiy xalqaro davlatlar va viloyatlari
const WORLD_REGIONS = [
  { province: "London (Angliya)", country: "Buyuk Britaniya", countryCode: "GB", queryName: "London", lat: 51.5074, lon: -0.1278 },
  { province: "Dubai", country: "BAA", countryCode: "AE", queryName: "Dubai", lat: 25.2048, lon: 55.2708 },
  { province: "Istanbul", country: "Turkiya", countryCode: "TR", queryName: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { province: "New York (Shtat)", country: "AQSH", countryCode: "US", queryName: "New York", lat: 40.7128, lon: -74.0060 },
  { province: "California (Shtat)", country: "AQSH", countryCode: "US", queryName: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { province: "Tokyo", country: "Yaponiya", countryCode: "JP", queryName: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { province: "Olmaota", country: "Qozog'iston", countryCode: "KZ", queryName: "Almaty", lat: 43.2220, lon: 76.8512 },
  { province: "Bavariya (Munxen)", country: "Germaniya", countryCode: "DE", queryName: "Munich", lat: 48.1351, lon: 11.5820 },
  { province: "Île-de-France (Parij)", country: "Fransiya", countryCode: "FR", queryName: "Paris", lat: 48.8566, lon: 2.3522 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("q")?.trim() || "";

  if (!rawQuery || rawQuery.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const queryLower = rawQuery.toLowerCase();

  // 1. O'zbekiston viloyatlari va jahon hududlaridan to'g'ridan-to'g'ri filtr
  const matchedStatic = [...UZBEKISTAN_REGIONS, ...WORLD_REGIONS].filter((item) =>
    item.province.toLowerCase().includes(queryLower) ||
    item.country.toLowerCase().includes(queryLower) ||
    item.queryName.toLowerCase().includes(queryLower)
  );

  // 2. OpenWeatherMap Geocoding API orqali davlat va viloyat darajasida qidiruv
  let apiRegions: any[] = [];
  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(rawQuery)}&limit=8&appid=${OWM_API_KEY}`;
    const res = await fetch(geoUrl, { next: { revalidate: 3600 } });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        // Faqat davlat va viloyat/shtat formatida saralaymiz
        apiRegions = data.map((item: any) => {
          const countryCode = item.country || "";
          const fullCountryName = COUNTRY_NAMES[countryCode] || item.country || "Xorij";
          // Viloyat/shtat nomi bo'lsa uni olamiz, aks holda yirik shahar nomini viloyat deb taqdim etamiz
          const provinceName = item.state ? `${item.state} (${item.name})` : item.name;

          return {
            province: provinceName,
            country: fullCountryName,
            countryCode: countryCode,
            queryName: item.name,
            lat: item.lat,
            lon: item.lon,
          };
        });
      }
    }
  } catch (error) {
    console.error("Geocoding fetch error:", error);
  }

  // 3. Dublikatlarni tozalab, birlashtirish
  const combined = [...matchedStatic, ...apiRegions];
  const uniqueMap = new Map();

  for (const item of combined) {
    const key = `${item.province.toLowerCase()}_${item.countryCode.toLowerCase()}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  }

  const results = Array.from(uniqueMap.values()).slice(0, 8);
  return NextResponse.json({ results });
}
