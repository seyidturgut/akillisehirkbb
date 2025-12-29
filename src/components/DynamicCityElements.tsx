import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cloud, Zap } from 'lucide-react';

export const DynamicCityElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.floating-cloud', {
        x: '110vw',
        duration: 60,
        repeat: -1,
        ease: 'none',
        stagger: 5,
      });

      gsap.to('.energy-pulse', {
        scale: 1.3,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
        stagger: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>

      <div className="floating-cloud absolute top-[20%] -left-20 opacity-30">
        <Cloud className="w-16 h-16 text-white" />
      </div>

      <div className="floating-cloud absolute top-[30%] -left-32 opacity-20">
        <Cloud className="w-12 h-12 text-white" />
      </div>

      <div className="floating-cloud absolute top-[15%] -left-24 opacity-25">
        <Cloud className="w-20 h-20 text-white" />
      </div>

      <div className="energy-pulse absolute top-[25%] left-[45%] w-3 h-3 bg-yellow-400 rounded-full" />
      <div className="energy-pulse absolute top-[45%] left-[60%] w-2 h-2 bg-blue-400 rounded-full" />
      <div className="energy-pulse absolute top-[55%] left-[35%] w-2.5 h-2.5 bg-emerald-400 rounded-full" />
    </div>
  );
};
