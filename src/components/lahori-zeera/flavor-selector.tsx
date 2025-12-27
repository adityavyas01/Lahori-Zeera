'use client';

import { variants } from "@/lib/variants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type FlavorSelectorProps = {
  onSelect: (index: number) => void;
  currentIndex: number;
  direction?: 'vertical' | 'horizontal';
};

export default function FlavorSelector({ onSelect, currentIndex, direction = 'vertical' }: FlavorSelectorProps) {
    const containerClasses = direction === 'vertical' 
        ? "flex-col justify-center items-end text-right" 
        : "flex-row justify-center items-center gap-4";

    const itemClasses = direction === 'vertical' ? "justify-end" : "justify-center";

  return (
    <div className={cn("col-span-1 flex h-full text-white", containerClasses)}>
      <AnimatePresence>
        {variants.map((variant, index) => (
          <motion.div
            key={variant.id}
            onClick={() => onSelect(index)}
            className={cn("flex cursor-pointer items-center gap-4 text-white/50 transition-all duration-300 hover:text-white", itemClasses)}
            animate={{
              opacity: currentIndex === index ? 1 : 0.5,
              x: currentIndex === index && direction === 'horizontal' ? 0 : (direction === 'horizontal' ? (index < currentIndex ? -10 : 10) : 0),
              y: currentIndex === index && direction === 'vertical' ? 0 : (direction === 'vertical' ? (index < currentIndex ? -10 : 10) : 0),
              scale: currentIndex === index ? 1 : 0.95
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {direction === 'vertical' && (
              <span className={cn(
                "font-headline text-2xl font-bold transition-all duration-300",
                currentIndex === index ? "text-primary" : ""
              )}>
                {variant.name}
              </span>
            )}
            <motion.div
              className="h-1 w-12 rounded-full bg-white transition-all duration-300"
              animate={{
                width: currentIndex === index ? (direction === 'vertical' ? '4rem' : '3rem') : '1.5rem',
                backgroundColor: currentIndex === index ? variant.themeColor : "rgba(255, 255, 255, 0.5)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
