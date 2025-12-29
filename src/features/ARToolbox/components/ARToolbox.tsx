import React, { useState } from 'react';
import { Globe, AlertCircle, BarChart2, X, ChevronRight, ScanLine } from 'lucide-react';

interface ARToolboxProps {
    onOpenGuide: () => void;
    onOpenComplaint: () => void;
    onOpenData: () => void;
}

export const ARToolbox: React.FC<ARToolboxProps> = ({ onOpenGuide, onOpenComplaint, onOpenData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const tools = [
        {
            id: 'data',
            label: 'Canlı Şehir Verileri',
            icon: BarChart2,
            color: 'bg-emerald-500',
            description: 'Hava & Trafik Overlay',
            onClick: () => { onOpenData(); setIsOpen(false); }
        },
        {
            id: 'complaint',
            label: 'Sorun Bildir (AR)',
            icon: AlertCircle,
            color: 'bg-red-500',
            description: 'Hızlı Şikayet Bildirimi',
            onClick: () => { onOpenComplaint(); setIsOpen(false); }
        },
        {
            id: 'guide',
            label: 'Şehri Keşfet (AR)',
            icon: Globe,
            color: 'bg-blue-500',
            description: 'AR Rehberi & 3D Görünüm',
            onClick: () => { onOpenGuide(); setIsOpen(false); }
        }
    ];

    return (
        <div className="fixed bottom-8 left-8 z-[2000]">
            {/* Drawer Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1] animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Drawer Container */}
            <div className={`relative flex items-center transition-all duration-500 ease-out-back ${isOpen ? 'gap-4' : 'gap-0'}`}>

                {/* The Launcher Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-16 h-16 flex items-center justify-center rounded-2xl shadow-2xl transition-all duration-500 active:scale-90 z-20 ${isOpen ? 'bg-white text-gray-900 rotate-90' : 'bg-blue-600 text-white hover:scale-105'
                        }`}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <ScanLine className="w-8 h-8" />}

                    {!isOpen && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full animate-pulse" />
                    )}
                </button>

                {/* Features Stack (Drawer) */}
                <div className={`flex flex-col-reverse gap-3 transition-all duration-500 origin-left ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 pointer-events-none'
                    }`}>
                    {tools.map((tool, index) => (
                        <button
                            key={tool.id}
                            onClick={tool.onClick}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            className="flex items-center gap-4 p-3 pr-6 bg-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl group hover:bg-white/10 transition-all shadow-xl hover:translate-x-2"
                        >
                            <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                                <tool.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <span className="block text-white font-bold text-sm leading-tight">{tool.label}</span>
                                <span className="block text-gray-500 text-[10px] font-medium uppercase tracking-wider">{tool.description}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Label for the launcher */}
            {!isOpen && (
                <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-white text-xs font-bold animate-in fade-in slide-in-from-left-4 duration-500 whitespace-nowrap pointer-events-none">
                    Şehir Araçları (AR)
                </div>
            )}
        </div>
    );
};
