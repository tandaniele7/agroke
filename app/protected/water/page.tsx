"use client";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplet, Leaf, Calendar, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

// Dati storici dei consumi idrici per ciascun terreno
const datiStoriciConsumi = [
  {
    id: 1,
    nome: "Vineyard - Piedmont (Barolo)",
    dati: [
      { mese: 'January', consumo: 35, precipitazioni: 42, efficienza: 78 },
      { mese: 'February', consumo: 28, precipitazioni: 38, efficienza: 80 },
      { mese: 'March', consumo: 42, precipitazioni: 25, efficienza: 75 },
      { mese: 'April', consumo: 48, precipitazioni: 20, efficienza: 81 }
    ],
    // Dati aggiuntivi per il terreno
    risparmiIdrico: 12.4, // percentuale
    efficienzaMedia: 78.5, // percentuale
    consumoTotaleAnno: 480, // mm
    strategieRisparmio: [
      "Installation of advanced humidity sensors",
      "Optimizing watering schedules based on temperature",
      "Implementation of drip irrigation systems"
    ]
  },
  {
    id: 2,
    nome: "Vineyard - Piedmont (Nebbiolo)",
    dati: [
      { mese: 'January', consumo: 22, precipitazioni: 35, efficienza: 65 },
      { mese: 'February', consumo: 25, precipitazioni: 30, efficienza: 68 },
      { mese: 'March', consumo: 38, precipitazioni: 22, efficienza: 70 },
      { mese: 'April', consumo: 45, precipitazioni: 15, efficienza: 72 }
    ],
    risparmiIdrico: 8.2,
    efficienzaMedia: 68.7,
    consumoTotaleAnno: 420,
    strategieRisparmio: [
      "Improved drainage between rows",
      "Organic mulch to reduce evaporation",
      "Soil analysis to optimize water absorption"
    ]
  },
  {
    id: 3,
    nome: "Apple Orchard - Piedmont",
    dati: [
      { mese: 'January', consumo: 18, precipitazioni: 20, efficienza: 55 },
      { mese: 'February', consumo: 22, precipitazioni: 15, efficienza: 52 },
      { mese: 'March', consumo: 35, precipitazioni: 10, efficienza: 48 },
      { mese: 'April', consumo: 55, precipitazioni: 5, efficienza: 45 }
    ],
    risparmiIdrico: -5.8, // negativo, indica un aumento del consumo
    efficienzaMedia: 50.0,
    consumoTotaleAnno: 540,
    strategieRisparmio: [
      "Urgent repair of irrigation system",
      "Installation of rainwater recovery systems",
      "Application of soil moisture conservation techniques"
    ]
  }
];

export default function AnalisiConsumi() {
  const [terrenoSelezionato, setTerrenoSelezionato] = useState(1);
  
  const datiTerreno = datiStoriciConsumi.find(terreno => terreno.id === terrenoSelezionato) || datiStoriciConsumi[0];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Historical Analysis of Water Consumption</h2>
      
      {/* Selettore terreno */}
      <div className="mb-5">
        <label className="text-sm font-medium text-gray-600 mb-2 block">Select Field:</label>
        <div className="flex flex-wrap gap-2">
          {datiStoriciConsumi.map(terreno => (
            <button
              key={terreno.id}
              onClick={() => setTerrenoSelezionato(terreno.id)}
              className={`px-3 py-2 rounded-md text-sm ${
                terrenoSelezionato === terreno.id 
                ? 'bg-agroke-green/65 text-agroke-black-light font-bold' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {terreno.nome}
            </button>
          ))}
        </div>
      </div>
      
      {/* Grafico consumi e precipitazioni */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">Consumption and Precipitation Trends</h3>
        <div className="bg-gray-50 p-4 rounded-lg" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datiTerreno.dati}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mese" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="consumo" stroke="#3B82F6" name="Water consumption (mm)" />
              <Line yAxisId="left" type="monotone" dataKey="precipitazioni" stroke="#10B981" name="Precipitation (mm)" />
              <Line yAxisId="right" type="monotone" dataKey="efficienza" stroke="#F59E0B" name="Efficiency (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Statistiche e metriche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg flex items-start">
          <div className="rounded-full bg-blue-100 p-2 mr-3">
            <Droplet size={18} className="text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Yearly Consumption</h4>
            <p className="text-lg font-semibold">{datiTerreno.consumoTotaleAnno} mm</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg flex items-start">
          <div className="rounded-full bg-green-100 p-2 mr-3">
            <Leaf size={18} className="text-green-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Average Efficiency</h4>
            <p className="text-lg font-semibold">{datiTerreno.efficienzaMedia}%</p>
          </div>
        </div>
        
        <div className={`${datiTerreno.risparmiIdrico >= 0 ? 'bg-green-50' : 'bg-red-50'} p-4 rounded-lg flex items-start`}>
          <div className={`rounded-full ${datiTerreno.risparmiIdrico >= 0 ? 'bg-green-100' : 'bg-red-100'} p-2 mr-3`}>
            {datiTerreno.risparmiIdrico >= 0 ? 
              <ArrowDownCircle size={18} className="text-green-600" /> : 
              <ArrowUpCircle size={18} className="text-red-600" />
            }
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Consumption Change</h4>
            <p className={`text-lg font-semibold ${datiTerreno.risparmiIdrico >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {datiTerreno.risparmiIdrico >= 0 ? "-" : "+"}{Math.abs(datiTerreno.risparmiIdrico)}%
            </p>
          </div>
        </div>
      </div>
      
      {/* Strategie di ottimizzazione */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-medium text-gray-700 mb-3">Water Optimization Strategies</h3>
        <ul className="space-y-2">
          {datiTerreno.strategieRisparmio.map((strategia, index) => (
            <li key={index} className="flex items-start">
              <Calendar size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{strategia}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}