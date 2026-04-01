import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Calendar, Search, X } from 'lucide-react';
import { Button } from '../../ui/Button';

export function SmartSearchWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Compact Widget (Clickable Area) */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 max-w-xl cursor-pointer pointer-events-auto group relative"
      >
        <div className="absolute inset-0 z-10 rounded-[2rem]"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pick-up Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-primary transition-colors" />
              <input readOnly className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm pointer-events-none text-slate-900 placeholder:text-slate-400 font-medium" placeholder="City or Airport" type="text" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Drop-off Location</label>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-primary transition-colors" />
              <input readOnly className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm pointer-events-none text-slate-900 placeholder:text-slate-400 font-medium" placeholder="Same as pick-up" type="text" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Dates</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-primary transition-colors" />
              <input readOnly className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm pointer-events-none text-slate-900 placeholder:text-slate-400 font-medium" placeholder="Select dates" type="text" />
            </div>
          </div>
          <div className="flex items-end relative z-20">
            <button className="w-full bg-slate-900 text-white h-[44px] rounded-xl font-bold group-hover:bg-primary group-hover:text-slate-900 transition-all flex items-center justify-center gap-2">
              <Search className="w-4 h-4 text-inherit" /> Search
            </button>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center pt-24 px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.15 } }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl"
            >
               <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-200 transition-colors z-20">
                 <X className="w-5 h-5" />
               </button>
               
               <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight">Where are you going?</h2>
               
               <div className="flex flex-col lg:flex-row gap-4">
                  {/* Location Input */}
                  <div className="flex-1 bg-slate-50 p-6 rounded-[1.5rem] border-2 border-primary focus-within:ring-4 focus-within:ring-primary/20 transition-all">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Location</label>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-primary w-8 h-8 shrink-0" />
                      <input autoFocus placeholder="City or Airport" className="bg-transparent border-none text-2xl font-bold w-full outline-none text-slate-900 placeholder:text-slate-300" />
                    </div>
                  </div>
                  
                  {/* Dates Input */}
                  <div className="flex-1 bg-slate-50 p-6 rounded-[1.5rem] border-2 border-slate-100 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20 transition-all">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Pick-up / Drop-off</label>
                    <div className="flex items-center gap-3">
                      <Calendar className="text-primary w-8 h-8 shrink-0" />
                      <input placeholder="Add dates" className="bg-transparent border-none text-2xl font-bold w-full outline-none text-slate-900 placeholder:text-slate-300" />
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <Button size="lg" className="px-12 py-6 rounded-[1.5rem] text-xl mt-4 lg:mt-0 shadow-xl flex gap-3 h-auto">
                    <Search className="w-8 h-8 font-black" />
                    Search
                  </Button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
