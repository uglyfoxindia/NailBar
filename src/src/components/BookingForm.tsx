import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, STAFF } from '../data';
import { Booking, Service, Staff } from '../types';
import { Calendar, Clock, DollarSign, User, FileText, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface BookingFormProps {
  initialServiceCategory?: string;
  preselectedServices: string[];
  onAddService: (service: Service) => void;
  onClearSelectedServices: () => void;
  onRemoveService: (id: string) => void;
  onBookingSuccess: () => void;
  onClose: () => void;
}

export default function BookingForm({
  initialServiceCategory,
  preselectedServices,
  onAddService,
  onClearSelectedServices,
  onRemoveService,
  onBookingSuccess,
  onClose,
}: BookingFormProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedStaff, setSelectedStaff] = useState<Staff | 'any'>('any');
  
  // Date selection (Next 7 days starting today)
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Personal details
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Created Booking reference for step 5
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Generate next 7 booking dates
  const [bookingDates, setBookingDates] = useState<{ dayName: string; dayNum: string; fullDate: string }[]>([]);

  useEffect(() => {
    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const isToday = i === 0;
      
      dates.push({
        dayName: isToday ? 'Today' : days[d.getDay()],
        dayNum: d.getDate().toString(),
        fullDate: d.toISOString().split('T')[0],
      });
    }
    setBookingDates(dates);
    setSelectedDate(dates[0].fullDate); // default today
  }, []);

  // Filter selected services list
  const activeSelectedServices = SERVICES.filter((s) => preselectedServices.includes(s.id));
  const totalCost = activeSelectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = activeSelectedServices.reduce((sum, s) => sum + s.durationMin, 0);

  // Available slots
  const timeSlots = {
    morning: ['10:00 AM', '10:45 AM', '11:30 AM'],
    afternoon: ['12:15 PM', '01:00 PM', '02:00 PM', '03:15 PM', '04:30 PM'],
    evening: ['05:15 PM', '06:00 PM', '07:00 PM', '07:45 PM'],
  };

  const handleCreateAppointment = () => {
    if (!name || !phone || !email) {
      alert('Please fill out all required details (Name, Email, and Phone).');
      return;
    }

    const newBooking: Booking = {
      id: 'NBR-' + Math.floor(1000 + Math.random() * 9000),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceIds: preselectedServices,
      staffId: selectedStaff === 'any' ? 'First Available' : selectedStaff.id,
      date: selectedDate,
      time: selectedTime,
      notes: notes,
      totalPrice: totalCost,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save of reservation to localStorage
    const savedBookings = localStorage.getItem('nailbar_appointments');
    const bookingsList: Booking[] = savedBookings ? JSON.parse(savedBookings) : [];
    bookingsList.unshift(newBooking);
    localStorage.setItem('nailbar_appointments', JSON.stringify(bookingsList));

    setConfirmedBooking(newBooking);
    setStep(5);
    onBookingSuccess();
  };

  const nextStep = () => {
    if (step === 1 && preselectedServices.length === 0) {
      alert('Please select at least one treatment before continuing.');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      alert('Please select BOTH date and time slot.');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="bg-white border border-stone-200 shadow-xl rounded-2xl md:rounded-3xl overflow-hidden text-left">
      {/* Mini Progress Indicator */}
      {step < 5 && (
        <div className="h-1.5 w-full bg-stone-100 flex">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-full flex-1 transition-all duration-300 ${
                s <= step ? 'bg-gradient-to-r from-rose-500 to-pink-400' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      )}

      {/* Header Panel */}
      <div className="p-6 md:p-8 border-b border-stone-100 flex justify-between items-center bg-[#faf8f6]">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-bold text-stone-900">
            {step === 5 ? 'Booking Confirmed!' : 'Book Appointment Online'}
          </h2>
          <p className="text-xs text-stone-400 font-mono uppercase tracking-wider mt-1">
            {step === 1 && 'Step 1: Select Treatments'}
            {step === 2 && 'Step 2: Choose Specialist'}
            {step === 3 && 'Step 3: Select Date & Time'}
            {step === 4 && 'Step 4: Contact Details'}
            {step === 5 && 'Appointment secured'}
          </p>
        </div>
        
        {step < 5 && (
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xs font-semibold px-3 py-1.5 border border-stone-200 rounded-lg hover:bg-stone-50"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Interactive Form Panel */}
      <div className="p-6 md:p-8 min-h-[400px]">
        
        {/* STEP 1: Select/Refine Services */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-rose-50 border border-rose-200/50 p-4 rounded-xl">
              <p className="text-xs text-rose-800 leading-normal font-light">
                Add multiple treatments to make the most of your studio visit. Tap checkboxes below, or pick from our full services table outside!
              </p>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase font-bold">
                Treatment Selections
              </span>
              
              {SERVICES.map((s) => {
                const isSelected = preselectedServices.includes(s.id);
                return (
                  <label 
                    key={s.id}
                    className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-stone-50 border-stone-400' 
                        : 'border-stone-200/80 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 text-left">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          if (isSelected) {
                            onRemoveService(s.id);
                          } else {
                            onAddService(s);
                          }
                        }}
                        className="mt-1 h-4 h-4 rounded border-stone-300 text-rose-500 focus:ring-rose-500 cursor-pointer"
                      />
                      <div>
                        <span className="block text-sm font-bold text-stone-900 leading-tight">
                          {s.name}
                        </span>
                        <span className="block text-[11px] text-stone-400 mt-0.5">
                          {s.durationMin} min • {s.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-serif font-bold text-stone-850">
                      ${s.price}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Price Accumulator */}
            {preselectedServices.length > 0 && (
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 space-y-2">
                <div className="flex justify-between items-center text-xs text-stone-500 font-medium">
                  <span>Selected Treatments:</span>
                  <span>{preselectedServices.length} items</span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-500 font-medium">
                  <span>Estimated Salon Time:</span>
                  <span className="font-mono flex items-center gap-1">
                    <Clock size={12} />
                    {totalDuration} mins
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-center font-bold">
                  <span className="text-sm text-stone-800">Total Price:</span>
                  <span className="text-xl font-serif text-stone-950">${totalCost}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Choose Stylist */}
        {step === 2 && (
          <div className="space-y-6">
            <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase font-bold mb-4">
              Select Your Nail Tech
            </span>

            <div className="grid grid-cols-1 gap-3.5">
              {/* Option: Any Available */}
              <label
                className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                  selectedStaff === 'any' ? 'bg-[#faf8f6] border-stone-800' : 'border-stone-250 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="staff"
                  checked={selectedStaff === 'any'}
                  onChange={() => setSelectedStaff('any')}
                  className="h-4 w-4 text-stone-900 focus:ring-stone-800"
                />
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-pink-400 to-amber-300 flex items-center justify-center text-white font-serif font-black text-xs shrink-0">
                  ANY
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-bold text-sm text-stone-900">First Available Stylist</h4>
                  <p className="text-xs text-stone-400 leading-normal mt-0.5">
                    Select this option to match with the first talent available. Perfect for quick reservations!
                  </p>
                </div>
              </label>

              {/* Loop Staff */}
              {STAFF.map((member) => (
                <label
                  key={member.id}
                  className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                    selectedStaff !== 'any' && selectedStaff.id === member.id 
                      ? 'bg-[#faf8f6] border-stone-800' 
                      : 'border-stone-250 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="staff"
                    checked={selectedStaff !== 'any' && selectedStaff.id === member.id}
                    onChange={() => setSelectedStaff(member)}
                    className="h-4 w-4 text-stone-900 focus:ring-stone-800"
                  />
                  <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 bg-stone-100">
                    <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-stone-900">{member.name}</h4>
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        ★ {member.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-mono uppercase tracking-wider">{member.role}</p>
                    <p className="text-[11px] text-stone-500 mt-1 italic">Specialty: {member.specialty}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Date & Time Scheduler */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Header / Week picker */}
            <div>
              <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase font-bold mb-3">
                Select Date
              </span>
              <div className="grid grid-cols-7 gap-2 overflow-x-auto pb-1">
                {bookingDates.map((date) => {
                  const isSelected = selectedDate === date.fullDate;
                  return (
                    <button
                      key={date.fullDate}
                      type="button"
                      onClick={() => { setSelectedDate(date.fullDate); setSelectedTime(''); }}
                      className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 border-stone-200/60 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-[10px] font-medium leading-none uppercase shrink-0">{date.dayName}</span>
                      <span className="font-serif text-lg font-bold mt-1.5 leading-none shrink-0">{date.dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Grid categorizations */}
            <div className="space-y-4">
              <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase font-bold">
                Select Time Slot
              </span>

              {/* Morning */}
              <div className="space-y-2">
                <span className="block text-[11px] font-semibold text-stone-400">🌅 Morning</span>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.morning.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-xs font-bold font-mono rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Afternoon */}
              <div className="space-y-2 pt-2">
                <span className="block text-[11px] font-semibold text-stone-400">☀️ Afternoon</span>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.afternoon.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-xs font-bold font-mono rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evening */}
              <div className="space-y-2 pt-2">
                <span className="block text-[11px] font-semibold text-stone-400">🌙 Evening</span>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.evening.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-xs font-bold font-mono rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Personal / Contact Info */}
        {step === 4 && (
          <div className="space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase font-bold mb-4">
              Your Details & Safety Note
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Avery Smith"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-300 transition-all font-medium inline-block"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. avery@example.com"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-300 transition-all font-medium inline-block"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 012-3456"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-300 transition-all font-medium inline-block"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Special Art Requests / Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need prior acrylic removal first, prefer coffee during session, design references attached"
                rows={3}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-300 transition-all font-medium inline-block resize-none"
              />
            </div>

            {/* Quick summary check */}
            <div className="p-4 bg-[#faf8f6] rounded-xl border border-stone-200/65 space-y-1 mt-4 text-xs">
              <p className="flex justify-between">
                <span className="text-stone-400">Selected Date & Slot:</span>
                <span className="font-bold text-stone-800">{selectedDate} @ {selectedTime}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-stone-400">Total Price:</span>
                <span className="font-bold text-stone-800">${totalCost}</span>
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: Success Ticket & Summary Output */}
        {step === 5 && confirmedBooking && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-6 py-6"
          >
            <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={40} />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-stone-900">Your Appointment is Secured!</h3>
              <p className="text-stone-500 font-light text-sm">
                A confirmation email with calendar invites has been sent to <strong className="font-medium text-stone-700">{confirmedBooking.customerEmail}</strong>.
              </p>
            </div>

            {/* Simulated Printed Ticket Card */}
            <div className="border border-dashed border-stone-300 bg-stone-50 rounded-2xl p-6 w-full max-w-sm text-left relative overflow-hidden">
              
              {/* Ticket Jagged Visuals */}
              <div className="absolute top-0 -left-3 h-6 w-6 rounded-full bg-white border-r border-dashed border-stone-300"></div>
              <div className="absolute top-0 -right-3 h-6 w-6 rounded-full bg-white border-l border-dashed border-stone-300"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-dashed border-stone-250">
                  <span className="text-2xs font-mono uppercase text-stone-400 tracking-wider">Luxe NailBar Appt</span>
                  <span className="text-xs font-mono font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="flex justify-between text-stone-550">
                    <span>Client Name:</span>
                    <strong className="text-stone-900">{confirmedBooking.customerName}</strong>
                  </p>
                  <p className="flex justify-between text-stone-550">
                    <span>Staff Artist:</span>
                    <strong className="text-stone-900">
                      {confirmedBooking.staffId === 'First Available' ? 'Any Available Tech' : STAFF.find((s) => s.id === confirmedBooking.staffId)?.name || 'NailBar Tech'}
                    </strong>
                  </p>
                  <p className="flex justify-between text-stone-550">
                    <span>Date & Time:</span>
                    <strong className="text-stone-800 font-mono">
                      {confirmedBooking.date} • {confirmedBooking.time}
                    </strong>
                  </p>
                  <div className="pt-2 border-t border-dashed border-stone-200">
                    <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Booked Treatments:</p>
                    <ul className="list-disc list-inside space-y-1 pl-1 font-medium text-stone-700">
                      {activeSelectedServices.map((api) => (
                        <li key={api.id} className="truncate">
                          {api.name} (${api.price})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-dashed border-stone-250 flex justify-between items-center font-bold font-serif text-stone-900 text-base">
                  <span>Authorized Cost</span>
                  <span>${confirmedBooking.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Quick dashboard hub redirect */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-3 text-stone-700 hover:text-stone-900 border border-stone-300 hover:bg-stone-50 text-sm font-bold rounded-xl transition-all"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* Stepper Footer Controls */}
      {step < 5 && (
        <div className="p-6 border-t border-stone-150 bg-[#faf8f6] flex justify-between items-center">
          <div>
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-150 border border-stone-250 transition-all cursor-pointer"
              >
                <ChevronLeft size={14} />
                Back
              </button>
            ) : (
              <span className="text-xs text-stone-400 font-medium font-mono">STEP {step} / 4</span>
            )}
          </div>

          <div>
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-stone-900 hover:bg-rose-500 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
              >
                Continue
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleCreateAppointment}
                className="flex items-center gap-1.5 px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-sm cursor-pointer"
              >
                Confirm Appointment
                <CheckCircle2 size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
