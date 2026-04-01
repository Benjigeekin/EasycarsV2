import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const buttonVariants = {
  primary: "bg-primary text-slate-900 shadow-lg hover:brightness-110",
  secondary: "bg-slate-900 text-white shadow-lg hover:bg-slate-800",
  outline: "border-2 border-slate-200 bg-transparent text-slate-900 hover:border-primary hover:bg-primary/5",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
};

const buttonSizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
  icon: "p-3",
};

export const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  asChild = false,
  ...props 
}, ref) => {
  const compClass = cn(
    "inline-flex items-center justify-center rounded-full font-bold tracking-widest uppercase transition-colors outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:pointer-events-none",
    buttonVariants[variant],
    buttonSizes[size],
    className
  );

  return (
    <motion.button
      ref={ref}
      className={compClass}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";
