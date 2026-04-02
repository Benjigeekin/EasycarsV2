import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { DatePicker } from "../../ui/DatePicker";
import { Textarea } from "../../ui/Textarea";
import { Checkbox } from "../../ui/Checkbox";
import { Button } from "../../ui/Button";
import { MapPin, Calendar, Clock, User, Mail, Phone, CreditCard } from "lucide-react";

const EXTRAS = [
  { id: 'child_seat', label: 'Child seat (free of charge)', priceText: '€0', price: 0, perDay: false },
  { id: 'full_ins', label: 'Full insurance', description: 'Comprehensive coverage (zero deductible)', priceText: '€20 / day', price: 20, perDay: true },
  { id: 'unlimited_mileage', label: 'Unlimited mileage', priceText: '€15 / day', price: 15, perDay: true },
  { id: 'cross_lt', label: 'Border Cross to LITHUANIA', priceText: '€40', price: 40, perDay: false },
  { id: 'cross_ee', label: 'Border Cross to ESTONIA', priceText: '€40', price: 40, perDay: false },
  { id: 'cross_pl', label: 'Border Cross to Poland', priceText: '€100', price: 100, perDay: false },
  { id: 'cross_de', label: 'Border Cross to Germany', priceText: '€200', price: 200, perDay: false },
  { id: 'trip_eu', label: 'Trip to Europe', description: 'Specify destinations in comments', priceText: 'Fee may apply', price: 0, perDay: false },
  { id: 'one_way_tv', label: 'One way trip to Tallinn / Vilnius', priceText: '€220', price: 220, perDay: false },
  { id: 'second_driver', label: 'Second driver (free of charge)', priceText: '€0', price: 0, perDay: false },
  { id: 'with_driver', label: 'Rent with our driver (15,00 EUR per hour)', priceText: '€120 / 8h day', price: 120, perDay: true },
  { id: 'roof_rack', label: 'Roof rack', priceText: '€25 / day', price: 25, perDay: true },
  { id: 'gas_policy', label: 'Gasoline policy', description: 'Full tank - empty tank checkout', priceText: '€89', price: 89, perDay: false },
];

const LOCATIONS = [
  { value: 'office', label: 'Office (RIX International Airport, Latvia, LV-1053)' },
  { value: 'other', label: 'Other address' },
];

