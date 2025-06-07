// services/weatherService.js

import mockWeatherData from "../data/mockWeatherData";

export const fetchWeatherData = async (city, unit) => {
  // unit hozircha ishlatilmayapti, lekin real API uchun kerak bo'ladi
  const result = mockWeatherData.find(
    (item) => item.name.toLowerCase() === city.toLowerCase()
  );

  if (!result) {
    throw new Error("Shahar topilmadi");
  }

  // Delay simulyatsiya qilish (ixtiyoriy)
  await new Promise((res) => setTimeout(res, 500));

  return result;
};
