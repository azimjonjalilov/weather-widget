import { NextRequest, NextResponse } from "next/server";
import { WeatherResponse, HourlyForecastItem, DailyForecastItem } from "@/types/weather";

const API_KEY = process.env.OWM_API_KEY || "a9ae2ba11a4327cdc44e0838914137bc";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// O'zbek tilidagi ob-havo tavsiflari lug'ati
const UZ_WEATHER_MAP: Record<string, string> = {
  "clear sky": "Quyoshli, musaffo osmon",
  "few clouds": "Kam bulutli",
  "scattered clouds": "Tarqoq bulutli",
  "broken clouds": "Qalin bulutli",
  "overcast clouds": "To'liq bulutli osmon",
  "light rain": "Mayda shivalovchi yomg'ir",
  "moderate rain": "O'rtacha yomg'ir",
  "heavy intensity rain": "Kuchli jala yomg'ir",
  "very heavy rain": "Kuchli yomg'ir",
  "thunderstorm": "Momaqaldiroqli bo'ron",
  "thunderstorm with rain": "Chaqmoq va yomg'ir",
  "snow": "Qorli havo",
  "light snow": "Mayda qor yog'ishi",
  "heavy snow": "Qalin qor yog'ishi",
  "mist": "Yengil tuman",
  "fog": "Qalin tuman",
  "haze": "Xiralashgan havo",
  "dust": "Chang-to'zon",
  "drizzle": "Shivalovchi yomg'ir",
};

function translateDescription(desc: string = "", lang: string = "uz"): string {
  const lower = desc.toLowerCase().trim();
  if (lang === "uz") {
    return UZ_WEATHER_MAP[lower] || desc;
  }
  return desc;
}

// Har bir soat uchun 24 soatlik prognoz yasovchi funksiya
function generate24HourlyForecast(rawList: any[], baseTemp: number, isC: boolean, lang: string = "uz"): HourlyForecastItem[] {
  const result: HourlyForecastItem[] = [];
  const now = new Date();

  if (!rawList || rawList.length === 0) {
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date(now.getTime() + i * 3600 * 1000);
      const hourVal = hourDate.getHours();
      const h = hourVal.toString().padStart(2, "0");
      const isNight = hourVal < 6 || hourVal >= 20;
      const delta = Math.sin((hourVal - 9) / 3.8) * 4;

      const descMap: Record<string, { day: string; night: string }> = {
        uz: { day: "Quyoshli, ochiq osmon", night: "Musaffo tun" },
        ru: { day: "Ясно, солнечно", night: "Ясная ночь" },
        en: { day: "Sunny and clear", night: "Clear night" },
      };
      const d = descMap[lang] || descMap.uz;

      result.push({
        dt: Math.floor(hourDate.getTime() / 1000),
        time: `${h}:00`,
        temp: Math.round(baseTemp + delta),
        feels_like: Math.round(baseTemp + delta - 1),
        pop: Math.round(Math.abs(Math.sin(i)) * 20),
        icon: isNight ? "01n" : "01d",
        description: isNight ? d.night : d.day,
        condition: "Clear",
        wind_speed: +(isC ? 3.0 + (i % 3) * 0.4 : 6.8 + (i % 3)).toFixed(1),
        humidity: Math.round(42 + Math.sin(i) * 12),
      });
    }
    return result;
  }

  for (let i = 0; i < 24; i++) {
    const targetTime = now.getTime() + i * 3600 * 1000;
    const targetDt = Math.floor(targetTime / 1000);
    const hourDate = new Date(targetTime);
    const hourVal = hourDate.getHours();
    const h = hourVal.toString().padStart(2, "0");
    const isNight = hourVal < 6 || hourVal >= 20;

    let closestItem = rawList[0];
    let minDiff = Math.abs(rawList[0].dt - targetDt);

    for (let j = 0; j < rawList.length; j++) {
      const diff = Math.abs(rawList[j].dt - targetDt);
      if (diff < minDiff) {
        minDiff = diff;
        closestItem = rawList[j];
      }
    }

    let prevItem = closestItem;
    let nextItem = closestItem;
    for (let j = 0; j < rawList.length - 1; j++) {
      if (rawList[j].dt <= targetDt && rawList[j + 1].dt >= targetDt) {
        prevItem = rawList[j];
        nextItem = rawList[j + 1];
        break;
      }
    }

    const tSpan = Math.max(1, nextItem.dt - prevItem.dt);
    const factor = Math.min(1, Math.max(0, (targetDt - prevItem.dt) / tSpan));

    const temp = Math.round(prevItem.main.temp + (nextItem.main.temp - prevItem.main.temp) * factor);
    const feels_like = Math.round(prevItem.main.feels_like + (nextItem.main.feels_like - prevItem.main.feels_like) * factor);
    const pop = Math.round(((prevItem.pop || 0) + ((nextItem.pop || 0) - (prevItem.pop || 0)) * factor) * 100);
    const wind_speed = +(closestItem.wind?.speed || 3.5).toFixed(1);
    const humidity = Math.round(prevItem.main.humidity + (nextItem.main.humidity - prevItem.main.humidity) * factor);

    const rawWeather = closestItem.weather?.[0] || {};
    let icon = rawWeather.icon || "01d";
    const condition = rawWeather.main || "Clear";
    let description = rawWeather.description || "Ochiq";

    if (lang === "uz") {
      description = translateDescription(description, "uz");
    }

    const iconCodeNumber = icon.slice(0, 2);
    icon = `${iconCodeNumber}${isNight ? "n" : "d"}`;

    result.push({
      dt: targetDt,
      time: `${h}:00`,
      temp,
      feels_like,
      pop,
      icon,
      description,
      condition,
      wind_speed,
      humidity,
    });
  }

  return result;
}

