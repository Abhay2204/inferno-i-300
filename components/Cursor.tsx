import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Store mouse position without triggering render
    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Update cursor position using RAF for smooth 60fps
    const updateCursorPosition = () => {
      if (cursor) {
        cursor.style.left = `${mousePos.current.x}px`;
        cursor.style.top = `${mousePos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    rafRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{ 
        transform: 'translate(-50%, -50%)',
        willChange: 'transform'
      }}
    >
      {/* Crosshair */}
      <div className="relative w-6 h-6">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-white -translate-x-1/2" />
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 h-[2px] w-full bg-white -translate-y-1/2" />
        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default Cursor;