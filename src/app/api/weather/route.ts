import { NextRequest, NextResponse } from "next/server";
import { WeatherResponse, HourlyForecastItem, DailyForecastItem } from "@/types/weather";

const API_KEY = process.env.OWM_API_KEY || "a9ae2ba11a4327cdc44e0838914137bc";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getFallbackData(city: string = "Toshkent", unit: "metric" | "imperial" = "metric"): WeatherResponse {
  const isC = unit === "metric";
  const baseTemp = isC ? 22 : 72;
  const now = Math.floor(Date.now() / 1000);

  const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
  const currentDayIdx = new Date().getDay();

  const hourly: HourlyForecastItem[] = Array.from({ length: 8 }).map((_, i) => {
    const hourTime = new Date(Date.now() + i * 3 * 3600 * 1000);
    const hours = hourTime.getHours().toString().padStart(2, "0");
    const delta = Math.sin(i) * 3;
    return {
      dt: now + i * 3 * 3600,
      time: `${hours}:00`,
      temp: Math.round(baseTemp + delta),
      feels_like: Math.round(baseTemp + delta - 1),
      pop: Math.round(Math.random() * 20),
      icon: i % 2 === 0 ? "01d" : "02d",
      description: "Quyoshli, ochiq osmon",
      condition: "Clear",
      wind_speed: isC ? 3.5 : 8.0,
      humidity: 45,
    };
  });

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
    lastUpdated: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
    isFallback: true,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Tashkent";
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const unit = (searchParams.get("unit") as "metric" | "imperial") || "metric";

  try {
    let currentWeatherUrl = "";
    let forecastUrl = "";

    if (lat && lon) {
      currentWeatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&lang=uz&appid=${API_KEY}`;
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&lang=uz&appid=${API_KEY}`;
    } else {
      currentWeatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&lang=uz&appid=${API_KEY}`;
      forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${unit}&lang=uz&appid=${API_KEY}`;
    }

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl, { next: { revalidate: 300 } }),
      fetch(forecastUrl, { next: { revalidate: 300 } }),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      console.warn("OpenWeatherMap fetch failed, using fallback mock data.");
      return NextResponse.json(getFallbackData(city, unit));
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    // Transform current
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

    // Transform hourly (next 24 hours -> next 8-9 intervals of 3 hours)
    const rawList = forecastData.list || [];
    const hourly: HourlyForecastItem[] = rawList.slice(0, 9).map((item: any) => {
      const date = new Date(item.dt * 1000);
      const hours = date.getHours().toString().padStart(2, "0");
      return {
        dt: item.dt,
        time: `${hours}:00`,
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
        pop: Math.round((item.pop || 0) * 100),
        icon: item.weather?.[0]?.icon || "01d",
        description: item.weather?.[0]?.description || "",
        condition: item.weather?.[0]?.main || "Clear",
        wind_speed: item.wind?.speed || 0,
        humidity: item.main.humidity,
      };
    });

    // Group 5-day daily forecast
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
      const temps = dayItems.map((it) => it.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      const midItem = dayItems[Math.floor(dayItems.length / 2)] || dayItems[0];
      const dayDate = new Date(dateKey);
      const dayOfWeek = daysUz[dayDate.getDay()];

      return {
        date: dayDate.toLocaleDateString("uz-UZ", { month: "short", day: "numeric" }),
        dayName: index === 0 ? "Bugun" : dayOfWeek,
        temp_min: minTemp,
        temp_max: maxTemp,
        temp_day: Math.round(midItem.main.temp),
        condition: midItem.weather?.[0]?.main || "Clear",
        description: midItem.weather?.[0]?.description || "",
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
      lastUpdated: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
      isFallback: false,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(getFallbackData(city, unit));
  }
}
