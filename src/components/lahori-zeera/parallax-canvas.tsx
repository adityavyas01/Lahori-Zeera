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
    
    // We only want this scroll effect for the first part of the page.
    // Let's say the parallax section is 200vh tall.
    const parallaxHeight = window.innerHeight * 2;
    const scrollY = window.scrollY;

    if (scrollY > parallaxHeight) return;

    const scrollFraction = Math.min(1, scrollY / (parallaxHeight - window.innerHeight));
    
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
