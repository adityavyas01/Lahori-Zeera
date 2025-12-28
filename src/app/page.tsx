'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { variants } from '@/lib/variants';
import Loader from '@/components/lahori-zeera/loader';
import ParallaxCanvas from '@/components/lahori-zeera/parallax-canvas';
import TextOverlay from '@/components/lahori-zeera/text-overlay';
import AboutSection from '@/components/lahori-zeera/about-section';
import FlavorsSection from '@/components/lahori-zeera/flavors-section';
import IngredientsSection from '@/components/lahori-zeera/ingredients-section';
import TestimonialsSection from '@/components/lahori-zeera/testimonials-section';
import FaqSection from '@/components/lahori-zeera/faq-section';
import Footer from '@/components/lahori-zeera/footer';
import Header from '@/components/lahori-zeera/header';
import FlavorSelector from '@/components/lahori-zeera/flavor-selector';

const FRAME_COUNT = 192;

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const currentVariant = useMemo(() => variants[currentVariantIndex], [currentVariantIndex]);

  const initialLoad = useCallback(async () => {
    setIsInitialLoading(true);

    const firstFrameImg = new Image();
    const frameUrl = variants[0].baseImageUrl.replace('frame_000', `frame_${String(0).padStart(3, '0')}`);
    firstFrameImg.src = frameUrl;
    
    await new Promise(resolve => {
      firstFrameImg.onload = resolve;
    });

    setIsInitialLoading(false);
    setTimeout(() => setShowContent(true), 500);
  }, []);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  const handleVariantChange = (newIndex: number) => {
    if (newIndex === currentVariantIndex || isSwitching) return;
    
    setIsSwitching(true);
    setCurrentVariantIndex(newIndex);
    
    // Give time for the new canvas to be ready with the first frame
    setTimeout(() => {
      setIsSwitching(false);
    }, 500); 
  }

  return (
    <>
      {isInitialLoading && <Loader progress={100} />}
      
      <main className={cn('bg-background min-h-screen', currentVariant.themeClass, (isInitialLoading || !showContent) ? "opacity-0" : "opacity-100 transition-opacity duration-1000")}>
        <Header />
        
        <div className="relative h-[300vh] snap-start">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ParallaxCanvas frameCount={FRAME_COUNT} currentVariant={currentVariant} />
                
                {isSwitching && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-500">
                        <p className="text-2xl font-headline tracking-widest text-white animate-pulse">Mixing...</p>
                    </div>
                )}

                <div className="absolute inset-0 z-20 grid grid-cols-1 md:grid-cols-5 p-8 md:p-12 lg:p-16">
                    <TextOverlay variant={currentVariant} isSwitching={isSwitching} />
                    <div className="hidden md:block col-span-1" />
                    <FlavorSelector onSelect={handleVariantChange} currentIndex={currentVariantIndex} />
                </div>
            </div>
        </div>

        <div className="relative z-10 bg-background snap-start">
            <AboutSection />
        </div>
        <div className="snap-start">
            <FlavorsSection />
        </div>
        <div className="snap-start">
            <IngredientsSection />
        </div>
        <div className="snap-start">
            <TestimonialsSection />
        </div>
        <div className="snap-start">
            <FaqSection />
        </div>
        <div className="snap-start">
            <Footer />
        </div>
      </main>
    </>
  );
}
