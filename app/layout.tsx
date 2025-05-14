import { Inter } from "next/font/google";
import Footer from "@/components/ui/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "@/components/header-auth";
import { EnvVarWarning } from "@/components/env-var-warning";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Agroke - Soluzioni innovative per l'agricoltura",
  description:
    "Soluzioni per la gestione della tua azienda agricola. Offriamo soluzioni per ottimizzare al meglio l'uso delle tue risorse e per offrirti uno spazio digitale dedicato alla tua alla tua azienda!",
  keywords: [
    "agricoltura di precisione",
    "irrorazione di precisione",
    "risparmio fitofarmaci",
    "quaderno di campagna",
    "campagna",
    "prodotti fitofarmaci",
    "qdc quaderno di campagna",
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
        <meta
          name="google-site-verification"
          content="hjV1v6xybCt4pTG9MDQzaZK0wnso5eulTAj3yA43gAs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#166534" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.11.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>

      <body className={` ${inter.className} `}>
        <div className="">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </div>
        <div className="w-full min-h-screen bg-gray-50">{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-529Z4P1BGD" />
    </html>
  );
}
