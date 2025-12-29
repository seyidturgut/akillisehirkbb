import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bus, Building2, Users, Heart, Leaf, GraduationCap, TrendingUp, ArrowUpRight, Droplets, Factory, Zap, Ship } from 'lucide-react';
import BuildingStats from './BuildingStats';
import PopulationStats from './PopulationStats';
import LifeStats from './LifeStats';
import EducationStats from './EducationStats';
import EnvironmentStats from './EnvironmentStats';
import TransportationStats from './TransportationStats';

gsap.registerPlugin(ScrollTrigger);

interface Tab {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: 'transport', label: 'ULAŞIM', icon: Bus },
  { id: 'building', label: 'YAPI', icon: Building2 },
  { id: 'population', label: 'NÜFUS', icon: Users },
  { id: 'life', label: 'YAŞAM', icon: Heart },
  { id: 'environment', label: 'ÇEVRE', icon: Leaf },
  { id: 'education', label: 'EĞİTİM', icon: GraduationCap },
];

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1.5,
  decimals = 0,
  suffix = '',
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: value,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(obj.value);
      },
    });
  }, [value, duration]);

  return (
    <span ref={numberRef} className={className}>
      {displayValue.toLocaleString('tr-TR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
};

interface AnimatedCircleProgressProps {
  percentage: number;
  duration?: number;
}

const AnimatedCircleProgress: React.FC<AnimatedCircleProgressProps> = ({
  percentage,
  duration = 1.5
}) => {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: percentage,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(obj.value);
      },
    });
  }, [percentage, duration]);

  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="relative">
      <svg className="w-full h-40">
        <circle cx="80" cy="80" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
        <circle
          ref={circleRef}
          cx="80"
          cy="80"
          r={radius}
          stroke="#10B981"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 80 80)"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">
            %<AnimatedNumber value={percentage} />
          </div>
          <div className="text-xs text-slate-400">Verimlilik</div>
        </div>
      </div>
    </div>
  );
};

