import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CityZone } from '../lib/supabase';

interface ConnectionPathsProps {
  zones: CityZone[];
  activeIndex: number;
}

export const ConnectionPaths: React.FC<ConnectionPathsProps> = ({ zones, activeIndex }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || zones.length < 2) return;

    const paths = svgRef.current.querySelectorAll('.connection-path');

    paths.forEach((path, index) => {
      if (index <= activeIndex && index < zones.length - 1) {
        const length = (path as SVGPathElement).getTotalLength();

        gsap.fromTo(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
          },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            delay: index * 0.3,
          }
        );
      }
    });
  }, [activeIndex, zones]);

  const getPath = (start: CityZone, end: CityZone) => {
    const startX = start.position_x;
    const startY = start.position_y;
    const endX = end.position_x;
    const endY = end.position_y;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 - 5;

    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {zones.map((zone, index) => {
        if (index >= zones.length - 1) return null;
        const nextZone = zones[index + 1];

        return (
          <g key={`path-${index}`}>
            <path
              className="connection-path"
              d={getPath(zone, nextZone)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="3"
              filter="url(#glow)"
              opacity={index <= activeIndex ? 1 : 0}
            />

            {index <= activeIndex && (
              <>
                <circle
                  cx={zone.position_x}
                  cy={zone.position_y}
                  r="4"
                  fill={zone.color}
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    values="4;6;4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                <circle
                  cx={zone.position_x}
                  cy={zone.position_y}
                  r="8"
                  fill="none"
                  stroke={zone.color}
                  strokeWidth="2"
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values="8;16;8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};
