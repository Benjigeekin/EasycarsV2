import React from 'react';
import { motion } from 'framer-motion';
import {
    SiBmw,
    SiCitroen,
    SiDacia,
    SiFord,
    SiInfiniti,
    SiJeep,
    SiKia,
    SiLandrover,
    SiPorsche,
    SiSkoda,
    SiToyota,
    SiVolkswagen
} from 'react-icons/si';

const LexusIcon = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        {/* Variable thickness ellipse replicating true Lexus depth */}
        <path fillRule="evenodd" clipRule="evenodd" d="M50 14C23 14 7 30 7 50s16 36 43 36 43-16 43-36S77 14 50 14zm0 5c25 0 38 15 38 31S75 81 50 81 12 66 12 50 25 19 50 19z" />
        {/* Calligraphic L matching the high-contrast reference perfectly, now mathematically fused into the right rim */}
        <path d="M54 22h10L44 65h42c-2 6-6 9-11 9H34c-4 0-5-4-3-8l23-44z" />
    </svg>
);

const MercedesIcon = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M50 0C22.386 0 0 22.386 0 50c0 27.614 22.386 50 50 50s50-22.386 50-50C100 22.386 77.614 0 50 0zm0 6C25.699 6 6 25.699 6 50s19.699 44 44 44 44-19.699 44-44S74.301 6 50 6z" />
        <polygon points="50,6 55.5,50 88,71.9 50,56.5 12,71.9 44.5,50" />
    </svg>
);

const BRANDS = [
    { name: 'BMW', icon: SiBmw },
    { name: 'Citroën', icon: SiCitroen },
    { name: 'Dacia', icon: SiDacia },
    { name: 'Ford', icon: SiFord },
    { name: 'Infiniti', icon: SiInfiniti },
    { name: 'Jeep', icon: SiJeep },
    { name: 'Kia', icon: SiKia },
    { name: 'Land Rover', icon: SiLandrover },
    { name: 'Lexus', icon: LexusIcon },
    { name: 'Mercedes-Benz', icon: MercedesIcon },
    { name: 'Porsche', icon: SiPorsche },
    { name: 'Skoda', icon: SiSkoda },
    { name: 'Toyota', icon: SiToyota },
    { name: 'Volkswagen', icon: SiVolkswagen },
];

export default function BrandMarquee() {
    return (
        <section className="py-12 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full mb-8">
                <div className="bg-[#1C1C1C] rounded-[40px] shadow-2xl border border-white/5 py-8 px-6 md:px-12 relative overflow-hidden group">

                    {/* Subtle gradient fades on edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1C1C1C] to-transparent z-20 pointer-events-none rounded-l-[40px]" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1C1C1C] to-transparent z-20 pointer-events-none rounded-r-[40px]" />

                    {/* Marquee Animation */}
                    <motion.div
                        className="flex w-max"
                        animate={{ x: [0, "-50%"] }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {/* 
                          By rendering exactly 2 blocks and applying padding-right equal to the gap, 
                          we completely solve the CSS flex-gap measurement flaw. 
                          Translating exactly -50% will be mathematically invisible.
                        */}
                        {[0, 1].map((blockId) => (
                            <div key={blockId} className="flex gap-16 pr-16 md:gap-24 md:pr-24 items-center">
                                {BRANDS.map((brand, index) => (
                                    <div
                                        key={`${brand.name}-${index}`}
                                        className="flex items-center justify-center shrink-0 group/icon transition-transform duration-300 hover:scale-[1.3] cursor-pointer"
                                        title={brand.name}
                                    >
                                        <brand.icon className="w-auto h-12 text-slate-400 group-hover/icon:text-white transition-colors duration-300" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
