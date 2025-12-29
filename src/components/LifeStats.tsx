import React, { useState } from 'react';
import { Heart, Activity, Ambulance, Stethoscope, Building2, TrendingUp, Users, Baby, ShieldCheck } from 'lucide-react';

const LifeStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        className="group bg-gradient-to-br from-rose-900/40 to-pink-800/30 rounded-2xl p-6 border border-rose-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(0)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-rose-500/30 rounded-2xl flex items-center justify-center border border-rose-400/40 group-hover:scale-110 transition-transform">
            <Heart className="w-7 h-7 text-rose-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Sağlık Tesisleri</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-rose-200">Devlet Hastanesi</span>
              <span className="text-sm font-bold text-white">12</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 0 ? '75%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-rose-200">Özel Hastane</span>
              <span className="text-sm font-bold text-white">8</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 0 ? '50%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-rose-200">Aile Sağlığı Merkezi</span>
              <span className="text-sm font-bold text-emerald-400">186</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 0 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-blue-900/40 to-indigo-800/30 rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(1)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-500/30 rounded-2xl flex items-center justify-center border border-blue-400/40 group-hover:scale-110 transition-transform">
            <Stethoscope className="w-7 h-7 text-blue-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Sağlık Personeli</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-blue-200">Doktor</span>
              <span className="text-xl font-bold text-white">3,542</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '70%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-blue-200">Hemşire</span>
              <span className="text-xl font-bold text-emerald-400">5,128</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-500/10 rounded-xl p-3">
          <div className="text-center">
            <div className="text-sm text-blue-200">Toplam: 8,670 personel</div>
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
            <Building2 className="w-7 h-7 text-emerald-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yatak Kapasitesi</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">4,856</div>
            <div className="text-sm text-emerald-200">Toplam yatak sayısı</div>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
              style={{ width: activeCard === 2 ? '100%' : '0%' }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-xs text-emerald-200 mb-1">Kamu</div>
            <div className="text-lg font-bold text-white">3,214</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-xs text-emerald-200 mb-1">Özel</div>
            <div className="text-lg font-bold text-white">1,642</div>
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
            <Ambulance className="w-7 h-7 text-cyan-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Acil Hizmetler</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-cyan-200 mb-2">Ambulans Sayısı</div>
            <div className="text-3xl font-bold text-white mb-3">142</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 3 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-cyan-200 mb-2">112 İstasyonu</div>
            <div className="text-3xl font-bold text-emerald-400">28</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-cyan-500/10 rounded-lg p-3">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-cyan-200">7/24 aktif hizmet</span>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-purple-900/40 to-pink-800/30 rounded-2xl p-6 border border-purple-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(4)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-purple-500/30 rounded-2xl flex items-center justify-center border border-purple-400/40 group-hover:scale-110 transition-transform">
            <Baby className="w-7 h-7 text-purple-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Anne-Çocuk Sağlığı</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-purple-200">Doğum Sayısı (2023)</span>
              <span className="text-sm font-bold text-white">35,124</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-purple-200">Bebek Ölüm Hızı</span>
              <span className="text-sm font-bold text-emerald-400">4.2‰</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '21%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-purple-200">Aşılama Oranı</span>
              <span className="text-sm font-bold text-emerald-400">98.5%</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-orange-900/40 to-red-800/30 rounded-2xl p-6 border border-orange-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(5)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-orange-500/30 rounded-2xl flex items-center justify-center border border-orange-400/40 group-hover:scale-110 transition-transform">
            <Activity className="w-7 h-7 text-orange-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Ortalama Yaşam Süresi</h3>
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
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.78)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 5 ? `${2 * Math.PI * 70 * (1 - 0.78)}` : `${2 * Math.PI * 70}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-4xl font-bold text-white text-center">78</div>
            </div>
          </div>
          <p className="text-xs text-orange-200 text-center">Yıl (Türkiye ortalaması: 77)</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-orange-200">Kadın</span>
            <span className="font-bold text-white">80.2 yıl</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-orange-200">Erkek</span>
            <span className="font-bold text-white">75.8 yıl</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-indigo-900/40 to-blue-800/30 rounded-2xl p-6 border border-indigo-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(6)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-indigo-500/30 rounded-2xl flex items-center justify-center border border-indigo-400/40 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Kişi Başı İstatistikler</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">Doktor / Kişi</span>
              <span className="text-sm font-bold text-white">590</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '85%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">Hemşire / Kişi</span>
              <span className="text-sm font-bold text-white">408</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '90%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">Yatak / 10.000 Kişi</span>
              <span className="text-sm font-bold text-emerald-400">23.2</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '77%' : '0%' }}
              ></div>
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
            <ShieldCheck className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Sağlık Sigortası</h3>
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
                stroke="#14B8A6"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.96)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 7 ? `${2 * Math.PI * 70 * (1 - 0.96)}` : `${2 * Math.PI * 70}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-4xl font-bold text-white text-center">96%</div>
            </div>
          </div>
          <p className="text-xs text-teal-200 text-center">Sigortalılık oranı</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-teal-200">SGK Kapsamı</span>
            <span className="font-bold text-emerald-400">2,006,558</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-teal-200">Özel Sigorta</span>
            <span className="font-bold text-white">83,606</span>
          </div>
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
          <h3 className="text-xl font-bold text-white">Sağlık Harcamaları</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-amber-200 mb-2">Kişi Başı Yıllık</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-3xl font-bold text-white">₺8,542</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 8 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-amber-200 mb-2">Yıllık Artış</div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-emerald-400">+12.5%</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-amber-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-amber-200">Sağlık altyapısına yatırım artıyor</span>
        </div>
      </div>
    </div>
  );
};

export default LifeStats;
