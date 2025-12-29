import React, { useState } from 'react';
import { Building2, FileCheck, Shield, TrendingUp, Home, Zap } from 'lucide-react';

const BuildingStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        className="group bg-gradient-to-br from-orange-900/40 to-red-800/30 rounded-2xl p-6 border border-orange-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(0)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-orange-500/30 rounded-2xl flex items-center justify-center border border-orange-400/40 group-hover:scale-110 transition-transform">
            <Building2 className="w-7 h-7 text-orange-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Toplam Yapı</h3>
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
                stroke="#F97316"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.64)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 0 ? `${2 * Math.PI * 70 * (1 - 0.64)}` : `${2 * Math.PI * 70}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-3xl font-bold text-white text-center">326,029</div>
            </div>
          </div>
          <p className="text-xs text-orange-200 text-center">2013-2023 arası yapı sayısı</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-orange-200">2012 ve öncesi</span>
            <span className="font-bold text-white">242,018</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-orange-200">2023</span>
            <span className="font-bold text-emerald-400">8,766</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-cyan-900/40 to-blue-800/30 rounded-2xl p-6 border border-cyan-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(1)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-cyan-500/30 rounded-2xl flex items-center justify-center border border-cyan-400/40 group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7 text-cyan-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Enerji Kimlik Belgesi</h3>
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
                stroke="#FCD34D"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.0215)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 1 ? `${2 * Math.PI * 70 * (1 - 0.0215)}` : `${2 * Math.PI * 70}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-4xl font-bold text-white text-center">2.15%</div>
            </div>
          </div>
          <p className="text-xs text-cyan-200 text-center">Enerji kimlik belgesi oranı</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-cyan-200">Belgeli Bina</span>
            <span className="font-bold text-emerald-400">7,010</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-cyan-200">Belgesiz Bina</span>
            <span className="font-bold text-white">319,019</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-emerald-900/40 to-green-800/30 rounded-2xl p-6 border border-emerald-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(2)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-emerald-500/30 rounded-2xl flex items-center justify-center border border-emerald-400/40 group-hover:scale-110 transition-transform">
            <FileCheck className="w-7 h-7 text-emerald-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Ruhsatlı Binalar</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-emerald-200 mb-2">Ruhsatlı Bina</div>
            <div className="text-3xl font-bold text-white mb-3">130,052</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '43%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-emerald-200 mb-2">İskanlı Bina</div>
            <div className="text-3xl font-bold text-white mb-3">130,866</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '44%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-blue-900/40 to-indigo-800/30 rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(3)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-500/30 rounded-2xl flex items-center justify-center border border-blue-400/40 group-hover:scale-110 transition-transform">
            <Home className="w-7 h-7 text-blue-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">İmar Barışı</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">3,384</div>
            <div className="text-sm text-blue-200">İmar barışı kapsamındaki bina</div>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: activeCard === 3 ? '100%' : '0%' }}
            ></div>
          </div>
        </div>

        <div className="bg-amber-500/10 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-200">Kayıtlı yapılar</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-amber-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(4)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-amber-500/30 rounded-2xl flex items-center justify-center border border-amber-400/40 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-7 h-7 text-amber-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yıllık Değişim</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-amber-200">2021</span>
              <span className="text-sm font-bold text-white">8,300</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '64%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-amber-200">2022</span>
              <span className="text-sm font-bold text-white">12,884</span>
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
              <span className="text-xs text-amber-200">2023</span>
              <span className="text-sm font-bold text-emerald-400">8,766</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '68%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-200">Son 3 yıl karşılaştırması</span>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-red-900/40 to-orange-800/30 rounded-2xl p-6 border border-red-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(5)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-red-500/30 rounded-2xl flex items-center justify-center border border-red-400/40 group-hover:scale-110 transition-transform">
            <Shield className="w-7 h-7 text-red-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yapı Denetimi</h3>
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
                stroke="#F97316"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.156)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 5 ? `${2 * Math.PI * 70 * (1 - 0.156)}` : `${2 * Math.PI * 70}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-3xl font-bold text-white text-center">15.6%</div>
            </div>
          </div>
          <p className="text-xs text-red-200 text-center">Denetimli yapı oranı</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-red-200">Denetimli</span>
            <span className="font-bold text-emerald-400">46,424</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-red-200">Denetimsiz</span>
            <span className="font-bold text-white">251,824</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-purple-900/40 to-pink-800/30 rounded-2xl p-6 border border-purple-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(6)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-purple-500/30 rounded-2xl flex items-center justify-center border border-purple-400/40 group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7 text-purple-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Enerji Sınıfları</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-purple-200">A Sınıfı</span>
              <span className="text-sm font-bold text-emerald-400">6</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '1%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-purple-200">B Sınıfı</span>
              <span className="text-sm font-bold text-blue-400">2,045</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '22%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-purple-200">C Sınıfı</span>
              <span className="text-sm font-bold text-white">9,186</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-purple-200">D-F Sınıfı</span>
              <span className="text-sm font-bold text-slate-400">42</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-teal-900/40 to-cyan-800/30 rounded-2xl p-6 border border-teal-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(7)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-teal-500/30 rounded-2xl flex items-center justify-center border border-teal-400/40 group-hover:scale-110 transition-transform">
            <Building2 className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Belge Durumu</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-teal-200">Ruhsatlı</span>
              <span className="text-xl font-bold text-white">130,052</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 7 ? '40%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-teal-200">İskanlı</span>
              <span className="text-xl font-bold text-white">130,866</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 7 ? '40%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-teal-200">Bilinmeyen</span>
              <span className="text-xl font-bold text-amber-400">206,244</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 7 ? '63%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-indigo-900/40 to-blue-800/30 rounded-2xl p-6 border border-indigo-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(8)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-indigo-500/30 rounded-2xl flex items-center justify-center border border-indigo-400/40 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yapı Artış Oranı</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 text-center">
          <div className="mb-4">
            <div className="text-5xl font-bold text-white mb-2">64%</div>
            <div className="text-sm text-indigo-200">2013-2023 artış oranı</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-indigo-200 mb-1">Başlangıç</div>
              <div className="text-lg font-bold text-white">242K</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-indigo-200 mb-1">Güncel</div>
              <div className="text-lg font-bold text-emerald-400">326K</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-indigo-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-indigo-200">Sürekli büyüme trendi</span>
        </div>
      </div>
    </div>
  );
};

export default BuildingStats;
