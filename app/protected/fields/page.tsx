"use client";
import { useState } from 'react';
import { Trash2, Plus, MapPin, Droplet, Leaf, Bug, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Dati predefiniti dei terreni
const campiPredefiniti = [
  {
    id: 1,
    nome: "Campo di Grano - Toscana",
    area: 12.75,
    coordinate: { lat: 43.76956, lng: 11.25584 },
    coltura_attuale: "Grano duro",
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
      rischio_malattie: "Basso"
    }
  },
  {
    id: 2,
    nome: "Vigneto - Piemonte",
    area: 8.32,
    coordinate: { lat: 44.69825, lng: 8.21376 },
    coltura_attuale: "Vite (Nebbiolo)",
    stato_idrico: "Sufficient",
    stato_fertilizzante: "Optimal",
    stato_pesticidi: "Good",
    data_creazione: "2024-09-22",
    mappa_url: "/piemonte-field.png",
    metriche: {
      umidita_suolo: "22%",
      ph_suolo: "7.2",
      temperatura_media: "19°C",
      previsione_raccolto: "7.5 ton/ha",
      rischio_malattie: "Medio"
    }
  },
  {
    id: 3,
    nome: "Uliveto - Puglia",
    area: 15.45,
    coordinate: { lat: 40.79144, lng: 17.24312 },
    coltura_attuale: "Ulivo (Coratina)",
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
      rischio_malattie: "Alto"
    }
  }
];

export default function TerreniFarmer() {
  const [campiEspansi, setCampiEspansi] = useState<{ [key: number]: boolean }>({});
  const [layerAttivi, setLayerAttivi] = useState<{ [key: number]: string }>({});

  const toggleEspansione = (id: number) => {
    setCampiEspansi(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    // Imposta lo strato base come default quando si espande
    if (!campiEspansi[id]) {
      setLayerAttivi(prev => ({
        ...prev,
        [id]: 'base'
      }));
    }
  };

  const setLayer = (id: number, layer: string) => {
    setLayerAttivi(prev => ({
      ...prev,
      [id]: layer
    }));
  };

  function getStatoClasse(stato: string) {
    switch (stato.toLowerCase()) {
      case 'Optimal':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      case 'Sufficient':
        return 'bg-yellow-100 text-yellow-800';
      case 'critico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Legend
            </h4>
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
          <h1 className="text-3xl font-bold text-gray-800">I Tuoi Terreni</h1>
          <Link href="/protected/fields/add-field">
            <button className="bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={20} />
              <span>Aggiungi Nuovo Terreno</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {campiPredefiniti.map((campo) => (
            <div key={campo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{campo.nome}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleEspansione(campo.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      aria-label={campiEspansi[campo.id] ? "Comprimi" : "Espandi"}
                    >
                      {campiEspansi[campo.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      aria-label="Elimina terreno"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span>{campo.coordinate.lat.toFixed(5)}, {campo.coordinate.lng.toFixed(5)}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-sm">Area: {campo.area.toFixed(2)} ettari</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">Coltura: {campo.coltura_attuale}</span>
                </div>
                
                <div className="border-t border-gray-100 my-4"></div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Droplet size={16} className="text-blue-500 mr-1" />
                      <span className="text-sm font-medium">Acqua</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(campo.stato_idrico)}`}>
                      {campo.stato_idrico}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Leaf size={16} className="text-green-500 mr-1" />
                      <span className="text-sm font-medium">Fertilizzante</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(campo.stato_fertilizzante)}`}>
                      {campo.stato_fertilizzante}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Bug size={16} className="text-amber-500 mr-1" />
                      <span className="text-sm font-medium">Pesticidi</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatoClasse(campo.stato_pesticidi)}`}>
                      {campo.stato_pesticidi}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Contenuto espandibile */}
              {campiEspansi[campo.id] && (
                <div className="border-t border-gray-100">
                  {/* Selettore Layer */}
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center mb-3">
                      <Layers size={18} className="text-gray-600 mr-2" />
                      <span className="font-medium text-gray-700">Visualizza Layer:</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button 
                        onClick={() => setLayer(campo.id, 'base')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'base' ? 'bg-agroke-green/65 text-agroke-black-light font-bold' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Base
                      </button>
                      <button 
                        onClick={() => setLayer(campo.id, 'satellite')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'satellite' ? 'bg-agroke-green/65 text-agroke-black-light font-bold' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Satellite
                      </button>
                      <button 
                        onClick={() => setLayer(campo.id, 'idrico')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'idrico' ? 'bg-agroke-green/65 text-agroke-black-light font-bold' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Stato Idrico
                      </button>
                      <button 
                        onClick={() => setLayer(campo.id, 'malattie')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'malattie' ? 'bg-agroke-green/65 text-agroke-black-light font-bold' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Rischio Malattie
                      </button>
                    </div>
                  </div>
                  
                  {/* Mappa con layer */}
                  {getLayerImage(campo.id, layerAttivi[campo.id] || 'base')}
                  
                  {/* Metriche chiave */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-3">Metriche del terreno:</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Umidità del suolo:</span>
                        <span className="font-medium">{campo.metriche.umidita_suolo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">pH del suolo:</span>
                        <span className="font-medium">{campo.metriche.ph_suolo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperatura media:</span>
                        <span className="font-medium">{campo.metriche.temperatura_media}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Previsione raccolto:</span>
                        <span className="font-medium">{campo.metriche.previsione_raccolto}</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-gray-600">Rischio malattie:</span>
                        <span 
                          className={`font-medium ${
                            campo.metriche.rischio_malattie === 'Basso' ? 'text-green-600' : 
                            campo.metriche.rischio_malattie === 'Medio' ? 'text-yellow-600' : 
                            'text-red-600'
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
                    <>Nascondi Dettagli <ChevronUp size={16} /></>
                  ) : (
                    <>Visualizza Dettagli <ChevronDown size={16} /></>
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