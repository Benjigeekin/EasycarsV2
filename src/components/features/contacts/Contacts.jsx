import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Building, Send, FileText } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { RentalTermsModal } from './RentalTermsModal';

export function Contacts() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    // In a real application, wire this up to an API
    alert('Thank you! Your inquiry has been sent to the EasyCars team.');
  };

  return (
    <div className="bg-[#f1f5f9] py-24 px-6 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-black tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">Contacts</h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Do you still have questions? Call us or write an email. Our team is always ready to assist you.
          </p>
        </motion.div>

        {/* Content Split */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Contact Data */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Rental Terms Action Trigger */}
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="w-full bg-primary hover:bg-yellow-400 text-slate-900 font-black tracking-widest uppercase p-5 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <FileText className="w-5 h-5 shrink-0" />
              Rental Terms
            </button>

            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
              
              {/* Info Items */}
              <ContactBlock 
                icon={<Clock className="w-5 h-5 text-primary" />}
                title="Schedule of work"
                content={<p className="text-slate-600 font-medium">We work from <strong className="text-slate-900">9:00 till 22:00</strong> 7 days a week!</p>}
              />
              
              <ContactBlock 
                icon={<MapPin className="w-5 h-5 text-primary" />}
                title="Address"
                content={<p className="text-slate-600 font-medium leading-relaxed max-w-sm">Riga RIX international airport. Latvia, LV-1053</p>}
              />
              
              <ContactBlock 
                icon={<Phone className="w-5 h-5 text-primary" />}
                title="Phone (Viber, WhatsApp, Telegram)"
                content={
                  <div className="flex flex-col gap-1">
                    <a href="tel:+37122088777" className="text-lg font-bold text-slate-900 hover:text-primary transition-colors">+371 22088777</a>
                    <a href="tel:+37120000762" className="text-lg font-bold text-slate-900 hover:text-primary transition-colors">+371 20000762</a>
                  </div>
                }
              />
              
              <ContactBlock 
                icon={<Mail className="w-5 h-5 text-primary" />}
                title="E-mail"
                content={<a href="mailto:reservation@easycars.lv" className="text-lg font-bold text-slate-900 hover:text-primary transition-colors hover:underline">reservation@easycars.lv</a>}
              />
            </div>

            {/* Legal Block */}
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 text-slate-400 border border-slate-800 flex gap-6">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-white font-bold tracking-widest uppercase text-xs">Legal Details</h4>
                <div className="text-sm space-y-1">
                  <p><strong className="text-slate-300">Company:</strong> EASYCARS, SIA</p>
                  <p><strong className="text-slate-300">Registration:</strong> 40203141184</p>
                  <p><strong className="text-slate-300">VAT Number:</strong> LV40203141184</p>
                  <p className="pt-2 text-slate-500">Dzirnavu iela 81 - 11, Rīga, LV-1011</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 px-4">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Join us:</span>
              <a href="https://www.instagram.com/easy.cars_riga/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-pink-100 hover:text-pink-600 transition-colors text-slate-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/easycars.lv/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors text-slate-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Send a Message</h3>
            
            <form onSubmit={handleSupportSubmit} className="space-y-6">
              <Input 
                type="text" 
                label="Your Name" 
                placeholder="John Doe" 
                required 
              />
              <Input 
                type="tel" 
                label="Your Phone Number" 
                placeholder="+371 XXXXXXXX" 
                required 
              />
              <Input 
                type="email" 
                label="Your E-mail" 
                placeholder="john@example.com" 
                required 
              />
              <Textarea 
                label="Your Question" 
                placeholder="How can we help you?" 
                rows={5}
                required 
              />
              
              <div className="pt-4">
                <Button size="lg" type="submit" className="w-full gap-2 text-lg py-4 group shadow-xl">
                  Ask a Question
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {isTermsOpen && <RentalTermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// Helper Sub-component
function ContactBlock({ icon, title, content }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
        {icon}
      </div>
      <div className="flex flex-col gap-1 pt-1">
        <h4 className="text-[10px] font-black tracking-widest uppercase text-slate-400">{title}</h4>
        {content}
      </div>
    </div>
  );
}
