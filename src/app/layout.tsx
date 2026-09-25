import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AuraCast — Aniq Ob-havo Platformasi | Real-time Weather",
  description:
    "AuraCast — O'zbekiston viloyatlari va dunyo bo'ylab har soatlik va 5 kunlik aniq ob-havo prognozi, shamol tezligi, havo namligi, atmosfera bosimi hamda interaktiv harorat grafiki.",
  keywords: [
    "ob-havo",
    "ob havo toshkent",
    "weather uzbekistan",
    "pogoda samarkand",
    "ob havo prognozi",
    "soatlik ob-havo",
    "AuraCast",
    "weather widget",
    "harorat",
  ],
  authors: [{ name: "Azimjon Jalilov" }],
  creator: "Azimjon Jalilov",
  publisher: "AuraCast Inc.",
  metadataBase: new URL("https://auracast.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AuraCast — Haqiqiy Vaqtda Aniq Ob-havo Platformasi",
    description: "Viloyatlar va butun dunyo bo'yicha 24 soatlik va 5 kunlik yuqori aniqlikdagi ob-havo.",
    url: "https://auracast.app",
    siteName: "AuraCast",
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraCast — Aniq Ob-havo",
    description: "Viloyatlar va butun dunyo bo'yicha har soatlik ob-havo prognozi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
