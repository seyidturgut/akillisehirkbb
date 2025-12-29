import React from 'react';
import { X, Globe, AlertCircle, BarChart2, ChevronRight } from 'lucide-react';
import { Portal } from '../../../components/Portal';

interface ARFeaturesModalProps {
    onClose: () => void;
    onOpenGuide: () => void;
    onOpenComplaint: () => void;
    onOpenData: () => void;
}

export const ARFeaturesModal: React.FC<ARFeaturesModalProps> = ({
    onClose,
    onOpenGuide,
    onOpenComplaint,
    onOpenData
}) => {
    const tools = [
        {
            id: 'guide',
            label: 'Şehri Keşfet (AR)',
            icon: Globe,
            color: 'bg-blue-600',
            description: 'AR Rehberi & 3D Görünüm',
            onClick: onOpenGuide
        },
        {
            id: 'complaint',
            label: 'Sorun Bildir (AR)',
            icon: AlertCircle,
            color: 'bg-red-600',
            description: 'Hızlı Şikayet Bildirimi',
            onClick: onOpenComplaint
        },
        {
            id: 'data',
            label: 'Canlı Şehir Verileri',
            icon: BarChart2,
            color: 'bg-emerald-600',
            description: 'Hava & Trafik Overlay',
            onClick: onOpenData
        }
    ];

    return (
        <Portal>
            <div className="fixed inset-0 z-[2500] flex items-end md:items-center justify-center p-0 md:p-12 overflow-hidden">
                <div
                    className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500"
                    onClick={onClose}
                />

                <div className="relative w-full max-w-lg bg-gray-900 rounded-t-[2.5rem] md:rounded-[2.5rem] border-t md:border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
                    <div className="flex items-center justify-between p-8 border-b border-white/5">
                        <div>
                            <h2 className="text-2xl font-bold text-white leading-tight">AR Özellikleri</h2>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">Şehri yeni bir boyutta Deneyimleyin</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-90"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-8 flex flex-col gap-4">
                        {tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => {
                                    tool.onClick();
                                    onClose();
                                }}
                                className="flex items-center gap-5 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] transition-all hover:bg-white/10 active:scale-95 group shadow-lg"
                            >
                                <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-${tool.color.split('-')[1]}-900/20`}>
                                    <tool.icon className="w-7 h-7" />
                                </div>
                                <div className="text-left flex-1">
                                    <span className="block text-white font-bold text-lg leading-tight mb-1">{tool.label}</span>
                                    <span className="block text-gray-400 text-xs font-medium uppercase tracking-wider">{tool.description}</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white" />
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="p-8 pt-0 text-center">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Kocaeli Smart City OS v4.0</p>
                    </div>
                </div>
            </div>
        </Portal>
    );
};
