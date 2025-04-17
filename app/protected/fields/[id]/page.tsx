"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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

// Importiamo i dati di esempio (nella versione finale verrebbero prelevati da Supabase)
interface Campo {
  id: number;
  nome: string;
  area: number;
  coordinate: {
    lat: number;
    lng: number;
  };
  coltura_attuale: string;
  stato_idrico: string;
  stato_fertilizzante: string;
  stato_pesticidi: string;
  data_creazione: string;
  mappa_url: string;
  metriche: {
    umidita_suolo: string;
    ph_suolo: string;
    temperatura_media: string;
    previsione_raccolto: string;
    rischio_malattie: string;
    azoto_disponibile: string;
    carbonio_organico: string;
    previsione_pioggia_7gg: string;
    efficienza_irrigazione: string;
    risparmio_idrico_potenziale: string;
  };
  storico_metriche: {
    data: string;
    umidita: number;
    temperatura: number;
    resa: number;
  }[];
}

const campiPredefiniti: Campo[] = [
  {
    id: 1,
    nome: "Vineyard - Piedmont",
    area: 12.75,
    coordinate: { lat: 43.76956, lng: 11.25584 },
    coltura_attuale: "Grape (Barolo)",
    stato_idrico: "Optimal",
    stato_fertilizzante: "Good",
    stato_pesticidi: "Sufficient",
    data_creazione: "2024-12-10",
    mappa_url: "/toscana-field.png",
    metriche: {
      umidita_suolo: "28%",
      ph_suolo: "6.8",
      temperatura_media: "22°C",
      previsione_raccolto: "3.8 ton/ha",
      rischio_malattie: "Low",
      azoto_disponibile: "42 kg/ha",
      carbonio_organico: "1.8%",
      previsione_pioggia_7gg: "24mm",
      efficienza_irrigazione: "89%",
      risparmio_idrico_potenziale: "12%",
    },
    storico_metriche: [
      { data: "Jan", umidita: 32, temperatura: 8, resa: 0 },
      { data: "Feb", umidita: 35, temperatura: 10, resa: 0 },
      { data: "Mar", umidita: 30, temperatura: 14, resa: 10 },
      { data: "Apr", umidita: 28, temperatura: 18, resa: 20 },
      { data: "May", umidita: 25, temperatura: 22, resa: 40 },
      { data: "Jun", umidita: 22, temperatura: 26, resa: 70 },
      { data: "Jul", umidita: 20, temperatura: 28, resa: 90 },
      { data: "Aug", umidita: 18, temperatura: 27, resa: 100 },
    ],
  },
  {
    id: 2,
    nome: "Vineyard - Piedmont",
    area: 8.32,
    coordinate: { lat: 44.69825, lng: 8.21376 },
    coltura_attuale: "Grape (Nebbiolo)",
    stato_idrico: "Sufficient",
    stato_fertilizzante: "To Add",
    stato_pesticidi: "Risk Detected",
    data_creazione: "2024-09-22",
    mappa_url: "/piemonte-field.png",
    metriche: {
      umidita_suolo: "22%",
      ph_suolo: "7.2",
      temperatura_media: "19°C",
      previsione_raccolto: "7.5 ton/ha",
      rischio_malattie: "Medium",
      azoto_disponibile: "38 kg/ha",
      carbonio_organico: "2.1%",
      previsione_pioggia_7gg: "18mm",
      efficienza_irrigazione: "82%",
      risparmio_idrico_potenziale: "15%",
    },
    storico_metriche: [
      { data: "Jan", umidita: 28, temperatura: 5, resa: 0 },
      { data: "Feb", umidita: 30, temperatura: 7, resa: 0 },
      { data: "Mar", umidita: 27, temperatura: 12, resa: 5 },
      { data: "Apr", umidita: 25, temperatura: 16, resa: 15 },
      { data: "May", umidita: 24, temperatura: 18, resa: 30 },
      { data: "Jun", umidita: 22, temperatura: 22, resa: 60 },
      { data: "Jul", umidita: 20, temperatura: 25, resa: 85 },
      { data: "Aug", umidita: 18, temperatura: 24, resa: 95 },
    ],
  },
  {
    id: 3,
    nome: "Apple Orchard - Piedmont",
    area: 15.45,
    coordinate: { lat: 40.79144, lng: 17.24312 },
    coltura_attuale: "Apple",
    stato_idrico: "Critical",
    stato_fertilizzante: "Sufficient",
    stato_pesticidi: "Critical",
    data_creazione: "2025-01-05",
    mappa_url: "/puglia-field.png",
    metriche: {
      umidita_suolo: "15%",
      ph_suolo: "7.8",
      temperatura_media: "24°C",
      previsione_raccolto: "0.9 ton/ha",
      rischio_malattie: "High",
      azoto_disponibile: "25 kg/ha",
      carbonio_organico: "1.5%",
      previsione_pioggia_7gg: "5mm",
      efficienza_irrigazione: "70%",
      risparmio_idrico_potenziale: "25%",
    },
    storico_metriche: [
      { data: "Jan", umidita: 25, temperatura: 12, resa: 0 },
      { data: "Feb", umidita: 24, temperatura: 14, resa: 0 },
      { data: "Mar", umidita: 22, temperatura: 17, resa: 5 },
      { data: "Apr", umidita: 20, temperatura: 20, resa: 15 },
      { data: "May", umidita: 18, temperatura: 23, resa: 25 },
      { data: "Jun", umidita: 16, temperatura: 26, resa: 40 },
      { data: "Jul", umidita: 15, temperatura: 29, resa: 55 },
      { data: "Aug", umidita: 13, temperatura: 30, resa: 65 },
    ],
  },
];

