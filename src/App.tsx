import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveCityData } from './components/LiveCityData';
import { ScrollFlipCards } from './components/ScrollFlipCards';
import { InteractiveCityMap } from './components/InteractiveCityMap';
import { CityMap } from './components/CityMap';
import { ProjectModal } from './components/ProjectModal';
import { TabbedStatsSection } from './components/TabbedStatsSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { CitizenIdeas } from './components/CitizenIdeas';
import { LoadingScreen } from './components/LoadingScreen';
import { ARCityGuide } from './features/ARCityGuide/components/ARCityGuide';
import { ARComplaint } from './features/ARComplaint/components/ARComplaint';
import { CityDataOverlay } from './features/CityDataOverlay/components/CityDataOverlay';
import { MapPin, Globe, AlertCircle, BarChart2 } from 'lucide-react';
import { CityZone } from './lib/supabase';
import { mockZones } from './data/mockData';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  "https://beyincikisleri.co/customer/akillikbb/2son.mp4",
  "https://beyincikisleri.co/customer/akillikbb/hero-video.mp4"
];

function App() {
  const [zones, setZones] = useState<CityZone[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedZone, setSelectedZone] = useState<CityZone | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showARGuide, setShowARGuide] = useState(false);
  const [showARComplaint, setShowARComplaint] = useState(false);
  const [showDataOverlay, setShowDataOverlay] = useState(false);
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

  return (
    <div className="relative bg-[#050510] min-h-screen">
      {loading && <LoadingScreen progress={loadingProgress} fadeOut={fadeOut} />}

      <div className={`relative transition-opacity duration-1000 ${!fadeOut && loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
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
            className="absolute inset-0 w-full h-full object-cover opacity-75"
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/50" />
        </div>

        <div className="relative z-10">
          <Hero videoRef={videoRef} />

          <div id="data">
            <LiveCityData containerRef={dataSectionRef} />
          </div>

          <ScrollFlipCards />

          <InteractiveCityMap />

          <div id="open-data">
            <TabbedStatsSection />
          </div>
        </div>

        <div id="projects" ref={mapSectionRef} className="map-section relative z-10 min-h-screen bg-gray-900">
          <div className="absolute inset-0">
            <img
              src="https://beyincikisleri.co/customer/akillikbb/kbb-isometrik.png"
              alt="Kocaeli İzometrik Harita"
              className="w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
          <div className="relative h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-7xl h-[80vh] relative">
              <CityMap
                zones={zones}
                onZoneClick={setSelectedZone}
              />
            </div>
          </div>
        </div>

        <div id="about" className="relative z-10">
          <FeaturedProjects />
        </div>

        <div id="feedback" className="relative z-10">
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

      {/* AR Features Utility Stack */}
      <div className="fixed bottom-8 left-8 z-[1000] flex flex-col gap-4">
        <button
          onClick={() => setShowDataOverlay(true)}
          className="group relative flex items-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <BarChart2 className="w-6 h-6" />
          </div>
          <span className="max-w-[0px] overflow-hidden whitespace-nowrap group-hover:max-w-[200px] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            Canlı Veriler
          </span>
          <div className="absolute bottom-full left-0 mb-4 px-3 py-2 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-lg text-xs font-medium text-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-y-2 group-hover:translate-y-0 duration-300">
            Hava & Trafik Overlay
          </div>
        </button>

        <button
          onClick={() => setShowARComplaint(true)}
          className="group relative flex items-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl shadow-[0_20px_50px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <AlertCircle className="w-6 h-6" />
          </div>
          <span className="max-w-[0px] overflow-hidden whitespace-nowrap group-hover:max-w-[200px] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            Sorun Bildir (AR)
          </span>
          <div className="absolute bottom-full left-0 mb-4 px-3 py-2 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-lg text-xs font-medium text-red-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-y-2 group-hover:translate-y-0 duration-300">
            Hızlı Şikayet Bildirimi
          </div>
        </button>

        <button
          onClick={() => setShowARGuide(true)}
          className="group relative flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <Globe className="w-6 h-6 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full" />
          </div>
          <span className="max-w-[0px] overflow-hidden whitespace-nowrap group-hover:max-w-[200px] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            Şehri Keşfet (AR)
          </span>
          <div className="absolute bottom-full left-0 mb-4 px-3 py-2 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-lg text-xs font-medium text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-y-2 group-hover:translate-y-0 duration-300">
            AR Rehberi & Etkileşimli Görünüm
          </div>
        </button>
      </div>

      {showARGuide && (
        <ARCityGuide onClose={() => setShowARGuide(false)} />
      )}

      {showARComplaint && (
        <ARComplaint onClose={() => setShowARComplaint(false)} />
      )}

      {showDataOverlay && (
        <CityDataOverlay onClose={() => setShowDataOverlay(false)} />
      )}
    </div>
  );
}

export default App;
