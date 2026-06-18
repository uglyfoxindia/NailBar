import { useState } from 'react';
import { Sparkles, Menu, X, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onBookClick: () => void;
  onDashboardClick: () => void;
  currentTab: 'home' | 'dashboard';
  setCurrentTab: (tab: 'home' | 'dashboard') => void;
}

export default function Navbar({ onBookClick, onDashboardClick, currentTab, setCurrentTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setCurrentTab('home');
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const navLinks = [
    { name: 'Services', target: 'prices' },
    { name: 'Art Gallery', target: 'gallery' },
    { name: 'Reviews', target: 'reviews' },
    { name: 'Location', target: 'footer' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#fff8f9]/95 backdrop-blur-md border-b border-rose-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center cursor-pointer group select-none"
          >
            <span className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tighter transition-transform duration-200 group-hover:scale-102">
              <span className="text-[#1A0B0D] group-hover:text-stone-950 transition-colors duration-200">Nail</span>
              <span className="text-rose-500 group-hover:text-rose-600 transition-colors duration-200">Bar</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-xs font-black uppercase tracking-wider transition-colors pb-1 border-b-2 ${currentTab === 'home' ? 'text-rose-600 border-rose-500' : 'text-[#2D1B1E]/80 border-transparent hover:text-rose-500'}`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="text-xs font-black uppercase tracking-wider text-[#2D1B1E]/80 hover:text-rose-500 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            
            <button
              onClick={onDashboardClick}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold tracking-wider uppercase transition-all ${
                currentTab === 'dashboard' 
                  ? 'bg-[#1A0B0D] text-white border-[#1A0B0D]' 
                  : 'text-[#2D1B1E]/80 border-rose-200 bg-white/50 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <User size={13} />
              Bookings Hub
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookClick}
              className="flex items-center gap-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-200 transition-colors duration-300 pointer-events-auto"
            >
              <Calendar size={13} />
              Book Now
            </motion.button>
          </div>

          {/* Hamburger button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onDashboardClick}
              className={`p-2 rounded-full border text-xs font-semibold transition-all ${
                currentTab === 'dashboard' 
                  ? 'bg-rose-500 text-white border-rose-500' 
                  : 'text-[#2D1B1E] border-rose-200'
              }`}
            >
              <User size={16} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-[#2D1B1E] hover:bg-rose-50 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-rose-100 bg-[#fff8f9]"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 shadow-lg">
              <button
                onClick={() => { setCurrentTab('home'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-[#2D1B1E] hover:bg-rose-50"
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-[#2D1B1E]/80 hover:bg-rose-50"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="pt-2 border-t border-rose-100 flex flex-col gap-3">
                <button
                  onClick={() => { onDashboardClick(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-[#2D1B1E] rounded-xl text-sm font-bold border border-rose-200"
                >
                  <User size={16} />
                  My Bookings & Portal
                </button>
                <button
                  onClick={() => { onBookClick(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-sm"
                >
                  <Calendar size={16} />
                  Book Online Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
