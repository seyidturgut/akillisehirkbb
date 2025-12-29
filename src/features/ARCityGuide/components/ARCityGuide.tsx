import React, { useState } from 'react';
import { X, Globe } from 'lucide-react';
import { useDeviceDetection } from '../hooks/useDevice';
import { MobileAR } from './MobileAR';
import { DesktopAR } from './DesktopAR';
import { DetailSheet } from './DetailSheet';
import { POI } from '../data/poi';
import { Portal } from '../../../components/Portal';

interface ARCityGuideProps {
    onClose: () => void;
}

export const ARCityGuide: React.FC<ARCityGuideProps> = ({ onClose }) => {
    const { isMobile } = useDeviceDetection();
    const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

    return (
        <Portal>
            <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4 md:p-12 overflow-hidden">
                {/* Overlay Arka Plan */}
                <div
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-in fade-in duration-500"
                    onClick={onClose}
                />

                <div className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] bg-gray-900 rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white leading-tight">
                                    {isMobile ? 'AR Şehir Rehberi' : 'Şehir Görünümü'}
                                </h2>
                                <p className="text-xs text-blue-400 font-medium tracking-wider uppercase">Beta v1.0</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 active:scale-90"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 overflow-hidden relative p-4 md:p-8">
                        {isMobile ? (
                            <MobileAR onSelectPOI={setSelectedPOI} />
                        ) : (
                            <DesktopAR onSelectPOI={setSelectedPOI} />
                        )}
                    </div>
                </div>

                {/* Detay Bottom Sheet / Modal */}
                <DetailSheet
                    poi={selectedPOI}
                    onClose={() => setSelectedPOI(null)}
                />
            </div>
        </Portal>
    );
};
