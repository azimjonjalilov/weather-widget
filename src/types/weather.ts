export type WeatherUnit = "metric" | "imperial";

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  city: string;
  country: string;
  coordinates: Coordinates;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  visibility: number;
  clouds: number;
  sunrise: number;
  sunset: number;
  description: string;
  icon: string;
  condition: string;
  dt: number;
  timezone: number;
}

export interface HourlyForecastItem {
  dt: number;
  time: string;
  temp: number;
  feels_like: number;
  pop: number; // 0 - 100%
  icon: string;
  description: string;
  condition: string;
  wind_speed: number;
  humidity: number;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  dayIndex: number;
  dateRaw?: string;
  temp_min: number;
  temp_max: number;
  temp_day: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  pop: number;
}

export interface WeatherMetrics {
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  visibility: number;
  clouds: number;
  sunrise: string;
  sunset: string;
  uvIndex?: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  unit: WeatherUnit;
  lastUpdated: string;
  isFallback?: boolean;
}

export interface FavoriteCity {
  id: string;
  name: string;
  country: string;
  temp?: number;
  condition?: string;
  icon?: string;
  lat?: number;
  lon?: number;
}

export interface WeatherSettings {
  unit: WeatherUnit;
  autoRefreshInterval: number; // in minutes (0 = off, 5, 10, 30)
  theme: "light" | "dark" | "system";
}
