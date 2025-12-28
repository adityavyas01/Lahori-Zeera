'use client';

import { useEffect, useRef, useCallback } from 'react';
import { type Variant } from '@/lib/variants';

type ParallaxCanvasProps = {
  frameCount: number;
  currentVariant: Variant;
};

export default function ParallaxCanvas({ frameCount, currentVariant }: ParallaxCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndexRef = useRef(0);
  const animationFrameIdRef = useRef<number>();
  const loadedFramesRef = useRef<Record<string, HTMLImageElement[]>>({});

  const getFrameUrl = useCallback((variant: Variant, frame: number) => {
    const frameNumber = String(frame).padStart(3, '0');
    return variant.baseImageUrl.replace('frame_000', `frame_${frameNumber}`);
  }, []);

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

    if (!loadedFramesRef.current[variantId]) {
      loadedFramesRef.current[variantId] = [];
    }

    let image = loadedFramesRef.current[variantId][clampedIndex];

    if (image && image.complete) {
      drawImageCover(ctx, image);
    } else {
      if (clampedIndex === 0) {
        // Always draw the first frame while others load
        const firstFrameImg = new Image();
        firstFrameImg.src = getFrameUrl(currentVariant, 0);
        await new Promise(resolve => { firstFrameImg.onload = resolve; });
        loadedFramesRef.current[variantId][0] = firstFrameImg;
        drawImageCover(ctx, firstFrameImg);
      }
      
      // Load the requested frame in the background if not available
      if (!image) {
        const img = new Image();
        img.src = getFrameUrl(currentVariant, clampedIndex);
        img.onload = () => {
          loadedFramesRef.current[variantId][clampedIndex] = img;
          // Redraw if this is the current frame
          if (clampedIndex === frameIndexRef.current) {
            drawImageCover(ctx, img);
          }
        };
      }
    }
  }, [currentVariant, frameCount, drawImageCover, getFrameUrl]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // The animation happens over the first 200vh of the 300vh container
    const animationDuration = window.innerHeight * 2; 
    const scrollFraction = Math.max(0, Math.min(1, scrollY / animationDuration));
    const newFrameIndex = Math.floor(scrollFraction * (frameCount - 1));

    if (newFrameIndex !== frameIndexRef.current) {
      frameIndexRef.current = newFrameIndex;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(() => {
        drawImage(frameIndexRef.current);
      });
    }
  }, [drawImage, frameCount]);

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Draw the initial frame
    frameIndexRef.current = 0;
    drawImage(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [handleResize, handleScroll, drawImage, currentVariant]);
  
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
