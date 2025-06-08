const formatForecastForChart = (forecast) => {
  const weekdays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];

  return forecast.map((dayData) => {
    const date = new Date(dayData.date);
    const dayName = weekdays[date.getDay()]; // 0–6

    return {
      day: dayName,
      avgTemp: dayData.temp_avg,
    };
  });
};

export { formatForecastForChart };
