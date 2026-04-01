import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Select = React.forwardRef(({ className, icon, label, options = [], value, onChange, placeholder = "Select an option", ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="flex flex-col w-full group relative" ref={containerRef}>
      {label && (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 transition-colors group-focus-within:text-slate-600">
          {label}
        </label>
      )}
      <div 
        className="relative w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary pointer-events-none z-10">
            {icon}
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            "w-full bg-slate-50 border-2 focus:border-primary/20 focus:ring-4 focus:ring-primary/10 rounded-[1rem] text-sm font-medium outline-none transition-all py-3 flex items-center justify-between",
            isOpen ? "border-primary/30 ring-4 ring-primary/10" : "border-transparent",
            icon ? "pl-12 pr-10" : "px-4 pr-10",
            !selectedOption ? "text-slate-400" : "text-slate-900",
            className
          )}
          {...props}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-primary">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 z-[60] max-h-64 overflow-y-auto custom-scrollbar origin-top"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors flex items-center justify-between",
                  value === option.value 
                    ? "bg-primary/10 text-slate-900" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className="truncate pr-4">{option.label}</span>
                {value === option.value && <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={3} />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Select.displayName = "Select";
