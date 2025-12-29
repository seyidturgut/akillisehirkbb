import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Network,
  Camera,
  Car,
  Lightbulb,
  Droplets,
  Activity,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  location: string;
  startDate: string;
  endDate?: string;
  budget: string;
  beneficiaries: string;
  icon: React.FC<{ className?: string; color?: string; size?: string | number }>;
  color: string;
  image: string;
  stats: {
    label: string;
    value: string;
    icon: React.FC<{ className?: string }>;
  }[];
  features: string[];
}

export const FeaturedProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'planned'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Akıllı Trafik Yönetim Sistemi',
      category: 'Ulaşım',
      description: 'Yapay zeka destekli trafik akışı optimizasyonu ve gerçek zamanlı izleme sistemi',
      longDescription:
        'Kocaeli genelindeki 150+ kavşakta yapay zeka destekli trafik yönetim sistemi. Gerçek zamanlı kamera analitiği ile trafik akışını optimize eder ve acil durum araçlarına öncelik verir.',
      status: 'completed',
      progress: 100,
      location: 'Kocaeli Geneli',
      startDate: '2023-01',
      endDate: '2024-06',
      budget: '45M TL',
      beneficiaries: '2M+ Vatandaş',
      icon: Car,
      color: '#F59E0B',
      image: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=1200',
      stats: [
        { label: 'Trafik Azalması', value: '%35', icon: TrendingUp },
        { label: 'Bekleme Süresi', value: '-8dk', icon: Clock },
        { label: 'Kapsama', value: '150+', icon: MapPin },
      ],
      features: [
        'AI destekli trafik analizi',
        'Gerçek zamanlı kamera izleme',
        'Akıllı sinyalizasyon',
        'Mobil uygulama entegrasyonu',
        'Acil araç öncelik sistemi',
      ],
    },
    {
      id: 2,
      title: 'Akıllı Aydınlatma Projesi',
      category: 'Enerji',
      description: 'IoT sensörlü LED aydınlatma ile %65 enerji tasarrufu sağlayan şehir çapında proje',
      longDescription:
        '12,000+ LED aydınlatma noktası ile şehir çapında akıllı aydınlatma. Hareket sensörleri ve hava durumu verilerine göre otomatik ayarlama yaparak maksimum enerji tasarrufu sağlar.',
      status: 'completed',
      progress: 100,
      location: 'İzmit, Gebze, Körfez',
      startDate: '2022-09',
      endDate: '2024-03',
      budget: '38M TL',
      beneficiaries: '1.5M Vatandaş',
      icon: Lightbulb,
      color: '#FBBF24',
      image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=1200',
      stats: [
        { label: 'Enerji Tasarrufu', value: '%65', icon: TrendingUp },
        { label: 'LED Nokta', value: '12K+', icon: Lightbulb },
        { label: 'Yıllık Tasarruf', value: '8.5M TL', icon: Activity },
      ],
      features: [
        'IoT sensör entegrasyonu',
        'Otomatik parlaklık ayarı',
        'Uzaktan kontrol sistemi',
        'Arıza tespit ve bildirim',
        'Enerji tüketim raporları',
      ],
    },
    {
      id: 3,
      title: 'Akıllı Su Yönetimi',
      category: 'Altyapı',
      description: 'Akıllı sensörlerle su kalitesi izleme ve sızıntı tespit sistemi',
      longDescription:
        'Şebeke boyunca yerleştirilen 500+ sensör ile su kalitesini anlık izleme ve sızıntıları hızlı tespit etme sistemi. Su kayıplarını minimize ederek sürdürülebilir su yönetimi sağlar.',
      status: 'in-progress',
      progress: 75,
      location: 'Kocaeli Geneli',
      startDate: '2023-06',
      budget: '52M TL',
      beneficiaries: '2M+ Vatandaş',
      icon: Droplets,
      color: '#0EA5E9',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1200',
      stats: [
        { label: 'Su Tasarrufu', value: '%28', icon: TrendingUp },
        { label: 'Sensör Sayısı', value: '500+', icon: Activity },
        { label: 'Tamamlanma', value: '%75', icon: CheckCircle2 },
      ],
      features: [
        'Gerçek zamanlı su kalitesi ölçümü',
        'Otomatik sızıntı tespiti',
        'Uzaktan okuma sistemi',
        'Tüketim analizi ve raporlama',
        'Erken uyarı sistemi',
      ],
    },
    {
      id: 4,
      title: 'Akıllı Park Sistemi',
      category: 'Ulaşım',
      description: 'IoT sensörlü akıllı park yönetimi ve mobil ödeme sistemi',
      longDescription:
        '3,500 park yeri için gerçek zamanlı doluluk takibi, mobil uygulama ile park yeri rezervasyonu ve dijital ödeme imkanı sunan entegre sistem.',
      status: 'in-progress',
      progress: 60,
      location: 'İzmit Merkez',
      startDate: '2024-01',
      budget: '18M TL',
      beneficiaries: '500K+ Sürücü',
      icon: Car,
      color: '#8B5CF6',
      image: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=1200',
      stats: [
        { label: 'Park Yeri', value: '3,500', icon: MapPin },
        { label: 'Zaman Tasarrufu', value: '-12dk', icon: Clock },
        { label: 'Tamamlanma', value: '%60', icon: CheckCircle2 },
      ],
      features: [
        'Gerçek zamanlı doluluk takibi',
        'Mobil uygulama rezervasyonu',
        'Dijital ödeme entegrasyonu',
        'Park yeri navigasyonu',
        'İstatistik ve raporlama',
      ],
    },
    {
      id: 5,
      title: '5G Akıllı Şehir Altyapısı',
      category: 'Teknoloji',
      description: 'Şehir çapında 5G altyapı kurulumu ve IoT cihaz entegrasyonu',
      longDescription:
        'Kocaeli genelinde 200+ 5G baz istasyonu kurulumu ile yüksek hızlı internet erişimi ve IoT cihazlar için düşük gecikmeli iletişim altyapısı.',
      status: 'in-progress',
      progress: 45,
      location: 'Kocaeli Geneli',
      startDate: '2024-03',
      budget: '125M TL',
      beneficiaries: '2M+ Vatandaş',
      icon: Network,
      color: '#10B981',
      image: 'https://images.pexels.com/photos/5474287/pexels-photo-5474287.jpeg?auto=compress&cs=tinysrgb&w=1200',
      stats: [
        { label: 'Baz İstasyonu', value: '200+', icon: Network },
        { label: 'Kapsama', value: '%85', icon: Activity },
        { label: 'Tamamlanma', value: '%45', icon: CheckCircle2 },
      ],
      features: [
        '5G baz istasyonu kurulumu',
        'Fiber optik altyapı',
        'IoT cihaz bağlantısı',
        'Düşük gecikmeli iletişim',
        'Yüksek hız veri aktarımı',
      ],
    },
    {
      id: 6,
      title: 'Akıllı Güvenlik Sistemi',
      category: 'Güvenlik',
      description: 'AI destekli video analitik ve acil durum yönetim sistemi',
      longDescription:
        '800+ akıllı kamera ile şehir çapında güvenlik izleme. Yapay zeka destekli anormallik tespiti, yüz tanıma ve acil durum otomasyonu.',
      status: 'planned',
      progress: 15,
      location: 'Kocaeli Geneli',
      startDate: '2024-09',
      budget: '67M TL',
      beneficiaries: '2M+ Vatandaş',
      icon: Camera,
      color: '#EF4444',
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      stats: [
        { label: 'Kamera Sayısı', value: '800+', icon: Camera },
        { label: 'Kapsama', value: '%95', icon: MapPin },
        { label: 'Planlama', value: '%15', icon: CheckCircle2 },
      ],
      features: [
        'AI video analitik',
        'Yüz tanıma sistemi',
        'Anormallik tespiti',
        'Acil durum otomasyonu',
        'Merkezi komuta kontrol',
      ],
    },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  useEffect(() => {
    if (!selectedProject) return;

    const handleScroll = () => {
      setSelectedProject(null);
    };

    // We add a small delay to avoid immediate closure if the click triggers a tiny scroll
    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedProject]);

  useEffect(() => {
    // Simüle edilmiş yükleme (gerçek projede API'den gelecek)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // ScrollTrigger.refresh is still useful to ensure layout is correct 
    // but we remove the specific animations as requested.
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Tamamlandı',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'in-progress':
        return {
          label: 'Devam Ediyor',
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        };
      case 'planned':
        return {
          label: 'Planlanıyor',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
      default:
        return {
          label: 'Bilinmeyen',
          color: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
        };
    }
  };

  return (
    <div ref={sectionRef} className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-emerald-500/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="projects-title text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Öne Çıkan Projeler
          </h2>
          <p className="projects-subtitle text-blue-200/80 text-base md:text-lg max-w-3xl mx-auto font-light">
            Kocaeli'yi geleceğe taşıyan dijital dönüşüm projelerimiz
          </p>
        </div>

        <div className="filter-buttons flex items-center justify-center gap-3 mb-12 flex-wrap">
          {[
            { value: 'all', label: 'Tümü' },
            { value: 'completed', label: 'Tamamlanan' },
            { value: 'in-progress', label: 'Devam Eden' },
            { value: 'planned', label: 'Planlanan' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === item.value
                ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/10 text-gray-300 hover:bg-white/15 border border-white/20'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20"
              >
                <div className="h-48 bg-white/5 animate-pulse" />
                <div className="p-6">
                  <div className="h-4 bg-white/10 rounded w-20 mb-3 animate-pulse" />
                  <div className="h-6 bg-white/10 rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-white/10 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-white/10 rounded w-2/3 mb-4 animate-pulse" />
                  <div className="h-2 bg-white/10 rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const statusBadge = getStatusBadge(project.status);
              return (
                <div
                  key={project.id}
                  className="project-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg"
                        style={{ backgroundColor: `${project.color}30` }}
                      >
                        <project.icon className="w-6 h-6" color={project.color} />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl border ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold text-blue-400 mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                    {project.status !== 'completed' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                          <span>İlerleme</span>
                          <span className="font-bold text-white">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-400">{project.beneficiaries}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400 text-sm font-semibold group-hover:gap-2 transition-all">
                        <span>Detaylar</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Bu kategoride proje bulunamadı.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] border border-white/20 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col md:flex-row overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Stays fixed relative to the modal container */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 hover:bg-black backdrop-blur-xl flex items-center justify-center transition-all border border-white/30 shadow-2xl z-[1010] ring-1 ring-white/10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Left Column: Image */}
            <div className="relative w-full md:w-[40%] h-40 md:h-auto shrink-0 border-b md:border-b-0 md:border-r border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/60 via-transparent to-transparent md:from-transparent md:to-gray-900/20" />

              <div className="absolute bottom-6 left-6 right-6 md:hidden">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-xl"
                    style={{ backgroundColor: `${selectedProject.color}40` }}
                  >
                    <selectedProject.icon className="w-6 h-6" color={selectedProject.color} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-400 block mb-0.5">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight">{selectedProject.title}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-[60%] p-6 md:p-8 overflow-y-auto">
              <div className="hidden md:flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-xl shrink-0"
                  style={{ backgroundColor: `${selectedProject.color}40` }}
                >
                  <selectedProject.icon className="w-8 h-8" color={selectedProject.color} />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-400 block mb-0.5">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl border ${getStatusBadge(selectedProject.status).color
                    }`}
                >
                  {getStatusBadge(selectedProject.status).label}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>
                    {selectedProject.startDate} - {selectedProject.endDate || 'Devam Ediyor'}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {selectedProject.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 border border-white/10"
                  >
                    <stat.icon className="w-4 h-4 text-blue-400 mb-2" />
                    <p className="text-lg font-bold text-white mb-0.5">{stat.value}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>

              {selectedProject.status !== 'completed' && (
                <div className="mb-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] text-gray-300 mb-2">
                    <span className="font-semibold uppercase tracking-wider">İlerleme</span>
                    <span className="font-bold text-white text-base">{selectedProject.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest">Bütçe</p>
                  <p className="text-lg font-bold text-white">{selectedProject.budget}</p>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest">Faydalanıcı</p>
                  <p className="text-lg font-bold text-white">{selectedProject.beneficiaries}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-xl p-5 border border-blue-500/20">
                <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Özellikler
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
