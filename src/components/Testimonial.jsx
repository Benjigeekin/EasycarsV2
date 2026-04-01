import React, { useState } from 'react';

const reviews = [
  {
    initial: 'J',
    name: 'Janis B.',
    time: 'Verified Customer',
    text: 'Excellent airport service. The car was brought right to the terminal, sparkling clean. Highly recommended!'
  },
  {
    initial: 'N',
    name: 'Nancy Celis',
    time: '2 years ago',
    text: 'Very nice cars with excellent customer service at reasonable prices. Couldn’t be happier.'
  },
  {
    initial: 'A',
    name: 'Austin',
    time: '8 years ago',
    text: 'Professional service throughout. quick collection and return. will use again.'
  },
  {
    initial: 'E',
    name: 'Elia Hoelstad',
    time: 'a year ago',
    text: 'Rent with easy cars was a great experience from day1 Super location at the airport, quick rental and easy to deliver! 100% recommended'
  }
];

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const next = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const setIndex = (i) => setActiveIndex(i);

  const activeReview = reviews[activeIndex];

  return (
    <section className="py-24 text-slate-900 mesh-pattern">
      <div className="mx-auto px-6 text-center max-w-7xl">
        <div className="text-center mb-12">
          <span className="material-symbols-outlined text-primary text-6xl">format_quote</span>
          <h2 className="text-4xl font-black text-slate-900 mt-4">What Our Clients Say</h2>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-visible py-4 md:py-8">
            <div className="flex transition-transform duration-500 ease-in-out">
              <div className="w-full flex-shrink-0 px-4">
                <div 
                  onClick={() => setModalOpen(true)}
                  className="bg-white/80 backdrop-blur-sm p-10 md:p-16 rounded-[3rem] border border-slate-200 shadow-xl min-h-[400px] flex flex-col justify-center animate-in fade-in duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transition-all" 
                  key={activeIndex}
                >
                  
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#fbbc04] flex items-center justify-center text-white text-2xl font-normal mb-4">
                      {activeReview.initial}
                    </div>
                    <div className="flex justify-center gap-1 text-[#fbbc04]">
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                  
                  <p className="text-2xl md:text-3xl font-bold italic text-slate-800 mb-10 leading-relaxed min-h-[120px]">
                    "{activeReview.text}"
                  </p>
                  
                  <div className="text-center mt-auto">
                    <p className="font-black text-xl text-slate-900">{activeReview.name}</p>
                    <p className="text-sm text-slate-400 font-bold mt-2">{activeReview.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all shadow-md active:scale-95">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16">
            <button onClick={next} className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center hover:brightness-110 shadow-lg transition-all active:scale-95">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-primary w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-4xl bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl animate-in zoom-in-95 duration-200 min-h-[500px] flex flex-col justify-center text-center">
            
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors z-20">
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[#fbbc04] flex items-center justify-center text-white text-3xl font-black mb-6 shadow-md">
                {activeReview.initial}
              </div>
              <div className="flex justify-center gap-1.5 text-[#fbbc04]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            
            <p className="text-3xl md:text-4xl font-black italic text-slate-800 mb-12 leading-relaxed tracking-tight" key={'modal-text-' + activeIndex}>
              "{activeReview.text}"
            </p>
            
            <div className="text-center mt-auto" key={'modal-author-' + activeIndex}>
              <p className="font-black text-2xl text-slate-900">{activeReview.name}</p>
              <p className="text-base text-slate-400 font-bold mt-2 uppercase tracking-widest">{activeReview.time}</p>
            </div>

            {/* Modal Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8">
              <button onClick={(e) => { e.stopPropagation(); prev(); }} className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all shadow-xl active:scale-95 text-slate-400 focus:outline-none">
                <span className="material-symbols-outlined text-3xl">chevron_left</span>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8">
              <button onClick={(e) => { e.stopPropagation(); next(); }} className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-black flex items-center justify-center hover:brightness-110 shadow-xl transition-all active:scale-95 focus:outline-none">
                <span className="material-symbols-outlined text-3xl">chevron_right</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
