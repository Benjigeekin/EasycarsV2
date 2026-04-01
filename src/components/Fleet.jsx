import React from 'react';

import { allCars } from '../data/cars';

const cars = allCars.slice(0, 3).map(car => ({
  ...car,
  brand: car.name.split(' ')[0],
  type: car.badge || 'Premium'
}));

export default function Fleet({ onRent, onNavigate }) {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900">Our Exclusive Fleet</h2>
            <p className="max-w-md text-slate-500">Choose from our meticulously maintained collection of world-class vehicles.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate && onNavigate('fleet')}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold tracking-widest uppercase hover:bg-primary hover:text-slate-900 transition-colors hover:scale-105 shadow-xl active:scale-95 flex items-center gap-2 text-sm"
            >
              View all Fleet
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, idx) => <CarCard key={idx} car={car} onRent={onRent} />)}
        </div>
      </div>
    </section>
  );
}

function CarCard({ car, onRent }) {
  return (
    <div onClick={() => onRent && onRent(car)} className="group bg-[#FFFFFF] rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col border border-slate-100 relative cursor-pointer">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{car.name} <span className="text-slate-400 font-normal">({car.year})</span></h3>
            <p className="text-sm font-medium">{car.brand}</p>
          </div>
          <span className="bg-primary/20 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase">{car.type}</span>
        </div>
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#FFFFFF] relative">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img 
              alt={car.name} 
              className={`w-full h-full object-contain transition-transform duration-500 ${car.img.includes('car3.png') || car.name.includes('KODIAQ') ? 'translate-y-3 md:translate-y-5 group-hover:scale-105' : ''} ${car.name.includes('KAMIQ') || car.name.includes('Kamiq') ? 'scale-[1.35] group-hover:scale-[1.45]' : 'group-hover:scale-105'}`} 
              src={car.img} 
            />
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 mt-auto">
        <div className="grid grid-cols-2 gap-y-3 mb-6 border-b border-slate-50 pb-6">
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="material-symbols-outlined text-lg text-primary">person</span>
            <span className="text-xs font-medium">{car.seats}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="material-symbols-outlined text-lg text-primary">settings</span>
            <span className="text-xs font-medium">{car.trans}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="material-symbols-outlined text-lg text-primary">local_gas_station</span>
            <span className="text-xs font-medium">{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-[18px] h-[18px]">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 7 A 6 6 0 1 0 16 17" />
              <polygon points="10 9.5 14.5 12 10 14.5" />
            </svg>
            <span className="text-xs font-medium">CarPlay</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900">{car.price}</span>
            <span className="text-sm text-slate-400 font-medium"> / day</span>
          </div>
          <button className="bg-primary text-black font-bold px-6 py-2.5 rounded-xl hover:brightness-110 transition-all relative">
            Rent Now
            <span className="absolute inset-0 z-20 rounded-2xl" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
