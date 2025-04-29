"use client";

import { useActionState } from "react";
import { Trash2, MapPin, ArrowRightCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { FieclCardComponent } from "@/lib/definitions";
import { deleteField } from "@/app/actions";
import Link from "next/link";

const MapComponent = dynamic(() => import("@/components/ui/map-component"), {
  ssr: true,
  loading: () => (
    <div className="flex justify-center items-center h-full bg-gray-50 rounded-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agroke-green"></div>
    </div>
  ),
});

export default function FieldCard(fieldIstance: FieclCardComponent) {
  const fieldInfo = fieldIstance.fieldInfo;
  const initialState = { isLoading: false, error: null };
  const [state, formAction] = useActionState(deleteField, initialState);

  function printAveragePosition() {
    const sumLat = fieldInfo.coordinates.reduce(
      (sum: number, coord: number[]) => sum + coord[1],
      0
    );
    const sumLng = fieldInfo.coordinates.reduce(
      (sum: number, coord: number[]) => sum + coord[0],
      0
    );
    const count = fieldInfo.coordinates.length;
    return (
      (sumLat / count).toFixed(5).toString() +
      " " +
      (sumLng / count).toFixed(5).toString()
    );
  }

  function calculateAreaHectares() {
    if (fieldInfo.coordinates.length < 3) {
      throw new Error(
        "At least three coordinates are needed to calculate an area."
      );
    }

    // Radius of the Earth in meters
    const R = 6378137;

    let area = 0;

    // Helper to convert degrees to radians
    function toRadians(deg: number) {
      return (deg * Math.PI) / 180;
    }

    for (let i = 0; i < fieldInfo.coordinates.length; i++) {
      const [lat1, lon1] = fieldInfo.coordinates[i];
      const [lat2, lon2] =
        fieldInfo.coordinates[(i + 1) % fieldInfo.coordinates.length]; // wrap around to the first point

      area +=
        toRadians(lon2 - lon1) *
        (2 + Math.sin(toRadians(lat1)) + Math.sin(toRadians(lat2)));
    }

    area = (area * R * R) / 2.0;

    area = Math.abs(area); // in case it's negative (depending on point order)

    const hectares = area / 10000; // 1 hectare = 10,000 m²

    return hectares;
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm(`Sei sicuro di voler eliminare ${fieldInfo.fieldName}? Questa azione non può essere annullata.`)) {
      const submitButton = document.getElementById(fieldInfo.id) as HTMLButtonElement;
      submitButton?.click();
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Map Section */}
      <div className="md:col-span-1 h-[200px] md:h-full min-h-[200px] bg-gray-50 relative">
        <MapComponent initialFields={[fieldInfo]} />
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-agroke-green/10 to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="md:col-span-2 p-6 flex flex-col justify-between relative">
        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-agroke-green/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-agroke-black-light">
              {fieldInfo.fieldName}
            </h2>
            {!state.isLoading && (
              <form action={formAction}>
                <input type="hidden" name="fieldId" value={fieldInfo.id} />
                <button
                  className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                  aria-label="Elimina terreno"
                  onClick={handleDelete}
                >
                  <Trash2 size={20} />
                </button>
                <button id={fieldInfo.id} className="hidden" type="submit" />
              </form>
            )}
          </div>

          {/* Field Info */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2 text-agroke-green" />
              <span className="text-sm">{printAveragePosition()}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="text-sm px-4 py-1.5 bg-agroke-green/10 rounded-full text-agroke-black-light">
                {calculateAreaHectares().toFixed(2)} ettari
              </span>
              <span className="text-sm px-4 py-1.5 bg-agroke-green/10 rounded-full text-agroke-black-light">
                {fieldInfo.cropType}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/protected/fields/${fieldInfo.id}`}
          className="mt-6 inline-flex items-center justify-between px-6 py-3 bg-agroke-green/10 text-agroke-black-light hover:bg-agroke-green hover:text-white rounded-xl transition-all duration-300 group-hover:transform group-hover:translate-y-0"
        >
          <span className="font-medium">Visualizza Dettagli</span>
          <ArrowRightCircle size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
