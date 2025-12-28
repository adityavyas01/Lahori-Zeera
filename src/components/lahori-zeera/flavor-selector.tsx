'use client';

import { variants } from "@/lib/variants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type FlavorSelectorProps = {
  onSelect: (index: number) => void;
  currentIndex: number;
};

export default function FlavorSelector({ onSelect, currentIndex }: FlavorSelectorProps) {

  return (
    <div className={cn("col-span-1 flex flex-col md:flex-col justify-end md:justify-center items-center md:items-end text-right h-full")}>
      <AnimatePresence>
        {variants.map((variant, index) => (
          <motion.div
            key={variant.id}
            onClick={() => onSelect(index)}
            className={cn(
              "flex items-center gap-4 text-white/50 transition-all duration-300 hover:text-white cursor-pointer",
              "md:justify-end flex-row md:flex-row mb-2 md:mb-0" // Horizontal on mobile, stays horizontal on md
            )}
            animate={{
              opacity: currentIndex === index ? 1 : 0.5,
              scale: currentIndex === index ? 1 : 0.95
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className={cn(
                "hidden md:inline font-headline text-2xl font-bold transition-all duration-300",
                currentIndex === index ? "text-primary" : ""
            )}>
                {variant.name}
            </span>
            <motion.div
              className="h-1 w-12 rounded-full bg-white transition-all duration-300"
              animate={{
                width: currentIndex === index ? '3rem' : '1.5rem',
                backgroundColor: currentIndex === index ? variant.themeColor : "rgba(255, 255, 255, 0.5)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
