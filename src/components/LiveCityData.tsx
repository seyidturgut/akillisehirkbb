import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, Activity, Zap, Droplets, Bus, TrendingUp, TrendingDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CityMetric {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string;
  unit: string;
  trend: number;
  color: string;
}

interface LiveCityDataProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const LiveCityData: React.FC<LiveCityDataProps> = ({ containerRef: externalRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataRef = externalRef || containerRef;
  const [metrics, setMetrics] = useState<CityMetric[]>([
    {
      icon: Cloud,
      label: 'Hava Durumu',
      value: '25',
      unit: '°C',
      trend: 2,
      color: '#0EA5E9',
    },
    {
      icon: Activity,
      label: 'Trafik Yoğunluğu',
      value: '65',
      unit: '%',
      trend: -5,
      color: '#F59E0B',
    },
    {
      icon: Zap,
      label: 'Enerji Kullanımı',
      value: '1.2',
      unit: 'MWh',
      trend: 5,
      color: '#8B5CF6',
    },
    {
      icon: Droplets,
      label: 'Su Tüketimi',
      value: '450',
      unit: 'K m³',
      trend: -2,
      color: '#0EA5E9',
    },
    {
      icon: Bus,
      label: 'Toplu Taşıma',
      value: '98',
      unit: '%',
      trend: 3,
      color: '#10B981',
    },
    {
      icon: Activity,
      label: 'Hava Kalitesi',
      value: '35',
      unit: 'AQI',
      trend: -8,
      color: '#10B981',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: (parseFloat(metric.value) + (Math.random() - 0.5) * 2).toFixed(metric.unit === 'K m³' ? 0 : 1),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!dataRef.current) return;

    const ctx = gsap.context(() => {
      const cards = dataRef.current!.querySelectorAll('.metric-card');

      gsap.set(cards, { y: 60 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dataRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, dataRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="features" ref={dataRef} className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-emerald-500/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-badge inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-6 border border-emerald-400/30">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-sm font-bold tracking-wide">CANLI VERİ</span>
          </div>
          <h2 className="section-title text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Şehrin Nabzı
          </h2>
          <p className="section-subtitle text-blue-200/80 text-base md:text-lg max-w-2xl mx-auto font-light">
            Kocaeli'nin gerçek zamanlı akıllı şehir metrikleri
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card opacity-0 group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{
                    backgroundColor: `${metric.color}25`,
                    boxShadow: `0 4px 14px ${metric.color}20`
                  }}
                >
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{metric.value}</span>
                    <span className="text-xs text-gray-400 font-medium">{metric.unit}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium block">{metric.label}</span>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-white/10">
                  {metric.trend > 0 ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  )}
                  <span
                    className={`text-xs font-bold ${
                      metric.trend > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {metric.trend > 0 ? '+' : ''}{metric.trend}%
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">3sn</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
