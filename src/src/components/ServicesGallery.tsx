import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, User, Info, Calendar } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

interface ServicesGalleryProps {
  onQuickBook: (serviceCategory: string) => void;
}

export default function ServicesGallery({ onQuickBook }: ServicesGalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Initialize from storage or default
  useEffect(() => {
    const savedLiked = localStorage.getItem('nailbar_liked_gallery');
    if (savedLiked) {
      setLikedItems(JSON.parse(savedLiked));
    }
    const savedItems = localStorage.getItem('nailbar_gallery_items');
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems) as GalleryItem[];
        // Sync the image URL from GALLERY_ITEMS (our up-to-date master list) while preserving custom user likes
        const synced = parsed.map((item) => {
          const fresh = GALLERY_ITEMS.find((f) => f.id === item.id);
          return fresh ? { ...item, imageUrl: fresh.imageUrl } : item;
        });
        setItems(synced);
      } catch (e) {
        setItems(GALLERY_ITEMS);
      }
    } else {
      setItems(GALLERY_ITEMS);
    }
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details modal
    const isLiked = !!likedItems[id];
    const updatedLiked = { ...likedItems, [id]: !isLiked };
    setLikedItems(updatedLiked);
    localStorage.setItem('nailbar_liked_gallery', JSON.stringify(updatedLiked));

    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          likes: isLiked ? item.likes - 1 : item.likes + 1,
        };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem('nailbar_gallery_items', JSON.stringify(updatedItems));
  };

  const categories = ['All', 'Minimalist', 'Chrome', 'Nail Art', 'Classic', 'Vibrant', 'Bold'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory || item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="gallery" className="py-20 bg-[#fff8f9] border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-100 border border-rose-200/30 rounded-full text-rose-600 text-xs font-bold tracking-wider uppercase">
            <Sparkles size={11} className="text-rose-550 shrink-0" />
            Seasonal Design Inspo
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1A0B0D]">
            NailArt Design Gallery
          </h2>
          <p className="text-[#2D1B1E]/70 font-semibold text-base leading-relaxed">
            Witness real, masterpiece custom sets sculpted exclusively by our master artists. Tap any design card to view technical insights, specific artist tags, or directly reserve the look.
          </p>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-205 ${
                  selectedCategory === category
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                    : 'bg-white border border-rose-100 text-[#2D1B1E] hover:bg-rose-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isLiked = !!likedItems[item.id];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group relative bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-rose-100/40 cursor-pointer transition-all duration-300"
                >
                  {/* Photo Container */}
                  <div className="aspect-[4/5] overflow-hidden bg-rose-50/50 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0D]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div className="text-white w-full flex justify-between items-center bg-[#1A0B0D]/40 p-2.5 rounded-2xl backdrop-blur-xs">
                        <span className="text-xs font-mono tracking-widest uppercase flex items-center gap-1 font-bold">
                          <User size={12} className="text-rose-200" />
                          By {item.artist.split(' ')[0]}
                        </span>
                        <span className="text-xs font-extrabold underline flex items-center gap-1 text-rose-200">
                          <Info size={12} />
                          Details
                        </span>
                      </div>
                    </div>

                    {/* Like Float Pin */}
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className={`absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                        isLiked 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-white/90 backdrop-blur-xs text-[#2D1B1E] hover:text-rose-500'
                      }`}
                    >
                      <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? 'scale-110' : ''} />
                    </button>

                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-rose-500 text-[9px] text-white font-mono uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
                      {item.category}
                    </div>
                  </div>

                  {/* Context Info */}
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <h3 className="font-sans text-lg font-black text-[#1A0B0D] text-left">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#2D1B1E]/60 text-left font-mono font-bold mt-0.5">
                        Lead Tech: {item.artist}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-sm font-black text-rose-500">
                        <Heart size={14} fill="currentColor" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if filtering has no matches */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-rose-200">
            <p className="text-[#2D1B1E]/70 font-semibold">No designs found matching this tag. Try selecting another filter!</p>
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-3xl bg-[#faf8f6] rounded-3xl overflow-hidden shadow-2xl z-10 border border-stone-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Photo Column */}
                <div className="aspect-[4/5] md:aspect-auto md:h-full bg-stone-200 relative overflow-hidden">
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                </div>

                {/* Details Column */}
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-rose-600 uppercase font-bold">
                        {activeItem.category} Set
                      </span>
                      <button
                        onClick={(e) => handleLike(activeItem.id, e)}
                        className={`flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-bold border transition-colors ${
                          likedItems[activeItem.id]
                            ? 'bg-rose-50 border-rose-200 text-rose-600'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        <Heart size={13} fill={likedItems[activeItem.id] ? 'currentColor' : 'none'} />
                        {activeItem.likes} likes
                      </button>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-stone-900 text-left mb-4">
                      {activeItem.title}
                    </h3>

                    {/* Artist specs */}
                    <div className="space-y-3 pt-4 border-t border-stone-200/60">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-stone-200 overflow-hidden shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
                            alt={activeItem.artist}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <span className="block text-[10px] font-mono tracking-wider text-stone-400 uppercase">
                            Original Artist
                          </span>
                          <span className="text-sm font-bold text-stone-850">
                            {activeItem.artist}
                          </span>
                        </div>
                      </div>

                      <div className="bg-stone-100 p-4 rounded-xl space-y-2 text-left">
                        <span className="block text-[9px] font-mono tracking-widest text-stone-400 uppercase font-bold">
                          Recipe & Composition
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed font-light">
                          Constructed over an elite dry e-file manicure base, employing unstructured builder strengthening coat, hand-etched fine-brush design details, cured with high-density protective sealant, finished with premium tea-tree cuticle treatment.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-stone-250 flex flex-col gap-3">
                    <button
                      onClick={() => {
                        onQuickBook(activeItem.category);
                        setActiveItem(null);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-rose-500 text-white rounded-xl text-sm font-bold transition-colors shadow-sm"
                    >
                      <Calendar size={15} />
                      Request Booking For This Look
                    </button>
                    
                    <button
                      onClick={() => setActiveItem(null)}
                      className="w-full text-center py-2 text-xs font-mono font-bold tracking-wider text-stone-400 uppercase hover:text-stone-700 transition-colors"
                    >
                      Close Details
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
