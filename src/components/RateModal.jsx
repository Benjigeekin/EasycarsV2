import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReservationForm } from './features/booking/ReservationForm';
import { CheckCircle2 } from 'lucide-react';

export default function RateModal({ car, onClose }) {
  const [selectedRate, setSelectedRate] = useState('daily');
  const [step, setStep] = useState(1);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const handleCloseAttempt = () => {
    if (step === 2) {
      setShowConfirmClose(true);
    } else {
      onClose();
    }
  };

  // Parse numeric price from string like "€200"
  const numericPriceMatch = car.price.match(/\d+/);
  const basePrice = numericPriceMatch ? parseInt(numericPriceMatch[0], 10) : 0;
  const currencySymbol = car.price.replace(/[0-9]/g, '').trim() || '€';

  const rates = [
    {
      id: 'daily',
      title: 'Daily',
      discount: 0,
      priceOptionsText: '/day'
    },
    {
      id: 'weekly',
      title: 'Weekly',
      discount: 20,
      priceOptionsText: '/day'
    },
    {
      id: 'monthly',
      title: 'Monthly',
      discount: 35,
      priceOptionsText: '/day'
    }
  ];

  const activeRateConfig = rates.find(r => r.id === selectedRate);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
        onClick={handleCloseAttempt}
      ></div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmClose && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowConfirmClose(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl z-10 text-center"
            >
              <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Discard Reservation?</h4>
              <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
                All your entered details and selected extras will be lost. Are you sure you want to close the reservation window?
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirmClose(false)} 
                  className="flex-1 py-4 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-[1.25rem] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={onClose} 
                  className="flex-1 py-4 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-[1.25rem] transition-colors shadow-lg shadow-red-500/30"
                >
                  Discard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Content */}
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[1200px] h-[90vh] md:h-[750px] relative z-10 overflow-hidden animate-zoomIn flex flex-col md:flex-row">
        
        {/* Left Side: Car Image */}
        <div className="w-full md:w-5/12 bg-slate-50 p-8 flex flex-col relative justify-center items-center border-b md:border-b-0 md:border-r border-slate-100 shrink-0">
           {/* Close Button Mobile */}
           <button onClick={handleCloseAttempt} className="md:hidden absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-sm z-20">
             <span className="material-symbols-outlined">close</span>
           </button>
           
           <div className="mb-auto w-full pt-4 z-10">
             <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight uppercase">{car.name}</h2>
             <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">{car.year}</p>
             <div className="flex flex-wrap gap-2 mt-4">
               {car.type && <span className="bg-primary/20 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{car.type}</span>}
               {car.fuel && <span className="bg-slate-200 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{car.fuel}</span>}
             </div>
           </div>
           
           <div className="w-full relative aspect-[16/9] md:aspect-[4/3] mt-4 mb-0 flex items-center justify-center pointer-events-none">
             <img src={car.img} alt={car.name} className="absolute inset-0 w-full h-full object-contain mix-blend-multiply transform origin-bottom scale-[1.10]" />
           </div>
           
           <div className="grid grid-cols-2 gap-4 w-full mt-auto pt-8">
               <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center shadow-sm">
                 <span className="material-symbols-outlined text-slate-300 text-xl mb-1">group</span>
                 <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{car.specs?.seats || '5'} Seats</span>
               </div>
               <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center shadow-sm">
                 <span className="material-symbols-outlined text-slate-300 text-xl mb-1">settings</span>
                 <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{car.specs?.transmission || 'Auto'}</span>
               </div>
           </div>
        </div>

        {/* Right Side Workflow Container */}
        <div className="w-full md:w-7/12 bg-white relative flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Rates Display */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full p-8 md:p-10 flex flex-col"
              >
                {/* Close Button Desktop */}
                <button onClick={handleCloseAttempt} className="hidden md:flex absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors z-20">
                  <span className="material-symbols-outlined">close</span>
                </button>

                <h3 className="text-xl font-black text-slate-900 mb-6 mt-2 md:mt-2 tracking-tight">Select your rate</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {rates.map((rate) => {
                    let currentPrice = basePrice;
                    let displayDiscount = 0;

                    if (rate.discount > 0 && basePrice > 0) {
                      const theoreticalPrice = basePrice * (1 - rate.discount / 100);
                      currentPrice = Math.floor(theoreticalPrice / 5) * 5;
                      displayDiscount = Math.round((1 - currentPrice / basePrice) * 100);
                    }

                    const isSelected = selectedRate === rate.id;

                    return (
                      <div 
                        key={rate.id}
                        onClick={() => setSelectedRate(rate.id)}
                        className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center bg-white ${isSelected ? 'border-primary shadow-2xl ring-4 ring-primary/10 transform -translate-y-2' : 'border-slate-100 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1'}`}
                      >
                        <div className="flex flex-col items-center gap-2 mb-4">
                          <span className="font-bold text-slate-800 text-lg">{rate.title}</span>
                          {displayDiscount > 0 ? (
                            <span className="bg-slate-900 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                              -{displayDiscount}%
                            </span>
                          ) : (
                            <span className="h-[22px]"></span>
                          )}
                        </div>

                        <div className="mt-auto flex flex-col items-center">
                          {displayDiscount > 0 ? (
                            <div className="text-slate-400 line-through text-sm font-semibold mb-1">
                              {currencySymbol}{basePrice}
                            </div>
                          ) : (
                            <div className="h-[20px] mb-1"></div>
                          )}
                          <div className="flex items-baseline gap-1 text-slate-900">
                            <span className="text-2xl font-black">{currencySymbol}{currentPrice}</span>
                            <span className="text-slate-500 font-medium text-sm">{rate.priceOptionsText}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto bg-slate-50 border border-slate-100 p-6 rounded-[1.5rem] mb-6 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Included in all rates
                  </h4>
                  <ul className="text-xs text-slate-500 font-medium space-y-3">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Standard Insurance Coverage</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> 24/7 Roadside Assistance</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Free Cancellation up to 48 hours</li>
                  </ul>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-primary text-slate-900 rounded-[1.5rem] p-5 flex justify-center gap-3 items-center hover:brightness-110 active:scale-95 transition-all shadow-xl font-bold uppercase tracking-widest text-lg"
                >
                  Proceed to Booking <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </motion.div>
            )}

            {/* STEP 2: Main Reservation Form */}
            {step === 2 && (
              <ReservationForm 
                key="step2"
                car={car}
                basePrice={basePrice}
                baseDiscountPercent={activeRateConfig.discount}
                onBack={() => setStep(1)}
                onSuccess={() => setStep(3)}
              />
            )}

            {/* STEP 3: Success Confirmation */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full p-8 md:p-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-8 border-[6px] border-green-100">
                  <CheckCircle2 strokeWidth={3} className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Request Received!</h2>
                
                <div className="space-y-4 max-w-md mb-10">
                  <p className="text-slate-500 text-[1.1rem] leading-relaxed">
                    Great news! Your reservation request for the <strong className="text-slate-900 px-1">{car.name}</strong> has been successfully registered in our system.
                  </p>
                  
                  <div className="flex flex-col items-center justify-center gap-2 pt-4 border-t border-slate-100">
                    <p className="text-slate-600 font-medium leading-relaxed">
                      You will receive an email containing your complete itinerary as soon as your booking is finalized.
                    </p>
                    <p className="text-slate-900 font-black tracking-widest uppercase mt-2 text-sm px-4 py-2 bg-primary rounded-full inline-block shadow-lg">
                      Thank You For Choosing EasyCars!
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleCloseAttempt}
                  className="w-full bg-primary text-slate-900 font-bold p-5 rounded-[1.5rem] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl"
                >
                  Return to Fleet
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
