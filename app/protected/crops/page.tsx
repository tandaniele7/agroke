"use client";
import { useState } from "react";
import {
  Trash2,
  Plus,
  MapPin,
  Droplet,
  Leaf,
  Bug,
  ChevronDown,
  ChevronUp,
  Layers,
  AlertCircle,
  BarChart3,
  PiggyBank,
  Sprout,
} from "lucide-react";
import Link from "next/link";

// Dati predefiniti delle colture per ogni terreno
const colturePredefinite: Record<
  number,
  {
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
    avvisi: {
      tipo: string;
      descrizione: string;
      impatto: string;
      livello: string;
    }[];
    consigli: string;
  }[]
> = {
  1: [
    // Campo di Grano - Toscana
    {
      id: 1,
      nome: "Vineyard - Piedmont",
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
        },
      ],
      consigli:
        "Consider supplemental irrigation within 7 days to maintain expected yield.",
    },
  ],
  2: [
    // Vigneto - Piemonte
    {
      id: 2,
      nome: "Vineyard - Piedmont",
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
        },
        {
          tipo: "Nutrients",
          descrizione:
            "Potassium deficiency detected in some areas of the vineyard.",
          impatto:
            "It may affect the ripening of the grapes and reduce the sugar content.",
          livello: "basso",
        },
      ],
      consigli:
        "Apply preventative fungicide and consider localized potassium supplementation in deficient areas.",
    },
  ],
  3: [
    // Uliveto - Puglia
    {
      id: 3,
      nome: "Apple Orchard",
      varieta: "Red Delicious",
      data_semina: "Piante di 15+ anni",
      data_raccolto_prevista: "2025-11-05",
      area_coltivata: 15.45,
      rendimento_previsto: 0.9,
      prezzo_stimato: 7500, // €/ton (olio)
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
        },
        {
          tipo: "Disease",
          descrizione:
            "Fire blight symptoms observed on some trees in the orchard.",
          impatto:
            "Potential spread to healthy trees, leading to significant yield loss.",
          livello: "alto",
        },
        {
          tipo: "Weather",
          descrizione:
            "Frost risk detected for the upcoming week during flowering.",
          impatto:
            "Possible reduction in fruit set and overall yield if frost protection is not implemented.",
          livello: "medio",
        },
      ],
      consigli:
        "Address codling moth infestation immediately, prune infected branches to control fire blight, and prepare frost protection measures to safeguard the orchard.",
    },
  ],
};

// Dati predefiniti dei terreni
const campiPredefiniti = [
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
      previsione_raccolto: "9.0 ton/ha",
      rischio_malattie: "Basso",
    },
  },
  {
    id: 2,
    nome: "Vineyard - Piedmont",
    area: 8.32,
    coordinate: { lat: 44.69825, lng: 8.21376 },
    coltura_attuale: "Grape (Nebbiolo)",
    stato_idrico: "Sufficient",
    stato_fertilizzante: "Optimal",
    stato_pesticidi: "Good",
    data_creazione: "2024-09-22",
    mappa_url: "/piemonte-field.png",
    metriche: {
      umidita_suolo: "22%",
      ph_suolo: "7.2",
      temperatura_media: "19°C",
      previsione_raccolto: "9.0 ton/ha",
      rischio_malattie: "Medio",
    },
  },
  {
    id: 3,
    nome: "Apple Orchard - Piedmont",
    area: 15.45,
    coordinate: { lat: 40.79144, lng: 17.24312 },
    coltura_attuale: "Apple (Red Delicious)",
    stato_idrico: "Critical",
    stato_fertilizzante: "Sufficient",
    stato_pesticidi: "Critical",
    data_creazione: "2025-01-05",
    mappa_url: "/puglia-field.png",
    metriche: {
      umidita_suolo: "15%",
      ph_suolo: "7.8",
      temperatura_media: "24°C",
      previsione_raccolto: "10.9 ton/ha",
      rischio_malattie: "Alto",
    },
  },
];

