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

    </div>
  );
};
