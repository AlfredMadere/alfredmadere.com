import { useRef, useEffect, useState } from "react";

// Particle class for fluid-like behavior (matching original code exactly)
class Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number = 0;
  vy: number = 0;
  ease: number = 0.2;
  friction: number = 0.95;
  dx: number = 0;
  dy: number = 0;
  distance: number = 0;
  force: number = 0;
  angle: number = 0;
  size: number = 1  //Math.random() * 1.2 + 1;
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.originX = x;
    this.originY = y;
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.ctx = ctx;
    this.draw();
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(mouseX: number, mouseY: number, mouseRadius: number) {
    this.dx = mouseX - this.x;
    this.dy = mouseY - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -mouseRadius / this.distance * 3;

    if (this.distance < mouseRadius * mouseRadius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    this.draw();
  }
}

export default function DotPatternAnimated() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 80 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Particle system settings
    const dotSpacing = 16;
    const dotColor = 'rgba(156, 163, 175, 0.6)';

    // Initialize particles
    const particles: Particle[] = [];
    let totalDots = 0;
    for (let x = 0; x < canvas.width; x += dotSpacing) {
      for (let y = 0; y < canvas.height; y += dotSpacing) {
        particles.push(new Particle(x, y, ctx));
        totalDots++;
      }
    }

    // Mouse move handler - directly update ref (no React state)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Add mouse listener to document (global mouse tracking)
    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop matching original approach
    function animate() {
      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set fill style for all particles
      ctx.fillStyle = dotColor;
      
      // Update all particles (each draws itself)
      for (const particle of particles) {
        particle.update(mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    }

    // Start animation loop
    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []); // Empty dependency array - only run once

  return (
    <div className="pointer-events-none absolute inset-0 size-full">
      <canvas ref={canvasRef} className="size-full">
      
      </canvas>
    </div>
  );
}