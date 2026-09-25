import { NextRequest, NextResponse } from "next/server";
import { WeatherResponse, HourlyForecastItem, DailyForecastItem } from "@/types/weather";

const API_KEY = process.env.OWM_API_KEY || "a9ae2ba11a4327cdc44e0838914137bc";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Har bir soat uchun 24 ta soatlik ma'lumot yasovchi interpolyatsiya funksiyasi
function generate24HourlyForecast(rawList: any[], baseTemp: number, isC: boolean): HourlyForecastItem[] {
  const result: HourlyForecastItem[] = [];
  const now = new Date();
  const currentHour = now.getHours();

  if (!rawList || rawList.length === 0) {
    // Fallback 24 soat
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date(now.getTime() + i * 3600 * 1000);
      const h = hourDate.getHours().toString().padStart(2, "0");
      const delta = Math.sin((currentHour + i) / 3.8) * 4;
      const isNight = hourDate.getHours() < 6 || hourDate.getHours() > 20;

      result.push({
        dt: Math.floor(hourDate.getTime() / 1000),
        time: `${h}:00`,
        temp: Math.round(baseTemp + delta),
        feels_like: Math.round(baseTemp + delta - 1),
        pop: Math.round(Math.abs(Math.sin(i)) * 25),
        icon: isNight ? "01n" : "01d",
        description: isNight ? "Ochiq tun" : "Quyoshli havo",
        condition: "Clear",
        wind_speed: +(isC ? 3.0 + (i % 3) * 0.5 : 7.0 + (i % 3)).toFixed(1),
        humidity: Math.round(40 + Math.sin(i) * 15),
      });
    }
    return result;
  }

  // OWM 3 soatlik nuqtalarini har soatga interpolyatsiya qilish
  for (let i = 0; i < 24; i++) {
    const targetTime = now.getTime() + i * 3600 * 1000;
    const targetDt = Math.floor(targetTime / 1000);
    const hourDate = new Date(targetTime);
    const h = hourDate.getHours().toString().padStart(2, "0");

    // Eng yaqin OWM nuqtalarini topamiz
    let prevItem = rawList[0];
    let nextItem = rawList[0];

    for (let j = 0; j < rawList.length - 1; j++) {
      if (rawList[j].dt <= targetDt && rawList[j + 1].dt >= targetDt) {
        prevItem = rawList[j];
        nextItem = rawList[j + 1];
        break;
      }
      if (rawList[j].dt > targetDt) {
        prevItem = rawList[j];
        nextItem = rawList[j];
        break;
      }
    }

    const tSpan = Math.max(1, nextItem.dt - prevItem.dt);
    const factor = Math.min(1, Math.max(0, (targetDt - prevItem.dt) / tSpan));

    const temp = Math.round(prevItem.main.temp + (nextItem.main.temp - prevItem.main.temp) * factor);
    const feels_like = Math.round(prevItem.main.feels_like + (nextItem.main.feels_like - prevItem.main.feels_like) * factor);
    const pop = Math.round(((prevItem.pop || 0) + ((nextItem.pop || 0) - (prevItem.pop || 0)) * factor) * 100);
    const wind_speed = +(prevItem.wind?.speed || 3.5).toFixed(1);
    const humidity = Math.round(prevItem.main.humidity + (nextItem.main.humidity - prevItem.main.humidity) * factor);

    const activeItem = factor > 0.5 ? nextItem : prevItem;
    const isNight = hourDate.getHours() < 6 || hourDate.getHours() > 20;
    let icon = activeItem.weather?.[0]?.icon || "01d";
    if (isNight && icon.endsWith("d")) {
      icon = icon.replace("d", "n");
    } else if (!isNight && icon.endsWith("n")) {
      icon = icon.replace("n", "d");
    }

    result.push({
      dt: targetDt,
      time: `${h}:00`,
      temp,
      feels_like,
      pop,
      icon,
      description: activeItem.weather?.[0]?.description || "Ochiq osmon",
      condition: activeItem.weather?.[0]?.main || "Clear",
      wind_speed,
      humidity,
    });
  }

  return result;
}

function getFallbackData(city: string = "Toshkent", unit: "metric" | "imperial" = "metric"): WeatherResponse {
  const isC = unit === "metric";
  const baseTemp = isC ? 22 : 72;
  const now = Math.floor(Date.now() / 1000);

  const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
  const currentDayIdx = new Date().getDay();

  const hourly = generate24HourlyForecast([], baseTemp, isC);

  const daily: DailyForecastItem[] = Array.from({ length: 5 }).map((_, i) => {
    const dayName = days[(currentDayIdx + i) % 7];
    const dateObj = new Date(Date.now() + i * 24 * 3600 * 1000);
    const dateStr = dateObj.toLocaleDateString("uz-UZ", { month: "short", day: "numeric" });
    return {
      date: dateStr,
      dayName: i === 0 ? "Bugun" : dayName,
      temp_min: Math.round(baseTemp - 5 + i),
      temp_max: Math.round(baseTemp + 4 + i),
      temp_day: Math.round(baseTemp + i),
      condition: i % 2 === 0 ? "Clear" : "Clouds",
      description: i % 2 === 0 ? "Ochiq havo" : "Bulutli",
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
      description: "Quyoshli va musaffo havo",
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

  const isC = unit === "metric";

  if (!API_KEY) {
    return NextResponse.json(getFallbackData(city || "Toshkent", unit));
  }

  try {
    let currentUrl = "";
    let forecastUrl = "";

    if (lat && lon) {
      currentUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
    } else {
      const qCity = city.trim() || "Toshkent";
      currentUrl = `${BASE_URL}/weather?q=${encodeURIComponent(qCity)}&units=${unit}&appid=${API_KEY}`;
      forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(qCity)}&units=${unit}&appid=${API_KEY}`;
    }

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl, { next: { revalidate: 300 } }),
      fetch(forecastUrl, { next: { revalidate: 300 } }),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json(getFallbackData(city || "Toshkent", unit));
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

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
      description: currentData.weather?.[0]?.description || "Ochiq havo",
      icon: currentData.weather?.[0]?.icon || "01d",
      condition: currentData.weather?.[0]?.main || "Clear",
      dt: currentData.dt,
      timezone: currentData.timezone || 0,
    };

    const rawList = forecastData.list || [];
    // 24 soatlik to'liq har bir soat uchun hisoblash
    const hourly = generate24HourlyForecast(rawList, current.temp, isC);

    // 5 kunlik prognoz guruhlash
    const dailyMap: { [key: string]: any[] } = {};
    const daysUz = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

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

      return {
        date: dateObj.toLocaleDateString("uz-UZ", { month: "short", day: "numeric" }),
        dayName: index === 0 ? "Bugun" : daysUz[dayIdx] || "Kunda",
        temp_min: minTemp,
        temp_max: maxTemp,
        temp_day: Math.round(midItem.main.temp),
        condition: midItem.weather?.[0]?.main || "Clear",
        description: midItem.weather?.[0]?.description || "Ochiq",
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
    return NextResponse.json(getFallbackData(city || "Toshkent", unit));
  }
}
