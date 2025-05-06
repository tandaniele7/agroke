"use client";

import { Thermometer, Droplet, Wind } from "lucide-react";

import { WeatherInfoInterface } from "@/lib/definitions";

export default function WeatherCard(weatherInfo: WeatherInfoInterface) {
  const weather = weatherInfo.data;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-agroke-green/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-agroke-green/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="relative">
        <h2 className="text-lg font-semibold text-agroke-black-light mb-6">
          Condizioni Meteo
        </h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between p-3 rounded-xl bg-agroke-green/5 transition-colors hover:bg-agroke-green/10">
            <div className="flex items-center">
              <Thermometer className="w-5 h-5 text-red-500 mr-3" />
              <span className="text-gray-600">Temperatura</span>
            </div>
            <span className="font-semibold text-agroke-black-light">
              {Math.round(weather.temperature)}°C
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-agroke-green/5 transition-colors hover:bg-agroke-green/10">
            <div className="flex items-center">
              <Droplet className="w-5 h-5 text-blue-500 mr-3" />
              <span className="text-gray-600">Umidità</span>
            </div>
            <span className="font-semibold text-agroke-black-light">
              {weather.humidity}%
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-agroke-green/5 transition-colors hover:bg-agroke-green/10">
            <div className="flex items-center">
              <Wind className="w-5 h-5 text-agroke-green mr-3" />
              <span className="text-gray-600">Vento</span>
            </div>
            <span className="font-semibold text-agroke-black-light">
              {weather.wind} km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
