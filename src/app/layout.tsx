import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "KOMPASS — Karate Performance Tactical Intelligence | 先手",
  description: "Bilingual frame-by-frame opponent intelligence dossiers and analytics for elite WKF karate athletes, coaches, and national federations. Win before it happens.",
  keywords: "karate, tactical intelligence, WKF, kumite, performance analysis, karate coaching, combat sports analytics",
  authors: [{ name: "KOMPASS Performance Intelligence" }],
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
