import { MapPin, Clipboard, BarChart2, AlertTriangle } from "react-feather";
import Link from "next/link";
import { fetchStats } from "@/app/actions";

export default async function Stats() {
  const { NumFields, NumActivities, NumProducts, NumAlerts } =
    await fetchStats();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {
          title: "Terreni Gestiti",
          value: NumFields,
          icon: MapPin,
          color: "bg-blue-500",
          sectionName: "/protected/fields",
        },
        {
          title: "Attività Registrate",
          value: NumActivities,
          icon: Clipboard,
          color: "bg-green-500",
          sectionName: "/protected/activities",
        },
        {
          title: "Prodotti in Magazzino",
          value: NumProducts,
          icon: BarChart2,
          color: "bg-amber-500",
          sectionName: "/protected/products",
        },
        {
          title: "Avvisi Attivi",
          value: NumAlerts,
          icon: AlertTriangle,
          color: "bg-red-500",
          sectionName: "/protected",
        },
      ].map((stat, index) => (
        <Link href={stat.sectionName} key={index}>
            <div
            key={index}
            className="bg-white rounded-xl shadow-md p-3 md:p-6 flex items-center transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
            <div className={`${stat.color} text-white p-3 rounded-lg mr-4`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            </div>
        </Link>
      ))}
    </div>
  );
}
