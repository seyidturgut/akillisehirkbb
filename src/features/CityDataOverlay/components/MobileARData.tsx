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

    // Particle System Logic (SVG based)
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * -20,
    }));

    return (
        <div className="relative w-full h-full bg-black overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Real-time Camera Feed */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
            />

            {/* AR Atmosphere Filter: Full-screen tint based on AQI */}
            <div
                className="absolute inset-0 z-0 pointer-events-none transition-colors duration-[2000ms] ease-in-out mix-blend-screen"
                style={{
                    backgroundColor: data.airQuality.color,
                    opacity: Math.min(0.4, (data.airQuality.value / 300) * 0.4)
                }}
            />

            {/* Environmental Aura Effect & Particle System (SVG) */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={data.airQuality.color} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={data.airQuality.color} stopOpacity="0" />
                        </radialGradient>

                        <filter id="particleBlur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
                        </filter>
                    </defs>

                    {/* Central Aura */}
                    <circle cx="50%" cy="50%" r="45" fill="url(#auraGradient)" className="animate-pulse" />

                    {/* PM2.5 Particle Representation */}
                    {particles.map((p) => (
                        <circle
                            key={p.id}
                            cx={`${p.x}`}
                            cy={`${p.y}`}
                            r={p.size / 10}
                            fill="white"
                            className="opacity-40"
                            style={{
                                filter: 'url(#particleBlur)',
                                animation: `float-particle ${p.duration}s linear infinite`,
                                animationDelay: `${p.delay}s`,
                                opacity: Math.min(0.6, (data.airQuality.value / 400) * 0.8)
                            }}
                        >
                            <animate
                                attributeName="cy"
                                from="110"
                                to="-10"
                                dur={`${p.duration}s`}
                                begin={`${p.delay}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    ))}

                    {/* Traffic Lines Simulation (calibrated for 100x100 viewbox) */}
                    <path
                        d="M 5 90 Q 50 40 95 90"
                        stroke={data.traffic.color}
                        strokeWidth="0.8"
                        fill="none"
                        strokeDasharray="2, 2"
                        className="opacity-60"
                    >
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3s" repeatCount="indefinite" />
                    </path>
                </svg>
            </div>

            {/* Data Panels */}
            <div className="absolute top-10 left-8 right-8 z-30 pointer-events-none">
                <DataBalloon data={data} />
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center pointer-events-none">
                <div className="px-8 py-4 bg-gray-900/60 backdrop-blur-3xl border border-white/20 rounded-full text-white/80 text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: data.airQuality.color }} />
                    ŞEHİR SENSÖRLERİ AKTİF • {data.airQuality.label.toUpperCase()}
                </div>
            </div>

            <style>{`
        @keyframes float-particle {
          0% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
          100% { transform: translateX(0px); }
        }
      `}</style>
        </div>
    );
};
