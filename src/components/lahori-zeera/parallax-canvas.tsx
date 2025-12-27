'use client';

import { useEffect, useRef, useCallback } from 'react';

type ParallaxCanvasProps = {
  imageFrames: HTMLImageElement[];
  frameCount: number;
  enabled: boolean;
};

export default function ParallaxCanvas({ imageFrames, frameCount, enabled }: ParallaxCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndexRef = useRef(0);
  const animationFrameIdRef = useRef<number>();

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

  const drawImage = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || imageFrames.length === 0) return;
    
    const clampedIndex = Math.max(0, Math.min(frameIndex, imageFrames.length - 1));
    const image = imageFrames[clampedIndex];

    if (image && image.complete) {
      drawImageCover(ctx, image);
    }
  }, [imageFrames, drawImageCover]);

  const handleScroll = useCallback(() => {
    if (!enabled || !imageFrames.length) return;
    
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
  }, [enabled, imageFrames.length, drawImage, frameCount]);

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

    if (imageFrames.length > 0) {
        drawImage(frameIndexRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (enabled) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [handleResize, handleScroll, imageFrames, enabled]);
  
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
