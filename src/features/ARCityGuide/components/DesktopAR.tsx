import React from 'react';
import { Building2, MapPin, Sparkles } from 'lucide-react';
import { POI, mockPOIs } from '../data/poi';

interface DesktopARProps {
    onSelectPOI: (poi: POI) => void;
}

export const DesktopAR: React.FC<DesktopARProps> = ({ onSelectPOI }) => {
    return (
        <div className="relative w-full h-full flex flex-col p-8 bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-blue-400" />
                    Etkileşimli Şehir Görünümü
                </h2>
                <p className="text-gray-400">Şehrin önemli noktalarını 3 boyutlu derinlikte keşfedin.</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPOIs.map((poi) => (
                    <div
                        key={poi.id}
                        onClick={() => onSelectPOI(poi)}
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                            <Building2 className="w-16 h-16 text-white" />
                        </div>

                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                                {poi.type === 'leisure' ? 'Kültür & Park' : poi.type === 'transport' ? 'Ulaşım' : 'Kamu Binası'}
                            </span>
                            <h3 className="text-xl font-bold text-white mb-2">{poi.name}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{poi.description}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{poi.distance}</span>
                                </div>
                                <button className="text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Detayları Gör →
                                </button>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};
