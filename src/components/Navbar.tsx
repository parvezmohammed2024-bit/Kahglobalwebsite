'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Products', href: '#products' },
  { label: 'Why Us',   href: '#why-us'   },
  { label: 'Contact',  href: '#contact'  },
];

interface NavbarProps {
  logoUrl?: string;
  companyName?: string;
}

export default function Navbar({ logoUrl, companyName = 'Kah Global' }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [imgError, setImgError]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show image only if URL exists and hasn't errored
  const showImage = logoUrl && !imgError;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 flex-shrink-0">
            {showImage ? (
              <Image
                src={logoUrl}
                alt={`${companyName} — Official Logo`}
                width={180}
                height={72}
                className="h-14 w-auto object-contain"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-10 h-10 bg-[#0A1F44] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A84C] font-black text-sm leading-none">KG</span>
              </div>
            )}
            <div className="flex flex-col leading-tight hidden sm:block">
              <span className="text-[#0A1F44] font-extrabold text-lg leading-none">{companyName}</span>
              <span className="text-[#C9A84C] text-[10px] font-semibold tracking-widest uppercase">Uniform Manufacturer</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              aria-label="Request a uniform quote from Kah Global"
              className="ml-2 bg-gold text-white text-sm font-bold px-5 py-2 rounded-md hover:brightness-110 transition-all duration-200 shadow-sm"
            >
              Get a Quote
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-navy transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-navy font-medium py-2.5 px-2 rounded-md hover:bg-gray-50 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-gold text-white text-sm font-bold px-4 py-3 rounded-md text-center hover:brightness-110 transition-all"
          >
            Get a Quote
          </a>
        </nav>
      </div>
    </header>
  );
}