// Dati predefiniti delle colture per ogni terreno
const colturePredefinite = {
  1: [
    {
      id: 1,
      nome: "Grape",
      varieta: "Barolo",
      data_semina: "12 year old plants",
      data_raccolto_prevista: "2025-06-20",
      area_coltivata: 12.75,
      rendimento_previsto: 3.8,
      prezzo_stimato: 380, // €/ton
      ricavo_stimato: 18392, // €
      stato_salute: "Optimal",
      avvisi: [
        {
          tipo: "Weather",
          descrizione:
            "Below average precipitation expected over the next 3 weeks.",
          impatto:
            "Possible yield reduction of 2% if supplemental irrigation is not applied.",
          livello: "medio",
          data: "2025-04-08",
          azione_consigliata: "Supplemental irrigation within 7 days",
        },
      ],
      consigli:
        "Consider supplemental irrigation within 7 days to maintain expected yield.",
    },
  ],
  2: [
    {
      id: 2,
      nome: "Grape",
      varieta: "Nebbiolo",
      data_semina: "Piante di 8 anni",
      data_raccolto_prevista: "2025-09-15",
      area_coltivata: 8.32,
      rendimento_previsto: 7.5,
      prezzo_stimato: 2200, // €/ton
      ricavo_stimato: 137280, // €
      stato_salute: "Good",
      avvisi: [
        {
          tipo: "Disease",
          descrizione:
            "Downy mildew risk increases due to forecasted humidity.",
          impatto:
            "Possible reduction in grape quality and drop in production of up to 5% without preventive treatment.",
          livello: "alto",
          data: "2025-04-07",
          azione_consigliata: "Apply preventative fungicide within 3 days",
        },
        {
          tipo: "Nutrients",
          descrizione:
            "Potassium deficiency detected in some areas of the vineyard.",
          impatto:
            "It may affect the ripening of the grapes and reduce the sugar content.",
          livello: "basso",
          data: "2025-04-05",
          azione_consigliata:
            "Localized potassium supplementation in deficient areas",
        },
      ],
      consigli:
        "Apply preventative fungicide and consider localized potassium supplementation in deficient areas.",
    },
  ],
  3: [
    {
      id: 3,
      nome: "Apple Orchard",
      varieta: "Red Delicious",
      data_semina: "Piante di 15+ anni",
      data_raccolto_prevista: "2025-11-05",
      area_coltivata: 15.45,
      rendimento_previsto: 0.9,
      prezzo_stimato: 7500, // €/ton
      ricavo_stimato: 104288, // €
      stato_salute: "Critical",
      avvisi: [
        {
          tipo: "Parasite",
          descrizione:
            "Codling moth infestation detected in several areas of the orchard.",
          impatto:
            "Risk of up to 15% yield loss and potential damage to fruit quality.",
          livello: "critico",
          data: "2025-04-09",
          azione_consigliata:
            "Apply targeted treatment for codling moth immediately.",
        },
        {
          tipo: "Disease",
          descrizione:
            "Fire blight symptoms observed on some trees in the orchard.",
          impatto:
            "Potential spread to healthy trees, leading to significant yield loss.",
          livello: "alto",
          data: "2025-04-08",
          azione_consigliata:
            "Prune infected branches and apply bactericide treatment.",
        },
        {
          tipo: "Weather",
          descrizione:
            "Frost risk detected for the upcoming week during flowering.",
          impatto:
            "Possible reduction in fruit set and overall yield if frost protection is not implemented.",
          livello: "medio",
          data: "2025-04-07",
          azione_consigliata:
            "Implement frost protection measures such as sprinklers or heaters.",
        },
      ],
      consigli:
        "Address codling moth infestation immediately, prune infected branches to control fire blight, and prepare frost protection measures to safeguard the orchard.",
    },
  ],
};