export const TabbedStatsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('transport');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll('.stat-card, .stat-item');

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }
    );

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
      }
    );
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'transport':
        return <TransportationStats />;

      case 'transport_old':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Yakıt Durumu */}
            <div className="stat-card bg-slate-900/95 border border-slate-800/80 rounded-xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-blue-400 mb-5 uppercase tracking-wider">
                Yakıt Durumu
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Droplets, label: 'Doğalgaz', year2022: 490, year2023: 505, color: '#3B82F6' },
                  { icon: Factory, label: 'Dizel', year2022: 1720, year2023: 1703, color: '#F97316' },
                  { icon: Zap, label: 'Elektrik', year2022: 18, year2023: 0, color: '#10B981' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{item.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-slate-500 mb-1">22:</div>
                        <div className="text-xl font-bold text-white">{item.year2022}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 mb-1">23:</div>
                        <div className="text-xl font-bold text-white">{item.year2023}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Güzergahlar */}
            <div className="stat-card bg-slate-900/95 border border-slate-800/80 rounded-xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-cyan-400 mb-5 uppercase tracking-wider">Güzergah Uzunlukları (KM)</h3>
              <div className="space-y-4">
                {[
                  { icon: Bus, label: 'Otobüs', year2022: 9257, year2023: 17759, color: '#3B82F6' },
                  { icon: Bus, label: 'Tramvay', year2022: 11, year2023: 20.8, color: '#06B6D4' },
                  { icon: Ship, label: 'Deniz', year2022: 73, year2023: 57.9, color: '#0EA5E9' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{item.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-slate-500 mb-1">22:</div>
                        <div className="text-xl font-bold text-white">{item.year2022.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 mb-1">23:</div>
                        <div className="text-xl font-bold text-white">{item.year2023.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toplu Taşıma Kullanımı */}
            <div className="stat-card bg-slate-900/95 border border-slate-800/80 rounded-xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-emerald-400 mb-5 uppercase tracking-wider">Tramvay Kullanımı</h3>
              <div className="space-y-4">
                {[
                  { icon: Bus, label: 'Sefer Sayısı', year2022: 104508, year2023: 111806 },
                  { icon: Users, label: 'Tramvay/Koltuk', year2022: '18 / 900', year2023: '18 / 900' },
                  { icon: Users, label: 'Yolcu Sayısı', year2022: 173354083, year2023: 182677633 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/20">
                        <item.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{item.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-slate-500 mb-1">2022</div>
                        <div className="text-base font-bold text-white">
                          {typeof item.year2022 === 'number' ? item.year2022.toLocaleString() : item.year2022}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 mb-1">2023</div>
                        <div className="text-base font-bold text-white">
                          {typeof item.year2023 === 'number' ? item.year2023.toLocaleString() : item.year2023}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toplu Taşıma İstatistikleri */}
            <div className="stat-card bg-slate-900/95 border border-slate-800/80 rounded-xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-violet-400 mb-4 uppercase tracking-wider">Kullanım İstatistikleri</h3>

              <div className="flex gap-2 mb-4">
                {['TRAMWAY', 'OTOBÜS', 'VAPUR'].map((mode, idx) => (
                  <button
                    key={idx}
                    className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all ${
                      idx === 0 ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                    Kullanım Oranları
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-slate-500 mb-1">2022</div>
                      <div className="text-3xl font-bold text-white">%8</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-1">2023</div>
                      <div className="text-3xl font-bold text-white">%8.45</div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                    Yolcu Profili
                  </span>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Ücretsiz', value: 1788594, color: '#10B981' },
                      { label: 'İndirimli', value: 479766, color: '#F59E0B' },
                      { label: 'Öğrenci', value: 4674767, color: '#3B82F6' },
                      { label: 'Tam', value: 7621731, color: '#6B7280' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
                          <span className="text-xs font-bold text-white">{(item.value / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${(item.value / 8000000) * 100}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Green Transport & Payment Stats */}
            <div className="stat-card bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Yeşil Ulaşım Payı
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative shrink-0">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="52" stroke="rgba(255,255,255,0.2)" strokeWidth="14" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="white"
                      strokeWidth="14"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - 29 / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold text-white">%29</div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-white/90 leading-relaxed">
                    Ulaşımda 1 litre benzinin yakılması ile 2.33 kg ve 1 lt dizel yakıtın yakılması ile de 2.77 kg karbondioksit açığa çıkıyor.
                    Oysa elektrikli araçlarda hareket halinde karbon salımı 0! İzmit'te elektrikli toplu ulaşım hizmeti sağlayan tramvaylar
                    2020 de 1.182.608 km yol kat edilmiştir.
                  </p>
                </div>
              </div>
            </div>

            {/* Toplu Taşımada Ödeme */}
            <div className="stat-card bg-slate-900/95 border border-slate-800/80 rounded-xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-amber-400 mb-5 uppercase tracking-wider">Ödeme Yöntemleri</h3>
              <div className="flex items-center justify-start gap-8">
                <div className="relative w-40 h-40 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="20" fill="none" />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#10B981"
                      strokeWidth="20"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.81)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-xs text-slate-400 uppercase mb-1">Kart</div>
                    <div className="text-2xl font-bold text-white">182M</div>
                  </div>
                </div>
                <div className="flex-1">
                  <div>
                    <div className="text-xs text-slate-400 uppercase mb-2">Kredi Kart</div>
                    <div className="text-2xl font-bold text-white mb-2">42.966.193</div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-xs">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: '19%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'building':
        return <BuildingStats />;

      case 'population':
        return <PopulationStats />;

      case 'life':
        return <LifeStats />;

      case 'environment':
        return <EnvironmentStats />;

      case 'environment_old':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="stat-card lg:col-span-2 bg-gradient-to-br from-slate-900/95 via-emerald-900/20 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                Çevre Göstergeleri
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="stat-item bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
                  <div className="text-sm text-green-300 mb-2">Ağaç Sayısı</div>
                  <div className="text-4xl font-bold text-white">
                    <AnimatedNumber value={842450} />
                  </div>
                  <div className="text-xs text-green-200 mt-2">
                    +<AnimatedNumber value={15230} /> (2023)
                  </div>
                </div>
                <div className="stat-item bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                  <div className="text-sm text-blue-300 mb-2">Geri Dönüşüm Oranı</div>
                  <div className="text-4xl font-bold text-white">
                    %<AnimatedNumber value={42} />
                  </div>
                  <div className="text-xs text-blue-200 mt-2">Hedef: %65 (2025)</div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Hava Kalitesi İndeksi', value: 48, max: 100, color: '#10B981', status: 'İyi' },
                  { label: 'Yeşil Alan Oranı', value: 35, max: 50, color: '#3B82F6', status: 'Hedef: %50' },
                ].map((item, index) => (
                  <div key={index} className="stat-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-sm text-slate-400">{item.status}</span>
                    </div>
                    <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 rounded-full"
                        style={{ width: `${(item.value / item.max) * 100}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card bg-gradient-to-br from-slate-900/95 via-green-900/30 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-green-400/40 shadow-xl shadow-green-500/10">
              <h4 className="text-xl font-bold text-white mb-6">Enerji Verimliliği</h4>
              <div className="space-y-5">
                <div className="stat-item">
                  <AnimatedCircleProgress percentage={68} />
                </div>
                <div className="text-sm text-green-200 text-center">
                  Yenilenebilir enerji kullanımında %<AnimatedNumber value={23} /> artış
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return <EducationStats />;

      default:
        return null;
    }
  };

  return (
    <div ref={sectionRef} className="relative w-full bg-slate-950 py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_65%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(100,149,237,0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-blue-400/30">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-sm font-bold tracking-wide">İSTATİSTİKLER</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            Şehir Verileri
          </h2>
          <p className="text-slate-400 text-lg">
            Kocaeli'nin kapsamlı istatistikleri
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const tabColors = {
              transport: { bg: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/50', text: 'text-white' },
              building: { bg: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/50', text: 'text-white' },
              population: { bg: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/50', text: 'text-white' },
              life: { bg: 'from-rose-500 to-pink-600', shadow: 'shadow-rose-500/50', text: 'text-white' },
              environment: { bg: 'from-emerald-500 to-green-600', shadow: 'shadow-emerald-500/50', text: 'text-white' },
              education: { bg: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/50', text: 'text-white' },
            };
            const colors = tabColors[tab.id as keyof typeof tabColors];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${colors.bg} ${colors.text} shadow-lg ${colors.shadow}`
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-600/50'
                }`}
                style={{
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          ref={contentRef}
          className="relative"
          style={{
            perspective: '1500px',
            transformStyle: 'preserve-3d',
          }}
        >
          {renderContent()}
        </div>
      </div>

    </div>
  );
};