export default function ColturePage() {
  const [campiEspansi, setCampiEspansi] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [layerAttivi, setLayerAttivi] = useState<{ [key: number]: string }>({});
  const [coltureEspanse, setColtureEspanse] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleEspansione = (id: number) => {
    setCampiEspansi((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    // Imposta lo strato base come default quando si espande
    if (!campiEspansi[id]) {
      setLayerAttivi((prev) => ({
        ...prev,
        [id]: "base",
      }));
    }
  };

  const toggleColturaEspansione = (id: number) => {
    setColtureEspanse((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const setLayer = (id: number, layer: string) => {
    setLayerAttivi((prev) => ({
      ...prev,
      [id]: layer,
    }));
  };

  function getStatoClasse(stato: string) {
    switch (stato.toLowerCase()) {
      case "optimal":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "sufficient":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getLivelloAvvisoClasse(livello: string) {
    switch (livello.toLowerCase()) {
      case "low":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "high":
        return "bg-orange-50 border-orange-200 text-orange-700";
      case "critical":
        return "bg-red-50 border-red-200 text-red-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  }

  function getLayerImage(campoId: number, layer: string) {
    const campo = campiPredefiniti.find((c) => c.id === campoId);
    if (!campo) return null;

    let imageUrl = campo.mappa_url;

    // Modifica l'URL dell'immagine per il layer "malattie"
    if (layer === "malattie") {
      const imageExtensionIndex = imageUrl.lastIndexOf(".");
      imageUrl = `${imageUrl.slice(0, imageExtensionIndex)}-risk${imageUrl.slice(imageExtensionIndex)}`;
    }

    // Stile CSS per simulare diverse visualizzazioni
    let filterStyle = {};
    if (layer === "satellite") {
      filterStyle = { filter: "contrast(1.2) saturate(1.1)" };
    } else if (layer === "idrico") {
      filterStyle = { filter: "hue-rotate(240deg) saturate(0.8)" };
    }

    return (
      <div className="relative w-full h-[450px]">
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Crops</h1>
          <div className="flex gap-3">
            <Link href="/protected/fields">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <span>View Fields</span>
              </button>
            </Link>
            <Link href="/protected/crops/add-crop">
              <button className="bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus size={20} />
                <span>Add a New Crop</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {campiPredefiniti.map((campo) => (
            <div
              key={campo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {campo.nome}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleEspansione(campo.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      aria-label={
                        campiEspansi[campo.id] ? "Comprimi" : "Espandi"
                      }
                    >
                      {campiEspansi[campo.id] ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span>
                    {campo.coordinate.lat.toFixed(5)},{" "}
                    {campo.coordinate.lng.toFixed(5)}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-sm">
                    Surface: {campo.area.toFixed(2)} hectares
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">
                    Main Crop: {campo.coltura_attuale}
                  </span>
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Droplet size={16} className="text-blue-500 mr-1" />
                      <span className="text-sm font-medium">Water</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(campo.stato_idrico)}`}
                    >
                      {campo.stato_idrico}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Leaf size={16} className="text-green-500 mr-1" />
                      <span className="text-sm font-medium">Fertilizer</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(campo.stato_fertilizzante)}`}
                    >
                      {campo.stato_fertilizzante}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Bug size={16} className="text-amber-500 mr-1" />
                      <span className="text-sm font-medium">Pesticides</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(campo.stato_pesticidi)}`}
                    >
                      {campo.stato_pesticidi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informazioni sulle colture presenti in questo terreno */}
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center mb-3">
                  <Sprout size={18} className="text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-700">
                    Crops:
                  </h3>
                </div>

                {colturePredefinite[campo.id]?.map((coltura) => (
                  <div
                    key={coltura.id}
                    className="mb-4 bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {coltura.nome} - {coltura.varieta}
                        </h4>
                        <div className="text-sm text-gray-600 mb-2">
                          <span>
                          Cultivated surface: {coltura.area_coltivata} hectares
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            State:{" "}
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatoClasse(coltura.stato_salute)}`}
                            >
                              {coltura.stato_salute}
                            </span>
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleColturaEspansione(coltura.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {coltureEspanse[coltura.id] ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <div className="bg-green-50 p-3 rounded-md">
                        <div className="flex items-center text-green-700 mb-1">
                          <BarChart3 size={16} className="mr-1" />
                          <span className="font-medium text-sm">
                          Expected yield
                          </span>
                        </div>
                        <p className="text-lg font-semibold">
                          {coltura.rendimento_previsto} ton/ha
                        </p>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-md">
                        <div className="flex items-center text-blue-700 mb-1">
                          <PiggyBank size={16} className="mr-1" />
                          <span className="font-medium text-sm">
                          Estimated revenue
                          </span>
                        </div>
                        <p className="text-lg font-semibold">
                          {coltura.ricavo_stimato.toLocaleString()} €
                        </p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-md">
                        <div className="flex items-center text-amber-700 mb-1">
                          <AlertCircle size={16} className="mr-1" />
                          <span className="font-medium text-sm">Warnings</span>
                        </div>
                        <p className="text-lg font-semibold">
                          {coltura.avvisi.length}
                        </p>
                      </div>
                    </div>

                    {coltureEspanse[coltura.id] && (
                      <div className="mt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                            Sowing/planting date:
                            </p>
                            <p className="font-medium">{coltura.data_semina}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                            Expected harvest date:
                            </p>
                            <p className="font-medium">
                              {coltura.data_raccolto_prevista}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Estimated price:
                            </p>
                            <p className="font-medium">
                              {coltura.prezzo_stimato} €/ton
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Total estimated yield:
                            </p>
                            <p className="font-medium">
                              {(
                                coltura.rendimento_previsto *
                                coltura.area_coltivata
                              ).toFixed(1)}{" "}
                              ton
                            </p>
                          </div>
                        </div>

                        {coltura.avvisi.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-medium mb-2 flex items-center">
                              <AlertCircle
                                size={16}
                                className="text-amber-500 mr-1"
                              />
                              <span>Warnings and potential threats</span>
                            </h5>
                            <div className="space-y-3">
                              {coltura.avvisi.map((avviso, idx) => (
                                <div
                                  key={idx}
                                  className={`border-l-4 p-3 rounded-r-md ${getLivelloAvvisoClasse(avviso.livello)}`}
                                >
                                  <div className="font-medium">
                                    {avviso.tipo}: {avviso.descrizione}
                                  </div>
                                  <div className="text-sm mt-1">
                                  Impact: {avviso.impatto}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-green-50 p-3 rounded-md">
                          <h5 className="font-medium mb-2">
                          Tips to improve performance:
                          </h5>
                          <p>{coltura.consigli}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contenuto espandibile del campo */}
              {campiEspansi[campo.id] && (
                <div className="border-t border-gray-100">
                  {/* Selettore Layer */}
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center mb-3">
                      <Layers size={18} className="text-gray-600 mr-2" />
                      <span className="font-medium text-gray-700">
                        View Layer:
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setLayer(campo.id, "base")}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === "base" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
                      >
                        Base
                      </button>
                      <button
                        onClick={() => setLayer(campo.id, "satellite")}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === "satellite" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
                      >
                        Satellite
                      </button>
                      <button
                        onClick={() => setLayer(campo.id, "idrico")}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === "idrico" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
                      >
                        Water State
                      </button>
                      <button
                        onClick={() => setLayer(campo.id, "malattie")}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === "malattie" ? "bg-agroke-green/65 text-agroke-black-light font-bold" : "bg-gray-200 text-gray-700"}`}
                      >
                        Disease Risk
                      </button>
                    </div>
                  </div>

                  {/* Mappa con layer */}
                  {getLayerImage(campo.id, layerAttivi[campo.id] || "base")}

                  {/* Metriche chiave */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Metriche del terreno:
                    </h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Umidità del suolo:
                        </span>
                        <span className="font-medium">
                          {campo.metriche.umidita_suolo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">pH del suolo:</span>
                        <span className="font-medium">
                          {campo.metriche.ph_suolo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Temperatura media:
                        </span>
                        <span className="font-medium">
                          {campo.metriche.temperatura_media}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Previsione raccolto:
                        </span>
                        <span className="font-medium">
                          {campo.metriche.previsione_raccolto}
                        </span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-gray-600">Rischio malattie:</span>
                        <span
                          className={`font-medium ${
                            campo.metriche.rischio_malattie === "Basso"
                              ? "text-green-600"
                              : campo.metriche.rischio_malattie === "Medio"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {campo.metriche.rischio_malattie}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-100">
                <button
                  onClick={() => toggleEspansione(campo.id)}
                  className="w-full bg-gray-50 hover:bg-gray-100 py-3 text-gray-700 font-medium text-center transition-colors flex items-center justify-center gap-2"
                >
                  {campiEspansi[campo.id] ? (
                    <>
                      Nascondi Dettagli Terreno <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Visualizza Dettagli Terreno <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
