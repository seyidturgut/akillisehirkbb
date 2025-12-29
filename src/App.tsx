import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveCityData } from './components/LiveCityData';
import { ScrollFlipCards } from './components/ScrollFlipCards';
import { TabbedStatsSection } from './components/TabbedStatsSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { CitizenIdeas } from './components/CitizenIdeas';
import { LoadingScreen } from './components/LoadingScreen';
import { ARCityGuide } from './features/ARCityGuide/components/ARCityGuide';
import { ARComplaint } from './features/ARComplaint/components/ARComplaint';
import { CityDataOverlay } from './features/CityDataOverlay/components/CityDataOverlay';
import { ARFeaturesModal } from './features/ARToolbox/components/ARFeaturesModal';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  "https://beyincikisleri.co/customer/akillikbb/2son.mp4",
  "https://beyincikisleri.co/customer/akillikbb/hero-video.mp4"
];

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showARGuide, setShowARGuide] = useState(false);
  const [showARComplaint, setShowARComplaint] = useState(false);
  const [showDataOverlay, setShowDataOverlay] = useState(false);
  const [showARMenuModal, setShowARMenuModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const dataSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
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
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoadingProgress(40);
      setLoadingProgress(70);
      await new Promise(resolve => setTimeout(resolve, 400));
      setLoadingProgress(100);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }, 300);
    } catch (error) {
      console.error('Error loading data:', error);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }, 500);
    }
  };

  return (
    <div className="relative bg-[#050510] min-h-screen">
      {loading && <LoadingScreen progress={loadingProgress} fadeOut={fadeOut} />}

      <div className={`relative transition-opacity duration-1000 ${!fadeOut && loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Header />

        {/* Video Hero Background */}
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

        <main className="relative z-10">
          <Hero videoRef={videoRef} onTriggerAR={() => setShowARMenuModal(true)} />

          <div id="data">
            <LiveCityData containerRef={dataSectionRef} />
          </div>

          <ScrollFlipCards />

          <div id="open-data">
            <TabbedStatsSection />
          </div>

          <div id="about">
            <FeaturedProjects />
          </div>

          <div id="feedback">
            <CitizenIdeas />
          </div>

          <footer id="contact" className="relative bg-gray-950 text-white py-16 overflow-hidden border-t border-white/5">
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
              <h3 className="text-3xl font-bold mb-4">Akıllı Şehir Kocaeli</h3>
              <p className="text-blue-200 mb-6 max-w-2xl mx-auto opacity-70">
                Dijital dönüşüm projeleri ile şehrimizi geleceğe taşıyoruz. Teknoloji, sürdürülebilirlik ve yenilikçilik bir arada.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                <span>© 2024 Kocaeli Büyükşehir Belediyesi</span>
                <span className="hidden md:block">•</span>
                <span>Dijital Dönüşüm Ofisi</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* AR Feature Overlays & Modals */}
      {showARMenuModal && (
        <ARFeaturesModal
          onClose={() => setShowARMenuModal(false)}
          onOpenGuide={() => setShowARGuide(true)}
          onOpenComplaint={() => setShowARComplaint(true)}
          onOpenData={() => setShowDataOverlay(true)}
        />
      )}

      {showARGuide && <ARCityGuide onClose={() => setShowARGuide(false)} />}
      {showARComplaint && <ARComplaint onClose={() => setShowARComplaint(false)} />}
      {showDataOverlay && <CityDataOverlay onClose={() => setShowDataOverlay(false)} />}
    </div>
  );
}

export default App;