// Custom Tooltip per Recharts
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
        <p className="font-medium text-gray-800">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
            {entry.name === "Temperature"
              ? "°C"
              : entry.name === "umidita"
                ? "%"
                : "%"}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default function CampoDettaglio(props: { params: { id: string } }) {
  const params = props.params;
  const router = useRouter();
  const campoId = parseInt(params.id as string);
  const [layerAttivo, setLayerAttivo] = useState("base");
  const [campo, setCampo] = useState<Campo>(null as unknown as Campo);

  interface Avviso {
    tipo: string;
    descrizione: string;
    impatto: string;
    livello: string;
    data: string;
    azione_consigliata: string;
  }

  interface Coltura {
    id: number;
    nome: string;
    varieta: string;
    data_semina: string;
    data_raccolto_prevista: string;
    area_coltivata: number;
    rendimento_previsto: number;
    prezzo_stimato: number;
    ricavo_stimato: number;
    stato_salute: string;
    avvisi: Avviso[];
    consigli: string;
  }

  const [colture, setColture] = useState<Coltura[]>([]);

  useEffect(() => {
    // In una versione reale, qui ci sarebbe una chiamata API a Supabase
    // Simuliamo il recupero dei dati
    const campoDati = campiPredefiniti.find((c) => c.id === campoId);
    if (!campoDati) {
      router.push("/protected/fields");
      return;
    }
    setCampo(campoDati);
    setColture(
      colturePredefinite[campoId as keyof typeof colturePredefinite] || []
    );
  }, [campoId, router]);

  if (!campo) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading Data Field...</p>
        </div>
      </div>
    );
  }

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

  // function getLivelloAvvisoClasse(livello: string) {
  //   switch (livello.toLowerCase()) {
  //     case "basso":
  //       return "bg-blue-50 border-blue-200 text-blue-700";
  //     case "medio":
  //       return "bg-yellow-50 border-yellow-200 text-yellow-700";
  //     case "alto":
  //       return "bg-orange-50 border-orange-200 text-orange-700";
  //     case "critico":
  //       return "bg-red-50 border-red-200 text-red-700";
  //     default:
  //       return "bg-gray-50 border-gray-200 text-gray-700";
  //   }
  // }

  function getLayerImage(layer: string) {
    let imageUrl = campo.mappa_url;

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

  // Determina il livello di avviso più alto per visualizzazione immediata
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
                  {campo.nome}
                </h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>
                    {campo.coordinate.lat.toFixed(5)},{" "}
                    {campo.coordinate.lng.toFixed(5)}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{campo.area.toFixed(2)} hectares</span>
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
                  Current culture: {campo.coltura_attuale}
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
                      data={campo.storico_metriche}
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
                    Alerts for {campo.coltura_attuale}
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
                      {campo.metriche.umidita_suolo}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:bg-red-50 transition-colors">
                    <Thermometer size={24} className="text-red-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Average Temperature
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {campo.metriche.temperatura_media}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:bg-green-50 transition-colors">
                    <Leaf size={24} className="text-green-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Fertilizer
                    </span>
                    <span
                      className={`text-lg font-bold ${getStatoClasse(campo.stato_fertilizzante)}`}
                    >
                      {campo.stato_fertilizzante}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:bg-amber-50 transition-colors">
                    <Bug size={24} className="text-amber-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Pesticides
                    </span>
                    <span
                      className={`text-lg font-bold ${getStatoClasse(campo.stato_pesticidi)}`}
                    >
                      {campo.stato_pesticidi}
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
                        {campo.metriche.ph_suolo}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{
                          width: `${(parseFloat(campo.metriche.ph_suolo) / 14) * 100}%`,
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
                        {campo.metriche.azoto_disponibile}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{
                          width: `${(parseInt(campo.metriche.azoto_disponibile) / 100) * 100}%`,
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
                        {campo.metriche.carbonio_organico}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-amber-500 rounded-full"
                        style={{
                          width: `${(parseFloat(campo.metriche.carbonio_organico) / 3) * 100}%`,
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
                      {campo.metriche.previsione_raccolto}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={campo.storico_metriche}
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
                      Rain forecast: {campo.metriche.previsione_pioggia_7gg}
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
