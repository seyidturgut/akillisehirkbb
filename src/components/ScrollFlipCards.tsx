import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Zap, Shield, Leaf, Users, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Activity,
    title: 'Gerçek Zamanlı İzleme',
    description: 'Şehir verilerini anlık olarak takip edin',
    color: '#0EA5E9',
  },
  {
    icon: Zap,
    title: 'Akıllı Enerji',
    description: 'Sürdürülebilir ve verimli enerji yönetimi',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    title: 'Güvenli Altyapı',
    description: 'Şehir güvenliği için entegre sistemler',
    color: '#10B981',
  },
  {
    icon: Leaf,
    title: 'Çevre Dostu',
    description: 'Yeşil teknolojiler ve temiz hava',
    color: '#059669',
  },
  {
    icon: Users,
    title: 'Vatandaş Odaklı',
    description: 'Halkın ihtiyaçlarına yönelik çözümler',
    color: '#EC4899',
  },
  {
    icon: Cpu,
    title: 'IoT & AI',
    description: 'Yapay zeka destekli akıllı sistemler',
    color: '#8B5CF6',
  },
];

export const ScrollFlipCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsWrapperRef.current) return;

    const cards = cardsWrapperRef.current.querySelectorAll('.flip-card');

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Akıllı Şehir Özellikleri
          </h2>
          <p className="text-gray-400 text-lg">
            Teknoloji ile yaşamı kolaylaştıran çözümler
          </p>
        </div>

        <div
          ref={cardsWrapperRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flip-card"
            >
              <div
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 group overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="absolute inset-0 blur-xl opacity-30"
                    style={{ backgroundColor: feature.color }}
                  />
                </div>

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold" style={{ color: feature.color }}>
                    <span>Detayları Keşfet</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ backgroundColor: feature.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
