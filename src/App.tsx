import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollVideo } from './components/ScrollVideo';
import { LiveCityData } from './components/LiveCityData';
import { ScrollFlipCards } from './components/ScrollFlipCards';
import { InteractiveCityMap } from './components/InteractiveCityMap';
import { CityMap } from './components/CityMap';
import { ProjectModal } from './components/ProjectModal';
import { TransportationStats } from './components/TransportationStats';
import { TabbedStatsSection } from './components/TabbedStatsSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { CitizenIdeas } from './components/CitizenIdeas';
import { CityZone } from './lib/supabase';
import { mockZones } from './data/mockData';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  "https://beyincikisleri.co/customer/akillikbb/2son.mp4",
  "https://beyincikisleri.co/customer/akillikbb/hero-video.mp4"
];

function App() {
  const [zones, setZones] = useState<CityZone[]>([]);
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedZone, setSelectedZone] = useState<CityZone | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const dataSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (!selectedZone) return;

    const handleScroll = () => {
      setSelectedZone(null);
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedZone]);

  useEffect(() => {
    if (zones.length > 0 && mapSectionRef.current) {
      setupScrollAnimations();
    }
  }, [zones]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Reset video when source changes
    video.load();

    const attemptPlay = () => {
      video.play().catch(err => {
        console.log('Video autoplay prevented, trying again on interaction:', err);
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('scroll', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('scroll', playOnInteraction, { once: true });
      });
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('loadeddata', attemptPlay);
    };
  }, [currentVideoIndex]);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const loadAllData = async () => {
    try {
      setLoadingProgress(10);

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoadingProgress(40);

      // Load zones from mock data
      setZones(mockZones);
      setLoadingProgress(70);

      await new Promise(resolve => setTimeout(resolve, 400));
      setLoadingProgress(100);

      // Wait a bit for smooth transition
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }, 300);
    } catch (error) {
      console.error('Error loading data:', error);
      // Still show the site even if there's an error
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }, 500);
    }
  };

  const setupScrollAnimations = () => {
    const ctx = gsap.context(() => {
      gsap.from('.map-section', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: '.map-section',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      gsap.to('.footer-lights', {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray('.bg-blob').forEach((blob: any, index) => {
        gsap.to(blob, {
          x: `${Math.sin(index) * 100}`,
          y: `${Math.cos(index) * 100}`,
          scale: 1.2,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, mapSectionRef);

    return () => ctx.revert();
  };

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className={`relative text-center transition-all duration-500 ${fadeOut ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}>
          <div className="mb-8 relative">
            <div className="w-24 h-24 border-4 border-blue-500/30 rounded-full mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDuration: '0.8s' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg font-bold text-white">
                {loadingProgress}%
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">
            Akıllı Şehir Kocaeli
          </h2>
          <p className="text-blue-200 text-lg mb-6">Veriler yükleniyor...</p>

          <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-950">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

        <div className="absolute inset-0 opacity-30">
          <div className="bg-blob absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="bg-blob absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="bg-blob absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="bg-blob absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="bg-blob absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <Header />

      <div
        ref={videoContainerRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70" />
      </div>

      <div className="relative z-10">
        <Hero videoRef={videoRef} />

        <LiveCityData containerRef={dataSectionRef} />

        <ScrollFlipCards />

        <InteractiveCityMap />

        <TabbedStatsSection />
      </div>

      <div id="projects" ref={mapSectionRef} className="map-section relative min-h-screen bg-gray-950">
        <div className="absolute inset-0">
          <img
            src="https://beyincikisleri.co/customer/akillikbb/kbb-isometrik.png"
            alt="Kocaeli İzometrik Harita"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-7xl h-[80vh] relative">
            <CityMap
              zones={zones}
              activeZoneIndex={activeZoneIndex}
              onZoneClick={setSelectedZone}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <FeaturedProjects />
      </div>

      <div className="relative z-10">
        <CitizenIdeas />
      </div>

      <footer id="contact" className="relative z-20 bg-gray-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="footer-lights absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Akıllı Şehir Kocaeli</h3>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Dijital dönüşüm projeleri ile şehrimizi geleceğe taşıyoruz. Teknoloji, sürdürülebilirlik ve yenilikçilik bir arada.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>© 2024 Kocaeli Büyükşehir Belediyesi</span>
            <span>•</span>
            <span>Dijital Şehir Haritası</span>
          </div>
        </div>
      </footer>

      {selectedZone && (
        <ProjectModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
      )}
    </div>
  );
}

export default App;
