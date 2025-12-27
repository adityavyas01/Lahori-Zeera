'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { variants } from '@/lib/variants';
import Loader from '@/components/lahori-zeera/loader';
import ParallaxCanvas from '@/components/lahori-zeera/parallax-canvas';
import TextOverlay from '@/components/lahori-zeera/text-overlay';
import VariantNav from '@/components/lahori-zeera/variant-nav';
import AboutSection from '@/components/lahori-zeera/about-section';
import FlavorsSection from '@/components/lahori-zeera/flavors-section';
import IngredientsSection from '@/components/lahori-zeera/ingredients-section';
import TestimonialsSection from '@/components/lahori-zeera/testimonials-section';
import FaqSection from '@/components/lahori-zeera/faq-section';
import Footer from '@/components/lahori-zeera/footer';
import Header from '@/components/lahori-zeera/header';

const FRAME_COUNT = 192;

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [imageFrames, setImageFrames] = useState<HTMLImageElement[]>([]);
  const [showContent, setShowContent] = useState(false);

  const currentVariant = useMemo(() => variants[currentVariantIndex], [currentVariantIndex]);

  const preloadImages = useCallback(async (variantIndex: number, isInitial: boolean) => {
    if (!isInitial) {
      setIsSwitching(true);
    }
    setLoadingProgress(0);

    const variant = variants[variantIndex];
    const frameUrls = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const frameNumber = String(i).padStart(3, '0');
      return variant.baseImageUrl.replace('frame_000', `frame_${frameNumber}`);
    });

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    await Promise.all(frameUrls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          loadedImages.push(img);
          resolve();
        };
        img.onerror = reject;
      });
    }));

    loadedImages.sort((a, b) => {
        const aFrame = parseInt(a.src.match(/frame_(\d{3})/)?.[1] || '0', 10);
        const bFrame = parseInt(b.src.match(/frame_(\d{3})/)?.[1] || '0', 10);
        return aFrame - bFrame;
    });

    setImageFrames(loadedImages);

    if (isInitial) {
      setIsInitialLoading(false);
      setTimeout(() => setShowContent(true), 500); // Fade in content after loader
    } else {
      setIsSwitching(false);
    }
  }, []);

  useEffect(() => {
    preloadImages(0, true);
  }, [preloadImages]);

  const handleNext = () => {
    const nextIndex = (currentVariantIndex + 1) % variants.length;
    setCurrentVariantIndex(nextIndex);
    preloadImages(nextIndex, false);
  };

  const handlePrev = () => {
    const prevIndex = (currentVariantIndex - 1 + variants.length) % variants.length;
    setCurrentVariantIndex(prevIndex);
    preloadImages(prevIndex, false);
  };

  return (
    <main className={cn('bg-background min-h-screen', currentVariant.themeClass)}>
      {isInitialLoading && <Loader progress={loadingProgress} />}
      
      <div className={cn("transition-opacity duration-1000", showContent ? "opacity-100" : "opacity-0")}>
        <Header />
        
        <div className="relative h-[300vh]">
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
                <ParallaxCanvas imageFrames={imageFrames} />
                
                {isSwitching && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-500">
                        <p className="text-2xl font-headline tracking-widest text-white animate-pulse">Mixing...</p>
                    </div>
                )}

                <div className="absolute inset-0 z-20 grid grid-cols-5 p-8 md:p-12 lg:p-16">
                    <TextOverlay variant={currentVariant} isSwitching={isSwitching} />
                    <div className="col-span-1" />
                    <VariantNav onNext={handleNext} onPrev={handlePrev} currentIndex={currentVariantIndex} />
                </div>
            </div>
        </div>

        <div className="relative z-10 bg-background -mt-[100vh]">
            <AboutSection />
            <FlavorsSection />
            <IngredientsSection />
            <TestimonialsSection />
            <FaqSection />
            <Footer />
        </div>
      </div>
    </main>
  );
}
