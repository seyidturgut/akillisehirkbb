import React, { useEffect, useRef, useState } from 'react';
import { Camera, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import { POI, mockPOIs } from '../data/poi';

interface MobileARProps {
    onSelectPOI: (poi: POI) => void;
}

export const MobileAR: React.FC<MobileARProps> = ({ onSelectPOI }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setHasPermission(true);
                }
            } catch (err) {
                console.error('Kamera erişim hatası:', err);
                setError('Kamera erişimi reddedildi veya cihazınız desteklemiyor.');
                setHasPermission(false);
            }
        };

        startCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, []);

    if (hasPermission === false) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-950 text-center">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Kamera Erişimi Gerekli</h3>
                <p className="text-gray-400 mb-8">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl text-white font-bold hover:bg-white/20 transition-colors"
                >
                    <RefreshCw className="w-5 h-5" />
                    Tekrar Dene
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-black overflow-hidden rounded-3xl">
            {/* Kamera Yayını */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
            />

            {/* AR Katmanı (Overlay) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Mock AR Etiketleri (Rastgele Konumlar) */}
                {mockPOIs.map((poi, index) => {
                    const randomTop = 20 + (index * 25);
                    const randomLeft = 10 + (Math.random() * 60);

                    return (
                        <div
                            key={poi.id}
                            className="absolute pointer-events-auto group animate-in zoom-in duration-500 delay-[index*200]"
                            style={{ top: `${randomTop}%`, left: `${randomLeft}%` }}
                            onClick={() => onSelectPOI(poi)}
                        >
                            <div className="flex flex-col items-center">
                                <div className="relative mb-2">
                                    <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-xl border-2 border-blue-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.5)] group-active:scale-90 transition-transform">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                                </div>

                                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl px-4 py-2 shadow-2xl">
                                    <span className="block text-white text-xs font-bold whitespace-nowrap">{poi.name}</span>
                                    <span className="block text-blue-400 text-[10px] font-medium">{poi.distance}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* UI Kontrolleri */}
            <div className="absolute bottom-8 left-0 right-0 z-20 px-8 flex justify-center pointer-events-none">
                <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3 text-white/50 text-sm">
                    <Camera className="w-4 h-4" />
                    AR Modu Aktif: Çevrenizi Tarayın
                </div>
            </div>
        </div>
    );
};
