// page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "react-feather";
import Link from "next/link";
import LanguageMenu from "@/components/ui/lang-menu";

// Initialize Supabase (replace with your credentials)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [azienda, setAzienda] = useState("");
  const [ettari, setEttari] = useState("");
  const [messaggioStato, setMessaggioStato] = useState<{
    tipo: "successo" | "errore" | null;
    testo: string;
  }>({ tipo: null, testo: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setMessaggioStato({
        tipo: "errore",
        testo: "Inserisci un indirizzo email valido",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contatti")
        .insert([{ email, nome, azienda, ettari }]);

      if (error) throw error;

      setMessaggioStato({
        tipo: "successo",
        testo: "Grazie per il tuo interesse! Ti contatteremo presto.",
      });

      // Reset form
      setEmail("");
      setNome("");
      setAzienda("");
      setEttari("");
    } catch (error) {
      console.error("Errore:", error);
      setMessaggioStato({
        tipo: "errore",
        testo: "Si è verificato un errore. Riprova più tardi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const heroMotion = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const diaryFeatures = [
    {
      title: "Registrazione semplificata",
      description:
        "Documenta facilmente ogni attività svolta in campo con pochi clic",
      icon: "📝",
    },
    {
      title: "Conformità legislativa",
      description:
        "Rispetta automaticamente tutte le normative senza stress burocratico",
      icon: "✅",
    },
    {
      title: "Analisi avanzata",
      description: "Ottieni insight dettagliati sulle tue operazioni agricole",
      icon: "📊",
    },
    {
      title: "Supporto alle decisioni",
      description: "Suggerimenti personalizzati basati sui tuoi dati storici",
      icon: "🧠",
    },
    {
      title: "Accessibile ovunque",
      description:
        "Usa l'app in campo, anche offline, su qualsiasi dispositivo",
      icon: "📱",
    },
    {
      title: "Integrazione completa",
      description:
        "Connetti sensori, previsioni meteo e altri strumenti smart farming",
      icon: "🔄",
    },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated leaf particles */}
      <div className="hidden fixed w-full h-full pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full text-2xl text-green-500 opacity-20"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: -20,
              rotate: 0,
            }}
            animate={{
              y: "120vh",
              x: Math.random() * 100 - 50 + "%",
              rotate: 360,
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
          >
            {["🌱", "🍃", "🌿"][Math.floor(Math.random() * 3)]}
          </motion.div>
        ))}
      </div>

      {/* Navbar */}
      <motion.header
        className="fixed w-full z-50 transition-all duration-300"
        style={{
          backgroundColor:
            scrollY > 50 ? "rgba(255, 255, 255, 0.95)" : "transparent",
          boxShadow: scrollY > 50 ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/agroke_logo_with_text.png"
              alt="agroke logo"
              width={140}
              height={48}
              className="h-12 w-auto"
            />
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            <Link
              href="#funzionalita"
              className="text-green-800 hover:text-green-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                featuresRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Funzionalità
            </Link>
            <Link
              href="#testimonianze"
              className="hidden text-green-800 hover:text-green-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Testimonianze
            </Link>
            <Link
              href="#contatti"
              className="text-green-800 hover:text-green-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contattaci
            </Link>
            <Link
              href="/blog"
              className="text-green-800 hover:text-green-600 font-medium transition-colors"
            >
              Blog
            </Link>
          </motion.nav>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
            <LanguageMenu language="ita" />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition duration-300"
              onClick={() =>
                scrollRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Prova Ora
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 md:pt-44 md:pb-32 relative z-10"
        variants={heroMotion}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6 leading-tight"
                variants={fadeInUp}
              >
                Il Quaderno di Campagna{" "}
                <span className="text-green-600">Digitale</span> che ti Aiuta a Gestire la tua Azienda
              </motion.h1>

              <motion.p
                className="text-xl text-gray-700 mb-8"
                variants={fadeInUp}
              >
                Semplifica la gestione burocratica, ottimizza i trattamenti e
                rispetta le normative con un&apos;unica soluzione innovativa.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                variants={fadeInUp}
              >
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() =>
                    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Richiedi Demo
                </button>
                <button
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-full transition duration-300"
                  onClick={() =>
                    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Scopri di più
                </button>
              </motion.div>
            </div>

            <motion.div
              className="md:w-1/2 mt-12 md:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-bl from-agroke-green/80 to-green-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                <motion.div
                  className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src="/quaderno-campagna-demo.png" // You'll need to create this image
                    alt="Quaderno di Campagna Digitale"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-t-3xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Quaderno di Campagna AgroKe
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Gestisci facilmente trattamenti, semina, raccolta e tutte
                      le operazioni colturali in un&apos;unica interfaccia
                      intuitiva.
                    </p>
                    <div className="hidden flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        5.0 - 230+ agricoltori soddisfatti
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Animated separator */}
      <div className="relative h-24 overflow-hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 350.00,0.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-agroke-green/20"
          ></path>
        </svg>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-agroke-green/20 relative" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Molto più di un Quaderno di Campagna
            </h2>
            <p className="text-xl text-gray-700">
              Trasforma gli obblighi burocratici in opportunità per migliorare
              la tua azienda agricola.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {diaryFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group"
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-100 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo video or interactive demo section */}
          <motion.div
            className="hidden relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-black aspect-video flex items-center justify-center text-white text-center p-12">
              <div>
                <p className="text-2xl mb-6">
                  Video dimostrativo del Quaderno di Campagna digitale
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 flex items-center mx-auto">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Guarda il video
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="hidden py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Come Funziona
            </h2>
            <p className="text-xl text-gray-700">
              Gestione semplice e completa del tuo Quaderno di Campagna in pochi
              semplici passi.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-green-200 transform -translate-x-1/2 z-0"></div>

            {/* Steps */}
            <div className="space-y-24">
              {[
                {
                  title: "Registra le tue attività",
                  description:
                    "Documenta facilmente trattamenti, semine, concimazioni e altre operazioni dal tuo smartphone o computer.",
                  image: "/register-activities.jpg", // You'll need this image
                  isReversed: false,
                },
                {
                  title: "Rispetta normative e scadenze",
                  description:
                    "Il sistema ti avvisa automaticamente di tempi di carenza, intervalli tra trattamenti e tutte le scadenze importanti.",
                  image: "/compliance.jpg", // You'll need this image
                  isReversed: true,
                },
                {
                  title: "Analizza e migliora",
                  description:
                    "Visualizza statistiche dettagliate e ottieni suggerimenti personalizzati per migliorare la sostenibilità e la redditività.",
                  image: "/analytics.jpg", // You'll need this image
                  isReversed: false,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col ${step.isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    <div className="relative">
                      <div
                        className={`hidden md:flex absolute top-1/2 ${step.isReversed ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"} transform -translate-y-1/2 w-12 h-12 bg-green-500 text-white rounded-full items-center justify-center text-xl font-bold z-10`}
                      >
                        {index + 1}
                      </div>
                      <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={600}
                          height={400}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`md:w-1/2 ${step.isReversed ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="hidden py-20 bg-green-50" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Chi usa già AgroKe
            </h2>
            <p className="text-xl text-gray-700">
              Ascolta le testimonianze di chi ha già trasformato la propria
              azienda agricola.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                quote:
                  "Da quando uso il Quaderno di Campagna digitale di AgroKe, ho ridotto di 4 ore la settimana il tempo dedicato alla burocrazia. Ora posso concentrarmi di più sul campo.",
                name: "Marco",
                role: "Viticoltore, Toscana",
                image: "/testimonial1.jpg", // You'll need this image
              },
              {
                quote:
                  "Ho evitato due sanzioni grazie agli avvisi automatici. Il sistema mi ricorda tutte le scadenze e i tempi di carenza, non sbaglio più!",
                name: "Lucia",
                role: "Produttrice biologica, Puglia",
                image: "/testimonial2.jpg", // You'll need this image
              },
              {
                quote:
                  "Finalmente ho dati chiari su tutti i trattamenti. Ho scoperto che potevo risparmiare il 20% sui prodotti fitosanitari senza compromettere i risultati.",
                name: "Giovanni",
                role: "Frutticoltore, Emilia-Romagna",
                image: "/testimonial3.jpg", // You'll need this image
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 relative"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">
                  <h4 className="font-semibold text-green-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <div className="text-green-600 text-4xl mb-2">&quot;</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="hidden w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="hidden py-20 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {[
              { value: "85%", label: "Riduzione tempo burocratico" },
              { value: "30%", label: "Risparmio sui prodotti" },
              { value: "230+", label: "Aziende attive" },
              { value: "100%", label: "Conformità normativa" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <p className="text-green-200">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contatti" className="py-20 bg-white" ref={scrollRef}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
            <motion.div
              className="md:w-1/2 bg-green-600 p-12 text-white"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Inizia ora la trasformazione digitale della tua azienda agricola
              </h2>
              <p className="mb-8 text-green-100">
                Lascia i tuoi dati per ricevere una demo personalizzata del
                nostro Quaderno di Campagna digitale.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="text-green-300 mr-4 mt-1">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p>Prova gratuita per 30 giorni</p>
                </div>
                <div className="flex items-start">
                  <div className="text-green-300 mr-4 mt-1">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p>Assistenza personalizzata all&apos;avvio</p>
                </div>
                <div className="flex items-start">
                  <div className="text-green-300 mr-4 mt-1">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p>Nessun impegno, cancellazione in qualsiasi momento</p>
                </div>
              </div>

              <div className="hidden p-6 bg-green-700 rounded-xl">
                <h3 className="font-semibold mb-2">Hai bisogno di aiuto?</h3>
                <p className="text-sm text-green-200 mb-4">
                  Il nostro team è disponibile per guidarti in ogni fase.
                </p>
                <a
                  href="tel:+390123456789"
                  className="flex items-center text-white hover:text-green-200 transition-colors"
                >
                  <Phone size={20} className="mr-2" />
                  <span>+39 0123 456789</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 p-12"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Richiedi una Demo Gratuita
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome e Cognome
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Es. Mario Rossi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Es. mario.rossi@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Azienda
                  </label>
                  <input
                    type="text"
                    value={azienda}
                    onChange={(e) => setAzienda(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Es. Azienda Agricola Rossi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ettari Coltivati
                  </label>
                  <input
                    type="number"
                    value={ettari}
                    onChange={(e) => setEttari(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Es. 25"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium transition duration-300 ${
                    isSubmitting
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSubmitting ? "Invio in corso..." : "Richiedi Demo"}
                </button>

                {messaggioStato.tipo && (
                  <div
                    className={`p-4 rounded-lg ${
                      messaggioStato.tipo === "successo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {messaggioStato.testo}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
