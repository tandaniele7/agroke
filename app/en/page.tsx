// page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { motion } from "framer-motion";


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
        testo: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contacts")
        .insert([{ email, name: nome, company: azienda, hectares: ettari }]);

      if (error) throw error;

      setMessaggioStato({
        tipo: "successo",
        testo: "Thank you for your interest! We'll contact you soon.",
      });

      // Reset form
      setEmail("");
      setNome("");
      setAzienda("");
      setEttari("");
    } catch (error) {
      console.error("Error:", error);
      setMessaggioStato({
        tipo: "errore",
        testo: "An error occurred. Please try again later.",
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
      title: "Simple Recording",
      description: "Easily document every field activity with just a few clicks",
      icon: "📝",
    },
    {
      title: "Legal Compliance",
      description: "Automatically comply with all regulations without bureaucratic stress",
      icon: "✅",
    },
    {
      title: "Advanced Analytics",
      description: "Get detailed insights into your agricultural operations",
      icon: "📊",
    },
    {
      title: "Decision Support",
      description: "Personalized suggestions based on your historical data",
      icon: "🧠",
    },
    {
      title: "Accessible Anywhere",
      description: "Use the app in the field, even offline, on any device",
      icon: "📱",
    },
    {
      title: "Complete Integration",
      description: "Connect sensors, weather forecasts and other smart farming tools",
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
            <a
              href="#features"
              className="text-green-800 hover:text-green-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                featuresRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="hidden text-green-800 hover:text-green-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-green-800 hover:text-green-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Us
            </a>
          </motion.nav>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition duration-300"
            onClick={() =>
              scrollRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Try Now
          </motion.button>
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
                The Digital Field Diary that{" "}
                <span className="text-green-600">Revolutionizes</span> Your Farm
              </motion.h1>

              <motion.p
                className="text-xl text-gray-700 mb-8"
                variants={fadeInUp}
              >
                Simplify bureaucratic management, optimize treatments and comply
                with regulations with a single innovative solution.
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
                  Request Demo
                </button>
                <button
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-full transition duration-300"
                  onClick={() =>
                    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Learn More
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
                    alt="Digital Field Diary"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-t-3xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      AgroKe Digital Field Diary
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Easily manage treatments, sowing, harvesting and all
                      agricultural operations in a single intuitive interface.
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
                        5.0 - 230+ satisfied farmers
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
              Much More Than a Field Diary
            </h2>
            <p className="text-xl text-gray-700">
              Transform bureaucratic obligations into opportunities to improve
              your farm.
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
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white" ref={scrollRef}>
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
                Start the digital transformation of your farm now
              </h2>
              <p className="mb-8 text-green-100">
                Leave your details to receive a personalized demo of our Digital
                Field Diary.
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
                  <p>Free trial for 30 days</p>
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
                  <p>Personalized onboarding assistance</p>
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
                  <p>Cancel anytime, no commitment</p>
                </div>
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
                Request a Free Demo
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="E.g. John Doe"
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
                    placeholder="E.g. john.doe@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={azienda}
                    onChange={(e) => setAzienda(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="E.g. Doe Farms"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cultivated Hectares
                  </label>
                  <input
                    type="number"
                    value={ettari}
                    onChange={(e) => setEttari(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="E.g. 25"
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
                  {isSubmitting ? "Submitting..." : "Request Demo"}
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
