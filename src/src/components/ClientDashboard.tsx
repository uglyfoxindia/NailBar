import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking, Staff } from '../types';
import { STAFF, SERVICES } from '../data';
import { Search, Calendar, Clock, Sparkles, Smile, Trash2, ShieldAlert, Award, Coffee, UserX } from 'lucide-react';

export default function ClientDashboard() {
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppts, setFilteredAppts] = useState<Booking[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const saved = localStorage.getItem('nailbar_appointments');
    if (saved) {
      const parsed: Booking[] = JSON.parse(saved);
      setAppointments(parsed);
      setFilteredAppts(parsed);
    } else {
      // Seed a starter mock appointment for the first visitor to see the dashboard in action!
      const starterbooking: Booking = {
        id: 'NBR-9821',
        customerName: 'Guest Fashionista',
        customerEmail: 'guest@nailbar.com',
        customerPhone: '5551234',
        serviceIds: ['m2', 'a2'], // Signature Gel, Glazed chrome
        staffId: 'st2', // Sasha Cruz
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days in the future
        time: '02:00 PM',
        totalPrice: 65,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      setAppointments([starterbooking]);
      setFilteredAppts([starterbooking]);
      localStorage.setItem('nailbar_appointments', JSON.stringify([starterbooking]));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (!searchQuery.trim()) {
      setFilteredAppts(appointments);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = appointments.filter(
      (appt) =>
        appt.customerName.toLowerCase().includes(query) ||
        appt.customerPhone.includes(query) ||
        appt.customerEmail.toLowerCase().includes(query) ||
        appt.id.toLowerCase().includes(query)
    );
    setFilteredAppts(filtered);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this NailBar appointment? We appreciate 12-hour advanced notice.')) {
      const updated = appointments.map((appt) => {
        if (appt.id === id) {
          return { ...appt, status: 'cancelled' as const };
        }
        return appt;
      });
      setAppointments(updated);
      setFilteredAppts(searchQuery.trim() ? filteredAppts.map(appt => appt.id === id ? { ...appt, status: 'cancelled' as const } : appt) : updated);
      localStorage.setItem('nailbar_appointments', JSON.stringify(updated));
    }
  };

  // Stats calculation
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const spentValue = appointments.filter((a) => a.status === 'confirmed').reduce((sum, a) => sum + a.totalPrice, 0);

  return (
    <div className="py-12 bg-[#fff8f9] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-left space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-100 border border-rose-200/30 rounded-full text-rose-600 text-xs font-bold tracking-wider uppercase">
            <Award size={11} className="text-rose-550 animate-pulse" />
            Client Central Hub
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-[#1A0B0D]">
            Bookings Hub & VIP Portal
          </h2>
          <p className="text-[#2D1B1E]/70 font-semibold text-sm">
            Query your historical appointments, verify schedules, cancel active sessions, or check your Loyalty Rewards points!
          </p>
        </div>

        {/* Dashboard Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Dynamic Rewards Points Card */}
          <div className="bg-[#1A0B0D] text-white p-6 rounded-3xl border border-rose-950/20 shadow-md text-left flex items-center justify-between hover:shadow-xl transition-all duration-300">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-rose-200 font-extrabold">NailBar VIP Loyalty Points</span>
              <h3 className="font-sans text-3xl font-black">{confirmedCount * 125} pts</h3>
              <p className="text-[11px] text-rose-100 font-medium">Convert {1000 - ((confirmedCount * 125) % 1000)} more points to get a free Chrome accent!</p>
            </div>
            <Award className="text-rose-300 shrink-0" size={38} />
          </div>

          {/* total minutes pampered */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100/60 shadow-sm text-left flex items-center justify-between hover:shadow-md transition-all duration-300">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#2D1B1E]/50 font-bold">Total Beauty Investment</span>
              <h3 className="font-sans text-3xl font-black text-[#1A0B0D]">${spentValue} USD</h3>
              <p className="text-[11px] text-[#2D1B1E]/70 font-semibold">Meticulously manicured across {confirmedCount} session(s).</p>
            </div>
            <Smile className="text-rose-500 shrink-0" size={38} />
          </div>

          {/* Complimentary Cocktail Badge */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100/60 shadow-sm text-left flex items-center justify-between hover:shadow-md transition-all duration-300">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#2D1B1E]/50 font-bold">Lounge Perks & Status</span>
              <h3 className="font-sans text-lg font-black text-[#1A0B0D] flex items-center gap-1.5 pt-1">
                <Coffee size={18} className="text-rose-550 animate-bounce" />
                Rose Lavender Tea
              </h3>
              <p className="text-[11px] text-[#2D1B1E]/70 font-semibold">Free specialty lounge refreshment with every scheduled slot.</p>
            </div>
          </div>
        </div>

        {/* Search Bar / Panel */}
        <div className="bg-white border border-rose-100 rounded-3xl p-6 md:p-8 shadow-sm text-left mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-mono uppercase tracking-wider text-rose-500 font-extrabold mb-2">
                Lookup Appointments (By Name, Email, Phone, or Booking ID)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-rose-450">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Guest Fashionista, 5551234, NBR-9821..."
                  className="w-full pl-11 pr-4 py-3 bg-rose-50/30 border border-rose-100 rounded-2xl text-sm placeholder-rose-300 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition-all font-bold inline-block"
                />
              </div>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto shrink-0">
              {searched && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setFilteredAppts(appointments); setSearched(false); }}
                  className="px-5 py-3 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-2xl text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  Reset
                </button>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-black tracking-wider uppercase transition-colors shadow-lg shadow-rose-200"
              >
                Search Hub
              </button>
            </div>
          </form>
        </div>

        {/* Appointment Grid Results */}
        <div className="space-y-4">
          <span className="block text-left text-[10px] font-mono tracking-widest text-[#2D1B1E]/50 uppercase font-black mb-1">
            Matching Scheduled Sessions ({filteredAppts.length})
          </span>

          {filteredAppts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredAppts.map((appt) => {
                  const apptStaff = STAFF.find((s) => s.id === appt.staffId);
                  const isCancelled = appt.status === 'cancelled';
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      key={appt.id}
                      className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 bg-white ${
                        isCancelled ? 'border-rose-100 opacity-60' : 'border-rose-100 hover:border-rose-300 hover:shadow-md'
                      }`}
                    >
                      {/* Cancellation banner mask */}
                      {isCancelled && (
                        <div className="absolute top-0 right-0 bg-rose-50 border-b border-l border-rose-150 text-rose-600 p-1.5 px-3.5 text-[9px] font-mono uppercase tracking-widest font-extrabold rounded-bl-xl">
                          Cancelled
                        </div>
                      )}

                      {!isCancelled && (
                        <div className="absolute top-0 right-0 bg-rose-100 text-rose-700 p-1.5 px-3.5 text-[9px] font-mono uppercase tracking-widest font-extrabold rounded-bl-xl">
                          Confirmed & Ready
                        </div>
                      )}

                      <div className="space-y-3">
                        {/* Header ID */}
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-rose-450 font-bold uppercase font-black">
                            Receipt ID: {appt.id}
                          </span>
                          <span className="text-xs font-mono font-black text-rose-600 bg-[#fff8f9] px-2.5 py-1 rounded border border-rose-100">
                            ${appt.totalPrice} Due at Salon
                          </span>
                        </div>

                        {/* Customer Info */}
                        <div className="border-t border-b border-rose-50 py-3 space-y-1 text-xs">
                          <p className="flex justify-between text-[#2D1B1E]/60">
                            <span>Client:</span>
                            <span className="font-extrabold text-[#1A0B0D]">{appt.customerName}</span>
                          </p>
                          <p className="flex justify-between text-[#2D1B1E]/60">
                            <span>Contact:</span>
                            <span className="font-semibold text-[#1A0B0D]/85 font-mono">{appt.customerPhone} | {appt.customerEmail}</span>
                          </p>
                          {appt.notes && (
                            <p className="flex flex-col pt-1.5 text-[#2D1B1E]/70 font-semibold">
                              <span className="text-[10px] text-rose-500 uppercase font-mono font-bold">Special request:</span>
                              <span className="italic mt-0.5 leading-normal">"{appt.notes}"</span>
                            </p>
                          )}
                        </div>

                        {/* Timings and details */}
                        <div className="flex items-center gap-6 text-xs text-[#2D1B1E]/80">
                          <div className="flex items-center gap-1.5 font-bold">
                            <Calendar size={14} className="text-rose-400" />
                            <span>{appt.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-bold font-mono text-rose-605">
                            <Clock size={14} className="text-rose-400" />
                            <span>{appt.time}</span>
                          </div>
                        </div>

                        {/* Staff Specialist info */}
                        <div className="flex items-center gap-2 pt-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 bg-[#fff8f9] border border-rose-100">
                            <img
                              src={apptStaff?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'}
                              alt={apptStaff?.name || 'Any Stylist'}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="block text-[9px] font-mono text-rose-450 uppercase font-extrabold">Selected Tech</span>
                            <span className="text-xs font-black text-[#1A0B0D]">
                              {apptStaff?.name || 'First Available Specialist'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action trigger: Cancel appointment */}
                      {!isCancelled && (
                        <div className="border-t border-rose-50 pt-3 flex justify-end shrink-0">
                          <button
                            onClick={() => handleCancelBooking(appt.id)}
                            className="text-xs font-black text-rose-500 hover:text-rose-700 flex items-center justify-center gap-1 hover:underline transition-colors cursor-pointer"
                          >
                            <UserX size={13} />
                            Cancel Appointment
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-rose-100 rounded-3xl p-8 shadow-sm">
              <ShieldAlert className="mx-auto text-rose-300 mb-2 animate-bounce" size={36} />
              <p className="text-[#2D1B1E]/70 font-black text-sm">No historical or upcoming NailBar appointments found.</p>
              <p className="text-xs text-[#2D1B1E]/60 max-w-sm mx-auto mt-1 leading-normal font-semibold">
                Try searching using another search phrase, or schedule an appointment online using the "Book Now" wizard above!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
