import React, { useEffect, useRef, useState } from 'react';
import { initialLiveData, simulateDataChange, CityLiveData } from '../data/liveData';
import { DataBalloon } from './DataBalloon';

export const MobileARData: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [data, setData] = useState<CityLiveData>(initialLiveData);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) { console.error('Camera error:', err); }
        };
        startCamera();

        const interval = setInterval(() => {
            setData(prev => simulateDataChange(prev));
        }, 2000);

        return () => {
            clearInterval(interval);
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
            }
        };
    }, []);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden rounded-3xl">
            <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />

            {/* Environmental Aura Effect (SVG) */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <svg className="w-full h-full">
                    <defs>
                        <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={data.airQuality.color} stopOpacity="0.15" />
                            <stop offset="100%" stopColor={data.airQuality.color} stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="50%" cy="50%" r="45%" fill="url(#auraGradient)" className="animate-pulse" />

                    {/* Traffic Lines Simulation */}
                    <path
                        d="M 100 600 Q 400 300 700 600"
                        stroke={data.traffic.color}
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="10, 10"
                        className="opacity-40"
                        style={{ filter: `blur(4px)` }}
                    />
                </svg>
            </div>

            <div className="absolute top-8 left-8 right-8 z-20 pointer-events-none">
                <DataBalloon data={data} />
            </div>

            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/50 text-xs font-bold tracking-widest uppercase">
                    Live City Sensors Active
                </div>
            </div>
        </div>
    );
};
