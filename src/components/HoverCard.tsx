import React from 'react';
import * as Icons from 'lucide-react';
import { CityZone } from '../lib/supabase';

interface HoverCardProps {
  zone: CityZone;
  mousePosition: { x: number; y: number };
}

export const HoverCard: React.FC<HoverCardProps> = ({ zone, mousePosition }) => {
  const IconComponent = Icons[zone.icon as keyof typeof Icons] as React.FC<{ className?: string }>;

  return (
    <div
      className="fixed pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-200"
      style={{
        left: mousePosition.x + 20,
        top: mousePosition.y - 40,
      }}
    >
      <div
        className="backdrop-blur-xl rounded-2xl p-4 shadow-2xl border-2 max-w-xs bg-gray-900/95"
        style={{
          borderColor: `${zone.color}60`,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: zone.color }}
          >
            {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
          </div>
          <h3 className="font-bold text-white">
            {zone.name}
          </h3>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{zone.description}</p>
        <div className="mt-3 text-xs font-medium" style={{ color: zone.color }}>
          Tıklayarak projeleri görüntüleyin →
        </div>
      </div>
    </div>
  );
};
