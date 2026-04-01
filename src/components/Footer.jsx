import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Easy<span className="text-primary">cars</span>
          </span>
        </div>
        <div className="flex gap-8 text-sm font-semibold text-slate-500">
          <a className="hover:text-primary transition-colors" href="#">Terms</a>
          <a className="hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="hover:text-primary transition-colors" href="#">Insurance</a>
          <a className="hover:text-primary transition-colors" href="#">Contact</a>
        </div>
        <p className="text-sm text-slate-400">© 2026 EasyCars Rental. All rights reserved.</p>
      </div>
    </footer>
  );
}
