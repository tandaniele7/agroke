"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layers,
  AlertCircle,
  MapPin,
  Droplet,
  Leaf,
  Bug,
  PiggyBank,
  CalendarIcon,
  Thermometer,
  CloudRain,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Field } from "@/lib/definitions";

interface ClientFieldViewProps {
  fieldData: Field;
}

export default function ClientFieldView({ fieldData }: ClientFieldViewProps) {
  const [layerAttivo, setLayerAttivo] = useState("base");


  function getStatoClasse(stato: string) {
    switch (stato.toLowerCase()) {
      case "Optimal":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Sufficient":
        return "bg-yellow-100 text-yellow-800";
      case "critico":
        return "bg-red-100 text-red-800";
      default:
        return " text-gray-800";
    }
  }

  function getLayerImage(layer: string) {
    let imageUrl = fieldData.mappa_url;

    if (layer === "malattie") {
      const imageExtensionIndex = imageUrl.lastIndexOf(".");
      imageUrl = `${imageUrl.slice(0, imageExtensionIndex)}-risk${imageUrl.slice(imageExtensionIndex)}`;
    }

    let filterStyle = {};
    if (layer === "satellite") {
      filterStyle = { filter: "contrast(1.2) saturate(1.1)" };
    } else if (layer === "idrico") {
      filterStyle = { filter: "hue-rotate(240deg) saturate(0.8)" };
    }

    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              ...filterStyle,
            }}
          />
          <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
            {layer === "base" && "Basic View"}
            {layer === "satellite" && "Satellite View"}
            {layer === "idrico" && "Water State"}
            {layer === "malattie" && "Disease Risk"}
          </div>
        </div>
        {layer === "malattie" && (
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
            <div className="flex flex-col items-start">
              <div className="flex justify-between w-full text-xs text-gray-600">
                <span>100% Risk</span>
              </div>
              <div
                className="h-20 w-4 mr-2 rounded-full mb-2"
                style={{
                  background: "linear-gradient(to top, blue, red)",
                }}
              ></div>
              <div className="flex justify-between w-full text-xs text-gray-600">
                <span>0% Risk</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const getLivelloMassimoAvvisi = () => {
    if (!colture || colture.length === 0) return "nessuno";

    let maxLivello: "nessuno" | "basso" | "medio" | "alto" | "critico" =
      "nessuno" as "nessuno" | "basso" | "medio" | "alto" | "critico";

    // Ordine crescente di gravità
    const livelloPriorita = {
      nessuno: 0,
      basso: 1,
      medio: 2,
      alto: 3,
      critico: 4,
    };

    colture.forEach((coltura) => {
      coltura.avvisi.forEach((avviso) => {
        if (
          livelloPriorita[
            avviso.livello.toLowerCase() as keyof typeof livelloPriorita
          ] > livelloPriorita[maxLivello as keyof typeof livelloPriorita]
        ) {
          maxLivello = avviso.livello.toLowerCase() as
            | "nessuno"
            | "basso"
            | "medio"
            | "alto"
            | "critico";
        }
      });
    });

    return maxLivello;
  };

  const livelloMassimoAvvisi = getLivelloMassimoAvvisi();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/protected">
                <button className="mr-4 p-2 rounded-full hover:bg-gray-100">
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-agroke-black-light">
                  {fieldData.nome}
                </h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>
                    {fieldData.coordinate.lat.toFixed(5)},{" "}
                    {fieldData.coordinate.lng.toFixed(5)}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{fieldData.area.toFixed(2)} hectares</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/protected/fields/${campoId}/irrigazione`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Droplet size={18} />
                  <span>Irrigation Management</span>
                </button>
              </Link>
              <Link href={`/protected/fields/${campoId}/trattamenti`}>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Leaf size={18} />
                  <span>Plan Treatments</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Alert Banner per avvisi critici */}
        {livelloMassimoAvvisi === "critico" && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Warning! There are critical issues that require immediate
                  action.
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  See the notices in the dedicated section for more details.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout diviso 3/5 - 2/5 */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Map and Layers (3/5) */}
          <div className="w-full lg:w-3/5">
            {/* Map Container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-agroke-black-light">
                  Field View
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Current culture: {fieldData.coltura_attuale}
                </p>
              </div>

              {/* Layer Selector */}
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center mb-3">
                  <Layers size={18} className="text-gray-600 mr-2" />
                  <span className="font-medium text-gray-700">View Layer:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setLayerAttivo("base")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      layerAttivo === "base"
                        ? "bg-agroke-green/65 text-agroke-black-light font-bold"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Base
                  </button>
                  <button
                    onClick={() => setLayerAttivo("satellite")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      layerAttivo === "satellite"
                        ? "bg-agroke-green/65 text-agroke-black-light font-bold"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Satellite
                  </button>
                  <button
                    onClick={() => setLayerAttivo("idrico")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      layerAttivo === "idrico"
                        ? "bg-agroke-green/65 text-agroke-black-light font-bold"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Water State
                  </button>
                  <button
                    onClick={() => setLayerAttivo("malattie")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      layerAttivo === "malattie"
                        ? "bg-agroke-green/65 text-agroke-black-light font-bold"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Disease Risk
                  </button>
                </div>
              </div>

              {/* Map Display */}
              <div className="h-[500px]">{getLayerImage(layerAttivo)}</div>
            </div>

            {/* Seasonal Trends Chart */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-agroke-black-light">
                  Seasonal Trend
                </h2>
              </div>
              <div className="p-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={fieldData.storico_metriche}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="data" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="umidita"
                        name="Humidity"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="temperatura"
                        name="Temperature"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="resa"
                        name="Crop development"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts and Stats (2/5) */}
          <div className="w-full lg:w-2/5">
            {/* Alert Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100 bg-red-50">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="text-lg font-medium text-red-800">
                    Alerts for {fieldData.coltura_attuale}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                {colture.length > 0 && colture[0].avvisi.length > 0 ? (
                  <ul className="space-y-4">
                    {colture.map((coltura) =>
                      coltura.avvisi.map((avviso, index) => (
                        <li
                          key={index}
                          className={`p-4 rounded-md border-l-4 ${
                            avviso.livello === "critico"
                              ? "bg-red-50 border-red-500"
                              : avviso.livello === "alto"
                                ? "bg-orange-50 border-orange-500"
                                : avviso.livello === "medio"
                                  ? "bg-yellow-50 border-yellow-500"
                                  : "bg-blue-50 border-blue-500"
                          }`}
                        >
                          <div className="flex items-start">
                            {avviso.tipo === "Parassita" && (
                              <Bug className="h-5 w-5 mr-2 mt-1 text-red-600" />
                            )}
                            {avviso.tipo === "Idrico" && (
                              <Droplet className="h-5 w-5 mr-2 mt-1 text-blue-600" />
                            )}
                            {avviso.tipo === "Malattia" && (
                              <AlertCircle className="h-5 w-5 mr-2 mt-1 text-red-600" />
                            )}
                            {avviso.tipo === "Nutrienti" && (
                              <Leaf className="h-5 w-5 mr-2 mt-1 text-green-600" />
                            )}
                            {avviso.tipo === "Meteo" && (
                              <CloudRain className="h-5 w-5 mr-2 mt-1 text-blue-600" />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">
                                {avviso.descrizione}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-semibold">Impact:</span>{" "}
                                {avviso.impatto}
                              </p>
                              <div className="mt-2 flex items-center text-sm">
                                <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="text-gray-500">
                                  {avviso.data}
                                </span>
                              </div>
                              <div className="mt-2 bg-white bg-opacity-50 p-2 rounded">
                                <p className="text-sm font-medium">
                                  Recommended action:{" "}
                                  {avviso.azione_consigliata}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="mt-3 text-gray-600">
                      No active alerts for this field
                    </p>
                  </div>
                )}
              </div>
              {colture.length > 0 && (
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-bold text-agroke-black-light">
                      Recommendations:
                    </span>{" "}
                    {colture[0].consigli}
                  </p>
                </div>
              )}
            </div>

            {/* Field Metrics */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-agroke-black-light">
                  Field Statistics
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:bg-blue-50 transition-colors">
                    <Droplet size={24} className="text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Soil Moisture
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {fieldData.metriche.umidita_suolo}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:bg-red-50 transition-colors">
                    <Thermometer size={24} className="text-red-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Average Temperature
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {fieldData.metriche.temperatura_media}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:bg-green-50 transition-colors">
                    <Leaf size={24} className="text-green-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Fertilizer
                    </span>
                    <span
                      className={`text-lg font-bold ${getStatoClasse(fieldData.stato_fertilizzante)}`}
                    >
                      {fieldData.stato_fertilizzante}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:bg-amber-50 transition-colors">
                    <Bug size={24} className="text-amber-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Pesticides
                    </span>
                    <span
                      className={`text-lg font-bold ${getStatoClasse(fieldData.stato_pesticidi)}`}
                    >
                      {fieldData.stato_pesticidi}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Metrics */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-agroke-black-light">
                  Field Characteristics
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Soil pH
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {fieldData.metriche.ph_suolo}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{
                          width: `${(parseFloat(fieldData.metriche.ph_suolo) / 14) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Nitrogen Available
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {fieldData.metriche.azoto_disponibile}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{
                          width: `${(parseInt(fieldData.metriche.azoto_disponibile) / 100) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Organic Carbon
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {fieldData.metriche.carbonio_organico}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-amber-500 rounded-full"
                        style={{
                          width: `${(parseFloat(fieldData.metriche.carbonio_organico) / 3) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Chart */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-agroke-black-light">
                    Crop Forecast
                  </h2>
                  <div className="flex items-center">
                    <PiggyBank className="text-green-600 mr-2" size={20} />
                    <span className="text-lg font-bold text-green-600">
                      {fieldData.metriche.previsione_raccolto}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={fieldData.storico_metriche}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="data" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="resa"
                        name="Development (%)"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {colture.length > 0 && (
                      <span>
                        Expected yield: {colture[0].data_raccolto_prevista}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <CloudRain className="mr-1 h-4 w-4" />
                    <span>
                      Rain forecast: {fieldData.metriche.previsione_pioggia_7gg}
                    </span>
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
