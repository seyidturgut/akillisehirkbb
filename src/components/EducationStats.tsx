import React, { useState } from 'react';
import { Code, BookOpen, Atom, GraduationCap, Users, TreePine, Music, Briefcase, Info } from 'lucide-react';

const EducationStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Robotik Kodlama */}
      <div
        className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(0)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
            <Code className="w-7 h-7 text-blue-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Robotik Kodlama</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Atölye Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2021: 25</span>
              <span className="text-sm font-semibold text-slate-300">2022: 30</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 35</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Faydalanacak Öğrenci Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2021: 1,500</span>
              <span className="text-sm font-semibold text-slate-300">2022: 1,800</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 2,100</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bilgievleri */}
      <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
            <BookOpen className="w-7 h-7 text-purple-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Bilgievleri</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Bilgievi Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 12</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 15</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Faydalanan Öğrenci Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 3,500</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 4,200</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bilim Merkezleri */}
      <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-green-500/30">
            <Atom className="w-7 h-7 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Bilim Merkezleri</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Merkez Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 3</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 4</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Toplam Kişi Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 25,000</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 32,000</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Akademi Lise */}
      <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
            <GraduationCap className="w-7 h-7 text-orange-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Akademi Lise</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Lise Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 2</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 3</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Faydalanan Öğrenci Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 850</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 1,200</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Kılavuz Gençlik */}
      <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-rose-500/30">
            <Users className="w-7 h-7 text-rose-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Kılavuz Gençlik</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Katılımcı Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 5,000</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 6,500</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '77%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Diriliş Kampı Katılımcı Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 450</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 620</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '73%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ormanya Doğa Okulu */}
      <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-500/20 to-green-500/20 rounded-2xl flex items-center justify-center border border-teal-500/30">
            <TreePine className="w-7 h-7 text-teal-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Ormanya Doğa Okulu</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Katılımcı Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 3,200</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 4,100</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Eğitim Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 120</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 150</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Belediye Konservatuarı */}
      <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-violet-500/30">
            <Music className="w-7 h-7 text-violet-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Belediye Konservatuarı</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Öğrenci Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2021-2022: 1,200</span>
              <span className="text-sm font-semibold text-emerald-400">2022-2023: 1,450</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Sanat Dalı Sayısı</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2021-2022: 12</span>
              <span className="text-sm font-semibold text-emerald-400">2022-2023: 15</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stajyer Öğrenci Sayısı */}
      <div className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
            <Briefcase className="w-7 h-7 text-indigo-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Stajyer Öğrenci Sayısı</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Lise Stajyeri</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 450</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 520</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Üniversite Stajyeri</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 680</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 750</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-2">Beceri Eğitimi</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">2022: 320</span>
              <span className="text-sm font-semibold text-emerald-400">2023: 410</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-blue-500/30">
            <Info className="w-7 h-7 text-blue-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Bilgilendirme</h3>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50">
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Bu veriler Kocaeli Büyükşehir Belediyesi'nin 2023 yılı eğitim hizmetleri göstergelerini içermektedir.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-slate-400 text-xs">Tüm kategorilerde artış</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-slate-400 text-xs">Yıl bazlı karşılaştırma</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-slate-700/50">
          <div className="text-slate-500 text-xs text-center">
            Kocaeli Eğitim Verileri 2023
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationStats;
