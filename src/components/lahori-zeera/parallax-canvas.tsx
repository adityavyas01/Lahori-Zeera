'use client';

import { useEffect, useRef, useCallback } from 'react';

type ParallaxCanvasProps = {
  imageFrames: HTMLImageElement[];
};

export default function ParallaxCanvas({ imageFrames }: ParallaxCanvasProps) {
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
    const image = imageFrames[frameIndex];
    if (ctx && image && image.complete) {
      drawImageCover(ctx, image);
    }
  }, [imageFrames, drawImageCover]);

  const handleScroll = useCallback(() => {
    if (!imageFrames.length) return;
    
    // The parallax section is 300vh tall.
    const parallaxHeight = window.innerHeight * 3;
    const scrollY = window.scrollY;

    if (scrollY > parallaxHeight) return;

    // The animation should happen over the middle 100vh of the 300vh scroll.
    // It starts after scrolling 100vh and ends after scrolling 200vh.
    const animationStart = window.innerHeight;
    const animationEnd = window.innerHeight * 2;
    const animationDuration = animationEnd - animationStart;

    const scrollFraction = Math.max(0, Math.min(1, (scrollY - animationStart) / animationDuration));
    
    const newFrameIndex = Math.min(
      imageFrames.length - 1,
      Math.floor(scrollFraction * imageFrames.length)
    );

    if (newFrameIndex !== frameIndexRef.current) {
      frameIndexRef.current = newFrameIndex;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(() => {
        drawImage(frameIndexRef.current);
      });
    }
  }, [imageFrames.length, drawImage]);

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

    if (imageFrames.length > 0) {
        drawImage(0);
        frameIndexRef.current = 0;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [handleResize, handleScroll, imageFrames]);
  
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
