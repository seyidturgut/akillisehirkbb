import React, { useState } from 'react';
import { MapPin, Upload, Send, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { CategorySelector, ComplaintCategory } from './CategorySelector';

interface DesktopMapComplaintProps {
    onCancel: () => void;
    onSubmit: (payload: any) => void;
}

export const DesktopMapComplaint: React.FC<DesktopMapComplaintProps> = ({ onCancel, onSubmit }) => {
    const [step, setStep] = useState<'map' | 'details' | 'success'>('map');
    const [category, setCategory] = useState<ComplaintCategory | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = () => {
        if (!category || !coords) return;
        const payload = {
            photo: preview,
            latitude: coords.lat,
            longitude: coords.lng,
            timestamp: new Date().toISOString(),
            category
        };
        onSubmit(payload);
        setStep('success');
    };

    return (
        <div className="w-full h-full flex flex-col">
            {step === 'map' && (
                <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
                    <div className="flex-1 relative bg-slate-900 rounded-3xl overflow-hidden border border-white/5 cursor-crosshair group" onClick={() => setCoords({ lat: 40.765, lng: 29.94 })}>
                        <img
                            src="https://beyincikisleri.co/customer/akillikbb/kbb-isometrik.png"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                            alt="Map"
                        />
                        {coords && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-full border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        )}
                        <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-sm">
                            Harita üzerinden şikayet konumunu işaretleyin
                        </div>
                    </div>

                    <div className="w-full md:w-80 flex flex-col gap-6">
                        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                            {preview ? (
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10">
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    <button onClick={() => setPreview(null)} className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white">✕</button>
                                </div>
                            ) : (
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer group">
                                    <Upload className="w-12 h-12 text-gray-500 mb-4 group-hover:text-blue-400 transition-colors" />
                                    <span className="text-white font-bold mb-2">Fotoğraf Yükle</span>
                                    <span className="text-gray-500 text-xs">PNG, JPG (Max 5MB)</span>
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                </label>
                            )}
                        </div>

                        <button
                            disabled={!coords || !preview}
                            onClick={() => setStep('details')}
                            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${coords && preview ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Devam Et
                        </button>
                    </div>
                </div>
            )}

            {step === 'details' && (
                <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Kategori Belirleyin</h3>
                        <p className="text-gray-400">Şikayetiniz hangi konu başlığına giriyor?</p>
                    </div>

                    <CategorySelector selected={category} onSelect={setCategory} />

                    <div className="mt-12 flex gap-4">
                        <button onClick={() => setStep('map')} className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all">Geri Dön</button>
                        <button
                            disabled={!category}
                            onClick={handleSubmit}
                            className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${category ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                            Bildirimi Gönder
                        </button>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4">Gönderildi</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">Şikayetiniz sistemlerimize kaydedildi. En kısa sürede geri dönüş yapılacaktır.</p>
                    <button onClick={onCancel} className="px-12 py-4 bg-white text-blue-900 font-bold rounded-2xl hover:scale-105 transition-all">Tamamla</button>
                </div>
            )}
        </div>
    );
};
