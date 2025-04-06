"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Plus, MapPin, Droplet, Leaf, Bug } from 'lucide-react';

// Inizializza il client Supabase con le variabili d'ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaccia per i dati del terreno
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
}

export default function TerreniFarmer() {
  const [campi, setCampi] = useState<Campo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampi() {
      setIsLoading(true);
      try {
        // Recupera i terreni dell'utente corrente da Supabase
        const { data, error } = await supabase
          .from('campi')
          .select('*')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        if (error) throw error;
        setCampi(data || []);
      } catch (err) {
        console.error('Errore nel recupero dei campi:', err);
        setError('Impossibile caricare i tuoi terreni. Riprova più tardi.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCampi();
  }, []);

  const eliminaCampo = async (id: number) => {
    try {
      const { error } = await supabase
        .from('campi')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCampi(campi.filter(campo => campo.id !== id));
    } catch (err) {
      console.error('Errore durante l\'eliminazione del campo:', err);
      setError('Impossibile eliminare il terreno. Riprova più tardi.');
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Caricamento terreni in corso...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">I Tuoi Terreni</h1>
          <Link href="/protected/fields/add-field">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={20} />
              <span>Aggiungi Nuovo Terreno</span>
            </button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {campi.length === 0 && !isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl text-gray-600 mb-4">Non hai ancora aggiunto terreni</h2>
            <p className="text-gray-500 mb-6">Inizia aggiungendo il tuo primo terreno per monitorare risorse e ottimizzare la produzione</p>
            <Link href="/protected/fields/add-field">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                <Plus size={20} />
                <span>Aggiungi Primo Terreno</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campi.map((campo) => (
              <div key={campo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{campo.nome}</h2>
                    <button
                      onClick={() => eliminaCampo(campo.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      aria-label="Elimina terreno"
                    >
                      <Trash2 size={20} />
                    </button>
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
                
                <Link href={`/campo/${campo.id}`}>
                  <button className="w-full bg-gray-50 hover:bg-gray-100 py-3 text-gray-700 font-medium text-center transition-colors border-t border-gray-100">
                    Visualizza Dettagli
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}