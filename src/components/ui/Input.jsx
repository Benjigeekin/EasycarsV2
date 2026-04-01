import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef(({ className, icon, label, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full group">
      {label && (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 transition-colors group-focus-within:text-slate-600">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/10 rounded-[1rem] text-sm text-slate-900 font-medium placeholder:text-slate-400 outline-none transition-all py-3",
            icon ? "pl-12 pr-4" : "px-4",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";
