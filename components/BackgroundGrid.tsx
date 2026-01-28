import React from 'react';

const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Vertical Lines */}
      <div className="absolute inset-0 flex justify-between px-8 md:px-24 opacity-[0.03]">
        <div className="w-[1px] h-full bg-black"></div>
        <div className="w-[1px] h-full bg-black"></div>
        <div className="w-[1px] h-full bg-black"></div>
        <div className="w-[1px] h-full bg-black"></div>
        <div className="w-[1px] h-full bg-black"></div>
      </div>
      
      {/* Horizontal Grid Pattern - subtle */}
      <div className="absolute inset-0" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
             backgroundSize: '100px 100px',
             backgroundPosition: 'center center',
             opacity: 0.015
           }} 
      />
    </div>
  );
};

export default BackgroundGrid;