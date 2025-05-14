"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import LanguageMenu from "@/components/ui/lang-menu";
import { BlogCard } from "@/components/ui/blog-card";
import articles from "@/public/articles.json";
import { useEffect, useState } from "react";

export default function Blog() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
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
              href="/#funzionalita"
              className="text-green-800 hover:text-green-600 font-medium transition-colors"
            >
              Funzionalità
            </Link>
            <Link
              href="/#testimonianze"
              className="hidden text-green-800 hover:text-green-600 font-medium transition-colors"
            >
              Testimonianze
            </Link>
            <Link
              href="/#contatti"
              className="text-green-800 hover:text-green-600 font-medium transition-colors"
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
            <Link
              href="/#contatti"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition duration-300"
            >
              Prova Ora
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Blog Content Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Il nostro Blog
            </h1>
            <p className="text-xl text-gray-700">
              Scopri le ultime novità, consigli e best practice per la tua azienda agricola
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {articles.articles.map((article, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <BlogCard
                  id={article.id}
                  title={article.title || `Articolo ${article.id}`}
                  content={article.content}
                  image={article.image || '/default-blog-image.jpg'}
                  category={article.category || 'Agricoltura'}
                  date={article.date || 'Maggio 2025'}
                  readTime={article.readTime || '5 min'}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
