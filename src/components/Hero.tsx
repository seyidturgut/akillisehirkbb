import React, { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, Zap, Globe, Network } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onTriggerAR: () => void;
}

export const Hero: React.FC<HeroProps> = ({ videoRef, onTriggerAR }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!heroRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-title', {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        });

        gsap.from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        });


        gsap.to('.scroll-indicator', {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.4,
          ease: 'power2.out',
        });

        gsap.to('.scroll-indicator', {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.4,
        });
      }, heroRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      icon: Sparkles,
      title: '6 Akıllı Bölge',
      description: 'Dijital dönüşüm projeleri',
      color: '#0EA5E9',
    },
    {
      icon: Zap,
      title: 'Gerçek Zamanlı',
      description: 'Veri ve izleme sistemleri',
      color: '#10B981',
    },
    {
      icon: Globe,
      title: 'Sürdürülebilir',
      description: 'Çevre dostu teknolojiler',
      color: '#8B5CF6',
    },
    {
      icon: Network,
      title: 'Bağlantılı',
      description: 'IoT ve akıllı sensörler',
      color: '#F59E0B',
    },
  ];

  return (
    <div id="home" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-0">

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-6 border border-white/20">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-white text-sm font-semibold">Kocaeli Büyükşehir Belediyesi</span>
        </div>

        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl">
          Akıllı Şehir Kocaeli
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-light">
          Akıllı çözümlerle şekillenen Kocaeli'nin geleceği
        </p>

        {/* AR Entry Point for Mobile/Desktop */}
        <button
          onClick={onTriggerAR}
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 mb-12 border border-white/20 group animate-in slide-in-from-bottom-5 delay-500 fill-mode-backwards"
        >
          <Globe className="w-6 h-6 animate-pulse" />
          <span>AR Özelliklerini Keşfet</span>
          <div className="w-2 h-2 bg-green-400 rounded-full" />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group opacity-100"
              style={{ transform: 'translateY(0px)' }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <card.icon className="w-7 h-7" style={{ color: card.color }} />
              </div>
              <h3 className="font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/80">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full">
          <button
            onClick={scrollToFeatures}
            className="scroll-indicator opacity-0 flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform duration-300 group"
            aria-label="Keşfetmeye Başla"
          >
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Keşfetmeye Başla</span>
            <ChevronDown className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};
