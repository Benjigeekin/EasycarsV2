import React from 'react';

export default function WhyChoose() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Why Choose EasyCars?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A completely new approach to car hire in Latvia. We guarantee no extra charges.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon="directions_car" title="New Fleet" desc="Only new cars (2019–2025 models) in perfect condition." />
          <FeatureCard icon="featured_seasonal_and_gifts" title="Free Accessories" desc="Free child seats and second driver included with every rental." />
          <FeatureCard icon="map" title="Free Delivery" desc="Free transfer to anywhere in Riga, Jurmala, or RIX (3+ days)." />
          <FeatureCard icon="shield" title="No Hidden Costs" desc="Transparent pricing and 24/7 roadside assistance included." />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
