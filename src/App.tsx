import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppNavbar from './components/AppNavbar';
import Hero from './components/Hero';
import ServicesGallery from './components/ServicesGallery';
import PricingTable from './components/PricingTable';
import ReviewsSection from './components/ReviewsSection';
import ClientDashboard from './components/ClientDashboard';
import BookingForm from './components/BookingForm';
import { Service } from './types';
import { SERVICES } from './data';
import { Sparkles, LucideIcon, MapPin, Clock, Phone, Mail, Instagram, Facebook, Star, Scissors, Calendar, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'dashboard'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServices, setPreselectedServices] = useState<string[]>([]);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Auto-scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentTab]);

  // Handle service additions
  const handleAddService = (service: Service) => {
    if (!preselectedServices.includes(service.id)) {
      setPreselectedServices((prev) => [...prev, service.id]);
      showNotification(`"${service.name}" added to your virtual checkout!`);
    } else {
      showNotification(`"${service.name}" is already in your booking draft.`);
    }
    // Auto-open drawer if not already open
    setIsBookingOpen(true);
  };

  const handleRemoveService = (id: string) => {
    setPreselectedServices((prev) => prev.filter((serviceId) => serviceId !== id));
  };

  const handleClearServices = () => {
    setPreselectedServices([]);
  };

  const showNotification = (message: string) => {
    setActiveNotification(message);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4000);
  };

  // Quick book hook from design cards
  const handleQuickBookCategory = (category: string) => {
    // Find first best-selling service in category and preselect
    const matchingService = SERVICES.find(
      (s) => s.category.toLowerCase().includes(category.toLowerCase()) || 
             category.toLowerCase().includes(s.category.toLowerCase())
    );
    if (matchingService) {
      setPreselectedServices([matchingService.id]);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#fff8f9] selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A0B0D] border border-rose-950/20 text-white rounded-full px-6 py-3.5 flex items-center gap-2.5 shadow-2xl text-xs sm:text-sm font-bold w-11/12 max-w-sm tracking-wide text-center justify-center select-none"
          >
            <Sparkles size={16} className="text-amber-400 shrink-0 animate-pulse" />
            <span>{activeNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation Bar */}
      <AppNavbar
        onBookClick={() => setIsOpenWithGuard()}
        onDashboardClick={() => setCurrentTab('dashboard')}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Dynamic View Layout */}
      <AnimatePresence mode="wait">
        {currentTab === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Promo Header Carousel Line */}
            <div className="bg-[#1A0B0D] text-rose-100 py-2.5 text-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] font-medium flex items-center justify-center gap-4 border-b border-rose-950/20">
              <span>🌸 COMPLIMENTARY LAVENDER MOCKTAILS WITH ALL TREATMENTS</span>
              <span className="hidden md:inline text-rose-500">•</span>
              <span className="hidden md:inline">✨ 15% OFF YOUR FIRST APRES GEL-X SET</span>
            </div>

            {/* Landing Hero */}
            <Hero
              onBookClick={() => setIsBookingOpen(true)}
              onExploreClick={() => {
                const ep = document.getElementById('prices');
                if (ep) ep.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Services Visual Gallery */}
            <ServicesGallery onQuickBook={handleQuickBookCategory} />

            {/* Comprehensive Price Menu */}
            <PricingTable
              onAddServiceToBooking={handleAddService}
              selectedServices={preselectedServices}
            />

            {/* Reviews Showcase */}
            <ReviewsSection />

            {/* Find Our Studio / Studio Location Section */}
            <section id="location" className="py-20 bg-white border-t border-rose-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Detail Card Column */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-100 border border-rose-200/30 rounded-full text-rose-600 text-xs font-bold tracking-wider uppercase">
                      <MapPin size={11} className="text-rose-550 shrink-0" />
                      Flagship Alameda Studio
                    </div>
                    <h2 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-[#1A0B0D]">
                      Visit The NailBar Alameda
                    </h2>
                    <p className="text-[#2D1B1E]/70 font-semibold text-base leading-relaxed">
                      Our curated salon is nestled in the heart of Alameda's vibrant downtown shopping district on historical Park Street. Pop in for unmatched Russian dry nail prep, luxury sets, and signature rose lavender herbal teas.
                    </p>

                    <div className="space-y-4 pt-4 border-t border-rose-100">
                      <div className="flex gap-3.5">
                        <div className="h-9 w-9 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-widest text-[#2D1B1E]/60 font-black">Address</p>
                          <p className="text-sm font-bold text-[#1A0B0D]">1229 Park St, Alameda, CA 94501</p>
                          <p className="text-xs text-rose-500 font-bold mt-0.5">United States</p>
                        </div>
                      </div>

                      <div className="flex gap-3.5">
                        <div className="h-9 w-9 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                          <Clock size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-widest text-[#2D1B1E]/60 font-black">Transit & Location</p>
                          <p className="text-sm font-semibold text-[#2D1B1E]/80">
                            Located on <span className="font-bold text-[#1A0B0D]">Park Street</span>. Metered street parking and nearby public parking lots are readily available. Easily accessible from the East Bay.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => setIsBookingOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-rose-200 cursor-pointer"
                      >
                        <Calendar size={13} />
                        Secure Your Slot
                      </button>
                    </div>
                  </div>

                  {/* Styled Interactive Map Frame */}
                  <div className="lg:col-span-7 w-full h-[380px] sm:h-[450px] relative rounded-3xl overflow-hidden border border-rose-100 shadow-xl shadow-rose-100/20 bg-rose-50/20 group">
                    <iframe
                      title="NailBar Alameda Map Location"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-122.247944%2C37.759886%2C-122.237944%2C37.765886&amp;layer=mapnik&amp;marker=37.762886%2C-122.242944"
                      style={{ border: 0 }}
                      className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full"
                    ></iframe>
                    <div className="absolute bottom-4 right-4 bg-[#1A0B0D]/80 backdrop-blur-md px-3.5 py-2 rounded-2xl text-white text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 border border-rose-955/20 shadow-lg group-hover:bg-rose-500 transition-colors duration-300">
                      <MapPin size={11} className="text-rose-350" />
                      <span>Interactive Map • Alameda CA</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </motion.main>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ClientDashboard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Slide-Over/Overlay Booking Wizard Backdrop */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Dense backdrop mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
            />

            {/* Center Modal Wrapper */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-20 my-8"
            >
              <BookingForm
                preselectedServices={preselectedServices}
                onAddService={(s) => setPreselectedServices((prev) => [...prev, s.id])}
                onRemoveService={handleRemoveService}
                onClearSelectedServices={handleClearServices}
                onBookingSuccess={() => {
                  showNotification('Appointment logged! Visit the Bookings Hub to manage.');
                  // Clear checkout after short delay
                  setTimeout(() => {
                    setPreselectedServices([]);
                  }, 1000);
                }}
                onClose={() => setIsBookingOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Beautiful Couture Footer */}
      <footer id="footer" className="bg-[#1A0B0D] border-t border-rose-950/30 text-rose-100/80 pt-16 pb-12 relative z-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-rose-950/40">
            
            {/* Left: Brand Identity Block */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <span className="font-sans text-3xl font-black tracking-tight text-white select-none">
                Nail<span className="text-rose-500">Bar</span>
              </span>
              <p className="text-rose-100/60 text-sm leading-relaxed font-light max-w-md">
                Dedicated to luxury, precision engineering, and the clean styling guidelines that define your individual vibe. Our sterilized dry practices keep nail beds stronger and results pristine.
              </p>
              
              <div className="flex gap-4 pt-1">
                <a 
                  href="https://www.instagram.com/alamedanailbar/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-10 w-10 rounded-full border border-rose-900 flex items-center justify-center hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all text-rose-300 cursor-pointer"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.facebook.com/alamedanailbar/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-10 w-10 rounded-full border border-rose-900 flex items-center justify-center hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all text-rose-300 cursor-pointer"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Center-Left: Timing Columns */}
            <div className="lg:col-span-3 text-left space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-mono text-white font-bold">Studio Hours</h4>
              <ul className="space-y-2 text-xs font-medium text-rose-200/60 leading-normal font-mono">
                <li className="flex justify-between border-b border-rose-950/20 pb-1.5">
                  <span>Mon - Fri</span>
                  <span className="text-rose-100">10:00 AM - 08:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-rose-950/20 pb-1.5">
                  <span>Saturday</span>
                  <span className="text-rose-100">10:00 AM - 07:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-rose-500 font-bold">CLOSED</span>
                </li>
              </ul>
            </div>

            {/* Center-Right: Core Location Contact info */}
            <div className="lg:col-span-4 text-left space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-mono text-white font-bold">Location & Contact</h4>
              <ul className="space-y-4.5 text-xs text-rose-200/60 leading-relaxed font-light">
                <li className="flex items-start gap-2">
                  <MapPin size={17} className="text-rose-500 shrink-0 mt-0.5" />
                  <span>1229 Park St, Alameda, CA 94501, United States</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-rose-500 shrink-0" />
                  <span className="font-mono text-rose-100">+1 510-769-8813</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-rose-500 shrink-0" />
                  <span className="font-mono text-rose-100">alamedanailbar@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Subfooter */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs font-mono tracking-wider text-rose-300/40 uppercase font-medium">
            <p>© 2026 NAILBAR INC. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <button onClick={() => setCurrentTab('home')} className="hover:text-rose-200 transition-colors">Broker Brochure</button>
              <button onClick={() => setCurrentTab('dashboard')} className="hover:text-rose-200 transition-colors bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent font-bold">Operator Desk</button>
              <span className="text-rose-955">|</span>
              <span className="text-rose-300/40">Sanitation Class A Certified</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );

  // Helper helper to support preselected cart checks
  function setIsOpenWithGuard() {
    setIsBookingOpen(true);
  }
}
