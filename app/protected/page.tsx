"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clipboard,
  BarChart2,
  AlertTriangle,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Droplet,
  Sun,
  Wind,
  Cloud,
  ArrowRight,
} from "react-feather";

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Tipologie di attività
const tipiAttivita = [
  { id: "trattamento", nome: "Trattamento fitosanitario", icona: "🌿" },
  { id: "concimazione", nome: "Concimazione", icona: "🧪" },
  { id: "semina", nome: "Semina", icona: "🌱" },
  { id: "raccolta", nome: "Raccolta", icona: "🌾" },
  { id: "irrigazione", nome: "Irrigazione", icona: "💧" },
  { id: "potatura", nome: "Potatura", icona: "✂️" },
  { id: "altro", nome: "Altra operazione", icona: "🔧" },
];

export default function Dashboard() {
  interface Terreno {
    id: number;
    nome: string;
    coltura: string;
    superficie: number;
    coordinate: { lat: number; lng: number };
    ultimaAttivita: string;
    statoSalute: string;
    immagine: string;
  }

  const [terreni, setTerreni] = useState<Terreno[]>([]);
  interface Attivita {
    id: number;
    tipo: string;
    terrenoId: number;
    terrenoNome: string;
    data: string;
    prodotto: string;
    quantita: string;
    note: string;
  }

  const [attivita, setAttivita] = useState<Attivita[]>([]);
  interface Prodotto {
    id: number;
    nome: string;
    principioAttivo: string;
    tipo: string;
    tempoCarenza: number;
    doseConsigliata: string;
  }

  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [selectedTerreno, setSelectedTerreno] = useState<Terreno | null>(null);
  const [meteoData, setMeteoData] = useState({
    temperatura: 22,
    umidita: 65,
    precipitazioni: 0,
    vento: 5,
  });
  const [selectedActivity, setSelectedActivity] = useState<Attivita | null>(
    null
  );
  const [notifiche, setNotifiche] = useState([
    {
      id: 1,
      tipo: "avviso",
      messaggio:
        "Tempo di carenza per trattamento Vigneto Nord in scadenza tra 2 giorni",
      data: "2025-04-21",
    },
    {
      id: 2,
      tipo: "scadenza",
      messaggio:
        "Registrazione annuale quaderno di campagna entro il 30/04/2025",
      data: "2025-04-15",
    },
    {
      id: 3,
      tipo: "avviso",
      messaggio: "Condizioni meteo favorevoli per trattamento anti-peronospora",
      data: "2025-04-22",
    },
  ]);

  const mapRef = useRef(null);

  // Mock data - in a real application these would come from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulating data fetching from Supabase
        setTimeout(() => {
          setTerreni([
            {
              id: 1,
              nome: "Vigneto Nord",
              coltura: "Vite",
              superficie: 3.5,
              coordinate: { lat: 45.123, lng: 9.456 },
              ultimaAttivita: "Trattamento anti-peronospora",
              statoSalute: "ottimo",
              immagine: "/vigneto-nord.jpg",
            },
            {
              id: 2,
              nome: "Oliveto Collina",
              coltura: "Olivo",
              superficie: 2.8,
              coordinate: { lat: 45.128, lng: 9.461 },
              ultimaAttivita: "Concimazione organica",
              statoSalute: "buono",
              immagine: "/oliveto.jpg",
            },
            {
              id: 3,
              nome: "Campo Grano",
              coltura: "Frumento",
              superficie: 5.2,
              coordinate: { lat: 45.118, lng: 9.446 },
              ultimaAttivita: "Diserbo",
              statoSalute: "medio",
              immagine: "/campo-grano.jpg",
            },
          ]);

          setAttivita([
            {
              id: 1,
              tipo: "trattamento",
              terrenoId: 1,
              terrenoNome: "Vigneto Nord",
              data: "2025-04-15",
              prodotto: "Rame 20 WG",
              quantita: "2.5 kg/ha",
              note: "Trattamento preventivo contro peronospora",
            },
            {
              id: 2,
              tipo: "concimazione",
              terrenoId: 2,
              terrenoNome: "Oliveto Collina",
              data: "2025-04-10",
              prodotto: "Stallatico maturo",
              quantita: "30 q/ha",
              note: "Concimazione primaverile di fondo",
            },
            {
              id: 3,
              tipo: "irrigazione",
              terrenoId: 3,
              terrenoNome: "Campo Grano",
              data: "2025-04-18",
              prodotto: "",
              quantita: "25 mm",
              note: "Irrigazione di soccorso per periodo siccitoso",
            },
            {
              id: 4,
              tipo: "trattamento",
              terrenoId: 1,
              terrenoNome: "Vigneto Nord",
              data: "2025-04-01",
              prodotto: "Zolfo bagnabile",
              quantita: "3 kg/ha",
              note: "Trattamento contro oidio",
            },
          ]);

          setProdotti([
            {
              id: 1,
              nome: "Rame 20 WG",
              principioAttivo: "Rame solfato 20%",
              tipo: "Fungicida",
              tempoCarenza: 20,
              doseConsigliata: "2.5 kg/ha",
            },
            {
              id: 2,
              nome: "Zolfo bagnabile",
              principioAttivo: "Zolfo 80%",
              tipo: "Fungicida",
              tempoCarenza: 5,
              doseConsigliata: "3 kg/ha",
            },
            {
              id: 3,
              nome: "Stallatico maturo",
              principioAttivo: "",
              tipo: "Concime organico",
              tempoCarenza: 0,
              doseConsigliata: "20-40 q/ha",
            },
          ]);

          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Errore durante il caricamento dei dati:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simulating map initialization
  useEffect(() => {
    if (mapRef.current && terreni.length > 0) {
      // Mock map initialization
      // In a real application, you would initialize a map library here
      console.log("Map initialized with terreni:", terreni);
    }
  }, [terreni, mapRef]);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "terreni":
        return renderTerreni();
      case "attivita":
        return renderAttivita();
      case "prodotti":
        return renderProdotti();
      case "reports":
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        {/* Dashboard header */}
        <div className="flex justify-between items-center">
          <motion.h2
            className="text-2xl font-bold text-green-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Panoramica Aziendale
          </motion.h2>
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewActivityModal(true)}
          >
            <Plus size={18} />
            <span>Nuova Attività</span>
          </motion.button>
        </div>

        {/* Quick stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            {
              title: "Terreni Gestiti",
              value: terreni.length,
              icon: MapPin,
              color: "bg-blue-500",
              sectionName: "terreni",
            },
            {
              title: "Attività Registrate",
              value: attivita.length,
              icon: Clipboard,
              color: "bg-green-500",
              sectionName: "attivita",
            },
            {
              title: "Prodotti in Magazzino",
              value: prodotti.length,
              icon: BarChart2,
              color: "bg-amber-500",
              sectionName: "prodotti",
            },
            {
              title: "Avvisi Attivi",
              value: notifiche.length,
              icon: AlertTriangle,
              color: "bg-red-500",
              sectionName: "",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-3 md:p-6 flex items-center"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveSection(stat.sectionName)}
            >
              <div className={`${stat.color} text-white p-3 rounded-lg mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map and activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 h-96"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Mappa dei Terreni</h3>
              <button
                className="text-green-600 hover:text-green-800 text-sm flex items-center"
                onClick={() => setActiveSection("terreni")}
              >
                Visualizza tutto <ChevronRight size={16} />
              </button>
            </div>
            <div
              className="bg-gray-100 rounded-lg h-80 relative overflow-hidden"
              ref={mapRef}
            >
              {/* This would be replaced by an actual map */}
              <div className="absolute inset-0 bg-green-50">
                {/* Fake map overlay */}
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="rgba(0,128,0,0.1)"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {terreni.map((terreno, idx) => (
                    <motion.circle
                      key={idx}
                      cx={`${30 + idx * 25}%`}
                      cy={`${40 + (idx % 2) * 20}%`}
                      r="30"
                      fill={
                        idx === 0
                          ? "rgba(16, 185, 129, 0.7)"
                          : "rgba(59, 130, 246, 0.5)"
                      }
                      stroke="#fff"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.2, duration: 0.5 }}
                      onClick={() => setSelectedTerreno(terreno)}
                    />
                  ))}
                </svg>

                {terreni.map((terreno, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute bg-white rounded-lg shadow-md p-2 text-xs font-medium border-l-4 border-green-500"
                    style={{
                      left: `${25 + idx * 25}%`,
                      top: `${30 + (idx % 2) * 20}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.2, duration: 0.3 }}
                  >
                    {terreno.nome} - {terreno.superficie} ha
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent activities */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Attività Recenti</h3>
              <button
                className="text-green-600 hover:text-green-800 text-sm flex items-center"
                onClick={() => setActiveSection("attivita")}
              >
                Visualizza tutto <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {attivita.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={idx}
                  className="border-l-4 border-green-500 pl-3 py-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedActivity(item)}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-2">
                      {tipiAttivita.find((t) => t.id === item.tipo)?.icona ||
                        "🔧"}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">
                        {tipiAttivita.find((t) => t.id === item.tipo)?.nome}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.terrenoNome} -{" "}
                        {new Date(item.data).toLocaleDateString("it-IT")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {attivita.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Nessuna attività registrata</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Notifications and weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Avvisi e Scadenze</h3>
              <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
                Visualizza tutto <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {notifiche.map((notifica, idx) => (
                <motion.div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    notifica.tipo === "avviso"
                      ? "bg-amber-50 border-l-4 border-amber-500"
                      : "bg-red-50 border-l-4 border-red-500"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1, duration: 0.3 }}
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <div
                        className={`mr-3 mt-1 ${
                          notifica.tipo === "avviso"
                            ? "text-amber-500"
                            : "text-red-500"
                        }`}
                      >
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <p className="text-gray-800">{notifica.messaggio}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notifica.data).toLocaleDateString("it-IT")}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weather */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Meteo</h3>
              <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
                Previsioni <ChevronRight size={16} />
              </button>
            </div>
            <div className="text-center py-4">
              <div className="mb-4">
                <p className="text-3xl text-gray-800">
                  <span className="text-5xl">{meteoData.temperatura}°</span>C
                </p>
                <p className="text-gray-600">Oggi, 23 Aprile</p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-1">
                    <Droplet size={16} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600">Umidità</p>
                  <p className="font-semibold">{meteoData.umidita}%</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-1">
                    <Cloud size={16} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600">Precip.</p>
                  <p className="font-semibold">{meteoData.precipitazioni} mm</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-1">
                    <Wind size={16} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600">Vento</p>
                  <p className="font-semibold">{meteoData.vento} km/h</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-1">
                    <Sun size={16} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600">UV</p>
                  <p className="font-semibold">Mod.</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-green-600 text-sm">
                  Condizioni favorevoli per trattamenti fitosanitari
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderTerreni = () => {
    return (
      <div className="space-y-6">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-green-800">I Miei Terreni</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca terreno..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2" onClick={() => {redirect("/protected/fields/add-field")}}>
              <Plus size={18} />
              <span>Nuovo Terreno</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {terreni.map((terreno, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="relative h-40">
                <Image
                  src={terreno.immagine || "/default-field.jpg"}
                  alt={terreno.nome}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{terreno.nome}</h3>
                    <p className="text-sm opacity-90">
                      {terreno.coltura} - {terreno.superficie} ha
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      terreno.statoSalute === "ottimo"
                        ? "bg-green-100 text-green-800"
                        : terreno.statoSalute === "buono"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    Stato: {terreno.statoSalute}
                  </div>
                  <span className="text-xs text-gray-500">
                    ID: {terreno.id}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Ultima attività: {terreno.ultimaAttivita}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    className="text-green-600 hover:text-green-800 text-sm flex items-center"
                    onClick={() => setSelectedTerreno(terreno)}
                  >
                    Dettagli <ArrowRight size={16} className="ml-1" />
                  </button>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100">
                      <Plus size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <MapPin size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };

  const renderAttivita = () => {
    return (
      <div className="space-y-6">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-green-800">
            Registro Attività
          </h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca attività..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              onClick={() => setShowNewActivityModal(true)}
            >
              <Plus size={18} />
              <span>Nuova Attività</span>
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-3 bg-white rounded-xl shadow-md p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="flex items-center text-gray-700 mr-2">
            <Filter size={16} className="mr-1" /> Filtri:
          </span>
          {tipiAttivita.map((tipo, idx) => (
            <button
              key={idx}
              className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:bg-green-50 hover:border-green-300 flex items-center space-x-1"
            >
              <span>{tipo.icona}</span>
              <span>{tipo.nome}</span>
            </button>
          ))}
        </motion.div>

        {/* Activities Table */}
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Terreno
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Prodotto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantità
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attivita.map((att, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}
                  className="hover:bg-green-50 cursor-pointer"
                  onClick={() => setSelectedActivity(att)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(att.data).toLocaleDateString("it-IT")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">
                        {tipiAttivita.find((t) => t.id === att.tipo)?.icona ||
                          "🔧"}
                      </span>
                      <div className="text-sm font-medium text-gray-900">
                        {tipiAttivita.find((t) => t.id === att.tipo)?.nome}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {att.terrenoNome}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {att.prodotto || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{att.quantita}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button className="p-1 rounded-md bg-amber-50 text-amber-600 hover:bg-amber-100">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {attivita.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Nessuna attività registrata
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    );
  };

  const renderProdotti = () => {
    return (
      <div className="space-y-6">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-green-800">
            Prodotti e Magazzino
          </h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca prodotto..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Plus size={18} />
              <span>Nuovo Prodotto</span>
            </button>
          </div>
        </motion.div>

        {/* Products cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {prodotti.map((prodotto, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {prodotto.nome}
                  </h3>
                  <p className="text-sm text-gray-600">{prodotto.tipo}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    prodotto.tipo === "Fungicida"
                      ? "bg-blue-100 text-blue-800"
                      : prodotto.tipo === "Insetticida"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {prodotto.tipo}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                {prodotto.principioAttivo && (
                  <div className="flex justify-between">
                    <span>Principio attivo:</span>
                    <span className="font-medium">
                      {prodotto.principioAttivo}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tempo di carenza:</span>
                  <span className="font-medium">
                    {prodotto.tempoCarenza} giorni
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Dose consigliata:</span>
                  <span className="font-medium">
                    {prodotto.doseConsigliata}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
                  Dettagli <ArrowRight size={16} className="ml-1" />
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };

  const renderReports = () => {
    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-green-800">
          Report e Documentazione
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Documenti Disponibili
          </h3>

          <div className="space-y-4">
            <motion.div
              className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Clipboard size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Quaderno di Campagna 2025
                    </h4>
                    <p className="text-sm text-gray-600">
                      Documento ufficiale aggiornato al 23/04/2025
                    </p>
                  </div>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm">
                  Scarica PDF
                </button>
              </div>
            </motion.div>

            <motion.div
              className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <BarChart2 size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Registro dei Trattamenti
                    </h4>
                    <p className="text-sm text-gray-600">
                      Riepilogo trattamenti fitosanitari 2025
                    </p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
                  Visualizza
                </button>
              </div>
            </motion.div>

            <motion.div
              className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-lg mr-4">
                    <Calendar size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Piano di Concimazione
                    </h4>
                    <p className="text-sm text-gray-600">Piano annuale 2025</p>
                  </div>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-lg text-sm">
                  Visualizza
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Genera Nuovi Documenti
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Registro Trattamenti",
              "Registro Concimazioni",
              "Quaderno di Campagna",
              "Registro Magazzino",
              "Documento PAC",
              "Notifica Biologica",
            ].map((doc, idx) => (
              <motion.div
                key={idx}
                className="border border-green-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-800">{doc}</p>
                </div>
                <button className="mt-3 text-green-600 hover:text-green-800 text-sm flex items-center">
                  Genera <ArrowRight size={14} className="ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Modal for new activity
  const renderNewActivityModal = () => {
    return (
      <AnimatePresence>
        {showNewActivityModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Nuova Attività
                  </h2>
                  <button
                    onClick={() => setShowNewActivityModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Form content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo di Attività
                    </label>
                    <select className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="" disabled selected>
                        Seleziona tipo...
                      </option>
                      {tipiAttivita.map((tipo, idx) => (
                        <option key={idx} value={tipo.id}>
                          {tipo.icona} {tipo.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Terreno
                    </label>
                    <select className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="" disabled selected>
                        Seleziona terreno...
                      </option>
                      {terreni.map((terreno, idx) => (
                        <option key={idx} value={terreno.id}>
                          {terreno.nome} ({terreno.coltura})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prodotto (se applicabile)
                    </label>
                    <select className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="" selected>
                        Nessun prodotto
                      </option>
                      {prodotti.map((prodotto, idx) => (
                        <option key={idx} value={prodotto.id}>
                          {prodotto.nome} ({prodotto.tipo})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantità
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="block w-full border border-gray-300 rounded-l-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Es: 2.5"
                      />
                      <select className="border border-l-0 border-gray-300 rounded-r-lg p-2.5 bg-gray-50">
                        <option value="kg/ha">kg/ha</option>
                        <option value="l/ha">l/ha</option>
                        <option value="q/ha">q/ha</option>
                        <option value="mm">mm</option>
                        <option value="unità">unità</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Note
                    </label>
                    <textarea
                      className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      placeholder="Inserisci eventuali note sull'attività..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowNewActivityModal(false)}
                >
                  Annulla
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Salva Attività
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Modal for selected activity details
  const renderActivityDetailsModal = () => {
    return (
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-lg w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {tipiAttivita.find((t) => t.id === selectedActivity.tipo)
                        ?.icona || "🔧"}
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">
                      {
                        tipiAttivita.find((t) => t.id === selectedActivity.tipo)
                          ?.nome
                      }
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Terreno</p>
                    <p className="font-medium">
                      {selectedActivity.terrenoNome}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium">
                      {new Date(selectedActivity.data).toLocaleDateString(
                        "it-IT"
                      )}
                    </p>
                  </div>
                  {selectedActivity.prodotto && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Prodotto</p>
                        <p className="font-medium">
                          {selectedActivity.prodotto}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantità</p>
                        <p className="font-medium">
                          {selectedActivity.quantita}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {selectedActivity.note && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Note</p>
                    <p className="p-3 bg-gray-50 rounded-lg mt-1">
                      {selectedActivity.note}
                    </p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                  <button className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">
                    Modifica
                  </button>
                  <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Stampa Scheda
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Modal for terreno details
  const renderTerrenoDetailsModal = () => {
    return (
      <AnimatePresence>
        {selectedTerreno && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTerreno(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <Image
                  src={selectedTerreno.immagine || "/default-field.jpg"}
                  alt={selectedTerreno.nome}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-xl">
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h2 className="text-2xl font-bold">
                      {selectedTerreno.nome}
                    </h2>
                    <p className="text-lg opacity-90">
                      {selectedTerreno.coltura} - {selectedTerreno.superficie}{" "}
                      ha
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTerreno(null)}
                    className="absolute top-4 right-4 text-white bg-black/30 rounded-full p-1 hover:bg-black/50"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Ultima Attività</p>
                    <p className="font-medium">
                      {selectedTerreno.ultimaAttivita}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Stato Salute</p>
                    <p
                      className={`font-medium ${
                        selectedTerreno.statoSalute === "ottimo"
                          ? "text-green-600"
                          : selectedTerreno.statoSalute === "buono"
                            ? "text-blue-600"
                            : "text-amber-600"
                      }`}
                    >
                      {selectedTerreno.statoSalute.charAt(0).toUpperCase() +
                        selectedTerreno.statoSalute.slice(1)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Coordinate</p>
                    <p className="font-medium">
                      {selectedTerreno.coordinate.lat.toFixed(3)},{" "}
                      {selectedTerreno.coordinate.lng.toFixed(3)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">ID Terreno</p>
                    <p className="font-medium">{selectedTerreno.id}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Attività Recenti
                  </h3>
                  <div className="space-y-3">
                    {attivita
                      .filter((att) => att.terrenoId === selectedTerreno.id)
                      .slice(0, 3)
                      .map((att, idx) => (
                        <div
                          key={idx}
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSelectedActivity(att)}
                        >
                          <span className="text-xl mr-3">
                            {tipiAttivita.find((t) => t.id === att.tipo)
                              ?.icona || "🔧"}
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">
                              {
                                tipiAttivita.find((t) => t.id === att.tipo)
                                  ?.nome
                              }
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(att.data).toLocaleDateString("it-IT")}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                    <MapPin size={18} className="mr-2" />
                    Vedi su Mappa
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                    <Plus size={18} className="mr-2" />
                    Nuova Attività
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}

      <div className="p-4 sm:p-6 lg:p-8">{renderSection()}</div>

      {/* Modals */}
      {renderNewActivityModal()}
      {renderActivityDetailsModal()}
      {renderTerrenoDetailsModal()}
    </div>
  );
}
