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
    <div className="col-span-1 flex flex-col items-end justify-center h-full">
      <div className="flex flex-col items-center gap-4 md:gap-6 text-white">
        <Button onClick={onPrev} variant="ghost" size="icon" className="rounded-full border border-white/20 h-12 w-12 hover:bg-white/10">
          <ArrowUp className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <span className="font-mono text-5xl md:text-7xl font-bold tracking-tighter text-primary">
          {index}
        </span>
        <Button onClick={onNext} variant="ghost" size="icon" className="rounded-full border border-white/20 h-12 w-12 hover:bg-white/10">
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
