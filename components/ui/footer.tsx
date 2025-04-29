import Link from 'next/link';
import { Mail, MapPin, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-agroke-green/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-agroke-black-dark mb-4">Agroke</h3>
              <p className="text-gray-600 text-center md:text-left">
                Potenziamo gli agricoltori con soluzioni intelligenti per un&apos;agricoltura sostenibile, attraverso tecnologie avanzate e analisi basate sui dati.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <Link 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-agroke-green/10 text-agroke-green hover:bg-agroke-green hover:text-white transition-all duration-300"
              >
                <Linkedin size={20} />
              </Link>
              <Link 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-agroke-green/10 text-agroke-green hover:bg-agroke-green hover:text-white transition-all duration-300"
              >
                <Github size={20} />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-agroke-green/10 text-agroke-green hover:bg-agroke-green hover:text-white transition-all duration-300"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-agroke-black-dark text-center md:text-left">
              Risorse
            </h3>
            <ul className="space-y-4 text-center md:text-left">
              {['Chi Siamo', 'Funzionalità', 'Prezzo', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href="/" 
                    className="text-gray-600 hover:text-agroke-green transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-agroke-black-dark text-center md:text-left">
              Supporto
            </h3>
            <ul className="space-y-4 text-center md:text-left">
              {[
                { text: 'Help Center', href: '/help' },
                { text: 'Documentazione', href: '/' },
                { text: 'Contattaci', href: '/#contatti' },
                { text: 'Privacy Policy', href: '/' },
              ].map((item) => (
                <li key={item.text}>
                  <Link 
                    href={item.href} 
                    className="text-gray-600 hover:text-agroke-green transition-colors duration-300"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-agroke-black-dark text-center md:text-left">
              Contatti
            </h3>
            <ul className="space-y-4">
              {[
                { icon: Mail, text: 'info.agroke@gmail.com' },
                { icon: MapPin, text: 'Turin, Italy' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <li 
                    key={index}
                    className="flex items-center justify-center md:justify-start space-x-3 text-gray-600"
                  >
                    <div className="p-2 rounded-full bg-agroke-green/10">
                      <Icon size={18} className="text-agroke-green" />
                    </div>
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-agroke-green/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} Agroke. Tutti i diritti riservati.
            </p>
            <div className="flex items-center space-x-6">
              {['Termini', 'Privacy', 'Cookie'].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="text-gray-600 hover:text-agroke-green transition-colors duration-300 text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
