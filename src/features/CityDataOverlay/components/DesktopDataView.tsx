import React, { useEffect, useState } from 'react';
import { initialLiveData, simulateDataChange, CityLiveData } from '../data/liveData';
import { DataBalloon } from './DataBalloon';
import { Activity, Thermometer, Wind } from 'lucide-react';

export const DesktopDataView: React.FC = () => {
    const [data, setData] = useState<CityLiveData>(initialLiveData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => simulateDataChange(prev));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-slate-950/40 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden p-12">
            {/* Background Visualization */}
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 w-full flex flex-col md:flex-row gap-12 items-center">
                {/* Visual Indicators */}
                <div className="flex-1 grid grid-cols-2 gap-8">
                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                            <Wind className="w-8 h-8 text-emerald-400" />
                        </div>
                        <span className="text-3xl font-black text-white mb-2">{Math.round(data.airQuality.value)}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Hava Kalitesi İndeksi</span>
                    </div>

                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${data.traffic.color}20` }}>
                            <Activity className="w-8 h-8" style={{ color: data.traffic.color }} />
                        </div>
                        <span className="text-3xl font-black text-white mb-2">%{Math.round(data.traffic.density)}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{data.traffic.status} Trafik</span>
                    </div>
                </div>

                {/* Info Stack */}
                <div className="w-full md:w-96 flex flex-col gap-6">
                    <div className="p-8 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-6">Canlı Şehir Özeti</h3>
                        <DataBalloon data={data} />
                    </div>

                    <div className="p-6 bg-blue-500 rounded-2xl text-white font-bold flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Thermometer className="w-6 h-6" />
                            <span>İzmit Şehir Merkezi</span>
                        </div>
                        <span className="text-2xl">{data.weather.temp.toFixed(1)}°</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
