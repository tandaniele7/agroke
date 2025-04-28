import { ChevronRight, Droplet, Wind, Cloud } from "react-feather";
import { fetchWeatherDataDashboard } from "@/app/api/openwheather/ow-apis";
import { averagePosition } from "@/lib/functions";

export default async function WheatherWidget() {
  const res = await averagePosition();
  let wheatherData = await fetchWeatherDataDashboard(
    42.583039658687916,
    12.615177525118934
  );
  if (res) {
    const { lat, lng } = res;
    wheatherData = await fetchWeatherDataDashboard(lat, lng);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Meteo</h3>
        <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
          Previsioni <ChevronRight size={16} />
        </button>
      </div>
      <div className="text-center py-4">
        <div className="mb-4">
          <p className="text-3xl text-gray-800">
            <span className="text-5xl">{wheatherData.temperature}°</span>C
          </p>
          <p className="text-gray-600">
            Oggi, {new Date().getDate()}{" "}
            {new Intl.DateTimeFormat("it-IT", { month: "long" }).format(
              new Date()
            )}
            , {wheatherData.provice}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-2 rounded-full mb-1">
              <Droplet size={16} className="text-blue-600" />
            </div>
            <p className="text-gray-600">Umidità</p>
            <p className="font-semibold">{wheatherData.humidity}%</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-2 rounded-full mb-1">
              <Cloud size={16} className="text-blue-600" />
            </div>
            <p className="text-gray-600">Precip.</p>
            <p className="font-semibold">{wheatherData.rainfall} mm</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-2 rounded-full mb-1">
              <Wind size={16} className="text-blue-600" />
            </div>
            <p className="text-gray-600">Vento</p>
            <p className="font-semibold">{wheatherData.wind} km/h</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-green-600 text-sm">
            Condizioni favorevoli per trattamenti fitosanitari
          </p>
        </div>
      </div>
    </div>
  );
}
