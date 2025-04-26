import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  AlertTriangle,
  ChevronRight,
  Plus,
  Droplet,
  Sun,
  Wind,
  Cloud,
} from "react-feather";
import Stats from "@/components/ui/stats";
import DashboardMap from "./dashboard-map";
import RecentActivities from "./recent-activities";
import { Suspense } from "react";
import { StatSkeleton, MapSkeleton } from "@/components/ui/skeletons";

export default function Dashboard() {

  return (
    <div className="space-y-6">
      {/* Dashboard header */}
      <div className="flex justify-start items-center">
        <motion.h2
          className="text-2xl font-bold text-green-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Panoramica Aziendale
        </motion.h2>
      </div>

      {/* Quick stats */}
      <Suspense fallback={<StatSkeleton />}>
        <Stats />
      </Suspense>

      {/* Map and activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Suspense fallback={<MapSkeleton />}>
          <DashboardMap />
        </Suspense>
        <RecentActivities />
      </div>

      {/* Notifications and weather */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div> */}
    </div>
  );
}
