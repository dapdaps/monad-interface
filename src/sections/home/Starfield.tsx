import React, { useRef, useEffect, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  o: string;
}

interface StarfieldProps {
  className?: string;
  numStars?: number;
  speed?: number;
}

const Starfield: React.FC<StarfieldProps> = ({ 
  className = '',
  numStars = 1900,
  speed = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const animateRef = useRef(true);

  const initializeStars = useCallback((canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    starsRef.current = [];
    for (let i = 0; i < numStars; i++) {
      const star: Star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: '0.' + Math.floor(Math.random() * 99) + 1
      };
      starsRef.current.push(star);
    }
  }, [numStars]);

  const moveStars = useCallback((canvas: HTMLCanvasElement) => {
    for (let i = 0; i < numStars; i++) {
      const star = starsRef.current[i];
      star.z -= speed;
      
      if (star.z <= 0) {
        star.z = canvas.width;
      }
    }
  }, [numStars, speed]);

  const drawStars = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const radius = '0.' + Math.floor(Math.random() * 9) + 1;
    const focalLength = canvas.width * 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Resize canvas to match window dimensions
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars(canvas);
    }
    
    // Clear canvas and set background
    ctx.fillStyle = "#141476";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = `rgba(209, 255, 255, ${radius})`;
    for (let i = 0; i < numStars; i++) {
      const star = starsRef.current[i];
      
      const pixelX = (star.x - centerX) * (focalLength / star.z) + centerX;
      const pixelY = (star.y - centerY) * (focalLength / star.z) + centerY;
      const pixelRadius = 1 * (focalLength / star.z);
      
      ctx.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
      ctx.fillStyle = `rgba(209, 255, 255, ${star.o})`;
    }
  }, [numStars, initializeStars]);

  const executeFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (animateRef.current) {
      animationIdRef.current = requestAnimationFrame(() => executeFrame(canvas, ctx));
      moveStars(canvas);
      drawStars(canvas, ctx);
    }
  }, [moveStars, drawStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars
    initializeStars(canvas);

    // Start animation
    animateRef.current = true;
    executeFrame(canvas, ctx);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars(canvas);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      animateRef.current = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeStars, executeFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-0 ${className}`}
    />
  );
};

export default Starfield;
