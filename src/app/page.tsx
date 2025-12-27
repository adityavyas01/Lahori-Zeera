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

  const preloadImages = useCallback(async (variantIndex: number) => {
    setIsSwitching(true);
    
    const variant = variants[variantIndex];
    const firstFrameImg = new Image();
    firstFrameImg.src = getFrameUrl(variant, 0);
    
    await new Promise(resolve => {
        firstFrameImg.onload = resolve;
    });

    setCurrentVariantIndex(variantIndex);
    
    // Don't lazy load for desktop animation, handle it in initialLoad
    if (!isMobile) {
      // The initialLoad function already handles lazy loading all frames for desktop
      // We just need to switch the index.
      setIsSwitching(false);
      return;
    }
    
    // For mobile, we just load the one hero image which is now in variants.ts
    // The actual image is loaded by the MobileHero component.
    setIsSwitching(false);

  }, [isMobile]);

  const initialLoad = useCallback(async () => {
    setIsInitialLoading(true);
    
    // For mobile, we don't need the animation frames, just the hero image
    if (isMobile) {
        // Preload the first variant's hero image for mobile
        const heroImg = new Image();
        heroImg.src = variants[0].heroImage;
        await new Promise(resolve => { heroImg.onload = resolve; });
        
        setIsInitialLoading(false);
        setShowContent(true);
        setAreAllFramesLoaded(true); // Not really, but enables content
        return;
    }

    // For desktop, load the first frame of the first variant
    const firstFrameImg = new Image();
    firstFrameImg.src = getFrameUrl(variants[0], 0);
    await new Promise(resolve => {
      firstFrameImg.onload = resolve;
    });

    setImageFrames([firstFrameImg]);
    setIsInitialLoading(false);
    setTimeout(() => setShowContent(true), 500);

    // Then lazy-load ALL frames for ALL variants for seamless switching
    const allFramePromises: Promise<HTMLImageElement>[] = [];
    variants.forEach(variant => {
        for (let i = 1; i < FRAME_COUNT; i++) {
            const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.src = getFrameUrl(variant, i);
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
            allFramePromises.push(promise);
        }
    });

    await Promise.all(allFramePromises);
    
    // This sorting step is no longer necessary as we just need to know they're all loaded
    setAreAllFramesLoaded(true);

  }, [isMobile]);


  useEffect(() => {
    initialLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]); // Rerun if the user resizes across the mobile breakpoint

  const handleVariantChange = (newIndex: number) => {
    if (newIndex === currentVariantIndex || isSwitching) return;
    
    if (isMobile) {
        setIsSwitching(true);
        const nextVariant = variants[newIndex];
        const heroImg = new Image();
        heroImg.src = nextVariant.heroImage;
        heroImg.onload = () => {
            setCurrentVariantIndex(newIndex);
            setIsSwitching(false);
        }
    } else {
        preloadImages(newIndex);
    }
  }

  const DesktopView = () => (
    <div className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            <ParallaxCanvas imageFrames={imageFrames} frameCount={FRAME_COUNT} enabled={areAllFramesLoaded} currentVariant={currentVariant}/>
            
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

  if (isMobile === undefined) {
    return <Loader progress={100} />;
  }

  return (
    <>
      {isInitialLoading && <Loader progress={100} />}
      
      <main className={cn('bg-background min-h-screen', currentVariant.themeClass, (isInitialLoading || !showContent) ? "opacity-0" : "opacity-100 transition-opacity duration-1000")}>
        <Header />
        
        {isMobile 
            ? <MobileHero 
                variant={currentVariant}
                onSelectVariant={handleVariantChange} 
                isSwitching={isSwitching}
              />
            : <DesktopView />
        }

        <div className={cn("relative z-10 bg-background", isMobile ? "" : "-mt-[100vh]")}>
            <AboutSection />
            <FlavorsSection />
            <IngredientsSection />
            <TestimonialsSection />
            <FaqSection />
            <Footer />
        </div>
      </main>
    </>
  );
}
