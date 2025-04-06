import { Inter } from "next/font/google";
import Footer from "@/components/ui/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "@/components/header-auth";
import { EnvVarWarning } from "@/components/env-var-warning";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "agroke - Soluzioni innovative per l'agricoltura",
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
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        <div className="w-full min-h-screen">{children}</div>
        <Footer />
      </body>

      <GoogleAnalytics gaId="G-529Z4P1BGD" />
    </html>
  );
}
