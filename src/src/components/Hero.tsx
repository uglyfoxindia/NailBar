import { motion } from 'motion/react';
import { Calendar, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff8f9] via-rose-50/30 to-[#fff8f9] py-12 md:py-20 lg:py-24">
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none select-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] bg-yellow-100/30 rounded-full blur-3xl pointer-events-none select-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Description Column */}
          <div className="space-y-6 lg:col-span-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs border border-rose-200/40"
            >
              <Sparkles size={12} className="text-rose-500 animate-pulse" />
              Est. 2024 • Downtown Central
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-[#1A0B0D]"
            >
              Vibrant Color. <br />
              <span className="text-rose-500 underline decoration-wavy decoration-4 underline-offset-[10px]">
                Perfect Shine.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#2D1B1E]/75 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold"
            >
              Experience luxury at your fingertips. Discover precision Russian dry manicures, durable sculpting builder gels, and jaw-dropping hand-painted nail designs in an ultra-luxurious downtown studio environment.
            </motion.p>

            {/* Quick Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 pt-2 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 text-[#2D1B1E] bg-white border border-rose-100 p-3 rounded-2xl shadow-sm">
                <ShieldCheck className="text-rose-500 shrink-0" size={18} />
                <span className="text-xs font-bold">100% Sterilized Tools</span>
              </div>
              <div className="flex items-center gap-2 text-[#2D1B1E] bg-white border border-rose-100 p-3 rounded-2xl shadow-sm">
                <Heart className="text-rose-500 shrink-0" size={18} />
                <span className="text-xs font-bold">Couture Russian Tech</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1A0B0D] hover:bg-[#2D1B1E] text-white rounded-2xl text-base font-bold tracking-wide shadow-lg shadow-rose-100 transition-colors duration-300"
              >
                <Calendar size={18} />
                Book Online Now
              </button>
              
              <button
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-rose-50/50 text-[#2D1B1E] rounded-2xl text-base font-bold tracking-wide border border-rose-200 shadow-sm transition-colors duration-300"
              >
                Explore Services
              </button>
            </motion.div>
          </div>

          {/* Right Bento Grid Visual Collage */}
          <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] flex items-center justify-center">
            
            {/* Main Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-72 sm:w-80 h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop"
                alt="Luxury manicure service at NailBar"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0D]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-sans text-lg font-black">Classic Pastel Polish</p>
                <p className="text-xs font-mono text-rose-200 uppercase tracking-widest font-semibold">Minimalist Elegance</p>
              </div>
            </motion.div>

            {/* Back Floating Image (Top Right) */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="absolute top-4 right-4 sm:right-12 w-40 sm:w-48 h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl z-10 rotate-3 hidden sm:block"
            >
              <img
                src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=400&auto=format&fit=crop"
                alt="Luxury custom gold foil nail art design"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Front Floating Rating Card (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="absolute -bottom-2 -left-2 sm:left-6 bg-white/95 backdrop-blur-md border border-rose-100 p-4 rounded-3xl shadow-xl z-30 max-w-xs"
            >
              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="text-[#2D1B1E] text-xs font-black leading-normal">
                "Best Russian Manicure I’ve had outside of Manhattan."
              </p>
              <div className="flex justify-between items-center mt-3 border-t border-rose-50 pt-2">
                <span className="text-[10px] font-mono text-rose-400 font-bold">Google Verified</span>
                <span className="text-[10px] font-black text-rose-600">Nadia G.</span>
              </div>
            </motion.div>

            {/* Tiny Luxury Sparkle Pin */}
            <div className="absolute top-1/2 left-8 px-4 py-2 bg-rose-500 text-white rounded-full flex items-center gap-1.5 shadow-lg shadow-rose-200 text-xs font-extrabold uppercase tracking-widest z-30 select-none animate-bounce">
              <Sparkles size={11} className="text-white shrink-0" />
              HOT SETS
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
