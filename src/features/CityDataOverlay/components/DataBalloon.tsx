import React from 'react';
import { Wind, Activity, Thermometer, Droplets } from 'lucide-react';
import { CityLiveData } from '../data/liveData';

interface DataBalloonProps {
    data: CityLiveData;
    className?: string;
}

export const DataBalloon: React.FC<DataBalloonProps> = ({ data, className = '' }) => {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {/* Air Quality Balloon */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl animate-in fade-in slide-in-from-left duration-500 shadow-2xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400`}>
                    <Wind className="w-5 h-5" />
                </div>
                <div>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Air Quality</span>
                    <span className="block text-white font-bold leading-tight">AQI {Math.round(data.airQuality.value)} — {data.airQuality.label}</span>
                </div>
            </div>

            {/* Traffic Balloon */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl animate-in fade-in slide-in-from-left duration-500 delay-100 shadow-2xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${data.traffic.color}20`, color: data.traffic.color }}>
                    <Activity className="w-5 h-5" />
                </div>
                <div>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Traffic Density</span>
                    <span className="block text-white font-bold leading-tight">%{Math.round(data.traffic.density)} — {data.traffic.status}</span>
                </div>
            </div>

            {/* Temperature & Humidity */}
            <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl animate-in fade-in slide-in-from-left duration-500 delay-200 shadow-2xl">
                    <Thermometer className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-bold">{data.weather.temp.toFixed(1)}°C</span>
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl animate-in fade-in slide-in-from-left duration-500 delay-300 shadow-2xl">
                    <Droplets className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-bold">%{data.weather.humidity}</span>
                </div>
            </div>
        </div>
    );
};
