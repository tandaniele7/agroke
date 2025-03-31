import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Footer from "@/components/ui/footer";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AgroFuturo - Irrorazione di Precisione per Frutteti",
  description:
    "Soluzioni innovative per ottimizzare l'applicazione di prodotti fitosanitari nei frutteti e oliveti. Risparmia fino al 90% sui costi di trattamento.",
  keywords: [
    "agricoltura di precisione",
    "irrorazione di precisione",
    "frutteti",
    "risparmio fitofarmaci",
    "agritech",
    "tecnologia agricola",
    "sostenibilità",
  ],
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

// Caricamento del font Inter

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#166534" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
