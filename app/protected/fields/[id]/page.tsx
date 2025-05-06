import { fetchFieldData } from "@/app/actions";
import { MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { fetchWeatherDataDashboard } from "@/app/api/openwheather/ow-apis";
import { Suspense } from "react";
import WeatherCard from "@/components/ui/wheather-card";
import { WeatherCardSkeleton } from "@/components/ui/skeletons";

const MapComponent = dynamic(() => import("@/components/ui/map-component"), {
  ssr: true,
  loading: () => (
    <div className="flex justify-center items-center h-full bg-gray-50 rounded-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agroke-green"></div>
    </div>
  ),
});

export default async function FieldPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const fieldId = (await params).id;
  const fieldData = await fetchFieldData(fieldId);
  const center = getFieldCenter(fieldData?.coordinates || []);
  const weatherData = await fetchWeatherDataDashboard(center.lat, center.lng);

  function calculateAreaHectares(coordinates: number[][]) {
    if (coordinates.length < 3) {
      return 0;
    }
    const R = 6378137;
    let area = 0;

    function toRadians(deg: number) {
      return (deg * Math.PI) / 180;
    }

    for (let i = 0; i < coordinates.length; i++) {
      const [lat1, lon1] = coordinates[i];
      const [lat2, lon2] = coordinates[(i + 1) % coordinates.length];
      area +=
        toRadians(lon2 - lon1) *
        (2 + Math.sin(toRadians(lat1)) + Math.sin(toRadians(lat2)));
    }
    area = Math.abs((area * R * R) / 2.0);
    return area / 10000;
  }

  function getFieldCenter(coordinates: number[][]) {
    const sumLat = coordinates.reduce((sum, coord) => sum + coord[1], 0);
    const sumLng = coordinates.reduce((sum, coord) => sum + coord[0], 0);
    const count = coordinates.length;
    return {
      lat: sumLat / count,
      lng: sumLng / count,
    };
  }

  if (!fieldData) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center text-gray-600">Campo non trovato</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className="max-w-7xl mt-2 rounded-2xl shadow-lg relative overflow-hidden border-b-2 border-agroke-green/40">
        <div className=" px-6 py-8 relative flex items-center space-x-6">
          <Link href="/protected/fields">
            <div className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              <ArrowLeft size={20} className="text-agroke-green" />
            </div>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-agroke-black-light tracking-tight">
              {fieldData.fieldName}
            </h1>
            <div className="flex items-center mt-3 space-x-4">
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <MapPin size={16} className="text-agroke-green mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  {getFieldCenter(fieldData.coordinates).lat.toFixed(5)},{" "}
                  {getFieldCenter(fieldData.coordinates).lng.toFixed(5)}
                </span>
              </div>
              <div className="bg-agroke-green/10 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
                <span className="text-sm font-medium text-agroke-green">
                  {calculateAreaHectares(fieldData.coordinates).toFixed(2)}{" "}
                  ettari
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-agroke-black-light">
                  Vista Campo
                </h2>
              </div>
              <div className="h-[400px] relative">
                <MapComponent initialFields={[fieldData]} />
                <div className="absolute inset-0 bg-gradient-to-r from-agroke-green/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weather Card */}
            <Suspense fallback={<WeatherCardSkeleton />}>
              <WeatherCard data={weatherData} />
            </Suspense>

            {/* Field Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-agroke-green/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative">
                <h2 className="text-lg font-semibold text-agroke-black-light mb-6">
                  Informazioni Campo
                </h2>
                <div className="space-y-5">
                  <div className="p-3 rounded-xl bg-agroke-green/5 transition-colors hover:bg-agroke-green/10">
                    <label className="text-sm text-gray-500 block mb-1">
                      Tipo di Coltura
                    </label>
                    <p className="font-medium text-agroke-black-light">
                      {fieldData.cropType}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-agroke-green/5 transition-colors hover:bg-agroke-green/10">
                    <label className="text-sm text-gray-500 block mb-1">
                      Descrizione
                    </label>
                    <p className="font-medium text-agroke-black-light">
                      {fieldData.description || "Nessuna descrizione"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
