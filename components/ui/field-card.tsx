"use client";

import { useActionState, useState } from "react";
import { Trash2, MapPin, ChevronDown, ChevronUp, Layers } from "lucide-react";
import dynamic from "next/dynamic";
import { FieclCardComponent } from "@/lib/definitions";
import { deleteField } from "@/app/actions";

// Client-side map component
const MapComponent = dynamic(() => import("@/components/ui/map-component"), {
  ssr: true,
  loading: () => (
    <div className="flex justify-center items-center h-full bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agroke-green"></div>
    </div>
  ),
});

export default function FieldCard(fieldIstance: FieclCardComponent) {
  const fieldInfo = fieldIstance.fieldInfo;
  const [isfieldExpanded, setExpandedField] = useState(false);
  const [activeLayer, setActiveLayer] = useState<{
    layer: "base" | "hydraulic" | "satellite" | "disease";
  }>({ layer: "base" });

  const toggleExpansion = () => {
    setExpandedField(!isfieldExpanded);
    setActiveLayer({
      layer: "base",
    });
  };

  const setLayer = (layer: "base" | "hydraulic" | "satellite" | "disease") => {
    setActiveLayer({
      layer: layer,
    });
  };

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
  const initialState = {
    isLoading: false,
    error: null,
  };
  const [state, formAction] = useActionState(deleteField, initialState);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      confirm(
        `Sei sicuro di voler eliminare ${fieldInfo.fieldName}? Questa azione non può essere annullata.`
      )
    ) {
      const submitButton = document.getElementById(
        fieldInfo.id
      ) as HTMLButtonElement;
      submitButton?.click();
    }
  };

  return (
    <div
      key={fieldInfo.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {fieldInfo.fieldName}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => toggleExpansion()}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              aria-label={isfieldExpanded ? "Comprimi" : "Espandi"}
            >
              {isfieldExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            <form action={formAction}>
              <input
                type="hidden"
                className="hidden"
                name="fieldId"
                value={fieldInfo.id}
              />
              <button
                className="text-red-500 hover:text-red-700 transition-colors p-1"
                aria-label="Elimina terreno"
                onClick={handleDelete}
              >
                <Trash2 size={20} />
              </button>
              <button
                id={fieldInfo.id}
                className="hidden"
                type="submit"
              ></button>
            </form>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{printAveragePosition()}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <span className="text-sm">
            Area: {calculateAreaHectares().toFixed(2)} ettari
          </span>
          <span className="mx-2">•</span>
          <span className="text-sm">Coltura: {fieldInfo.cropType}</span>
        </div>

        <div className="border-t border-gray-100 my-4"></div>
        {/* Stats */}
        {/* <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Droplet size={16} className="text-blue-500 mr-1" />
              <span className="text-sm font-medium">Acqua</span>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(fieldInfo.stato_idrico)}`}
            >
              {fieldInfo.stato_idrico}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Leaf size={16} className="text-green-500 mr-1" />
              <span className="text-sm font-medium">Fertilizzante</span>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(fieldInfo.stato_fertilizzante)}`}
            >
              {fieldInfo.stato_fertilizzante}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Bug size={16} className="text-amber-500 mr-1" />
              <span className="text-sm font-medium">Pesticidi</span>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(fieldInfo.stato_pesticidi)}`}
            >
              {fieldInfo.stato_pesticidi}
            </span>
          </div>
        </div> */}
      </div>

      {/* Contenuto espandibile */}
      {isfieldExpanded && (
        <div className="border-t border-gray-100">
          {/* Selettore Layer */}
          <div className="p-4 bg-gray-50">
            <div className="flex items-center mb-3">
              <Layers size={18} className="text-gray-600 mr-2" />
              <span className="font-medium text-gray-700">
                Visualizza Layer:
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setLayer("base")}
                className={`px-3 py-1 rounded-full text-sm ${activeLayer.layer === "base" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
              >
                Base
              </button>
              <button
                onClick={() => setLayer("satellite")}
                className={`px-3 py-1 rounded-full text-sm ${activeLayer.layer === "satellite" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
              >
                Satellite
              </button>
              <button
                onClick={() => setLayer("hydraulic")}
                className={`px-3 py-1 rounded-full text-sm ${activeLayer.layer === "hydraulic" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
              >
                Stato Idrico
              </button>
              <button
                onClick={() => setLayer("disease")}
                className={`px-3 py-1 rounded-full text-sm ${activeLayer.layer === "disease" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
              >
                Rischio Malattie
              </button>
            </div>
          </div>

          {/* Mappa con layer */}
          <div className="bg-gray-100 rounded-md h-80 relative overflow-hidden">
            <MapComponent initialFields={[fieldInfo]} />
          </div>
          {/* Metriche chiave */}
          {/* <div className="p-4 bg-gray-50 border-t border-gray-100">
            <h3 className="font-medium text-gray-700 mb-3">
              Metriche del terreno:
            </h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Umidità del suolo:</span>
                <span className="font-medium">
                  {fieldInfo.metriche.umidita_suolo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">pH del suolo:</span>
                <span className="font-medium">
                  {fieldInfo.metriche.ph_suolo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temperatura media:</span>
                <span className="font-medium">
                  {fieldInfo.metriche.temperatura_media}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Previsione raccolto:</span>
                <span className="font-medium">
                  {fieldInfo.metriche.previsione_raccolto}
                </span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-gray-600">Rischio malattie:</span>
                <span
                  className={`font-medium ${
                    fieldInfo.metriche.rischio_malattie === "Basso"
                      ? "text-green-600"
                      : fieldInfo.metriche.rischio_malattie === "Medio"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {fieldInfo.metriche.rischio_malattie}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      )}

      <div className="border-t border-gray-100">
        <button
          onClick={() => toggleExpansion()}
          className="w-full bg-gray-50 hover:bg-gray-100 py-3 text-gray-700 font-medium text-center transition-colors flex items-center justify-center gap-2"
        >
          {isfieldExpanded ? (
            <>
              Nascondi Dettagli <ChevronUp size={16} />
            </>
          ) : (
            <>
              Visualizza Dettagli <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
