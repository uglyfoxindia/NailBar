import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, Heart, Sparkles, MessageSquare, Instagram, Send } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterSource, setFilterSource] = useState<string>('All');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Review Form state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [source, setSource] = useState<'Google' | 'Instagram' | 'NailBar App'>('NailBar App');
  const [showForm, setShowForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Sync with localStorage
    const savedLiked = localStorage.getItem('nailbar_liked_reviews');
    if (savedLiked) {
      setLikedReviews(JSON.parse(savedLiked));
    }
    const savedReviews = localStorage.getItem('nailbar_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const handleLike = (id: string) => {
    const isLiked = !!likedReviews[id];
    const updatedLiked = { ...likedReviews, [id]: !isLiked };
    setLikedReviews(updatedLiked);
    localStorage.setItem('nailbar_liked_reviews', JSON.stringify(updatedLiked));

    const updatedReviews = reviews.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          likes: isLiked ? r.likes - 1 : r.likes + 1,
        };
      }
      return r;
    });
    setReviews(updatedReviews);
    localStorage.setItem('nailbar_reviews', JSON.stringify(updatedReviews));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) {
      alert('Please fill out both your name and review details.');
      return;
    }

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      author: authorName,
      rating,
      source,
      text: reviewText,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('nailbar_reviews', JSON.stringify(updatedReviews));

    // Reset Form
    setAuthorName('');
    setReviewText('');
    setRating(5);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  // Filter List
  const sources = ['All', 'Google', 'Instagram', 'Yelp', 'NailBar App'];
  const filteredReviews = filterSource === 'All'
    ? reviews
    : reviews.filter((r) => r.source === filterSource);

  return (
    <section id="reviews" className="py-20 bg-[#fff8f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-100 border border-rose-200/30 rounded-full text-rose-600 text-xs font-bold tracking-wider uppercase">
            <MessageSquareCode size={11} className="text-rose-500 shrink-0" />
            Social Proof & Praise
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1A0B0D]">
            Real Love From Real Clients
          </h2>
          <p className="text-[#2D1B1E]/70 font-semibold text-base leading-relaxed">
            We are incredibly proud to serve our beautiful creative community. See what fashionistas say across Instagram, Google, and Yelp!
          </p>
        </div>

        {/* Social Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Google Card */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100/60 shadow-sm hover:shadow-lg hover:shadow-rose-100/30 text-left hover:border-rose-300 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 font-bold text-lg font-black">
                G
              </div>
              <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-black">
                ★ 4.9 Score
              </span>
            </div>
            <h4 className="font-sans font-black text-lg text-[#1A0B0D] mb-1">Google Reviews</h4>
            <p className="text-xs text-[#2D1B1E]/60 font-semibold mb-4">Based on 1,420+ verified client ratings in NYC.</p>
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-extrabold text-rose-500 hover:text-[#1A0B0D] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Verify on Google Maps →
            </a>
          </div>

          {/* Instagram Card */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100/60 shadow-sm hover:shadow-lg hover:shadow-rose-100/30 text-left hover:border-rose-300 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-500">
                <Instagram size={20} />
              </div>
              <span className="text-[10px] font-mono uppercase bg-pink-50 text-pink-805 px-2.5 py-1 rounded-full font-black">
                #NailBarNYC
              </span>
            </div>
            <h4 className="font-sans font-black text-lg text-[#1A0B0D] mb-1">Instagram Tagged</h4>
            <p className="text-xs text-[#2D1B1E]/60 font-semibold mb-4">Discover 4,800+ original tag posts highlighting luxury sets.</p>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-extrabold text-rose-500 hover:text-[#1A0B0D] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Explore Tag Feed →
            </a>
          </div>

          {/* Yelp Card */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100/60 shadow-sm hover:shadow-lg hover:shadow-rose-100/30 text-left hover:border-rose-300 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-bold text-lg font-black">
                Y
              </div>
              <span className="text-[10px] font-mono uppercase bg-red-50 text-red-800 px-2.5 py-1 rounded-full font-black">
                ★ 4.8 Rating
              </span>
            </div>
            <h4 className="font-sans font-black text-lg text-[#1A0B0D] mb-1">Yelp Recommended</h4>
            <p className="text-xs text-[#2D1B1E]/60 font-semibold mb-4">Ranked in the top 5 cosmetic salons in Chelsea & Soho.</p>
            <a 
              href="https://yelp.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-extrabold text-rose-500 hover:text-[#1A0B0D] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Verify on Yelp →
            </a>
          </div>
        </div>

        {/* Filters and Review Submission Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-rose-100 pb-8 mb-12">
          
          {/* Feed Filter Pillbox */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {sources.map((src) => (
              <button
                key={src}
                onClick={() => setFilterSource(src)}
                className={`px-4 py-2 rounded-full text-xs font-black tracking-wider transition-all cursor-pointer ${
                  filterSource === src
                    ? 'bg-rose-500 text-white font-extrabold shadow-md'
                    : 'bg-white border border-rose-150 text-[#2D1B1E] hover:bg-rose-50'
                }`}
              >
                {src === 'All' ? 'Full Feed' : src}
              </button>
            ))}
          </div>

          {/* Trigger write a review */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#1A0B0D] text-[#1A0B0D] hover:bg-rose-500 hover:text-white hover:border-rose-500 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200"
          >
            <MessageSquare size={13} />
            <span>{showForm ? 'Collapse Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Expandable Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12 bg-white rounded-3xl border border-rose-100 p-6 md:p-8 shadow-sm"
            >
              {isSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-550 mx-auto">
                    ✓
                  </div>
                  <h3 className="font-sans text-xl font-black text-[#1A0B0D]">Thank you for the love!</h3>
                  <p className="text-sm font-semibold text-[#2D1B1E]/70">Your custom review has been written directly to our live feedback scroll.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4 text-left">
                  <h3 className="font-sans text-xl font-black text-[#1A0B0D] mb-2">Share Your Experience</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Author Name */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#2D1B1E]/70 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Mia Jenkins"
                        className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-sm placeholder-rose-205 focus:outline-none focus:border-rose-300 font-bold inline-block"
                      />
                    </div>

                    {/* Platform Source */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#2D1B1E]/70 mb-1">Platform Category</label>
                      <select
                        value={source}
                        onChange={(e) => setSource(e.target.value as any)}
                        className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-sm focus:outline-none focus:border-rose-300 font-bold inline-block cursor-pointer"
                      >
                        <option value="NailBar App">NailBar App Verified</option>
                        <option value="Google">Google Review Sync</option>
                        <option value="Instagram">Instagram Mentions</option>
                      </select>
                    </div>

                    {/* Star scale */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#2D1B1E]/70 mb-1">Star Assessment</label>
                      <div className="flex h-12 items-center gap-1 bg-white border border-rose-100 rounded-2xl px-4 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star size={20} fill={star <= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#2D1B1E]/70 mb-1">Review Body</label>
                    <textarea
                      required
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="e.g. Spent a gorgeous afternoon here. Cuticles are meticulously manicured! Service was second to none."
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-sm placeholder-rose-205 focus:outline-none focus:border-rose-300 font-bold inline-block resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-right">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-500 hover:bg-[#e44c50] text-white font-black text-[#fff8f9] text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-rose-200"
                    >
                      <Send size={12} />
                      Publish Review
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev) => {
              const isLiked = !!likedReviews[rev.id];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={rev.id}
                  className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm hover:shadow-lg hover:shadow-rose-100/30 text-left flex flex-col justify-between space-y-4 transition-all duration-300"
                >
                  <div className="space-y-3">
                    {/* Header: source and star rating */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill={i < rev.rating ? 'currentColor' : 'none'} />
                        ))}
                      </div>
                      
                      <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                        rev.source === 'Google' ? 'bg-[#fff8f9] text-rose-700 border border-rose-100' :
                        rev.source === 'Instagram' ? 'bg-pink-50 text-pink-850 border border-pink-100' :
                        rev.source === 'Yelp' ? 'bg-rose-100 text-[#1A0B0D] border border-rose-200/50' :
                        'bg-rose-50 text-rose-800'
                      }`}>
                        {rev.source}
                      </span>
                    </div>

                    <p className="text-xs text-[#2D1B1E]/80 font-semibold leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-rose-50 pt-3 mt-2 shrink-0">
                    <div>
                      <p className="text-xs font-black text-[#1A0B0D]">{rev.author}</p>
                      <p className="text-[10px] font-mono tracking-widest font-bold text-[#2D1B1E]/50">{rev.date}</p>
                    </div>

                    {/* Support heart likes */}
                    <button
                      onClick={() => handleLike(rev.id)}
                      className={`flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-150 ${
                        isLiked 
                          ? 'bg-rose-550 text-white' 
                          : 'text-rose-450 hover:text-rose-500 hover:bg-rose-50'
                      }`}
                    >
                      <Heart size={11} fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{rev.likes}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-rose-100">
            <p className="text-[#2D1B1E]/70 font-semibold">No reviews found matching this filter tier.</p>
          </div>
        )}

      </div>
    </section>
  );
}
