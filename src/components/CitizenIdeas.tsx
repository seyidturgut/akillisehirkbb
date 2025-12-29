import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lightbulb,
  Send,
  Heart,
  MapPin,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  X,
  Car,
  Leaf,
  Zap,
  Droplets,
  Building2,
  Wifi,
} from 'lucide-react';
import { mockCitizenIdeas, CitizenIdea } from '../data/mockData';

gsap.registerPlugin(ScrollTrigger);

// Categories array kept as is...
const categories = [
  { value: 'transportation', label: 'Ulaşım', icon: Car, color: '#F59E0B' },
  { value: 'environment', label: 'Çevre', icon: Leaf, color: '#10B981' },
  { value: 'energy', label: 'Enerji', icon: Zap, color: '#FBBF24' },
  { value: 'water', label: 'Su Yönetimi', icon: Droplets, color: '#0EA5E9' },
  { value: 'infrastructure', label: 'Altyapı', icon: Building2, color: '#8B5CF6' },
  { value: 'technology', label: 'Teknoloji', icon: Wifi, color: '#06B6D4' },
];

export const CitizenIdeas: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ideas, setIdeas] = useState<CitizenIdea[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<CitizenIdea | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    title: '',
    description: '',
    location: '',
    allowPublish: true,
    acceptKvkk: false,
  });

  useEffect(() => {
    loadIdeas();
  }, []);

  useEffect(() => {
    if (!showForm && !selectedIdea) return;

    const handleScroll = () => {
      setShowForm(false);
      setSelectedIdea(null);
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showForm, selectedIdea]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (ideas.length === 0 && loading) return; // Don't animate if loading or empty initially? Actually GSAP needs elements.

    const ctx = gsap.context(() => {
      const title = sectionRef.current!.querySelector('.ideas-title');
      const subtitle = sectionRef.current!.querySelector('.ideas-subtitle');
      const submitButton = sectionRef.current!.querySelector('.submit-idea-btn');
      const categories = sectionRef.current!.querySelector('.category-filters');
      const cards = sectionRef.current!.querySelectorAll('.idea-card');

      gsap.from(title, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
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
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(submitButton, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(categories, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          scale: 0.95,
          duration: 0.7,
          delay: 0.5 + index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ideas, loading]);

  const loadIdeas = async () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIdeas(mockCitizenIdeas);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newIdea: CitizenIdea = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        location: formData.location || undefined,
        status: 'pending',
        likes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setIdeas(prev => [newIdea, ...prev]);

      setFormData({
        name: '',
        email: '',
        category: '',
        title: '',
        description: '',
        location: '',
        allowPublish: true,
        acceptKvkk: false,
      });
      setShowForm(false);
      setSubmitting(false);
    }, 1000);
  };

  const handleLike = async (ideaId: string, _currentLikes: number) => {
    // Optimistically update UI
    setIdeas(prev => prev.map(idea =>
      idea.id === ideaId ? { ...idea, likes: idea.likes + 1 } : idea
    ));

    if (selectedIdea && selectedIdea.id === ideaId) {
      setSelectedIdea(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Değerlendiriliyor',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
      case 'reviewing':
        return {
          label: 'İnceleniyor',
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        };
      case 'approved':
        return {
          label: 'Onaylandı',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'implemented':
        return {
          label: 'Uygulandı',
          color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        };
      default:
        return {
          label: 'Beklemede',
          color: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
        };
    }
  };

  const getCategoryIcon = (categoryValue: string) => {
    const category = categories.find((c) => c.value === categoryValue);
    return category || categories[0];
  };

  const filteredIdeas =
    filterCategory === 'all'
      ? ideas
      : ideas.filter((idea) => idea.category === filterCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Bugün';
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
    return `${Math.floor(diffDays / 30)} ay önce`;
  };

  return (
    <div ref={sectionRef} className="w-full py-24 relative overflow-hidden bg-gray-900 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">
              Sizden Gelenler
            </span>
          </div>

          <h2 className="ideas-title text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Fikrini Söyle
          </h2>
          <p className="ideas-subtitle text-blue-200/80 text-base md:text-lg max-w-3xl mx-auto font-light mb-8">
            Akıllı şehir Kocaeli'nin geleceğini birlikte şekillendirelim. Fikirleriniz değerli!
          </p>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="submit-idea-btn inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-xl hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 animate-pulse hover:animate-none"
            >
              <Lightbulb className="w-7 h-7" />
              <span>Fikir Gönder</span>
              <Send className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-400">
              Şehrimizi geliştirmek için fikirlerinizi bizimle paylaşın
            </p>
          </div>
        </div>

        <div className="category-filters flex items-center justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filterCategory === 'all'
              ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-white/10 text-gray-300 hover:bg-white/15 border border-white/20'
              }`}
          >
            Tümü ({ideas.length})
          </button>
          {categories.map((category) => {
            const count = ideas.filter((i) => i.category === category.value).length;
            return (
              <button
                key={category.value}
                onClick={() => setFilterCategory(category.value)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filterCategory === category.value
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15 border border-white/20'
                  }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
                {count > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-16">
            <Lightbulb className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {filterCategory === 'all'
                ? 'Henüz fikir paylaşılmamış. İlk fikri siz paylaşın!'
                : 'Bu kategoride henüz fikir bulunmuyor.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredIdeas.slice(0, 3).map((idea) => {
              const statusBadge = getStatusBadge(idea.status);
              const categoryInfo = getCategoryIcon(idea.category);
              const CategoryIcon = categoryInfo.icon;

              return (
                <div
                  key={idea.id}
                  className="idea-card group relative bg-gray-900/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-emerald-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 cursor-pointer"
                  onClick={() => setSelectedIdea(idea)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30"
                        style={{ backgroundColor: `${categoryInfo.color}30` }}
                      >
                        <CategoryIcon
                          className="w-6 h-6"
                          style={{ color: categoryInfo.color }}
                        />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl border ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {idea.title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                      {idea.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      {idea.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{idea.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDate(idea.created_at)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">{idea.name}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(idea.id, idea.likes);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-500/30 transition-all group/like"
                      >
                        <Heart className="w-4 h-4 text-emerald-400 group-hover/like:fill-emerald-400 transition-all" />
                        <span className="text-sm font-bold text-white">{idea.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center space-y-8">
          <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{ideas.length}</div>
              <div className="text-sm text-gray-400">Toplam Fikir</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {ideas.filter((i) => i.status === 'implemented').length}
              </div>
              <div className="text-sm text-gray-400">Uygulanan</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {ideas.reduce((sum, i) => sum + i.likes, 0)}
              </div>
              <div className="text-sm text-gray-400">Toplam Beğeni</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              Siz de Fikrinizi Paylaşın!
            </h3>
            <p className="text-gray-300 mb-4">
              Akıllı şehir projelerimize katkıda bulunun. Her fikir önemli!
            </p>
            <div className="mb-6 bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-orange-500/30 border-2 border-yellow-400/50 rounded-2xl p-6 shadow-lg shadow-yellow-500/20 animate-pulse">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-7 h-7 text-yellow-300 animate-spin-slow" />
                <p className="text-lg font-bold text-yellow-100 tracking-wide">
                  🎖️ Fikir Gönderenlere Katılım Sertifikası Verilecektir!
                </p>
                <Sparkles className="w-7 h-7 text-yellow-300 animate-spin-slow" />
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <Lightbulb className="w-6 h-6" />
              <span>Hemen Fikir Gönder</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-gradient-to-br from-gray-800/98 to-gray-900/98 backdrop-blur-xl rounded-3xl max-w-2xl w-full border border-white/20 shadow-2xl my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Fikir Gönder</h3>
                  <p className="text-gray-400">
                    Akıllı şehir için fikirlerinizi bizimle paylaşın
                  </p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 rounded-full bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Ad Soyad"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Kategori
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-gray-800">
                        Kategori Seçin
                      </option>
                      {categories.map((cat) => (
                        <option
                          key={cat.value}
                          value={cat.value}
                          className="bg-gray-800"
                        >
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      İlçe/Bölge (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="İzmit, Gebze..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Fikir Başlığı
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Fikrinizi kısaca özetleyin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    placeholder="Fikrinizi detaylı olarak açıklayın..."
                  />
                </div>

                <div className="space-y-4 bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="allowPublish"
                      checked={formData.allowPublish}
                      onChange={(e) =>
                        setFormData({ ...formData, allowPublish: e.target.checked })
                      }
                      className="w-5 h-5 mt-0.5 rounded bg-white/10 border-white/20 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="allowPublish" className="text-sm text-gray-300 cursor-pointer">
                      Fikrimin web sitesinde yayınlanmasını onaylıyorum. (Yayınlanmasını istemiyorsanız bu kutucuğu işaretlemeyin)
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acceptKvkk"
                      required
                      checked={formData.acceptKvkk}
                      onChange={(e) =>
                        setFormData({ ...formData, acceptKvkk: e.target.checked })
                      }
                      className="w-5 h-5 mt-0.5 rounded bg-white/10 border-white/20 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="acceptKvkk" className="text-sm text-gray-300 cursor-pointer">
                      <a href="#" className="text-emerald-400 hover:text-emerald-300 underline" onClick={(e) => e.preventDefault()}>KVKK Aydınlatma Metni</a>'ni okudum ve kabul ediyorum. <span className="text-red-400">*</span>
                    </label>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-500/20">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-emerald-300 mb-1">Katılım Sertifikası</p>
                        <p className="text-xs text-gray-400">Fikir paylaşımınız onaylandığında size dijital bir katılım sertifikası gönderilecektir.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15 border border-white/20 transition-all"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !formData.acceptKvkk}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Gönder</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedIdea && (
        <div
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedIdea(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-800/98 to-gray-900/98 backdrop-blur-xl rounded-3xl max-w-3xl w-full border border-white/20 shadow-2xl my-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30"
                    style={{
                      backgroundColor: `${getCategoryIcon(selectedIdea.category).color}40`,
                    }}
                  >
                    {React.createElement(getCategoryIcon(selectedIdea.category).icon, {
                      className: 'w-8 h-8',
                      style: { color: getCategoryIcon(selectedIdea.category).color },
                    })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl border ${getStatusBadge(selectedIdea.status).color
                          }`}
                      >
                        {getStatusBadge(selectedIdea.status).label}
                      </span>
                      <span className="text-sm font-semibold text-blue-400">
                        {getCategoryIcon(selectedIdea.category).label}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedIdea.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{selectedIdea.name}</span>
                      </div>
                      {selectedIdea.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedIdea.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(selectedIdea.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIdea(null)}
                  className="w-10 h-10 rounded-full bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 mb-6 border border-white/10">
                <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
                  {selectedIdea.description}
                </p>
                {selectedIdea.image_url && (
                  <div className="mt-6">
                    <img
                      src={selectedIdea.image_url}
                      alt={selectedIdea.title}
                      className="w-full h-auto rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-white/10"
                      onClick={() => setLightboxImage(selectedIdea.image_url!)}
                    />
                    <p className="text-xs text-gray-400 mt-2 text-center italic">Resmi büyütmek için tıklayın</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleLike(selectedIdea.id, selectedIdea.likes)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-blue-500/30 border border-emerald-500/30 transition-all group"
                >
                  <Heart className="w-5 h-5 text-emerald-400 group-hover:fill-emerald-400 transition-all" />
                  <span className="text-white font-bold">{selectedIdea.likes}</span>
                  <span className="text-gray-300">Beğeni</span>
                </button>

                {selectedIdea.status === 'implemented' && (
                  <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-bold">Uygulandı!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[2000] p-4 animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all group z-50"
              aria-label="Kapat"
            >
              <X className="w-6 h-6 text-white group-hover:scale-110" />
            </button>

            <img
              src={lightboxImage}
              alt="Büyük Görünüm"
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

