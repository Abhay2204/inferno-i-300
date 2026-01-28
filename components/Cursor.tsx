import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{ transform: 'translate(-50%, -50%)' }}
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