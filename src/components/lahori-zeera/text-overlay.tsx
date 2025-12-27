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
    <div className="flex-grow md:col-span-3 flex flex-col justify-center h-full relative text-center md:text-left p-4 sm:p-6">
      <div
        className={cn(
          "space-y-2 sm:space-y-4 md:space-y-6 transition-opacity duration-500 relative z-10 @container/text",
          isSwitching ? 'opacity-0' : 'opacity-100'
        )}
        style={{ 
          textShadow: '0 0 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)'
        }}
      >
        <h1 className="font-headline text-5xl @[300px]:text-7xl @md:text-8xl @lg:text-9xl font-bold uppercase tracking-tighter text-white">
          {variant.name}
        </h1>
        <p className="font-body text-base @sm:text-lg @md:text-xl font-bold uppercase tracking-widest" style={{ color: variant.themeColor}}>
          {variant.subtitle}
        </p>
        <p className="font-body text-sm @sm:text-base @md:text-lg max-w-md text-balance text-white/90 mx-auto md:mx-0">
          {variant.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
          <Button variant="outline" size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-sm sm:text-base w-full sm:w-auto">
            Find a Store
          </Button>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-sm sm:text-base w-full sm:w-auto">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}
