"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, CloudRain, AlertTriangle, MapPin, Bug } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function Dashboard() {
  // Dati predefiniti dei terreni basati sulla pagina precedente
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
      health: 85,
      lastUpdated: "2 ore fa",
      rischio_malattie: "Basso"
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
      health: 75,
      lastUpdated: "4 ore fa",
      rischio_malattie: "Medio"
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
      health: 60,
      lastUpdated: "1 giorno fa",
      rischio_malattie: "Alto"
    }
  ];

  // Calcola i dati aggregati per le statistiche
  const countAttivi = campiPredefiniti.length;
  const efficienzaIdrica = Math.round(
    (campiPredefiniti.filter(campo => campo.stato_idrico !== "Critico").length / countAttivi) * 100
  );
  const condizioniMeteo = "Variabili";
  const countAllarmi = campiPredefiniti.filter(campo => 
    campo.stato_idrico === "Critico" || 
    campo.stato_fertilizzante === "Critico" || 
    campo.stato_pesticidi === "Critico" ||
    campo.rischio_malattie === "Alto"
  ).length;

  const fieldStats = [
    {
      title: "Campi Attivi",
      value: countAttivi.toString(),
      icon: Leaf,
      color: "text-agroke-green bg-agroke-green/10",
    },
    {
      title: "Efficienza Idrica",
      value: `${efficienzaIdrica}%`,
      icon: Droplets,
      color: "text-agroke-blue bg-agroke-blue/10",
    },
    {
      title: "Condizioni Meteo",
      value: condizioniMeteo,
      icon: CloudRain,
      color: "text-agroke-blue-light bg-agroke-blue-light/10",
    },
    {
      title: "Allarmi di Rischio",
      value: countAllarmi.toString(),
      icon: AlertTriangle,
      color: "text-agroke-brown bg-agroke-brown/10",
    },
  ];

  // Eventi generati in base ai dati dei campi
  const events = [
    {
      id: 1,
      tipo: "allarme",
      titolo: "Allarme Rischio Malattia",
      descrizione: "L'Uliveto in Puglia mostra un rischio alto di infezione da Xylella.",
      icona: AlertTriangle,
      iconaColore: "text-agroke-brown",
      data: "Oggi",
      campo: "Uliveto - Puglia"
    },
    {
      id: 2,
      tipo: "idrico",
      titolo: "Carenza Idrica Critica",
      descrizione: "L'Uliveto in Puglia necessita di irrigazione immediata.",
      icona: Droplets,
      iconaColore: "text-agroke-blue",
      data: "Domani",
      campo: "Uliveto - Puglia"
    },
    {
      id: 3,
      tipo: "trattamento",
      titolo: "Trattamento Consigliato",
      descrizione: "Il Vigneto in Piemonte necessita di trattamento preventivo contro l'oidio.",
      icona: Bug,
      iconaColore: "text-agroke-blue-light",
      data: "Tra 2 giorni",
      campo: "Vigneto - Piemonte"
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bentornato, Agricoltore</h1>
        <p className="text-sm text-muted-foreground">Ultima scansione: Oggi, 10:15</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fieldStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>I Tuoi Terreni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campiPredefiniti.map((campo) => (
                <Link href={`/terreni/${campo.id}`} key={campo.id}>
                  <div className="field-card border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{campo.nome}</h3>
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
                      <span>Coltura: {campo.coltura_attuale}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Indice di Salute</span>
                        <span className="text-sm font-medium">{campo.health}%</span>
                      </div>
                      <Progress 
                        value={campo.health} 
                        className="h-2" 
                        color={campo.health > 80 ? "bg-green-500" : campo.health > 60 ? "bg-yellow-500" : "bg-red-500"}
                      />
                    </div>
                    <div className="mt-2 flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        campo.stato_idrico === "Ottimo" ? "bg-green-100 text-green-800" :
                        campo.stato_idrico === "Buono" ? "bg-blue-100 text-blue-800" :
                        campo.stato_idrico === "Sufficiente" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        Acqua: {campo.stato_idrico}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        campo.rischio_malattie === "Basso" ? "bg-green-100 text-green-800" :
                        campo.rischio_malattie === "Medio" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        Rischio: {campo.rischio_malattie}
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
            <CardTitle>Eventi in Arrivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <event.icona className={`h-4 w-4 ${event.iconaColore}`} />
                    <p className="font-medium">{event.titolo}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.descrizione}</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-muted-foreground">{event.data}</p>
                    <p className="text-xs font-medium">{event.campo}</p>
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