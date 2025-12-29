import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Wifi,
  Camera,
  Lightbulb,
  Droplets,
  Wind,
  Car,
  Zap,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DataPoint {
  id: number;
  type: 'sensor' | 'camera' | 'light' | 'parking' | 'station' | 'livecam';
  position: { x: number; y: number };
  title: string;
  description: string;
  status: 'active' | 'warning' | 'inactive';
  data: {
    label: string;
    value: string;
  }[];
  icon: React.FC<{ className?: string }>;
  color: string;
  url?: string;
}

export const InteractiveCityMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const dataPoints: DataPoint[] = [
    {
      id: 1,
      type: 'sensor',
      position: { x: 15, y: 25 },
      title: 'Hava Kalitesi Sensörü',
      description: 'İzmit Merkez - Gerçek zamanlı hava kalitesi ölçümü',
      status: 'active',
      data: [
        { label: 'PM2.5', value: '35 µg/m³' },
        { label: 'CO₂', value: '410 ppm' },
        { label: 'Sıcaklık', value: '24°C' },
      ],
      icon: Wind,
      color: '#10B981',
    },
    {
      id: 2,
      type: 'camera',
      position: { x: 75, y: 30 },
      title: 'Akıllı Trafik Kamerası',
      description: 'Gebze Kavşağı - Trafik yoğunluğu analizi',
      status: 'active',
      data: [
        { label: 'Araç Sayısı', value: '142' },
        { label: 'Ortalama Hız', value: '45 km/s' },
        { label: 'Yoğunluk', value: 'Orta' },
      ],
      icon: Camera,
      color: '#F59E0B',
    },
    {
      id: 3,
      type: 'light',
      position: { x: 45, y: 60 },
      title: 'Akıllı Sokak Aydınlatması',
      description: 'Körfez Caddesi - Enerji tasarruflu LED',
      status: 'active',
      data: [
        { label: 'Güç', value: '65%' },
        { label: 'Tasarruf', value: '1.2 kWh' },
        { label: 'Durum', value: 'Aktif' },
      ],
      icon: Lightbulb,
      color: '#FBBF24',
    },
    {
      id: 4,
      type: 'parking',
      position: { x: 30, y: 70 },
      title: 'Akıllı Park Sistemi',
      description: 'Otopark A - Doluluk oranı takibi',
      status: 'warning',
      data: [
        { label: 'Doluluk', value: '85%' },
        { label: 'Boş Yer', value: '23' },
        { label: 'Kapasite', value: '150' },
      ],
      icon: Car,
      color: '#EF4444',
    },
    {
      id: 5,
      type: 'station',
      position: { x: 60, y: 45 },
      title: 'Şarj İstasyonu',
      description: 'E-Şarj Noktası - Elektrikli araç şarj',
      status: 'active',
      data: [
        { label: 'Kullanımda', value: '3/8' },
        { label: 'Güç', value: '50 kW' },
        { label: 'Durum', value: 'Müsait' },
      ],
      icon: Zap,
      color: '#8B5CF6',
    },
    {
      id: 6,
      type: 'sensor',
      position: { x: 80, y: 65 },
      title: 'Su Kalitesi Sensörü',
      description: 'Gölcük Sahil - Su kalitesi izleme',
      status: 'active',
      data: [
        { label: 'pH', value: '7.2' },
        { label: 'Sıcaklık', value: '18°C' },
        { label: 'Oksijen', value: '8.5 mg/L' },
      ],
      icon: Droplets,
      color: '#0EA5E9',
    },
    {
      id: 7,
      type: 'sensor',
      position: { x: 20, y: 45 },
      title: 'Gürültü Sensörü',
      description: 'Derince - Çevresel gürültü ölçümü',
      status: 'active',
      data: [
        { label: 'Seviye', value: '58 dB' },
        { label: 'Durum', value: 'Normal' },
        { label: 'Zirve', value: '72 dB' },
      ],
      icon: Wifi,
      color: '#06B6D4',
    },
    {
      id: 8,
      type: 'camera',
      position: { x: 85, y: 40 },
      title: 'Güvenlik Kamerası',
      description: 'Park Alanı - 7/24 izleme',
      status: 'active',
      data: [
        { label: 'Durum', value: 'Aktif' },
        { label: 'Kayıt', value: 'Açık' },
        { label: 'Görüş', value: '360°' },
      ],
      icon: Camera,
      color: '#F59E0B',
    },
    {
      id: 9,
      type: 'livecam',
      position: { x: 50, y: 30 },
      title: 'İzmit Milli İrade Meydanı',
      description: 'Canlı Kamera - 7/24 Yayın',
      status: 'active',
      data: [
        { label: 'Durum', value: 'Canlı Yayında' },
        { label: 'Konum', value: 'İzmit' },
        { label: 'Görüntü', value: 'HD' },
      ],
      icon: Camera,
      color: '#EF4444',
      url: 'https://kocaeliyiseyret.com/Kamera/Index/izmit-milli-irade-meydani/3092',
    },
    {
      id: 10,
      type: 'livecam',
      position: { x: 55, y: 35 },
      title: 'İzmit Cumhuriyet Bulvarı-1',
      description: 'Canlı Kamera - 7/24 Yayın',
      status: 'active',
      data: [
        { label: 'Durum', value: 'Canlı Yayında' },
        { label: 'Konum', value: 'İzmit' },
        { label: 'Görüntü', value: 'HD' },
      ],
      icon: Camera,
      color: '#EF4444',
      url: 'https://kocaeliyiseyret.com/Kamera/Index/izmit-cumhuriyet-bulvari1/2033',
    },
    {
      id: 11,
      type: 'livecam',
      position: { x: 48, y: 38 },
      title: 'Kocaeli Büyükşehir Belediyesi',
      description: 'Canlı Kamera - 7/24 Yayın',
      status: 'active',
      data: [
        { label: 'Durum', value: 'Canlı Yayında' },
        { label: 'Konum', value: 'İzmit' },
        { label: 'Görüntü', value: 'HD' },
      ],
      icon: Camera,
      color: '#EF4444',
      url: 'https://kocaeliyiseyret.com/Kamera/Index/kocaeli-buyuksehir-belediyesi/2073',
    },
    {
      id: 12,
      type: 'livecam',
      position: { x: 52, y: 32 },
      title: 'İzmit Kent Meydanı',
      description: 'Canlı Kamera - 7/24 Yayın',
      status: 'active',
      data: [
        { label: 'Durum', value: 'Canlı Yayında' },
        { label: 'Konum', value: 'İzmit' },
        { label: 'Görüntü', value: 'HD' },
      ],
      icon: Camera,
      color: '#EF4444',
      url: 'https://kocaeliyiseyret.com/Kamera/Index/izmit-kent-meydani/21',
    },
  ];

  useEffect(() => {
    if (!selectedPoint) return;

    const handleScroll = () => {
      setSelectedPoint(null);
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedPoint]);

  useEffect(() => {
    if (!mapRef.current) return;

    const ctx = gsap.context(() => {
      const title = mapRef.current!.querySelector('.map-title');
      const subtitle = mapRef.current!.querySelector('.map-subtitle');
      const container = mapRef.current!.querySelector('.map-container');
      const points = mapRef.current!.querySelectorAll('.data-point');

      gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(subtitle, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(container, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      points.forEach((point, index) => {
        gsap.from(point, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          delay: 0.8 + index * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, mapRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'inactive':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div ref={mapRef} className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-blue-500/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="map-title text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Etkileşimli Şehir Haritası
          </h2>
          <p className="map-subtitle text-blue-200/80 text-base md:text-lg max-w-2xl mx-auto font-light">
            Projelerimizin ve canlı veri noktalarımızın konumlarını keşfedin
          </p>
        </div>

        <div className="map-container relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://beyincikisleri.co/customer/akillikbb/kbb-isometrik.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/70" />

            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, transparent 1px, transparent 60px)',
              }}
            />

            {dataPoints.map((point) => (
              <div
                key={point.id}
                className="data-point absolute cursor-pointer group"
                style={{
                  left: `${point.position.x}%`,
                  top: `${point.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => setSelectedPoint(point)}
              >
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-full blur-xl ${getStatusColor(point.status)} opacity-50 group-hover:opacity-75 transition-opacity animate-pulse`}
                  />

                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border-2 border-white/30 group-hover:scale-125 transition-transform duration-300 shadow-xl"
                    style={{
                      backgroundColor: `${point.color}30`,
                    }}
                  >
                    <point.icon className="w-6 h-6" style={{ color: point.color }} />
                  </div>

                  <div
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(point.status)} border-2 border-gray-900 animate-pulse`}
                  />

                  {hoveredPoint === point.id && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl p-3 border border-white/20 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <p className="text-white font-semibold text-sm mb-1">{point.title}</p>
                      <p className="text-gray-400 text-xs">{point.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-gray-300">Aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-300">Uyarı</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-300">Pasif</span>
            </div>
            <div className="ml-4 text-sm text-gray-400">
              Toplam {dataPoints.length} veri noktası
            </div>
          </div>
        </div>
      </div>

      {selectedPoint && (
        <div
          className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-[1000] animate-in fade-in duration-200"
          onClick={() => setSelectedPoint(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: `${selectedPoint.color}30`,
                  }}
                >
                  <selectedPoint.icon className="w-7 h-7" style={{ color: selectedPoint.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedPoint.title}</h3>
                  <p className="text-sm text-gray-400">{selectedPoint.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedPoint.data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <span className="text-gray-400 text-sm font-medium">{item.label}</span>
                  <span className="text-white text-lg font-bold">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedPoint.status)}`} />
              <span className="text-emerald-300 text-sm font-semibold">
                {selectedPoint.status === 'active' && 'Çalışıyor'}
                {selectedPoint.status === 'warning' && 'Uyarı Durumu'}
                {selectedPoint.status === 'inactive' && 'Pasif'}
              </span>
            </div>

            {selectedPoint.type === 'livecam' && selectedPoint.url && (
              <div className="mt-6">
                <a
                  href={selectedPoint.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                >
                  <Camera className="w-5 h-5" />
                  <span>Canlı Yayını İzle</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
