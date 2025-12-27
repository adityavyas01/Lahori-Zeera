'use client';

import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

type VariantNavProps = {
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
};

export default function VariantNav({ onNext, onPrev, currentIndex }: VariantNavProps) {
  const index = (currentIndex + 1).toString().padStart(2, '0');

  return (
    <div className="flex-shrink-0 md:col-span-1 flex md:flex-col items-center justify-center h-full pt-8 md:pt-0">
      <div className="flex md:flex-col items-center gap-4 text-white">
        <Button onClick={onPrev} variant="ghost" size="icon" className="rounded-full border border-white/20 h-10 w-10 md:h-12 md:w-12 hover:bg-white/10">
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <span className="font-mono text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-primary order-first md:order-none">
          {index}
        </span>
        <Button onClick={onNext} variant="ghost" size="icon" className="rounded-full border border-white/20 h-10 w-10 md:h-12 md:w-12 hover:bg-white/10">
          <ArrowDown className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
