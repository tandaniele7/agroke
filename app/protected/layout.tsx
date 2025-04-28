import Navbar from "@/components/ui/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/protected`
  : "http://localhost:3000/protected";

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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto">
        {children}
      </div>
    </>
  );
}
