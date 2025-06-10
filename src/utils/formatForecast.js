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
    const dayName = weekdays[date.getDay()];

    return {
      day: dayName,
      avgTemp: dayData.temp_avg,
    };
  });
};

export { formatForecastForChart };
