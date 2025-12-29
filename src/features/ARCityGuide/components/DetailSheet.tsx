import React from 'react';
import { X, MapPin, Navigation } from 'lucide-react';
import { POI } from '../data/poi';

interface DetailSheetProps {
    poi: POI | null;
    onClose: () => void;
}

export const DetailSheet: React.FC<DetailSheetProps> = ({ poi, onClose }) => {
    if (!poi) return null;

    return (
        <div className="fixed inset-0 z-[3000] flex items-end justify-center pointer-events-none p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                onClick={onClose}
            />
            <div className="relative w-full max-w-lg bg-gray-900/90 backdrop-blur-2xl rounded-t-3xl border-x border-t border-white/10 p-6 pointer-events-auto animate-in slide-in-from-bottom-full duration-500 shadow-2xl">
                <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>

                <div className="mb-6">
                    <img
                        src={poi.image}
                        alt={poi.name}
                        className="w-full h-48 object-cover rounded-2xl mb-4"
                    />
                    <h2 className="text-2xl font-bold text-white mb-2">{poi.name}</h2>
                    <div className="flex items-center gap-2 text-blue-400 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{poi.distance} uzaklıkta</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{poi.description}</p>
                </div>

                <button
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${poi.coordinates.lat},${poi.coordinates.lng}`, '_blank')}
                >
                    <Navigation className="w-5 h-5" />
                    Yol Tarifi Al
                </button>
            </div>
        </div>
    );
};
