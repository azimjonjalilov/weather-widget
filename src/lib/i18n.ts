export type Language = "uz" | "ru" | "en";

export interface Translations {
  appName: string;
  appTagline: string;
  searchPlaceholder: string;
  locationBtn: string;
  locationLoading: string;
  refreshBtn: string;
  unitC: string;
  unitF: string;
  themeLight: string;
  themeDark: string;
  settingsTitle: string;
  settingsTempUnit: string;
  settingsInterval: string;
  settingsDone: string;
  intervalOff: string;
  interval5m: string;
  interval10m: string;
  interval30m: string;
  favoritesAdd: string;
  favoritesSaved: string;
  recentProvinces: string;
  clearAll: string;
  searchResultTitle: string;
  defaultProvincesTitle: string;
  selectHint: string;
  notFoundProvince: string;
  notFoundHint: string;
  currentBadge: string;
  feelsLike: string;
  today: string;
  hourlyTitle: string;
  hourlySubtitle: string;
  dailyTitle: string;
  dailySubtitle: string;
  chartTitle: string;
  chartSubtitle: string;
  chartTemp: string;
  chartFeelsLike: string;
  windSpeed: string;
  humidity: string;
  pressure: string;
  visibility: string;
  cloudiness: string;
  sunTimes: string;
  sunsetPrefix: string;
  highHumidity: string;
  comfortable: string;
  normalPressure: string;
  veryGood: string;
  limited: string;
  denseClouds: string;
  clearSky: string;
  fallbackNotice: string;
  windDirections: [string, string, string, string, string, string, string, string];
  weekDays: [string, string, string, string, string, string, string];
}

