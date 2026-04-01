import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { SmartSearchWidget } from './features/search/SmartSearchWidget';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Content */}
        <div className="space-y-8 z-20">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/20 text-slate-900 px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Premium Experience Guaranteed</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Rent a car, not a <span className="text-primary">compromise.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg text-slate-500 max-w-lg leading-relaxed">
            Experience unparalleled comfort and performance with our elite collection of high-end vehicles. From business travel to weekend escapes.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <SmartSearchWidget />
          </motion.div>
        </div>

        {/* Right Content */}
        <motion.div 
          variants={itemVariants}
          className="relative flex justify-center items-center z-10"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-125 -z-10"></div>
          <img alt="Premium White SUV" className="w-full h-auto object-contain drop-shadow-2xl translate-x-4 scale-110" src="/images/hero-car.jpg" />
        </motion.div>
      </motion.div>
    </section>
  );
}
