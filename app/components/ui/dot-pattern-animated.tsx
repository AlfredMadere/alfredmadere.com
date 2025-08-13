import { useRef, useEffect, useState } from "react";

export default function DotPatternAnimated() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // Start off-screen
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get the 2D drawing context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match its display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Dot pattern settings
    const dotSpacing = 16;
    const dotRadius = 1;
    const normalColor = 'rgba(156, 163, 175, 0.8)';
    const hoverColor = 'rgba(156, 163, 175, 0.8)';
    const hoverRadius = 100;
    const magneticStrength = 0.3; // How strong the magnetic pull is (0-1)

    // Create static background with all dots
    const backgroundCanvas = document.createElement('canvas');
    const backgroundCtx = backgroundCanvas.getContext('2d')!;
    backgroundCanvas.width = canvas.width;
    backgroundCanvas.height = canvas.height;

    // Draw static background once
    backgroundCtx.fillStyle = normalColor;
    backgroundCtx.beginPath();
    let totalDots = 0;
    for (let x = 0; x < canvas.width; x += dotSpacing) {
      for (let y = 0; y < canvas.height; y += dotSpacing) {
        totalDots++;
        backgroundCtx.moveTo(x + dotRadius, y);
        backgroundCtx.arc(x, y, dotRadius, 0, Math.PI * 2);
      }
    }
    backgroundCtx.fill();

    let lastMousePos = { x: -1000, y: -1000 };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setMousePos(newPos);
    };

    // Add mouse listener
    canvas.addEventListener('mousemove', handleMouseMove);

    // Optimized draw function - only redraws affected areas
    function draw() {
      if (!canvas || !ctx) return;

      // Only redraw if mouse moved significantly
      const mouseMoved = Math.abs(mousePos.x - lastMousePos.x) > 2 || 
                        Math.abs(mousePos.y - lastMousePos.y) > 2;

      if (mouseMoved || lastMousePos.x === -1000) {
        // Clear and redraw background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundCanvas, 0, 0);

        // Calculate bounds for animated area
        const minX = Math.max(0, Math.floor((mousePos.x - hoverRadius) / dotSpacing) * dotSpacing);
        const maxX = Math.min(canvas.width, Math.ceil((mousePos.x + hoverRadius) / dotSpacing) * dotSpacing);
        const minY = Math.max(0, Math.floor((mousePos.y - hoverRadius) / dotSpacing) * dotSpacing);
        const maxY = Math.min(canvas.height, Math.ceil((mousePos.y + hoverRadius) / dotSpacing) * dotSpacing);

        // Clear the area where we'll draw animated dots (with some padding)
        const padding = dotRadius + 2;
        ctx.clearRect(
          minX - padding, 
          minY - padding, 
          maxX - minX + padding * 2, 
          maxY - minY + padding * 2
        );

        // Redraw ALL dots in the cleared rectangle
        let animatedDots = 0;
        let staticDots = 0;
        const hoverRadiusSquared = hoverRadius * hoverRadius;

        // First pass: draw static (normal) dots
        ctx.fillStyle = normalColor;
        ctx.beginPath();
        for (let x = minX; x <= maxX; x += dotSpacing) {
          for (let y = minY; y <= maxY; y += dotSpacing) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distanceSquared = dx * dx + dy * dy;
            
            // Draw static dot if it's NOT in the magnetic field
            if (distanceSquared >= hoverRadiusSquared) {
              staticDots++;
              ctx.moveTo(x + dotRadius, y);
              ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            }
          }
        }
        ctx.fill();

        // Second pass: draw animated (magnetic) dots with smooth falloff
        ctx.fillStyle = hoverColor;
        ctx.beginPath();
        for (let x = minX; x <= maxX; x += dotSpacing) {
          for (let y = minY; y <= maxY; y += dotSpacing) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Apply magnetic force to ALL dots in the area, with smooth falloff
            if (distance < hoverRadius) {
              animatedDots++;
              
              // Maximum smoothness using smootherstep (quintic polynomial)
              const normalizedDistance = distance / hoverRadius; // 0 to 1
              const t = 1 - normalizedDistance; // Flip so 1 = center, 0 = edge
              const smoothFalloff = t * t * t * (t * (t * 6 - 15) + 10); // Smootherstep: 6t⁵ - 15t⁴ + 10t³
              const force = magneticStrength * smoothFalloff;
              
              // Calculate new position pulled toward mouse
              const pullX = dx * force;
              const pullY = dy * force;
              const newX = x + pullX;
              const newY = y + pullY;
              
              // Draw dot at magnetically attracted position
              ctx.moveTo(newX + dotRadius, newY);
              ctx.arc(newX, newY, dotRadius, 0, Math.PI * 2);
            }
          }
        }
        ctx.fill();

        // Draw debug info
        ctx.fillStyle = 'white';
        ctx.font = '16px monospace';
        ctx.fillText(`Total: ${totalDots} | Static: ${staticDots} | Animated: ${animatedDots}`, 10, 25);

        lastMousePos = { ...mousePos };
      }

      animationIdRef.current = requestAnimationFrame(draw);
    }

    // Start animation loop
    draw();

    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div className="absolute inset-0 size-full">
      <canvas ref={canvasRef} className="size-full">
      
      </canvas>
    </div>
  );
}