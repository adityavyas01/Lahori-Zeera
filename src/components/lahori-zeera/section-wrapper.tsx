'use client';

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type SectionWrapperProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

export default function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id={id} 
      className={cn(
        "w-full flex flex-col justify-center snap-start snap-always",
        "min-h-screen py-20 md:py-28 lg:py-32",
        className
      )}
    >
      <motion.div
        ref={ref}
        className="container mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
