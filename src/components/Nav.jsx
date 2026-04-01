import React from 'react';

export default function Nav({ activePage, onNavigate }) {
  const handleContactClick = () => {
    if (activePage !== 'home') {
      onNavigate('home');
      // allow React rendering cycle to mount the component before scrolling
      setTimeout(() => {
        const el = document.getElementById('contacts');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contacts');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-11/12 max-w-7xl z-50">
      <div className="glass-nav rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 transform transition-transform duration-300 group-hover:scale-110 origin-left">
            Easy<span className="text-primary">cars</span>
          </span>
        </div>
        {/* Links */}
        <div className="hidden md:flex items-center gap-2">
          <a className={`px-4 py-2 rounded-full transform transition-all duration-200 cursor-pointer text-sm font-semibold ${activePage === 'home' ? 'text-primary' : 'text-slate-600 hover:bg-slate-100/80 hover:scale-105 hover:text-slate-900'}`} onClick={() => onNavigate('home')}>Home</a>
          <a className={`px-4 py-2 rounded-full transform transition-all duration-200 cursor-pointer text-sm font-semibold ${activePage === 'fleet' ? 'text-primary' : 'text-slate-600 hover:bg-slate-100/80 hover:scale-105 hover:text-slate-900'}`} onClick={() => onNavigate('fleet')}>Fleet</a>
          <a className={`px-4 py-2 rounded-full transform transition-all duration-200 cursor-pointer text-sm font-semibold ${activePage === 'longterm' ? 'text-primary font-bold' : 'text-slate-600 hover:bg-slate-100/80 hover:scale-105 hover:text-slate-900'}`} onClick={() => onNavigate('longterm')}>Long-term</a>
          <a className={`px-4 py-2 rounded-full transform transition-all duration-200 cursor-pointer text-sm font-semibold text-slate-600 hover:bg-slate-100/80 hover:scale-105 hover:text-slate-900`} onClick={handleContactClick}>Contacts</a>
        </div>
        {/* Action */}
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('fleet')} className="bg-primary px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-md active:scale-95 text-black">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}
