"use client";
import { useState } from 'react';
import { 
  Trash2, Plus, MapPin, Droplet, Leaf, Bug, ChevronDown, ChevronUp, 
  Layers, AlertCircle, BarChart3, PiggyBank, Sprout
} from 'lucide-react';
import Link from 'next/link';

// Dati predefiniti delle colture per ogni terreno
const colturePredefinite: Record<number, {
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
}[]> = {
  1: [  // Campo di Grano - Toscana
    {
      id: 1,
      nome: "Grano duro",
      varieta: "Senatore Cappelli",
      data_semina: "2024-11-15",
      data_raccolto_prevista: "2025-06-20",
      area_coltivata: 12.75,
      rendimento_previsto: 3.8,
      prezzo_stimato: 380,  // €/ton
      ricavo_stimato: 18392,  // €
      stato_salute: "Ottimo",
      avvisi: [
        {
          tipo: "Meteo",
          descrizione: "Precipitazioni sotto la media previste nelle prossime 3 settimane.",
          impatto: "Possibile riduzione del rendimento del 2% se non viene applicata irrigazione supplementare.",
          livello: "medio"
        }
      ],
      consigli: "Considerare un'irrigazione supplementare entro 7 giorni per mantenere la resa prevista."
    }
  ],
  2: [  // Vigneto - Piemonte
    {
      id: 2,
      nome: "Vite",
      varieta: "Nebbiolo",
      data_semina: "Piante di 8 anni",
      data_raccolto_prevista: "2025-09-15",
      area_coltivata: 8.32,
      rendimento_previsto: 7.5,
      prezzo_stimato: 2200,  // €/ton
      ricavo_stimato: 137280,  // €
      stato_salute: "Buono",
      avvisi: [
        {
          tipo: "Malattia",
          descrizione: "Rischio di peronospora in aumento a causa dell'umidità prevista.",
          impatto: "Possibile riduzione della qualità dell'uva e calo della produzione fino al 5% senza trattamento preventivo.",
          livello: "alto"
        },
        {
          tipo: "Nutrienti",
          descrizione: "Carenza di potassio rilevata in alcune zone del vigneto.",
          impatto: "Potrebbe influire sulla maturazione dell'uva e ridurre il contenuto zuccherino.",
          livello: "basso"
        }
      ],
      consigli: "Applicare fungicida preventivo e considerare un'integrazione di potassio localizzata nelle aree carenti."
    }
  ],
  3: [  // Uliveto - Puglia
    {
      id: 3,
      nome: "Ulivo",
      varieta: "Coratina",
      data_semina: "Piante di 15+ anni",
      data_raccolto_prevista: "2025-11-05",
      area_coltivata: 15.45,
      rendimento_previsto: 0.9,
      prezzo_stimato: 7500,  // €/ton (olio)
      ricavo_stimato: 104288,  // €
      stato_salute: "Critico",
      avvisi: [
        {
          tipo: "Parassita",
          descrizione: "Infestazione di mosca dell'olivo (Bactrocera oleae) rilevata.",
          impatto: "Rischio di riduzione della produzione fino al 20% e degradazione della qualità dell'olio.",
          livello: "critico"
        },
        {
          tipo: "Idrico",
          descrizione: "Stress idrico severo rilevato nella maggior parte dell'uliveto.",
          impatto: "Riduzione prevista della produzione dell'8% e potenziale caduta precoce delle olive.",
          livello: "critico"
        }
      ],
      consigli: "Intervenire urgentemente con trattamento specifico per la mosca dell'olivo e programmare irrigazione di soccorso entro 48 ore."
    }
  ]
};

