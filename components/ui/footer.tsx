import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-agroke-green/20 border-t border-agroke-green/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Mobile Logo and Description */}
        <div className="md:hidden text-center mb-8">
          <h3 className="text-xl font-semibold text-agroke-black-dark mb-3">Agroke</h3>
          <p className="text-sm text-agroke-black-light/80 px-4">
            Empowering farmers with intelligent solutions for sustainable agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info - Hidden on Mobile */}
          <div className="hidden md:block space-y-4">
            <h3 className="text-lg font-semibold text-agroke-black-dark">Agroke</h3>
            <p className="text-sm text-agroke-black-light/80">
              Empowering farmers with intelligent solutions for sustainable agriculture through advanced technology and data-driven insights.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-agroke-black-light hover:text-agroke-green transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-agroke-black-light hover:text-agroke-green transition-colors">
                <Github size={20} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-agroke-black-light hover:text-agroke-green transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-agroke-black-dark text-center md:text-left">
              Quick Links
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link href="/about" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-agroke-black-dark text-center md:text-left">
              Support
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link href="/help" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-agroke-black-light/80 hover:text-agroke-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-agroke-black-dark text-center md:text-left">
              Contact
            </h3>
            <ul className="space-y-3">
              {/* Contact items centered on mobile */}
              <li className="flex items-center space-x-3 text-sm text-agroke-black-light/80 justify-center md:justify-start">
                <Mail size={16} />
                <span>daniele.tanda314@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-agroke-black-light/80 justify-center md:justify-start">
                <Mail size={16} />
                <span>lu.vaiarelli@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-agroke-black-light/80 justify-center md:justify-start">
                <Phone size={16} />
                <span>+39 389 342 3504</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-agroke-black-light/80 justify-center md:justify-start">
                <MapPin size={16} />
                <span>Turin, Italy</span>
              </li>
            </ul>
          </div>

          {/* Social Links - Mobile Only */}
          <div className="md:hidden flex justify-center space-x-6 py-4">
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
              className="text-agroke-black-light hover:text-agroke-green transition-colors">
              <Linkedin size={24} />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="text-agroke-black-light hover:text-agroke-green transition-colors">
              <Github size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-agroke-black-light hover:text-agroke-green transition-colors">
              <Instagram size={24} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-agroke-green/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-sm text-agroke-black-light/70">
          <p>© {new Date().getFullYear()} Agroke. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
