import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WeatherInfo - Aniq Ob-havo Platformasi",
    short_name: "WeatherInfo",
    description: "Haqiqiy vaqtda dunyo va O'zbekiston viloyatlari bo'yicha aniq ob-havo prognozi",
    start_url: "/",
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#0284C7",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
