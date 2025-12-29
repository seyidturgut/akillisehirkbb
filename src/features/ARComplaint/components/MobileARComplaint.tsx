import React, { useEffect, useRef, useState } from 'react';
import { Camera, MapPin, CheckCircle2, AlertCircle, RefreshCw, Send, ChevronRight } from 'lucide-react';
import { CategorySelector, ComplaintCategory } from './CategorySelector';

interface MobileARComplaintProps {
    onCancel: () => void;
    onSubmit: (payload: any) => void;
}

export const MobileARComplaint: React.FC<MobileARComplaintProps> = ({ onCancel, onSubmit }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [step, setStep] = useState<'camera' | 'category' | 'success'>('camera');
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);
    const [category, setCategory] = useState<ComplaintCategory | null>(null);
    const [snapshot, setSnapshot] = useState<string | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setHasPermission(true);
                }
            } catch (err) {
                setHasPermission(false);
            }
        };
        startCamera();
        return () => {
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
            }
        };
    }, []);

    const captureAndProceed = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0);
            setSnapshot(canvas.toDataURL('image/jpeg', 0.8));
            setStep('category');
        }
    };

    const handlePointSelect = (e: React.MouseEvent) => {
        if (step !== 'camera') return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMarker({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    const handeSubmit = () => {
        if (!category || !snapshot) return;
        const payload = {
            photo: snapshot,
            latitude: 40.7648, // Mock GPS
            longitude: 29.9408,
            timestamp: new Date().toISOString(),
            category,
            marker_position: marker
        };
        onSubmit(payload);
        setStep('success');
    };

    if (hasPermission === false) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Kamera Gerekli</h3>
                <p className="text-gray-400 mb-6">Şikayet bildirmek için kamera erişimine ihtiyaç var.</p>
                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white/10 rounded-xl">Tekrar Dene</button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden bg-black rounded-3xl">
            <canvas ref={canvasRef} className="hidden" />

            {step === 'camera' && (
                <div className="absolute inset-0" onClick={handlePointSelect}>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />

                    {marker && (
                        <div
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in duration-300"
                            style={{ top: `${marker.y}%`, left: `${marker.x}%` }}
                        >
                            <div className="w-12 h-12 bg-red-500/30 backdrop-blur-md rounded-full border-2 border-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    )}

                    <div className="absolute bottom-8 left-0 right-0 px-8 flex flex-col items-center gap-4">
                        <p className="text-white text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            {marker ? 'Nokta seçildi. Fotoğraf çekin.' : 'Ekranda sorunun olduğu noktaya dokunun'}
                        </p>
                        {marker && (
                            <button
                                onClick={(e) => { e.stopPropagation(); captureAndProceed(); }}
                                className="w-20 h-20 bg-white rounded-full border-4 border-white/30 p-1 flex items-center justify-center active:scale-90 transition-transform"
                            >
                                <div className="w-full h-full bg-blue-500 rounded-full" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {step === 'category' && (
                <div className="absolute inset-0 bg-gray-950 p-6 flex flex-col animate-in slide-in-from-right duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">Kategori Seçin</h3>
                    <p className="text-gray-400 mb-8">Bildirim yapmak istediğiniz türü belirleyin.</p>

                    <CategorySelector selected={category} onSelect={setCategory} />

                    <div className="mt-auto pt-8">
                        <button
                            disabled={!category}
                            onClick={handeSubmit}
                            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${category ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                            Şikayeti Bildir
                        </button>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="absolute inset-0 bg-emerald-600 p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Bildirim Alındı</h3>
                    <p className="text-emerald-100 mb-12">Teşekkürler! Şehir yönetimi en kısa sürede inceleme başlatacaktır.</p>
                    <button
                        onClick={onCancel}
                        className="w-full py-4 bg-white text-emerald-600 font-bold rounded-xl"
                    >
                        Ana Menüye Dön
                    </button>
                </div>
            )}
        </div>
    );
};
