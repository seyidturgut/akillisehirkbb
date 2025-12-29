import React, { useEffect, useRef, useState } from 'react';
import { initialLiveData, simulateDataChange, CityLiveData } from '../data/liveData';
import { DataBalloon } from './DataBalloon';

export const MobileARData: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [data, setData] = useState<CityLiveData>(initialLiveData);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Camera error:', err);
            }
        };

        const fetchRealData = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // Simulate fetching real weather based on actual coordinates
                    const { latitude, longitude } = position.coords;
                    console.log(`Fetching city data for: ${latitude}, ${longitude}`);

                    // Small delay to simulate "Network"
                    setTimeout(() => {
                        setData(prev => ({
                            ...prev,
                            weather: {
                                ...prev.weather,
                                temp: 22 + Math.random() * 5, // Realistic variation
                                condition: 'Kısmen Bulutlu',
                                humidity: 50 + Math.round(Math.random() * 10)
                            }
                        }));
                    }, 1000);
                });
            }
        };

        startCamera();
        fetchRealData();

        const interval = setInterval(() => {
            setData(prev => simulateDataChange(prev));
        }, 2000);

        return () => {
            clearInterval(interval);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    track.stop();
                    console.log('Camera track stopped:', track.label);
                });
                streamRef.current = null;
            }
        };
    }, []);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Real-time Camera Feed with calibrated transparency */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.2] transition-opacity duration-1000"
            />

            {/* Environmental Aura Effect (SVG) */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <svg className="w-full h-full">
                    <defs>
                        <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={data.airQuality.color} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={data.airQuality.color} stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="50%" cy="50%" r="48%" fill="url(#auraGradient)" className="animate-pulse" />

                    {/* Traffic Lines Simulation */}
                    <path
                        d="M 50 800 Q 400 400 750 800"
                        stroke={data.traffic.color}
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="15, 15"
                        className="opacity-60"
                        style={{ filter: `blur(8px)` }}
                    />
                </svg>
            </div>

            <div className="absolute top-10 left-8 right-8 z-30 pointer-events-none">
                <DataBalloon data={data} />
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center pointer-events-none">
                <div className="px-8 py-4 bg-gray-900/60 backdrop-blur-3xl border border-white/20 rounded-full text-white/80 text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl">
                    ŞEHİR SENSÖRLERİ AKTİF • KOCAELI OS
                </div>
            </div>
        </div>
    );
};
