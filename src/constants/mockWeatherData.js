// const mockWeatherData = {
//   city: "Tashkent",
//   temperature: 28,
//   humidity: 50,
//   windSpeed: 10,
//   description: "Clear sky",
// };

const mockWeatherData = [
  {
    name: "Tashkent",
    sys: { country: "UZ" },
    main: {
      temp: 28.5,
      feels_like: 27.9,
      temp_min: 27,
      temp_max: 30,
      pressure: 1015,
      humidity: 40,
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: 3.5,
      deg: 260,
    },
  },
  {
    name: "London",
    sys: { country: "GB" },
    main: {
      temp: 16.2,
      feels_like: 15.8,
      temp_min: 14,
      temp_max: 18,
      pressure: 1020,
      humidity: 60,
    },
    weather: [
      {
        main: "Clouds",
        description: "overcast clouds",
        icon: "03d",
      },
    ],
    wind: {
      speed: 5.2,
      deg: 200,
    },
  },
  {
    name: "New York",
    sys: { country: "US" },
    main: {
      temp: 24.8,
      feels_like: 25,
      temp_min: 23,
      temp_max: 26,
      pressure: 1012,
      humidity: 55,
    },
    weather: [
      {
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
    wind: {
      speed: 6.1,
      deg: 190,
    },
  },
  {
    name: "Tokyo",
    sys: { country: "JP" },
    main: {
      temp: 30.2,
      feels_like: 33,
      temp_min: 29,
      temp_max: 32,
      pressure: 1008,
      humidity: 70,
    },
    weather: [
      {
        main: "Sunny",
        description: "sunny",
        icon: "01d",
      },
    ],
    wind: {
      speed: 4.5,
      deg: 100,
    },
  },
];

export default mockWeatherData;
