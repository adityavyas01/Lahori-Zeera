'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
import { useIsMobile } from '@/hooks/use-mobile';
import MobileHero from '@/components/lahori-zeera/mobile-hero';

const FRAME_COUNT = 192;

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [imageFrames, setImageFrames] = useState<HTMLImageElement[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [areAllFramesLoaded, setAreAllFramesLoaded] = useState(false);
  const isMobile = useIsMobile();

  const currentVariant = useMemo(() => variants[currentVariantIndex], [currentVariantIndex]);

  const getFrameUrl = (variant: typeof variants[0], frame: number) => {
    const frameNumber = String(frame).padStart(3, '0');
    return variant.baseImageUrl.replace('frame_000', `frame_${frameNumber}`);
  };

  const preloadImages = useCallback(async (variantIndex: number, isInitial: boolean) => {
    if (!isInitial) {
      setIsSwitching(true);
    } else if (isInitial) {
      setIsInitialLoading(true);
    }
    setLoadingProgress(0);
    setAreAllFramesLoaded(false);

    const variant = variants[variantIndex];
    
    const firstFrameImg = new Image();
    firstFrameImg.src = getFrameUrl(variant, 0);
    
    await new Promise(resolve => {
        firstFrameImg.onload = resolve;
    });

    if (isInitial) {
      setLoadingProgress(1); // Indicate that the first frame is loaded
      setIsInitialLoading(false);
      setImageFrames([firstFrameImg]);
      setTimeout(() => setShowContent(true), 500);
    } else {
      setImageFrames([firstFrameImg]);
    }
    
    // Don't lazy load on mobile, we only need the first frame
    if (isMobile) {
      setImageFrames([firstFrameImg]);
      setAreAllFramesLoaded(true);
      if (!isInitial) setIsSwitching(false);
      return;
    }

    // Lazy load remaining frames for desktop
    const frameUrls = Array.from({ length: FRAME_COUNT - 1 }, (_, i) => getFrameUrl(variant, i + 1));
    const loadedImages: HTMLImageElement[] = [firstFrameImg];
    let loadedCount = 1;

    const promises = frameUrls.map(url => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if(isInitial) {
            setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          }
          resolve(img);
        };
        img.onerror = reject;
      });
    });

    const remainingImages = await Promise.all(promises);
    loadedImages.push(...remainingImages);

    loadedImages.sort((a, b) => {
        const aFrame = parseInt(a.src.match(/frame_(\d{3})/)?.[1] || '0', 10);
        const bFrame = parseInt(b.src.match(/frame_(\d{3})/)?.[1] || '0', 10);
        return aFrame - bFrame;
    });

    setImageFrames(loadedImages);
    setAreAllFramesLoaded(true);

    if (!isInitial) {
      setIsSwitching(false);
    }
  }, [isMobile]);

  useEffect(() => {
    preloadImages(0, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVariantChange = (newIndex: number) => {
    if (newIndex === currentVariantIndex || isSwitching) return;
    setCurrentVariantIndex(newIndex);
    preloadImages(newIndex, false);
  }

  const DesktopView = () => (
    <div className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            <ParallaxCanvas imageFrames={imageFrames} frameCount={FRAME_COUNT} enabled={areAllFramesLoaded} />
            
            {isSwitching && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-500">
                    <p className="text-2xl font-headline tracking-widest text-white animate-pulse">Mixing...</p>
                </div>
            )}

            <div className="absolute inset-0 z-20 grid grid-cols-5 p-8 md:p-12 lg:p-16">
                <TextOverlay variant={currentVariant} isSwitching={isSwitching} />
                <div className="col-span-1" />
                <FlavorSelector onSelect={handleVariantChange} currentIndex={currentVariantIndex} />
            </div>
        </div>
    </div>
  );

  return (
    <main className={cn('bg-background min-h-screen', currentVariant.themeClass)}>
      {isInitialLoading && <Loader progress={loadingProgress} />}
      
      <div className={cn("transition-opacity duration-1000", showContent ? "opacity-100" : "opacity-0")}>
        <Header />
        
        {isMobile !== undefined && (
          isMobile 
            ? <MobileHero 
                variant={currentVariant} 
                firstFrame={imageFrames[0]} 
                onSelectVariant={handleVariantChange} 
                isSwitching={isSwitching}
              />
            : <DesktopView />
        )}

        <div className={cn("relative z-10 bg-background", isMobile ? "" : "-mt-[100vh]")}>
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