function getFallbackData(city: string = "Toshkent", unit: "metric" | "imperial" = "metric", lang: string = "uz"): WeatherResponse {
  const isC = unit === "metric";
  const baseTemp = isC ? 22 : 72;
  const now = Math.floor(Date.now() / 1000);

  const fallbackDesc: Record<string, string> = {
    uz: "Quyoshli va musaffo havo",
    ru: "Ясно и солнечно",
    en: "Clear and sunny sky",
  };

  const hourly = generate24HourlyForecast([], baseTemp, isC, lang);

  const daily: DailyForecastItem[] = Array.from({ length: 5 }).map((_, i) => {
    const dateObj = new Date(Date.now() + i * 24 * 3600 * 1000);
    const dayIdx = dateObj.getDay();
    const dateStr = dateObj.toISOString().split("T")[0];

    return {
      date: dateStr,
      dateRaw: dateStr,
      dayName: i === 0 ? "Bugun" : "",
      dayIndex: dayIdx,
      temp_min: Math.round(baseTemp - 5 + i),
      temp_max: Math.round(baseTemp + 4 + i),
      temp_day: Math.round(baseTemp + i),
      condition: i % 2 === 0 ? "Clear" : "Clouds",
      description: fallbackDesc[lang] || fallbackDesc.uz,
      icon: i % 2 === 0 ? "01d" : "03d",
      humidity: 40 + i * 2,
      wind_speed: isC ? 3.8 : 8.5,
      pop: i * 10,
    };
  });

  return {
    current: {
      city: city || "Toshkent",
      country: "UZ",
      coordinates: { lat: 41.2995, lon: 69.2401 },
      temp: baseTemp,
      feels_like: baseTemp - 1,
      temp_min: baseTemp - 4,
      temp_max: baseTemp + 5,
      humidity: 42,
      pressure: 1014,
      wind_speed: isC ? 3.6 : 8.1,
      wind_deg: 240,
      visibility: 10000,
      clouds: 15,
      sunrise: now - 18000,
      sunset: now + 21600,
      description: fallbackDesc[lang] || fallbackDesc.uz,
      icon: "01d",
      condition: "Clear",
      dt: now,
      timezone: 18000,
    },
    hourly,
    daily,
    unit,
    lastUpdated: new Date().toISOString(),
    isFallback: true,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "";
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const unit = (searchParams.get("unit") as "metric" | "imperial") || "metric";
  const lang = searchParams.get("lang") || "uz";

  const isC = unit === "metric";
  // OWM til parametri
  const owmLang = lang === "ru" ? "ru" : "en";

  if (!API_KEY) {
    return NextResponse.json(getFallbackData(city || "Toshkent", unit, lang));
  }

  try {
    let currentUrl = "";
    let forecastUrl = "";

    if (lat && lon) {
      currentUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&lang=${owmLang}&appid=${API_KEY}`;
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&lang=${owmLang}&appid=${API_KEY}`;
    } else {
      const qCity = city.trim() || "Toshkent";
      currentUrl = `${BASE_URL}/weather?q=${encodeURIComponent(qCity)}&units=${unit}&lang=${owmLang}&appid=${API_KEY}`;
      forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(qCity)}&units=${unit}&lang=${owmLang}&appid=${API_KEY}`;
    }

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl, { next: { revalidate: 300 } }),
      fetch(forecastUrl, { next: { revalidate: 300 } }),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json(getFallbackData(city || "Toshkent", unit, lang));
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    let rawDesc = currentData.weather?.[0]?.description || "Ochiq";
    if (lang === "uz") {
      rawDesc = translateDescription(rawDesc, "uz");
    }

    const current = {
      city: currentData.name,
      country: currentData.sys?.country || "",
      coordinates: {
        lat: currentData.coord?.lat || 0,
        lon: currentData.coord?.lon || 0,
      },
      temp: Math.round(currentData.main.temp),
      feels_like: Math.round(currentData.main.feels_like),
      temp_min: Math.round(currentData.main.temp_min),
      temp_max: Math.round(currentData.main.temp_max),
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      wind_speed: currentData.wind?.speed || 0,
      wind_deg: currentData.wind?.deg || 0,
      visibility: currentData.visibility || 10000,
      clouds: currentData.clouds?.all || 0,
      sunrise: currentData.sys?.sunrise || 0,
      sunset: currentData.sys?.sunset || 0,
      description: rawDesc,
      icon: currentData.weather?.[0]?.icon || "01d",
      condition: currentData.weather?.[0]?.main || "Clear",
      dt: currentData.dt,
      timezone: currentData.timezone || 0,
    };

    const rawList = forecastData.list || [];
    const hourly = generate24HourlyForecast(rawList, current.temp, isC, lang);

    // 5 kunlik prognoz guruhlash
    const dailyMap: { [key: string]: any[] } = {};

    rawList.forEach((item: any) => {
      const dateStr = item.dt_txt.split(" ")[0];
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = [];
      }
      dailyMap[dateStr].push(item);
    });

    const dailyKeys = Object.keys(dailyMap).slice(0, 5);
    const daily: DailyForecastItem[] = dailyKeys.map((dateKey, index) => {
      const dayItems = dailyMap[dateKey];
      const temps = dayItems.map((it: any) => it.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      const midItem = dayItems[Math.floor(dayItems.length / 2)] || dayItems[0];
      const dateObj = new Date(dateKey);
      const dayIdx = dateObj.getDay();

      let itemDesc = midItem.weather?.[0]?.description || "Ochiq";
      if (lang === "uz") {
        itemDesc = translateDescription(itemDesc, "uz");
      }

      return {
        date: dateKey,
        dateRaw: dateKey,
        dayName: index === 0 ? "Bugun" : "",
        dayIndex: dayIdx,
        temp_min: minTemp,
        temp_max: maxTemp,
        temp_day: Math.round(midItem.main.temp),
        condition: midItem.weather?.[0]?.main || "Clear",
        description: itemDesc,
        icon: midItem.weather?.[0]?.icon || "01d",
        humidity: midItem.main.humidity,
        wind_speed: midItem.wind?.speed || 0,
        pop: Math.round((midItem.pop || 0) * 100),
      };
    });

    const response: WeatherResponse = {
      current,
      hourly,
      daily,
      unit,
      lastUpdated: new Date().toISOString(),
      isFallback: false,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Weather fetch server error:", err);
    return NextResponse.json(getFallbackData(city || "Toshkent", unit, lang));
  }
}
