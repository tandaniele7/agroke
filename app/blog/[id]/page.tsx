"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import LanguageMenu from "@/components/ui/lang-menu";
import { useParams } from "next/navigation";
import articles from "@/public/articles.json";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function ArticlePage() {
  const [scrollY, setScrollY] = useState(0);
  const params = useParams();
  const article = articles.articles.find(
    (a) => a.id === params.id as string
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Articolo non trovato
          </h1>
          <Link
            href="/blog"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Torna al Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
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
            <Link href="/">
              <Image
                src="/agroke_logo_with_text.png"
                alt="agroke logo"
                width={140}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
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

      {/* Article Content */}
      <div className="container max-w-4xl mx-auto px-4 pt-32 pb-20">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Torna al Blog
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.date).toLocaleDateString("it-IT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {article.readTime} lettura
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            {article.title}
          </h1>
        </motion.div>

        {/* Article image */}
        {article.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={article.image || "/default-blog-image.jpg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-green prose-lg max-w-none"
        >
          <ReactMarkdown
            components={{
              h1: ({ children, ...props }) => (
                <h1
                  {...props}
                  className="text-3xl font-bold text-green-800 mt-8 mb-4"
                >
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2
                  {...props}
                  className="text-2xl font-semibold text-green-700 mt-6 mb-3"
                >
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3
                  {...props}
                  className="text-xl font-medium text-green-600 mt-4 mb-2"
                >
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p {...props} className="text-gray-700 mb-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul {...props} className="list-disc list-inside space-y-2 mb-4">
                  {children}
                </ul>
              ),
              li: ({ children, ...props }) => (
                <li {...props} className="text-gray-700">
                  {children}
                </li>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </motion.div>
      </div>
    </main>
  );
}
