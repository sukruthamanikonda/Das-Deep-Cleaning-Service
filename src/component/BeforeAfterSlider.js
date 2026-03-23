import React, { useState } from 'react';

export default function BeforeAfterSlider({ before, after, label }) {
    console.log("images",before,after)
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <div className="w-full mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{label}</h3>
        
         <div 
            className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-xl group select-none cursor-col-resize"
             onMouseMove={handleMouseMove}
             onTouchMove={handleTouchMove}
         >
             <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="after" />
             <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded opacity-80 z-10">AFTER</div>
             
             <div 
                className="absolute inset-0 w-full h-full object-cover overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
             >
                 <img src={before} className="absolute inset-0 w-full h-full object-cover" alt="before" />
                 <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-2 py-1 rounded opacity-80 z-10">BEFORE</div>
             </div>
             
             {/* Slider Handle */}
             <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
             >
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-lg">
                     <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" /></svg>
                 </div>
             </div>
         </div>
    </div>
  );
}