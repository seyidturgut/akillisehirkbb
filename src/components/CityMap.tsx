import React, { useState } from 'react';
import { CityZone as CityZoneComponent } from './CityZone';
import { HoverCard } from './HoverCard';
import { ConnectionPaths } from './ConnectionPaths';
import { DynamicCityElements } from './DynamicCityElements';
import { CityZone as CityZoneType } from '../lib/supabase';

interface CityMapProps {
  zones: CityZoneType[];
  activeZoneIndex?: number;
  onZoneClick: (zone: CityZoneType) => void;
}

export const CityMap: React.FC<CityMapProps> = ({ zones, activeZoneIndex = 0, onZoneClick }) => {
  const [hoveredZone, setHoveredZone] = useState<CityZoneType | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
      <ConnectionPaths zones={zones} activeIndex={activeZoneIndex} />
      <DynamicCityElements />

      <div className="absolute inset-0" style={{ zIndex: 3, perspective: '2000px', transformStyle: 'preserve-3d' }}>
        {zones.map((zone, index) => (
          <CityZoneComponent
            key={zone.id}
            zone={zone}
            isActive={index === activeZoneIndex}
            onHover={setHoveredZone}
            onClick={onZoneClick}
          />
        ))}
      </div>

      {hoveredZone && (
        <HoverCard zone={hoveredZone} mousePosition={mousePosition} />
      )}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-8">
        <div className="bg-gradient-to-r from-gray-900/95 via-gray-900/98 to-gray-900/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-emerald-500/5" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
              <div>
                <h3 className="font-bold text-white text-xl mb-1">Kocaeli Akıllı Şehir Ekosistemi</h3>
                <p className="text-sm text-gray-400">
                  Her bölge, dijital dönüşüm projelerini temsil ediyor. Detaylar için tıklayın.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">{zones.length}</span>
                </div>
                <span className="text-gray-400">Aktif Bölge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