// Dati predefiniti dei terreni
const campiPredefiniti = [
  {
    id: 1,
    nome: "Campo di Grano - Toscana",
    area: 12.75,
    coordinate: { lat: 43.76956, lng: 11.25584 },
    coltura_attuale: "Grano duro",
    stato_idrico: "Ottimo",
    stato_fertilizzante: "Buono",
    stato_pesticidi: "Sufficiente",
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
    stato_idrico: "Sufficiente",
    stato_fertilizzante: "Ottimo",
    stato_pesticidi: "Buono",
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
    stato_idrico: "Critico",
    stato_fertilizzante: "Sufficiente",
    stato_pesticidi: "Critico",
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

export default function ColturePage() {
  const [campiEspansi, setCampiEspansi] = useState<{ [key: number]: boolean }>({});
  const [layerAttivi, setLayerAttivi] = useState<{ [key: number]: string }>({});
  const [coltureEspanse, setColtureEspanse] = useState<{ [key: number]: boolean }>({});

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

  const toggleColturaEspansione = (id: number) => {
    setColtureEspanse(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const setLayer = (id: number, layer: string) => {
    setLayerAttivi(prev => ({
      ...prev,
      [id]: layer
    }));
  };

  function getStatoClasse(stato: string) {
    switch (stato.toLowerCase()) {
      case 'ottimo':
        return 'bg-green-100 text-green-800';
      case 'buono':
        return 'bg-blue-100 text-blue-800';
      case 'sufficiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'critico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getLivelloAvvisoClasse(livello: string) {
    switch (livello.toLowerCase()) {
      case 'basso':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'medio':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'alto':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'critico':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  }

  function getLayerImage(campoId: number, layer: string) {
    // In un'app reale, qui si userebbero immagini diverse per ogni layer
    // ma per ora simuliamo l'effetto con dei filtri CSS
    const campo = campiPredefiniti.find(c => c.id === campoId);
    if (!campo) return null;

    const baseImageUrl = campo.mappa_url;
    
    // Stile CSS per simulare diverse visualizzazioni
    let filterStyle = {};
    switch(layer) {
      case 'satellite':
        filterStyle = { filter: 'contrast(1.2) saturate(1.1)' };
        break;
      case 'idrico':
        filterStyle = { filter: 'hue-rotate(240deg) saturate(0.8)' };
        break;
      case 'malattie':
        filterStyle = { filter: 'hue-rotate(320deg) saturate(1.2)' };
        break;
      default:
        filterStyle = {};
    }

    return (
      <div className="relative w-full h-[450px]">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${baseImageUrl})`,
              ...filterStyle
            }}
          />
          <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
            {layer === 'base' && 'Vista Base'}
            {layer === 'satellite' && 'Vista Satellite'}
            {layer === 'idrico' && 'Stato Idrico'}
            {layer === 'malattie' && 'Rischio Malattie'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Le Tue Colture</h1>
          <div className="flex gap-3">
            <Link href="/protected/fields">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <span>Visualizza Terreni</span>
              </button>
            </Link>
            <Link href="/protected/crops/add-crop">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus size={20} />
                <span>Aggiungi Nuova Coltura</span>
              </button>
            </Link>
          </div>
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
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span>{campo.coordinate.lat.toFixed(5)}, {campo.coordinate.lng.toFixed(5)}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-sm">Area: {campo.area.toFixed(2)} ettari</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">Coltura principale: {campo.coltura_attuale}</span>
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
              
              {/* Informazioni sulle colture presenti in questo terreno */}
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center mb-3">
                  <Sprout size={18} className="text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-700">Colture presenti:</h3>
                </div>
                
                {colturePredefinite[campo.id]?.map(coltura => (
                  <div key={coltura.id} className="mb-4 bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{coltura.nome} - {coltura.varieta}</h4>
                        <div className="text-sm text-gray-600 mb-2">
                          <span>Area coltivata: {coltura.area_coltivata} ettari</span>
                          <span className="mx-2">•</span>
                          <span>Stato: <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatoClasse(coltura.stato_salute)}`}>{coltura.stato_salute}</span></span>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleColturaEspansione(coltura.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {coltureEspanse[coltura.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <div className="bg-green-50 p-3 rounded-md">
                        <div className="flex items-center text-green-700 mb-1">
                          <BarChart3 size={16} className="mr-1" />
                          <span className="font-medium text-sm">Rendimento previsto</span>
                        </div>
                        <p className="text-lg font-semibold">{coltura.rendimento_previsto} ton/ha</p>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-md">
                        <div className="flex items-center text-blue-700 mb-1">
                          <PiggyBank size={16} className="mr-1" />
                          <span className="font-medium text-sm">Ricavo stimato</span>
                        </div>
                        <p className="text-lg font-semibold">{coltura.ricavo_stimato.toLocaleString()} €</p>
                      </div>
                      
                      <div className="bg-amber-50 p-3 rounded-md">
                        <div className="flex items-center text-amber-700 mb-1">
                          <AlertCircle size={16} className="mr-1" />
                          <span className="font-medium text-sm">Avvisi</span>
                        </div>
                        <p className="text-lg font-semibold">{coltura.avvisi.length}</p>
                      </div>
                    </div>
                    
                    {coltureEspanse[coltura.id] && (
                      <div className="mt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Data semina/impianto:</p>
                            <p className="font-medium">{coltura.data_semina}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Data raccolto prevista:</p>
                            <p className="font-medium">{coltura.data_raccolto_prevista}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Prezzo stimato:</p>
                            <p className="font-medium">{coltura.prezzo_stimato} €/ton</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Produzione totale stimata:</p>
                            <p className="font-medium">{(coltura.rendimento_previsto * coltura.area_coltivata).toFixed(1)} ton</p>
                          </div>
                        </div>
                        
                        {coltura.avvisi.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-medium mb-2 flex items-center">
                              <AlertCircle size={16} className="text-amber-500 mr-1" />
                              <span>Avvisi e minacce potenziali</span>
                            </h5>
                            <div className="space-y-3">
                              {coltura.avvisi.map((avviso, idx) => (
                                <div key={idx} className={`border-l-4 p-3 rounded-r-md ${getLivelloAvvisoClasse(avviso.livello)}`}>
                                  <div className="font-medium">{avviso.tipo}: {avviso.descrizione}</div>
                                  <div className="text-sm mt-1">Impatto: {avviso.impatto}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-green-50 p-3 rounded-md">
                          <h5 className="font-medium mb-2">Consigli per migliorare la resa:</h5>
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
                      <span className="font-medium text-gray-700">Visualizza Layer:</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button 
                        onClick={() => setLayer(campo.id, 'base')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'base' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Base
                      </button>
                      <button 
                        onClick={() => setLayer(campo.id, 'satellite')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'satellite' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Satellite
                      </button>
                      <button 
                        onClick={() => setLayer(campo.id, 'idrico')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'idrico' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Stato Idrico
                      </button>
                      <button 
                        onClick={() => setLayer(campo.id, 'malattie')}
                        className={`px-3 py-1 rounded-full text-sm ${layerAttivi[campo.id] === 'malattie' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
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
                    <>Nascondi Dettagli Terreno <ChevronUp size={16} /></>
                  ) : (
                    <>Visualizza Dettagli Terreno <ChevronDown size={16} /></>
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