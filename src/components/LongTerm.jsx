import React, { useState } from 'react';

const longtermCars = [
  {
    name: 'Lexus RX',
    price: '€2800',
    seats: 5,
    transmission: 'Auto',
    fuel: 'Hybrid',
    badge: 'Premium',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoZVkrQGI2Pxt35nihBYlHgV_5s76i5soA_edve2Zrp1eqAtwG1JJv1tZjXDjxN5Pee1HNnC9DmGQ10bYohzXlRp76syIvG1BOoKH6glgBzuP6Gao850vPtJwnfhW_a016h1TrE7MgcCdw3PtrDBHbxHPtxjpaSZyQzAqvc53BxvasbnCNTimIyAYX2IVT38EkczragKEw4AKcL9WLxumUqWGOeVAdmcS38k1DLsjtvs36FShCc5CZwN7Lb1Rqm1TePEiVETFEksJx'
  },
  {
    name: 'Lexus ES',
    price: '€2400',
    seats: 5,
    transmission: 'Auto',
    fuel: 'Hybrid',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi3twwFBO4Qe48wW-1U8CqSPnWcXTJPI23u4zJ76eu1S7BUjl5ZG2oBZuVVI3ke2Q0o6ffdBSmkhYIPTUISjRFMyb9RKXSNUvhpwOS57FiXT-Wb_WXQETpHkvzJAjHsHQo5KSowpNz5EEARpimyTt7IerCarypHGTKh_ZUZKywKYnSZ8r39zpRRh2DywX_1VytPuMwO8zQ4_qAtwHEpJ4e_gVoG68lD41V8XDTNNIjCWmM0EcaOfnPTBqckbeVvm8-KJuiQmgWb1vZ'
  },
  {
    name: 'Skoda Kodiaq Sport',
    price: '€2200',
    seats: 7,
    transmission: 'DSG',
    fuel: 'Petrol',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZad-MRk99I_xLgEsUapDQed4eHut7I2G9w_j-fRQbCQzNZ3BAJIKUiiawyDNEARIGjFff02lk32_92E9E2dnjf9Nc1bPMk1nZ98ZXsx6yNtZBUi0PYnGhfkhlUqWtC6H_ZNrm3Wuk3A9hiWXiV7PoZqie-G8HhhGahGQJpzD5s8E661UJX7bF-oCQtVrYvjRoj0lfCYQLdqxmEY6VpIXGCYyf5ra3PDWAIaCP9oU77bIthKR8hAaoVwhgM2k7iQQRqWcnJqAUy-53'
  },
  { name: 'Skoda Kodiaq 4x4', price: '€1800', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: '/images/car3.png' },
  { name: 'Skoda Kodiaq', price: '€1600', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//kodiaq.png' },
  { name: 'Skoda Kodiaq Old', price: '€1200', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//godisq-2.png' },
  { name: 'Skoda Superb Lift Back', price: '€1500', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//superb.png' },
  { name: 'Skoda Octavia SW', price: '€1300', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//octavia.png' },
  { name: 'Skoda Kamiq', price: '€950', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: '/images/skoda_kamiq_perfect.png' },
  { name: 'Dacia Sandero', price: '€600', seats: 5, transmission: 'Manual', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//c4-hatchback-101245.jpg' },
  { name: 'VW Tayron', price: '€1400', seats: 5, transmission: 'DSG', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//tiguan.png' },
  {
    name: 'VW Tiguan',
    price: '€1900',
    seats: 5,
    transmission: 'DSG',
    fuel: 'Petrol',
    img: 'https://easycars.lv/ad_ecars/uploads//tiguan.png'
  },
  { name: 'VW Golf', price: '€1000', seats: 5, transmission: 'DSG', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//tiguan.png' },
  { name: 'Jeep Renegade', price: '€1100', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//tucson.png' },
  { name: 'Citroen C4', price: '€900', seats: 5, transmission: 'Auto', fuel: 'Petrol', img: 'https://easycars.lv/ad_ecars/uploads//c4-hatchback-101245.jpg' },
  {
    name: 'Toyota RAV4',
    price: '€2000',
    seats: 5,
    transmission: 'Auto',
    fuel: 'Hybrid',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4XVDkurui9j7h5qjVNeKsHNvHfPs94XOA8rk-CQXz0Kxe7EA3SqxMGQwfm_qoQSuqHOlX4syatyVToztpjhaMbgZwDncZnPNnsUQ2gkpRFVXYaoOyotLv1926CA_GtXyYFTjp1iQSBTxInYkSqxwrzUz2fH6qx_cNTtXBLVrW1gSM7e8Q5MoyWxsKmKlWPFViyQLcXfdAoVuP2CCYEPujGmuTa7k7AcdzEXl0pua1CQ3B2c5ee6fqyUxJ-bpZDSxuyXiy7lBGrOpy'
  },
  { name: 'Toyota Corolla SW', price: '€1200', seats: 5, transmission: 'Auto', fuel: 'Hybrid', img: 'https://easycars.lv/ad_ecars/uploads//corolla-1.png' },
  { name: 'Toyota Yaris Cross', price: '€1100', seats: 5, transmission: 'Auto', fuel: 'Hybrid', img: 'https://easycars.lv/ad_ecars/uploads//yaris.png' },
  {
    name: 'BMW X4',
    price: '€3200',
    seats: 5,
    transmission: 'Auto',
    fuel: 'Petrol',
    badge: 'Limited',
    img: 'https://easycars.lv/ad_ecars/uploads//bmw.png'
  }
];

export default function LongTerm({ onRent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredCars = longtermCars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const displayedCars = isExpanded ? filteredCars : filteredCars.slice(0, 6);

  return (
    <main className="bg-white text-slate-900 pt-16">
      {/* Hero / Intro Section */}
      <section className="pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-display text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-4 block">Premium Catalog</span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-slate-900 mb-6">Longterm Fleet.</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Experience unparalleled mobility with our curated selection of premium vehicles. Flexible long-term solutions tailored for your lifestyle and business needs.
          </p>
        </div>
      </section>

      {/* Filters / Search Widget */}
      <section className="px-8 mb-16 relative z-20">
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 p-4 rounded-3xl shadow-lg flex flex-wrap md:flex-nowrap items-center gap-4 relative">
          <div className="flex-1 min-w-[200px] flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="material-symbols-outlined text-slate-400">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 w-full text-slate-900 placeholder:text-slate-400" 
              placeholder="Search model..." 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[150px] flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200 cursor-not-allowed opacity-70">
            <span className="material-symbols-outlined text-slate-400">calendar_month</span>
            <span className="text-slate-500 text-sm">Pick-up Date</span>
          </div>
          <button className="w-full md:w-auto bg-primary text-slate-900 px-10 py-3 rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer">
            Search
          </button>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="bg-slate-50 border-t border-slate-100 py-24 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Available Vehicles</h2>
            <div className="flex gap-2">
              <span className="bg-primary/20 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">19 Models</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCars.length > 0 ? (
              displayedCars.map((car, i) => (
                <div key={i} onClick={() => onRent && onRent(car)} className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:scale-105 cursor-pointer relative transition-all duration-300 border border-slate-100">
                  <div className="aspect-[16/10] rounded-2xl bg-[#FFFFFF] overflow-hidden mb-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <img className={`w-full h-full object-contain transition-transform duration-500 ${car.name.includes('Kamiq') ? 'scale-[1.35] group-hover:scale-[1.45]' : 'group-hover:scale-105'}`} src={car.img} alt={car.name} />
                    </div>
                    {car.badge && (
                      <span className={`absolute top-4 ${car.badge === 'Limited' ? 'left-4 bg-slate-900 text-white' : 'right-4 bg-primary text-slate-900'} font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest`}>
                        {car.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{car.name}</h3>
                      <div className="flex gap-3 mt-2 text-slate-500 text-xs">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">airline_seat_recline_extra</span> {car.seats}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">settings_input_component</span> {car.transmission}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">local_gas_station</span> {car.fuel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <span className="text-2xl font-black text-slate-900">{car.price}</span>
                      <span className="text-sm text-slate-400 font-medium"> / monthly</span>
                    </div>
                    <button className="bg-primary text-black font-bold px-6 py-2.5 rounded-xl hover:brightness-110 transition-all relative">
                      Reserve
                      <span className="absolute inset-0 z-20 rounded-xl" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 font-medium">
                No vehicles found matching "{searchTerm}".
              </div>
            )}
          </div>

          {!isExpanded && filteredCars.length > 6 && (
            <div className="mt-20 text-center">
              <p className="text-slate-500 mb-8 font-medium">And {filteredCars.length - 6} more premium models available in our fleet...</p>
              <button 
                onClick={() => setIsExpanded(true)}
                className="border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-full font-black uppercase tracking-widest text-[12px] hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
              >
                View Complete Catalog
              </button>
            </div>
          )}
          
          {isExpanded && filteredCars.length > 6 && (
            <div className="mt-20 text-center">
              <button 
                onClick={() => setIsExpanded(false)}
                className="border-2 border-slate-200 text-slate-500 px-10 py-4 rounded-full font-black uppercase tracking-widest text-[12px] hover:bg-slate-100 transition-all cursor-pointer"
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Premium Feature Section */}
      <section className="py-32 px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden aspect-video bg-slate-100 relative shadow-inner">
             <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-125 pointer-events-none"></div>
             <img className="w-full h-full object-cover mix-blend-multiply drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn8-7bCn1_HscQjTberP9MQ8To2-CeNYazKNeTptNXQMjW_rV91SlKEoIS2PStlooqtPs7wmRvgeTnELFcF9wB75H_SWipz4wrlLIjY1RgRgUJ7-Li3af0iw1vobbJtbU_1v5Qahr5R-NBd7NF3rYaij4exdDuPqFYEi8F6dfJBcAu8-P1dIyzjUbNAmto61h9kP8m-gK4vo2q-JvNCQqGqjkIgyMyH--fxN4RMZmUPPW_iltHlSWSnTdIMFN398Mbsgz8b_OgN7fd" alt="Lexus ES profile" />
          </div>
          <div>
            <span className="font-display text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-4 block">Easycars Concierge</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 text-slate-900">Seamless Mobility as a Service.</h2>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">verified_user</span>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Full Insurance Included</h4>
                  <p className="text-slate-500 text-sm mt-1">Drive with peace of mind with our comprehensive premium coverage.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">support_agent</span>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">24/7 Roadside Assistance</h4>
                  <p className="text-slate-500 text-sm mt-1">Dedicated concierge support whenever and wherever you need it.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">directions_car</span>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Latest Fleet Selection</h4>
                  <p className="text-slate-500 text-sm mt-1">Our vehicles are renewed every 6 months to ensure top performance.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
