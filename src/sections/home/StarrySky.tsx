import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
  initialOpacity: number;
  twinklePhase: number;
}

const generateStars = (
  count: number,
  width: number,
  height: number,
  speed: number,
  radius: number
): Star[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius,
    speed,
    initialOpacity: Math.random() * 0.5 + 0.5, // base opacity 0.5 ~ 1.0
    twinklePhase: Math.random() * Math.PI * 2, // phase offset
  }));
};

const StarFieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layers = useRef<Star[][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    layers.current = [
      generateStars(1700, width, height, 0.2, 1),
      generateStars(700, width, height, 0.1, 2),
      generateStars(200, width, height, 0.05, 3),
    ];

    let start = performance.now();

    const draw = (now = performance.now()) => {
      const elapsed = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const stars of layers.current) {
        for (const star of stars) {
          star.y -= star.speed;
          if (star.y < 0) star.y = height + Math.random() * 100;

          const alpha =
            star.initialOpacity + 0.3 * Math.sin(elapsed * 2 + star.twinklePhase);

          ctx.globalAlpha = Math.max(0, Math.min(1, alpha)); // clamp
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default StarFieldCanvas;
