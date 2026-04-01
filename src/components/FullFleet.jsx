import React, { useState } from 'react';

import { allCars } from '../data/cars';

export default function FullFleet({ onRent }) {
  const [activeFilter, setActiveFilter] = useState('All Vehicles');
  
  const categories = ['All Vehicles', 'SUV', 'Sedan', 'Premium', 'Compact'];

  const isCarInCategory = (car, category) => {
    if (category === 'All Vehicles') return true;
    const name = car.name.toUpperCase();
    
    if (category === 'Premium') {
      return car.badge === 'Premium' || name.includes('LEXUS') || name.includes('BMW') || name.includes('PORSCHE') || name.includes('MERCEDES') || name.includes('RANGE ROVER') || name.includes('LAND ROVER');
    }
    if (category === 'Compact') {
      return name.includes('YARIS') || name.includes('CHR') || name.includes('C-HR') || name.includes('C4') || name.includes('GOLF') || name.includes('SANDERO') || name.includes('KAMIQ') || name.includes('FABIA') || name.includes('POLO') || name.includes('RENEGADE');
    }
    if (category === 'Sedan') {
      return name.includes('ES300') || name.includes('SUPERB') || name.includes('OCTAVIA') || name.includes('COROLLA') || name.includes('CAMRY') || name.includes('E CLASS') || name.includes('7 LONG') || name.includes('PASSAT');
    }
    if (category === 'SUV') {
      return name.includes('KODIAQ') || name.includes('RAV4') || name.includes('TIGUAN') || name.includes('TUCSON') || name.includes('SPORTAGE') || name.includes('EXPLORER') || name.includes('X4') || name.includes('CAYENNE') || name.includes('MACAN') || name.includes('RANGE ROVER') || name.includes('LAND ROVER') || name.includes('TAYRON');
    }
    return false; // Default safe fallback
  };

  const filteredCars = allCars.filter(car => isCarInCategory(car, activeFilter));

  return (
    <main className="bg-white text-slate-900 pt-16">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4 block">Full-Spectrum Selection</span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9]">Our Cars</h1>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">
            Experience the pinnacle of automotive excellence. From executive sedans to rugged SUVs, our curated collection is maintained to the highest concierge standards.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-28 z-40 px-8 py-4 mb-12 bg-white/80 backdrop-blur-sm border-y border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${activeFilter === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-slate-400">
            <span className="text-xs font-bold uppercase tracking-widest">{filteredCars.length} Results</span>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="px-8 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, idx) => (
            <div key={idx} onClick={() => onRent && onRent(car)} className="group bg-slate-50 border border-slate-100 rounded-[2rem] p-4 transition-all duration-300 hover:shadow-2xl hover:bg-white hover:scale-105 cursor-pointer relative">
              <div className="relative aspect-[4/3] rounded-2xl bg-[#FFFFFF] overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img 
                    alt={car.name} 
                    className={`w-full h-full object-contain transition-transform duration-500 ${car.img.includes('car3.png') || car.name.includes('KODIAQ') ? 'translate-y-3 md:translate-y-4 group-hover:scale-105' : ''} ${car.name.includes('KAMIQ') || car.name.includes('Kamiq') ? 'scale-[1.35] group-hover:scale-[1.45]' : 'group-hover:scale-105'}`} 
                    src={car.img} 
                  />
                </div>
                {car.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {car.badge}
                    </span>
                  </div>
                )}
              </div>
              <div className="px-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-slate-900 uppercase leading-none">{car.name}</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">{car.year}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900 leading-none">{car.price}</span>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-tighter">per day</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 my-6 py-4 border-y border-slate-200/60">
                  <div className="flex flex-col items-center gap-1"><span className="material-symbols-outlined text-slate-400 text-lg">event_seat</span><span className="text-[9px] font-black text-slate-500 uppercase">{car.seats}</span></div>
                  <div className="flex flex-col items-center gap-1"><span className="material-symbols-outlined text-slate-400 text-lg">settings</span><span className="text-[9px] font-black text-slate-500 uppercase">{car.trans}</span></div>
                  <div className="flex flex-col items-center gap-1"><span className="material-symbols-outlined text-slate-400 text-lg">local_gas_station</span><span className="text-[9px] font-black text-slate-500 uppercase">{car.fuel}</span></div>
                  <div className="flex flex-col items-center gap-1"><span className="material-symbols-outlined text-slate-400 text-lg">speed</span><span className="text-[9px] font-black text-slate-500 uppercase">{car.consume || 'N/A'}</span></div>
                </div>
                <button className="w-full bg-primary text-slate-900 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-primary transition-colors active:scale-95 relative">
                  Reservation
                  <span className="absolute inset-0 z-20 rounded-[2rem]" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          ))}

          {/* Load More Option */}
          <div className="col-span-full py-12 text-center mt-12">
            <p className="mb-4 text-slate-400 text-sm font-bold tracking-widest uppercase">Showing {filteredCars.length} Fleet Options in {activeFilter}</p>
            <button className="bg-slate-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl hover:bg-primary hover:text-slate-900 cursor-pointer">Contact For Custom Requests</button>
          </div>
        </div>
      </section>
    </main>
  );
}
