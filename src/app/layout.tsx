import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeatherPulse - Zamonaviy Ob-havo Ilovasi",
  description: "Next.js va Tailwind CSS asosidagi mukammal ob-havo dashboardi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
