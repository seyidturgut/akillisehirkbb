import React, { useState } from 'react';
import { Users, TrendingUp, UserPlus, Baby, Home, Activity } from 'lucide-react';

const PopulationStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        className="group bg-gradient-to-br from-blue-900/40 to-indigo-800/30 rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(0)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-500/30 rounded-2xl flex items-center justify-center border border-blue-400/40 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7 text-blue-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Toplam Nüfus</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">2.1M</div>
            <div className="text-sm text-blue-200">2023 yılı nüfusu</div>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: activeCard === 0 ? '100%' : '0%' }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 rounded-lg p-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-lg font-bold text-emerald-400">+2.8%</div>
            <div className="text-xs text-emerald-200">Yıllık artış</div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-purple-900/40 to-pink-800/30 rounded-2xl p-6 border border-purple-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(1)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-purple-500/30 rounded-2xl flex items-center justify-center border border-purple-400/40 group-hover:scale-110 transition-transform">
            <UserPlus className="w-7 h-7 text-purple-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Cinsiyet Dağılımı</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-purple-200">Erkek</span>
              <span className="text-xl font-bold text-blue-400">1,065,849</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '51%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-purple-200">Kadın</span>
              <span className="text-xl font-bold text-pink-400">1,024,315</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '49%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-purple-500/10 rounded-xl p-3 text-center">
          <span className="text-xs text-purple-200">Toplam: 2,090,164 kişi</span>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-emerald-900/40 to-green-800/30 rounded-2xl p-6 border border-emerald-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(2)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-emerald-500/30 rounded-2xl flex items-center justify-center border border-emerald-400/40 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-7 h-7 text-emerald-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Nüfus Artışı</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-emerald-200">2020</span>
              <span className="text-sm font-bold text-white">1.98M</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '95%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-emerald-200">2021</span>
              <span className="text-sm font-bold text-white">2.01M</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '96%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-emerald-200">2022</span>
              <span className="text-sm font-bold text-white">2.05M</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '98%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-emerald-200">2023</span>
              <span className="text-sm font-bold text-emerald-400">2.09M</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-cyan-900/40 to-teal-800/30 rounded-2xl p-6 border border-cyan-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(3)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-cyan-500/30 rounded-2xl flex items-center justify-center border border-cyan-400/40 group-hover:scale-110 transition-transform">
            <Baby className="w-7 h-7 text-cyan-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yaş Grupları</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">0-14 Yaş</span>
              <span className="text-sm font-bold text-white">418,033</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 3 ? '20%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">15-64 Yaş</span>
              <span className="text-sm font-bold text-emerald-400">1,491,721</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 3 ? '71%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">65+ Yaş</span>
              <span className="text-sm font-bold text-amber-400">180,410</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 3 ? '9%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-cyan-500/10 rounded-xl p-3">
          <div className="text-xs text-cyan-200 text-center">Çalışma çağı nüfusu yüksek</div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-orange-900/40 to-red-800/30 rounded-2xl p-6 border border-orange-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(4)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-orange-500/30 rounded-2xl flex items-center justify-center border border-orange-400/40 group-hover:scale-110 transition-transform">
            <Home className="w-7 h-7 text-orange-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">İlçelere Göre Nüfus</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-orange-200">İzmit</span>
              <span className="text-sm font-bold text-white">376,056</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-orange-200">Gebze</span>
              <span className="text-sm font-bold text-white">362,341</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '96%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-orange-200">Körfez</span>
              <span className="text-sm font-bold text-white">231,547</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '62%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-orange-200">Diğer İlçeler</span>
              <span className="text-sm font-bold text-slate-400">1.12M</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-teal-900/40 to-cyan-800/30 rounded-2xl p-6 border border-teal-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(5)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-teal-500/30 rounded-2xl flex items-center justify-center border border-teal-400/40 group-hover:scale-110 transition-transform">
            <Activity className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Nüfus Yoğunluğu</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">553</div>
            <div className="text-sm text-teal-200">Kişi/km²</div>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transition-all duration-1000"
              style={{ width: activeCard === 5 ? '100%' : '0%' }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-xs text-teal-200 mb-1">Yüzölçümü</div>
            <div className="text-lg font-bold text-white">3,767 km²</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-xs text-teal-200 mb-1">Yerleşim</div>
            <div className="text-lg font-bold text-white">12 İlçe</div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-indigo-900/40 to-purple-800/30 rounded-2xl p-6 border border-indigo-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(6)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-indigo-500/30 rounded-2xl flex items-center justify-center border border-indigo-400/40 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Bağımlılık Oranı</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
          <div className="relative inline-flex items-center justify-center w-full mb-4">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#8B5CF6"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.40)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 6 ? `${2 * Math.PI * 70 * (1 - 0.40)}` : `${2 * Math.PI * 70}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-4xl font-bold text-white text-center">40%</div>
            </div>
          </div>
          <p className="text-xs text-indigo-200 text-center">Çalışmayan / Çalışan oranı</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-indigo-200">Bağımlı Nüfus</span>
            <span className="font-bold text-amber-400">598,443</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-indigo-200">Çalışan Nüfus</span>
            <span className="font-bold text-emerald-400">1,491,721</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-rose-900/40 to-pink-800/30 rounded-2xl p-6 border border-rose-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(7)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-rose-500/30 rounded-2xl flex items-center justify-center border border-rose-400/40 group-hover:scale-110 transition-transform">
            <UserPlus className="w-7 h-7 text-rose-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Doğum Hızı</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-rose-200 mb-2">Kaba Doğum Hızı</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-4xl font-bold text-white">16.8</div>
              <div className="text-sm text-rose-200">‰</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 7 ? '84%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-rose-200 mb-2">Yıllık Doğum</div>
            <div className="text-2xl font-bold text-white">~35,000</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-rose-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-rose-400" />
          <span className="text-xs text-rose-200">Türkiye ortalamasının üzerinde</span>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-amber-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(8)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-amber-500/30 rounded-2xl flex items-center justify-center border border-amber-400/40 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-7 h-7 text-amber-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Göç Durumu</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-amber-200">Göç Alan</span>
              <span className="text-xl font-bold text-emerald-400">+58,642</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 8 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-amber-200">Göç Veren</span>
              <span className="text-xl font-bold text-white">-32,156</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-slate-500 to-slate-600 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 8 ? '55%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-emerald-500/10 rounded-xl p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">+26,486</div>
            <div className="text-xs text-emerald-200">Net göç</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationStats;
