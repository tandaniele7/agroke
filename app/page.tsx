// page.tsx
"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inizializzazione di Supabase (sostituire con le proprie credenziali)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [azienda, setAzienda] = useState('');
  const [ettari, setEttari] = useState('');
  const [messaggioStato, setMessaggioStato] = useState<{tipo: 'successo' | 'errore' | null, testo: string}>({tipo: null, testo: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      setMessaggioStato({tipo: 'errore', testo: 'Inserisci un indirizzo email valido'});
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contatti')
        .insert([{ email, nome, azienda, ettari }]);
      
      if (error) throw error;
      
      setMessaggioStato({
        tipo: 'successo', 
        testo: 'Grazie per il tuo interesse! Ti contatteremo presto.'
      });
      
      // Reset del form
      setEmail('');
      setNome('');
      setAzienda('');
      setEttari('');
      
    } catch (error) {
      console.error('Errore:', error);
      setMessaggioStato({
        tipo: 'errore', 
        testo: 'Si è verificato un errore. Riprova più tardi.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-green-800">AgroFuturo</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
            Il Futuro dell'Agricoltura è Precisione
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
            Soluzioni innovative per ottimizzare l'applicazione di prodotti fitosanitari nei frutteti e oliveti.
          </p>
          <button onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg">
            Scopri di più
          </button>
        </div>
      </section>

      {/* Problema e Vantaggi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Perché l'Irrorazione di Precisione?</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-green-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Il Problema</h3>
              <p className="text-gray-700 mb-4">
                I metodi tradizionali di irrorazione nei frutteti comportano:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Eccessivo utilizzo di prodotti fitosanitari</li>
                <li>Distribuzione non uniforme sulle piante</li>
                <li>Dispersione nell'ambiente circostante</li>
                <li>Costi elevati per gli agricoltori</li>
                <li>Impatto ambientale significativo</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">I Vantaggi della Precisione</h3>
              <p className="text-gray-700 mb-4">
                Gli studi dimostrano che le tecnologie di precisione permettono:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Riduzione fino al 90% dell'uso di prodotti fitosanitari</li>
                <li>Risparmio significativo sui costi di produzione</li>
                <li>Minore impatto ambientale</li>
                <li>Maggiore efficacia dei trattamenti</li>
                <li>Miglioramento della qualità dei prodotti</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl text-gray-700 italic max-w-3xl mx-auto">
              "Secondo recenti ricerche, l'adozione di tecnologie di irrorazione di precisione può portare a una riduzione fino al 90% del consumo di prodotti fitosanitari, mantenendo o migliorando l'efficacia dei trattamenti."
            </p>
          </div>
        </div>
      </section>

      {/* Immagine o Grafico */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
              <p className="text-gray-500">Grafico comparativo tra metodi tradizionali e di precisione</p>
            </div>
            <p className="mt-4 text-gray-700">
              Confronto tra i costi e l'efficacia dei metodi tradizionali rispetto alle nuove tecnologie di precisione.
            </p>
          </div>
        </div>
      </section>

      {/* Form di Contatto */}
      <section id="contatti" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
            Sei interessato a ottimizzare i trattamenti nel tuo frutteto?
          </h2>
          <p className="text-center text-xl text-gray-700 mb-12">
            Stiamo sviluppando soluzioni innovative per l'agricoltura di precisione. Lasciaci i tuoi contatti per ricevere aggiornamenti e partecipare alla fase di testing.
          </p>
          
          <form onSubmit={handleSubmit} className="bg-green-50 p-8 rounded-lg shadow-md">
            {messaggioStato.tipo && (
              <div className={`p-4 mb-6 rounded ${messaggioStato.tipo === 'successo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {messaggioStato.testo}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="La tua email"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="nome" className="block text-gray-700 font-medium mb-2">Nome</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Il tuo nome"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="azienda" className="block text-gray-700 font-medium mb-2">Azienda agricola</label>
              <input
                type="text"
                id="azienda"
                value={azienda}
                onChange={(e) => setAzienda(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nome della tua azienda"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="ettari" className="block text-gray-700 font-medium mb-2">Ettari coltivati</label>
              <input
                type="text"
                id="ettari"
                value={ettari}
                onChange={(e) => setEttari(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Dimensione approssimativa in ettari"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:opacity-70"
            >
              {isSubmitting ? 'Invio in corso...' : 'Inviami aggiornamenti'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2025 AgroFuturo - Soluzioni innovative per l'agricoltura</p>
          <p className="text-green-200">
            Per informazioni: info@agrofuturo.it
          </p>
        </div>
      </footer>
    </main>
  );
}