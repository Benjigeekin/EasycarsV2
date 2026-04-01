import React from "react";
import { cn } from "../../lib/utils";

export const Textarea = React.forwardRef(({ className, label, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full group">
      {label && (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 transition-colors group-focus-within:text-slate-600">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/10 rounded-[1rem] p-4 text-sm text-slate-900 font-medium placeholder:text-slate-400 outline-none transition-all resize-y min-h-[100px]",
          className
        )}
        {...props}
      />
    </div>
  );
});

Textarea.displayName = "Textarea";
