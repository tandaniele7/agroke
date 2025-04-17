"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, CloudRain, AlertTriangle, MapPin, Bug } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  // Dati predefiniti dei terreni basati sulla pagina precedente
  const campiPredefiniti: Array<{
    id: number;
    nome: string;
    area: number;
    coordinate: { lat: number; lng: number };
    coltura_attuale: string;
    stato_idrico: "Optimal" | "Good" | "Sufficient" | "Critical";
    stato_fertilizzante: "Optimal" | "Good" | "Sufficient" | "Critical";
    stato_pesticidi: "Optimal" | "Good" | "Sufficient" | "Critical";
    health: number;
    lastUpdated: string;
    rischio_malattie: "Low" | "Medium" | "High";
  }> = [
    {
      id: 1,
      nome: "Vineyard - Piedmont",
      area: 12.75,
      coordinate: { lat: 43.76956, lng: 11.25584 },
      coltura_attuale: "Grape (Barolo)",
      stato_idrico: "Critical",
      stato_fertilizzante: "Good",
      stato_pesticidi: "Sufficient",
      health: 85,
      lastUpdated: "2 hours ago",
      rischio_malattie: "Low"
    },
    {
      id: 2,
      nome: "Vineyard - Piedmont",
      area: 8.32,
      coordinate: { lat: 44.69825, lng: 8.21376 },
      coltura_attuale: "Grape (Nebbiolo)",
      stato_idrico: "Critical",
      stato_fertilizzante: "Optimal",
      stato_pesticidi: "Good",
      health: 75,
      lastUpdated: "4 hours ago",
      rischio_malattie: "Medium"
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
      health: 60,
      lastUpdated: "1 day ago",
      rischio_malattie: "High"
    }
  ];

  // Stato per tenere traccia del campo selezionato per la visualizzazione dettagliata
  const [campoSelezionato, setCampoSelezionato] = useState(campiPredefiniti[0]);

  // Calcola i dati aggregati per le statistiche
  const countAttivi = campiPredefiniti.length;
  const efficienzaIdrica = Math.round(
    (campiPredefiniti.filter(campo => campo.stato_idrico !== "Critical").length / countAttivi) * 100
  );
  const condizioniMeteo = "Variable";
  const countAllarmi = campiPredefiniti.filter(campo => 
    campo.stato_idrico === "Critical" || 
    campo.stato_fertilizzante === "Critical" || 
    campo.stato_pesticidi === "Critical" ||
    campo.rischio_malattie === "High"
  ).length;

  const fieldStats = [
    {
      title: "Active Fields",
      value: countAttivi.toString(),
      icon: Leaf,
      color: "text-agroke-green bg-agroke-green/10",
    },
    {
      title: "Water Efficiency",
      value: `${efficienzaIdrica}%`,
      icon: Droplets,
      color: "text-agroke-blue bg-agroke-blue/10",
    },
    {
      title: "Weather Conditions",
      value: condizioniMeteo,
      icon: CloudRain,
      color: "text-agroke-blue-light bg-agroke-blue-light/10",
    },
    {
      title: "Risk Alerts",
      value: countAllarmi.toString(),
      icon: AlertTriangle,
      color: "text-agroke-brown bg-agroke-brown/10",
    },
  ];

  // Eventi generati in base ai dati dei campi
  const events = [
    {
      id: 1,
      tipo: "Warning",
      titolo: "Disease Risk Alert",
      descrizione: "The Apple Orchard in Piedmont shows a high risk of infection by apple scab. Immediate action is required.",
      icona: AlertTriangle,
      iconaColore: "text-agroke-brown",
      data: "Today",
      campo: "Apple Orchard - Piedmont"
    },
    {
      id: 2,
      tipo: "Warning",
      titolo: "Water Efficiency Alert",
      descrizione: "The Nebbiolo vineyard in Piedmont shows insufficient water levels. Immediate action is required.",
      icona: Droplets,
      iconaColore: "text-agroke-blue",
      data: "Today",
      campo: "Nebbiolo Vineyard - Piedmont"
    },
    {
      id: 3,
      tipo: "Treatment",
      titolo: "Recommended Treatment",
      descrizione: "The Barolo vineyard in Piedmont requires preventive treatment against powdery mildew.",
      icona: Bug,
      iconaColore: "text-agroke-blue-light",
      data: "Tra 2 giorni",
      campo: "Vigneto - Piemonte"
    },
  ];

  // Preparazione dati per i grafici
  const prepareResourceData = (campo: { stato_idrico: keyof typeof statusMap; stato_fertilizzante: keyof typeof statusMap; stato_pesticidi: keyof typeof statusMap }) => {
    const statusMap = {
      "Optimal": 90,
      "Good": 75,
      "Sufficient": 50,
      "Critical": 20,
    };

    return [
      { name: "Water", value: statusMap[campo.stato_idrico] || 0, color: "#2563eb" },
      { name: "Fertilizer", value: statusMap[campo.stato_fertilizzante] || 0, color: "#65a30d" },
      { name: "Pesticides", value: statusMap[campo.stato_pesticidi] || 0, color: "#ca8a04" },
    ];
  };

  const resourceData = prepareResourceData(campoSelezionato);

  // Funzione per mappare lo stato a colori per i grafici
  const getStatusColor = (status: "Optimal" | "Good" | "Sufficient" | "Critical") => {
    switch(status) {
      case "Optimal": return "#22c55e";
      case "Good": return "#3b82f6";
      case "Sufficient": return "#eab308";
      case "Critical": return "#ef4444";
      default: return "#6b7280";
    }
  };

  // Funzione per determinare il colore del rischio malattie
  const getRiskColor = (risk: "High" | "Medium" |"Low" ) => {
    switch(risk) {
      case "Low": return "#22c55e";
      case "Medium": return "#eab308";
      case "High": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-agroke-black-dark">Welcome!</h1>
        <p className="text-sm text-muted-foreground">Last Scan: Today, 10:15 a.m.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fieldStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl text-agroke-black-light font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nuovo widget statistiche campi */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className='text-agroke-black-dark'>Detailed Field Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <p className="text-sm font-medium mb-2 text-agroke-black-dark">Select a Field:</p>
                {campiPredefiniti.map((campo) => (
                  <div 
                    key={campo.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      campoSelezionato.id === campo.id ? 'border-agroke-green bg-gray-50' : ''
                    }`}
                    onClick={() => setCampoSelezionato(campo)}
                  >
                    <p className="font-medium text-agroke-black-dark">{campo.nome}</p>
                    <p className="text-xs text-muted-foreground">{campo.coltura_attuale}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-agroke-black-dark">{campoSelezionato.nome}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-agroke-black-dark">General Health Index</p>
                        <div className="flex items-center mt-1">
                        <Progress 
                          value={campoSelezionato.health} 
                          className="h-4 flex-1 mr-2" 
                          color={
                           campoSelezionato.health > 80 
                            ? "#22c55e" // green
                            : campoSelezionato.health > 60 
                            ? "#eab308" // yellow
                            : "#ef4444" // red
                          }
                        />
                        <span className="text-sm font-bold text-agroke-black-dark">{campoSelezionato.health}%</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 border rounded">
                        <p className="text-xs text-muted-foreground">Water State</p>
                        <div className="flex items-center mt-1">
                          <div 
                            className="w-3 h-3 rounded-full mr-1" 
                            style={{ backgroundColor: getStatusColor(campoSelezionato.stato_idrico) }}
                          />
                          <p className="text-sm font-medium text-agroke-black-dark">{campoSelezionato.stato_idrico}</p>
                        </div>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="text-xs text-muted-foreground">Fertilizer</p>
                        <div className="flex items-center mt-1">
                          <div 
                            className="w-3 h-3 rounded-full mr-1" 
                            style={{ backgroundColor: getStatusColor(campoSelezionato.stato_fertilizzante) }}
                          />
                          <p className="text-sm font-medium text-agroke-black-dark">{campoSelezionato.stato_fertilizzante}</p>
                        </div>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="text-xs text-muted-foreground">Pesticides</p>
                        <div className="flex items-center mt-1">
                          <div 
                            className="w-3 h-3 rounded-full mr-1" 
                            style={{ backgroundColor: getStatusColor(campoSelezionato.stato_pesticidi) }}
                          />
                          <p className="text-sm font-medium text-agroke-black-dark">{campoSelezionato.stato_pesticidi}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 border rounded">
                      <p className="text-xs text-muted-foreground">Disease Risk</p>
                      <div className="flex items-center mt-1">
                        <div 
                          className="w-3 h-3 rounded-full mr-1" 
                          style={{ backgroundColor: getRiskColor(campoSelezionato.rischio_malattie) }}
                        />
                        <p className="text-sm font-medium text-agroke-black-dark">{campoSelezionato.rischio_malattie}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 border rounded">
                        <p className="text-xs text-muted-foreground">Surface</p>
                        <p className="text-sm font-medium text-agroke-black-dark">{campoSelezionato.area} hectares</p>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="text-xs text-muted-foreground">Last Update</p>
                        <p className="text-sm font-medium text-agroke-black-dark">{campoSelezionato.lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold mb-2 text-agroke-black-dark">Avg Resource Usage/Treatment</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {resourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4">
                    <Link href={`/protected/fields/${campoSelezionato.id}`}>
                      <button className="w-full py-2 px-4 bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold rounded transition-colors">
                      Full Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className='text-agroke-black-dark'>Your Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campiPredefiniti.map((campo) => (
                <Link href={`/terreni/${campo.id}`} key={campo.id}>
                  <div className="field-card border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-agroke-black-dark">{campo.nome}</h3>
                      <span className="text-xs text-muted-foreground">
                        {campo.lastUpdated}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin size={14} className="mr-1 text-gray-500" />
                      <span className="mr-2">
                        {campo.coordinate.lat.toFixed(2)}, {campo.coordinate.lng.toFixed(2)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>Crop: {campo.coltura_attuale}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-agroke-black-dark">Health Index</span>
                        <span className="text-sm font-medium text-agroke-black-dark">{campo.health}%</span>
                      </div>
                      <Progress 
                        value={campo.health} 
                        className="h-2" 
                        color={
                          campo.health > 80 
                           ? "#22c55e" // green
                           : campo.health > 60 
                           ? "#eab308" // yellow
                           : "#ef4444" // red
                         }
                      />
                    </div>
                    <div className="mt-2 flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        campo.stato_idrico === "Optimal" ? "bg-green-100 text-green-800" :
                        campo.stato_idrico === "Good" ? "bg-blue-100 text-blue-800" :
                        campo.stato_idrico === "Sufficient" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        Water: {campo.stato_idrico}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        campo.rischio_malattie === "Low" ? "bg-green-100 text-green-800" :
                        campo.rischio_malattie === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        Risk: {campo.rischio_malattie}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className='text-agroke-black-dark'>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <event.icona className={`h-4 w-4 ${event.iconaColore}`} />
                    <p className="font-medium text-agroke-black-dark">{event.titolo}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.descrizione}</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-muted-foreground">{event.data}</p>
                    <p className="text-xs font-medium text-agroke-black-dark">{event.campo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}