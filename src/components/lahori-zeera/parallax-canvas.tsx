'use client';

import { useEffect, useRef, useCallback } from 'react';
import { type Variant, variants } from '@/lib/variants';

type ParallaxCanvasProps = {
  frameCount: number;
  enabled: boolean;
  currentVariant: Variant;
  imageFrames: HTMLImageElement[]; // Only contains the first frame of the first variant initially
};

export default function ParallaxCanvas({ frameCount, enabled, currentVariant, imageFrames }: ParallaxCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndexRef = useRef(0);
  const animationFrameIdRef = useRef<number>();
  const loadedFramesRef = useRef<Record<string, HTMLImageElement[]>>({});

  const getFrameUrl = (variant: Variant, frame: number) => {
    const frameNumber = String(frame).padStart(3, '0');
    return variant.baseImageUrl.replace('frame_000', `frame_${frameNumber}`);
  };

  const drawImageCover = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
  }, []);

  const drawImage = useCallback(async (frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const variantId = currentVariant.id.toString();
    const clampedIndex = Math.max(0, Math.min(frameIndex, frameCount - 1));

    // Check if the variant's frames are loaded
    if (!loadedFramesRef.current[variantId]) {
      loadedFramesRef.current[variantId] = [];
    }

    let image = loadedFramesRef.current[variantId][clampedIndex];

    if (image && image.complete) {
      drawImageCover(ctx, image);
    } else {
      // If the specific frame isn't loaded, load it now
      const img = new Image();
      img.src = getFrameUrl(currentVariant, clampedIndex);
      await new Promise(resolve => { img.onload = resolve; });
      loadedFramesRef.current[variantId][clampedIndex] = img;
      drawImageCover(ctx, img);
    }
  }, [currentVariant, frameCount, drawImageCover]);

  const handleScroll = useCallback(() => {
    if (!enabled) return;
    
    const scrollY = window.scrollY;
    const animationStart = 0;
    const animationDuration = window.innerHeight; 
    
    const scrollFraction = Math.max(0, Math.min(1, (scrollY - animationStart) / animationDuration));
    
    const newFrameIndex = Math.floor(scrollFraction * (frameCount -1));

    if (newFrameIndex !== frameIndexRef.current) {
      frameIndexRef.current = newFrameIndex;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(() => {
        drawImage(frameIndexRef.current);
      });
    }
  }, [enabled, drawImage, frameCount]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawImage(frameIndexRef.current);
    }
  }, [drawImage]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (enabled) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Draw the initial frame of the current variant
    drawImage(frameIndexRef.current);

    // Preload first frame of other variants
    variants.forEach(variant => {
        if (variant.id !== currentVariant.id) {
            const img = new Image();
            img.src = getFrameUrl(variant, 0);
        }
    });


    return () => {
      window.removeEventListener('resize', handleResize);
      if (enabled) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [handleResize, handleScroll, enabled, currentVariant, drawImage]);
  
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
