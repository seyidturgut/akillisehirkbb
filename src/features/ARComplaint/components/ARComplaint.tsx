import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useDeviceDetection } from '../../ARCityGuide/hooks/useDevice';
import { MobileARComplaint } from './MobileARComplaint';
import { DesktopMapComplaint } from './DesktopMapComplaint';
import { Portal } from '../../../components/Portal';

interface ARComplaintProps {
    onClose: () => void;
}

export const ARComplaint: React.FC<ARComplaintProps> = ({ onClose }) => {
    const { isMobile } = useDeviceDetection();

    const handleSubmit = (payload: any) => {
        console.log('Complaint Payload:', payload);
        // Simulating API call
        setTimeout(() => {
            // Logic for background sync or direct submit can go here
        }, 1000);
    };

    return (
        <Portal>
            <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4 md:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose} />

                <div className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] bg-gray-900 rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20">
                                <AlertCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white leading-tight">AR Şikayet Bildirimi</h2>
                                <p className="text-xs text-red-400 font-medium tracking-wider uppercase">Vatandaş Çözüm Merkezi</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-90">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden relative p-4 md:p-8">
                        {isMobile ? (
                            <MobileARComplaint onCancel={onClose} onSubmit={handleSubmit} />
                        ) : (
                            <DesktopMapComplaint onCancel={onClose} onSubmit={handleSubmit} />
                        )}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
