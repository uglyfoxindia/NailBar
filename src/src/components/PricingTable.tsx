import { useState } from 'react';
import { Search, Sparkles, Clock, Plus, HelpCircle } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface PricingTableProps {
  onAddServiceToBooking: (service: Service) => void;
  selectedServices: string[];
}

export default function PricingTable({ onAddServiceToBooking, selectedServices }: PricingTableProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'Full Menu' },
    { id: 'manicure', name: 'Manicures' },
    { id: 'pedicure', name: 'Pedicures' },
    { id: 'enhancements', name: 'Extensions / Enhancements' },
    { id: 'nail-art', name: 'Custom Art' },
    { id: 'spa-care', name: 'Luxury Add-ons' },
  ];

  // Filtering & Search
  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="prices" className="py-20 bg-white relative">
      {/* Decorative Grid Lines - Luxe Vibe */}
      <div className="absolute inset-x-0 top-0 h-px bg-rose-100"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-100 border border-rose-200/30 rounded-full text-rose-600 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={11} className="text-rose-500 animate-pulse" />
              Transparent & Elite
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1A0B0D]">
              Services Menu & Prices
            </h2>
            <p className="text-[#2D1B1E]/70 font-semibold text-sm leading-relaxed">
              All services include organic premium hydration oil, single-use high-quality disposable files, and 100% steam autoclaved surgical steel tools. No shortcuts.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full max-w-xs shrink-0 pt-2 sm:pt-0">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-rose-450">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-rose-50/50 border border-rose-100 rounded-full text-sm placeholder-rose-300 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-all font-bold inline-block"
            />
          </div>
        </div>

        {/* Category Filter Pills (Desktop & Mobile Scroll) */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                  : 'bg-rose-50/60 border border-rose-100 text-[#2D1B1E] hover:bg-rose-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => {
              const isAdded = selectedServices.includes(service.id);
              return (
                <div 
                  key={service.id}
                  className="flex flex-col sm:flex-row p-6 bg-[#fff8f9]/50 border border-rose-100/60 rounded-3xl gap-4 hover:border-rose-300 transition-all duration-300 group"
                >
                  <div className="flex-1 text-left space-y-2">
                    <div className="flex items-center gap-2">
                      {service.popular && (
                        <span className="px-2 py-0.5 bg-rose-550 text-white text-[9px] font-mono font-extrabold rounded uppercase tracking-wider">
                          Best Seller
                        </span>
                      )}
                      <span className="text-[10px] font-mono uppercase text-rose-450 tracking-wider font-bold">
                        {service.category.replace('-', ' ')}
                      </span>
                    </div>

                    <h3 className="font-sans text-lg font-black text-[#1A0B0D] group-hover:text-rose-550 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-[#2D1B1E]/70 text-xs font-semibold leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-rose-400 shrink-0 font-bold">
                      <span className="flex items-center gap-1 text-[11px] font-mono">
                        <Clock size={12} className="text-rose-400" />
                        {service.durationMin} Min
                      </span>
                    </div>
                  </div>

                  {/* Pricing Action Panel */}
                  <div className="flex sm:flex-col items-center justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-rose-100 pt-4 sm:pt-0 sm:pl-6 shrink-0 gap-3 min-w-[120px]">
                    <div className="text-left sm:text-center">
                      <span className="block text-[10px] font-mono text-rose-400 uppercase font-black">Studio Price</span>
                      <span className="text-2xl font-sans font-black text-[#1A0B0D]">${service.price}</span>
                    </div>

                    <button
                      onClick={() => onAddServiceToBooking(service)}
                      className={`flex items-center justify-center gap-1 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider w-full transition-all duration-300 ${
                        isAdded
                          ? 'bg-rose-50 border border-rose-300 text-rose-600 shadow-sm'
                          : 'bg-[#1A0B0D] hover:bg-rose-550 text-white shadow-lg shadow-rose-100 hover:shadow-rose-200'
                      }`}
                    >
                      {isAdded ? (
                        <span>Added ✓</span>
                      ) : (
                        <>
                          <Plus size={13} />
                          <span>Add to Book</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="lg:col-span-2 text-center py-16 bg-rose-50/50 rounded-3xl border border-rose-100">
              <HelpCircle className="mx-auto text-rose-200 mb-2" size={32} />
              <p className="text-[#2D1B1E]/70 font-semibold text-sm">No services found matching your search.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 text-xs text-rose-500 font-bold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