export const translations: Record<Language, Translations> = {
  uz: {
    appName: "AuraCast",
    appTagline: "Haqiqiy vaqtda aniq ob-havo",
    searchPlaceholder: "Davlat yoki viloyat nomini qidiring (masalan: Samarqand viloyati, O'zbekiston)...",
    locationBtn: "Mening joylashuvim",
    locationLoading: "Aniqlanmoqda...",
    refreshBtn: "Yangilash",
    unitC: "Selsiy (°C, m/s)",
    unitF: "Farengeyt (°F, mph)",
    themeLight: "Yorug' rejim",
    themeDark: "Tungi rejim",
    settingsTitle: "Ilova Sozlamalari",
    settingsTempUnit: "Harorat Birligi",
    settingsInterval: "Avtomatik Yangilanish",
    settingsDone: "Tayyor",
    intervalOff: "O'chirilgan",
    interval5m: "Har 5 daqiqada",
    interval10m: "Har 10 daqiqada",
    interval30m: "Har 30 daqiqada",
    favoritesAdd: "Sevimliga qo'shish",
    favoritesSaved: "Saqlangan",
    recentProvinces: "Oxirgi ko'rilgan viloyatlar",
    clearAll: "Tozalash",
    searchResultTitle: "Viloyat va Davlat natijalari",
    defaultProvincesTitle: "O'zbekiston viloyatlari",
    selectHint: "Tanlash uchun",
    notFoundProvince: "bo'yicha viloyat yoki davlat topilmadi",
    notFoundHint: "Viloyat yoki davlat nomini to'liqroq yozib ko'ring",
    currentBadge: "Joriy",
    feelsLike: "His etilishi",
    today: "Bugun",
    hourlyTitle: "Soatlik prognoz (24 soat)",
    hourlySubtitle: "Har soatlik aniq ma'lumot",
    dailyTitle: "5 kunlik prognoz",
    dailySubtitle: "Haftalik o'zgarishlar",
    chartTitle: "Harorat dinamikasi",
    chartSubtitle: "Kun davomidagi o'zgarish grafigi",
    chartTemp: "Harorat",
    chartFeelsLike: "His etilishi",
    windSpeed: "Shamol tezligi",
    humidity: "Havo namligi",
    pressure: "Atmosfera bosimi",
    visibility: "Ko'rinuvchanlik",
    cloudiness: "Bulutlilik",
    sunTimes: "Quyosh chiqishi / botishi",
    sunsetPrefix: "Botishi",
    highHumidity: "Yuqori namlik",
    comfortable: "Qulay holat",
    normalPressure: "Normal: 1013 hPa",
    veryGood: "Juda yaxshi",
    limited: "Cheklangan",
    denseClouds: "Qalin bulutlar",
    clearSky: "Ochiq osmon",
    fallbackNotice: "Tarmoq yoki API cheklovi sababli ma'lumotlar zaxira rejimidan ko'rsatilmoqda.",
    windDirections: ["Shimol", "Sh.-Sharq", "Sharq", "J.-Sharq", "Janub", "J.-G'arb", "G'arb", "Sh.-G'arb"],
    weekDays: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
  },
  ru: {
    appName: "AuraCast",
    appTagline: "Точный прогноз погоды в реальном времени",
    searchPlaceholder: "Поиск по стране или региону (например: Самарканд, Узбекистан)...",
    locationBtn: "Моё местоположение",
    locationLoading: "Определение...",
    refreshBtn: "Обновить",
    unitC: "Цельсий (°C, m/s)",
    unitF: "Фаренгейт (°F, mph)",
    themeLight: "Светлая тема",
    themeDark: "Темная тема",
    settingsTitle: "Настройки приложения",
    settingsTempUnit: "Единица измерения",
    settingsInterval: "Автообновление",
    settingsDone: "Готово",
    intervalOff: "Отключено",
    interval5m: "Каждые 5 минут",
    interval10m: "Каждые 10 минут",
    interval30m: "Каждые 30 минут",
    favoritesAdd: "В избранное",
    favoritesSaved: "В избранном",
    recentProvinces: "Недавние регионы",
    clearAll: "Очистить",
    searchResultTitle: "Результаты поиска регионов",
    defaultProvincesTitle: "Регионы Узбекистана",
    selectHint: "Выбрать",
    notFoundProvince: "регион или страна не найдены",
    notFoundHint: "Попробуйте уточнить название региона или страны",
    currentBadge: "Текущий",
    feelsLike: "Ощущается как",
    today: "Сегодня",
    hourlyTitle: "Почасовой прогноз (24 часа)",
    hourlySubtitle: "Данные на каждый час",
    dailyTitle: "Прогноз на 5 дней",
    dailySubtitle: "Динамика недели",
    chartTitle: "Динамика температуры",
    chartSubtitle: "График изменения в течение суток",
    chartTemp: "Температура",
    chartFeelsLike: "Ощущается",
    windSpeed: "Скорость ветра",
    humidity: "Влажность воздуха",
    pressure: "Атмосферное давление",
    visibility: "Видимость",
    cloudiness: "Облачность",
    sunTimes: "Восход / Закат",
    sunsetPrefix: "Закат",
    highHumidity: "Высокая влажность",
    comfortable: "Комфортно",
    normalPressure: "Норма: 1013 hPa",
    veryGood: "Отличная",
    limited: "Ограниченная",
    denseClouds: "Плотные облака",
    clearSky: "Ясное небо",
    fallbackNotice: "Из-за ограничений сети данные отображаются из резервного режима.",
    windDirections: ["Север", "С.-Восток", "Восток", "Ю.-Восток", "Юг", "Ю.-Запад", "Запад", "С.-Запад"],
    weekDays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  },
  en: {
    appName: "AuraCast",
    appTagline: "Hyper-accurate real-time weather",
    searchPlaceholder: "Search by country or state (e.g. Samarkand, Uzbekistan)...",
    locationBtn: "My location",
    locationLoading: "Locating...",
    refreshBtn: "Refresh",
    unitC: "Celsius (°C, m/s)",
    unitF: "Fahrenheit (°F, mph)",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    settingsTitle: "App Settings",
    settingsTempUnit: "Temperature Unit",
    settingsInterval: "Auto-refresh Interval",
    settingsDone: "Done",
    intervalOff: "Disabled",
    interval5m: "Every 5 minutes",
    interval10m: "Every 10 minutes",
    interval30m: "Every 30 minutes",
    favoritesAdd: "Add to favorites",
    favoritesSaved: "Saved",
    recentProvinces: "Recently viewed",
    clearAll: "Clear",
    searchResultTitle: "Region & Country Results",
    defaultProvincesTitle: "Regions of Uzbekistan",
    selectHint: "Press Enter to select",
    notFoundProvince: "no region or country found",
    notFoundHint: "Please check the spelling and try again",
    currentBadge: "Current",
    feelsLike: "Feels like",
    today: "Today",
    hourlyTitle: "Hourly Forecast (24 Hours)",
    hourlySubtitle: "Every single hour breakdown",
    dailyTitle: "5-Day Forecast",
    dailySubtitle: "Weekly weather outlook",
    chartTitle: "Temperature Trend",
    chartSubtitle: "Daily continuous temperature curve",
    chartTemp: "Temperature",
    chartFeelsLike: "Feels like",
    windSpeed: "Wind speed",
    humidity: "Air humidity",
    pressure: "Atmospheric pressure",
    visibility: "Visibility",
    cloudiness: "Cloud cover",
    sunTimes: "Sunrise / Sunset",
    sunsetPrefix: "Sunset",
    highHumidity: "High humidity",
    comfortable: "Comfortable",
    normalPressure: "Standard: 1013 hPa",
    veryGood: "Excellent",
    limited: "Limited",
    denseClouds: "Overcast",
    clearSky: "Clear sky",
    fallbackNotice: "Displaying cached backup weather data due to network status.",
    windDirections: ["North", "N.-East", "East", "S.-East", "South", "S.-West", "West", "N.-West"],
    weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
};
