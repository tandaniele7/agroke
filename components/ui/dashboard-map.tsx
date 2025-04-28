import Link from "next/link";
import { ChevronRight } from "react-feather";
import dynamic from 'next/dynamic';
import { fetchFields } from "@/app/actions";
import { Field } from "@/lib/definitions";


// Client-side map component
const MapComponent = dynamic(() => import('@/components/ui/map-component'), {
  ssr: true,
  loading: () => (
    <div className="flex justify-center items-center h-full bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agroke-green"></div>
    </div>
  )
});

export default async function DashboardMap() {
  const fields : Field[] = await fetchFields();
  
  return (
    <div
      className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 h-96"
    
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Mappa dei Terreni</h3>
        <Link
          className="text-green-600 hover:text-green-800 text-sm flex items-center"
          href="/protected/fields"
        >
          Visualizza tutto <ChevronRight size={16} />
        </Link>
      </div>
      <div className="bg-gray-100 rounded-lg h-80 relative overflow-hidden">
        <MapComponent initialFields={fields} />
      </div>
    </div>
  );
}