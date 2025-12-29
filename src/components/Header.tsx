import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Ana Sayfa', href: '#home' },
    { label: 'Projeler', href: '#projects' },
    { label: 'Canlı Veriler', href: '#data' },
    { label: 'Açık Veri', href: '#open-data' },
    { label: 'Fikrini Söyle', href: '#feedback' },
    { label: 'Hakkında', href: '#about' },
    { label: 'İletişim', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-blue-500/30 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Akıllı Şehir</span>
              <span className="text-xl font-bold text-blue-400">Kocaeli</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-sm font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4 space-y-2 animate-in slide-in-from-top-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
