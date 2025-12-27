'use client';

import { type Variant } from "@/lib/variants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TextOverlayProps = {
  variant: Variant;
  isSwitching: boolean;
};

export default function TextOverlay({ variant, isSwitching }: TextOverlayProps) {
  return (
    <div className="col-span-5 md:col-span-3 flex flex-col justify-center h-full relative">
       <div className="absolute inset-0 -left-16 -right-16 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div
        className={cn(
          "space-y-4 md:space-y-6 transition-opacity duration-500 relative z-10",
          isSwitching ? 'opacity-0' : 'opacity-100'
        )}
      >
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white">
          {variant.name}
        </h1>
        <p className="font-body text-lg md:text-xl font-bold uppercase tracking-widest text-primary">
          {variant.subtitle}
        </p>
        <p className="font-body text-base md:text-lg max-w-md text-balance text-white/80">
          {variant.description}
        </p>
        <div className="flex items-center gap-4 pt-4">
          <Button variant="outline" size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-base">
            Find a Store
          </Button>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}