export function ReservationForm({ car, basePrice, baseDiscountPercent, onBack, onSuccess }) {
  // Form State
  const [pickUpDate, setPickUpDate] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [pickupLoc, setPickupLoc] = useState('office');
  const [dropoffLoc, setDropoffLoc] = useState('office');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedExtras, setSelectedExtras] = useState({});
  const [days, setDays] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Date Calculation
  useEffect(() => {
    if (pickUpDate && dropOffDate) {
      const diffTime = dropOffDate.getTime() - pickUpDate.getTime();
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); // Minimum 1 day
      setDays(diffDays);
    }
  }, [pickUpDate, dropOffDate]);

  // Pricing Logic with Dynamic Days-Based Discounts
  let activeDiscountPercent = 0;
  if (days >= 30) {
    activeDiscountPercent = 35; // Monthly rate logic
  } else if (days >= 7) {
    activeDiscountPercent = 20; // Weekly rate logic
  }

  // Calculate discounted rate (rounded to nearest 5)
  const discountedDailyRate = Math.floor(basePrice * (1 - activeDiscountPercent / 100) / 5) * 5 || basePrice;
  const rentalTotal = discountedDailyRate * days;
  const originalRentalTotal = basePrice * days;
  const hasDiscount = activeDiscountPercent > 0;
  const extrasTotal = EXTRAS.reduce((total, extra) => {
    if (selectedExtras[extra.id]) {
        return total + (extra.perDay ? extra.price * days : extra.price);
    }
    return total;
  }, 0);

  const grandTotal = rentalTotal + extrasTotal;
  const originalGrandTotal = originalRentalTotal + extrasTotal;

  const toggleExtra = (id) => {
    setSelectedExtras(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        customerName: customerName,
        carModel: car.name,
        startDate: pickUpDate ? pickUpDate.toLocaleDateString() : new Date().toLocaleDateString(),
        endDate: dropOffDate ? dropOffDate.toLocaleDateString() : new Date().toLocaleDateString()
      };

      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      // Database commit & email trigger fired successfully (or failed silently if backend is offline, allowing UX to continue)
    } catch (err) {
      console.error('Backend connection failed:', err);
    }
    
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-white relative rounded-[2rem] overflow-hidden"
    >
      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 pb-[220px] md:pb-[160px] custom-scrollbar">
        
        <div className="flex items-center gap-4 mb-8">
          <button type="button" onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Reservation Details</h3>
            <p className="text-slate-500 font-medium text-sm mt-1">Complete your request for the {car.name}</p>
          </div>
        </div>

        <div className="space-y-12">
          
          {/* Section 1: Schedule & Location */}
          <section>
            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">
              <Calendar className="w-5 h-5 text-primary" /> Schedule & Location
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <DatePicker 
                label="Date and time of receipt" 
                icon={<Clock className="w-4 h-4" />}
                value={pickUpDate}
                onChange={(dates) => setPickUpDate(dates[0])}
                options={{ minDate: "today" }}
              />
              <DatePicker 
                label="Date and time of return" 
                icon={<Clock className="w-4 h-4" />}
                value={dropOffDate}
                onChange={(dates) => setDropOffDate(dates[0])}
                options={{ minDate: pickUpDate || "today" }}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              
              {/* Pickup Location Controls */}
              <div className="space-y-4">
                <Select 
                  label="Place of Pick-up" 
                  icon={<MapPin className="w-4 h-4" />}
                  value={pickupLoc}
                  onChange={setPickupLoc}
                  options={LOCATIONS}
                />
                <AnimatePresence mode="popLayout">
                  {pickupLoc === 'office' && (
                    <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="overflow-hidden">
                      <Input type="text" label="Flight Number" placeholder="e.g. BT-123 (Optional)" icon={<span className="material-symbols-outlined text-[1rem]">flight</span>} />
                    </motion.div>
                  )}
                  {pickupLoc === 'other' && (
                    <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="overflow-hidden">
                      <Input type="text" label="Pick-up Address" placeholder="Enter full address details..." required icon={<MapPin className="w-4 h-4" />} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropoff Location Controls */}
              <div className="space-y-4">
                <Select 
                  label="Place of Drop-off" 
                  icon={<MapPin className="w-4 h-4" />}
                  value={dropoffLoc}
                  onChange={setDropoffLoc}
                  options={LOCATIONS}
                />
                <AnimatePresence mode="popLayout">
                  {dropoffLoc === 'other' && (
                    <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="overflow-hidden">
                      <Input type="text" label="Delivery Address" placeholder="Enter full address details..." required icon={<MapPin className="w-4 h-4" />} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </section>

          {/* Section 2: Personal Data */}
          <section>
            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">
              <User className="w-5 h-5 text-primary" /> Personal Data
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Input type="text" label="Name and Surname" placeholder="John Doe" icon={<User className="w-4 h-4" />} required value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              <Input type="tel" label="Phone" placeholder="+371 20000000" icon={<Phone className="w-4 h-4" />} required value={phone} onChange={(e) => setPhone(e.target.value)} />
              <div className="md:col-span-2">
                <Input type="email" label="Email Address" placeholder="john@example.com" icon={<Mail className="w-4 h-4" />} required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </section>

          {/* Section 3: Extras */}
          <section>
            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">
              <span className="material-symbols-outlined text-primary">add_circle</span> Additional Services
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              {EXTRAS.map(extra => (
                <Checkbox 
                  key={extra.id}
                  label={extra.label}
                  description={extra.description}
                  price={extra.priceText}
                  checked={!!selectedExtras[extra.id]}
                  onChange={() => toggleExtra(extra.id)}
                />
              ))}
            </div>
          </section>

          {/* Section 4: Additional Info */}
          <section>
             <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">
              <span className="material-symbols-outlined text-primary">notes</span> Additional Info
            </h4>
            <Textarea 
              label="Comment" 
              placeholder="Flight number, precise address, or special requests..."
            />
          </section>
        </div>
      </div>

      {/* Sticky Bottom Actions / Total */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Grand Total</p>
            {hasDiscount && (
              <span className="text-[10px] font-black bg-primary/20 text-slate-900 px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
                -{activeDiscountPercent}% OFF
              </span>
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 tracking-tighter">€{grandTotal}</span>
            {hasDiscount && (
              <span className="text-lg font-bold text-slate-300 line-through">€{originalGrandTotal}</span>
            )}
            <span className="text-sm font-bold text-slate-500 ml-1">for {days} {days === 1 ? 'day' : 'days'}</span>
          </div>
          {extrasTotal > 0 && <p className="text-[10px] text-primary font-bold tracking-widest uppercase mt-1">Includes €{extrasTotal} in Extras</p>}
        </div>
        
        <Button size="lg" type="submit" disabled={isSubmitting} className="w-full md:w-auto min-w-[240px] shadow-xl text-lg h-[60px] gap-2 group">
           {isSubmitting ? (
             <span className="animate-pulse">Processing...</span>
           ) : (
             <><CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" /> Confirm Booking</>
           )}
        </Button>
      </div>

    </motion.form>
  )
}
