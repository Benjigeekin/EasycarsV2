import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

export const Checkbox = React.forwardRef(({ className, checked, onChange, label, description, price, ...props }, ref) => {
  return (
    <label className={cn("flex items-start xl:items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer group", checked ? "border-primary bg-primary/5" : "border-slate-100 hover:border-primary/30", className)}>
      <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5 xl:mt-0">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-6 h-6 border-2 border-slate-200 rounded-md checked:bg-primary checked:border-primary outline-none focus-visible:ring-4 focus-visible:ring-primary/30 transition-all cursor-pointer"
          {...props}
        />
        <Check strokeWidth={4} className={cn("absolute w-4 h-4 text-slate-900 pointer-events-none transition-transform opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100", checked ? "opacity-100 scale-100" : "")} />
      </div>
      <div className="flex-1 flex flex-col xl:flex-row xl:items-center justify-between gap-1">
        <div>
          <p className={cn("text-sm font-bold transition-colors", checked ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900")}>
            {label}
          </p>
          {description && <p className="text-xs font-medium text-slate-400 mt-0.5">{description}</p>}
        </div>
        {price && (
          <div className="text-xs font-black bg-white px-2 py-1 rounded-md text-slate-900 shadow-sm border border-slate-100 shrink-0">
            {price}
          </div>
        )}
      </div>
    </label>
  );
});

Checkbox.displayName = "Checkbox";
