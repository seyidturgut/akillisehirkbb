import React from 'react';
import * as Icons from 'lucide-react';
import { CityZone as CityZoneType } from '../lib/supabase';

interface CityZoneProps {
  zone: CityZoneType;
  isActive: boolean;
  onHover: (zone: CityZoneType | null) => void;
  onClick: (zone: CityZoneType) => void;
}

export const CityZone: React.FC<CityZoneProps> = ({ zone, isActive, onHover, onClick }) => {
  const IconComponent = Icons[zone.icon as keyof typeof Icons] as React.FC<{ className?: string }>;

  return (
    <div
      className="city-zone absolute cursor-pointer transition-all duration-700 ease-out group"
      style={{
        left: `${zone.position_x}%`,
        top: `${zone.position_y}%`,
        transform: isActive ? 'scale(1.15)' : 'scale(1)',
      }}
      onMouseEnter={() => onHover(zone)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(zone)}
    >
      <div className="relative flex flex-col items-center gap-2">
        <div className="relative">
          {isActive && (
            <>
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: zone.color,
                  opacity: 0.3,
                  animationDuration: '2s',
                }}
              />
              <div
                className="absolute inset-[-8px] rounded-full opacity-40 blur-md"
                style={{
                  backgroundColor: zone.color,
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
            </>
          )}

          <div
            className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110"
            style={{
              backgroundColor: isActive ? zone.color : 'rgba(15, 23, 42, 0.9)',
              border: `3px solid ${isActive ? '#ffffff' : zone.color}`,
              boxShadow: isActive
                ? `0 0 40px ${zone.color}, 0 0 80px ${zone.color}40, 0 8px 32px rgba(0,0,0,0.6)`
                : `0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px ${zone.color}40`,
              transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
            }}
          >
            {isActive && (
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8), transparent 60%)`,
                }}
              />
            )}

            {IconComponent && (
              <IconComponent
                className="relative z-10 transition-all duration-500 group-hover:rotate-12"
                style={{
                  width: '28px',
                  height: '28px',
                  color: isActive ? '#ffffff' : zone.color,
                  filter: isActive ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' : 'none',
                }}
                strokeWidth={2.5}
              />
            )}
          </div>

          <div
            className="absolute -bottom-1 left-1/2 w-12 h-3 rounded-full blur-lg transition-all duration-700"
            style={{
              backgroundColor: zone.color,
              transform: 'translateX(-50%)',
              opacity: isActive ? 0.6 : 0.3,
            }}
          />
        </div>

        <div
          className="relative px-3 py-1.5 rounded-full transition-all duration-700 backdrop-blur-md"
          style={{
            backgroundColor: isActive ? `${zone.color}e6` : 'rgba(15, 23, 42, 0.8)',
            border: `2px solid ${isActive ? '#ffffff' : `${zone.color}60`}`,
            boxShadow: isActive ? `0 4px 24px ${zone.color}60` : '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          <span
            className="text-xs font-bold whitespace-nowrap tracking-wide"
            style={{
              color: '#ffffff',
              textShadow: isActive ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {zone.name}
          </span>
        </div>
      </div>
    </div>
  );
};
