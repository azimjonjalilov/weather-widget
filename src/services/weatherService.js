const API_KEY = import.meta.env.VITE_OWM_API_KEY;

export async function fetchWeatherAPI(city, unit = "metric") {
  if (!API_KEY) {
    throw new Error(
      "API key is not set. Please set VITE_OWM_API_KEY in .env file."
    );
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&units=${unit}&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch weather data");
  }

  const data = await response.json();

  return { list: data.list, city: data.city };
}
