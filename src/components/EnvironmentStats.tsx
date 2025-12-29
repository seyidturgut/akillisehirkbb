import React, { useState } from 'react';
import { Leaf, Droplets, TreePine, Recycle, Wind, Sun, Factory, TrendingUp, Sprout } from 'lucide-react';

const EnvironmentStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        className="group bg-gradient-to-br from-green-900/40 to-emerald-800/30 rounded-2xl p-6 border border-green-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(0)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-green-500/30 rounded-2xl flex items-center justify-center border border-green-400/40 group-hover:scale-110 transition-transform">
            <TreePine className="w-7 h-7 text-green-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yeşil Alan</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">12.4</div>
            <div className="text-sm text-green-200">m² / kişi</div>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
              style={{ width: activeCard === 0 ? '100%' : '0%' }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-200">Toplam Yeşil Alan</span>
            <span className="font-bold text-white">25.9 km²</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-200">Park Sayısı</span>
            <span className="font-bold text-emerald-400">342</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-blue-900/40 to-cyan-800/30 rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(1)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-500/30 rounded-2xl flex items-center justify-center border border-blue-400/40 group-hover:scale-110 transition-transform">
            <Droplets className="w-7 h-7 text-blue-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Hava Kalitesi</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-blue-200">PM2.5 Değeri</span>
              <span className="text-sm font-bold text-emerald-400">18 µg/m³</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '36%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-blue-200">PM10 Değeri</span>
              <span className="text-sm font-bold text-emerald-400">32 µg/m³</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '64%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-blue-200">Hava Kalite İndeksi</span>
              <span className="text-sm font-bold text-emerald-400">İYİ</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-teal-900/40 to-cyan-800/30 rounded-2xl p-6 border border-teal-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(2)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-teal-500/30 rounded-2xl flex items-center justify-center border border-teal-400/40 group-hover:scale-110 transition-transform">
            <Recycle className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Atık Yönetimi</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-teal-200">Geri Dönüşüm Oranı</span>
              <span className="text-xl font-bold text-emerald-400">24%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '24%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-teal-200 mb-2">Günlük Atık Toplama</div>
            <div className="text-2xl font-bold text-white">1,850 ton</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-teal-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-teal-400" />
          <span className="text-xs text-teal-200">Geri dönüşüm artıyor</span>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-amber-900/40 to-orange-800/30 rounded-2xl p-6 border border-amber-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(3)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-amber-500/30 rounded-2xl flex items-center justify-center border border-amber-400/40 group-hover:scale-110 transition-transform">
            <Sun className="w-7 h-7 text-amber-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yenilenebilir Enerji</h3>
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
                stroke="#F59E0B"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.18)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 3 ? `${2 * Math.PI * 70 * (1 - 0.18)}` : `${2 * Math.PI * 70}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-4xl font-bold text-white text-center">18%</div>
            </div>
          </div>
          <p className="text-xs text-amber-200 text-center">Enerji üretiminde pay</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-amber-200">Güneş Enerjisi</span>
            <span className="font-bold text-white">12%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-amber-200">Rüzgar Enerjisi</span>
            <span className="font-bold text-white">6%</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-cyan-900/40 to-blue-800/30 rounded-2xl p-6 border border-cyan-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(4)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-cyan-500/30 rounded-2xl flex items-center justify-center border border-cyan-400/40 group-hover:scale-110 transition-transform">
            <Droplets className="w-7 h-7 text-cyan-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Su Kalitesi</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">İçme Suyu Kalitesi</span>
              <span className="text-sm font-bold text-emerald-400">A+</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '95%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">Arıtma Oranı</span>
              <span className="text-sm font-bold text-emerald-400">92%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 4 ? '92%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-cyan-200">Günlük Su Tüketimi</span>
              <span className="text-sm font-bold text-white">185 L/kişi</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-emerald-900/40 to-teal-800/30 rounded-2xl p-6 border border-emerald-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(5)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-emerald-500/30 rounded-2xl flex items-center justify-center border border-emerald-400/40 group-hover:scale-110 transition-transform">
            <Sprout className="w-7 h-7 text-emerald-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Ağaçlandırma</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-emerald-200 mb-2">2023 Dikilen Ağaç</div>
            <div className="text-3xl font-bold text-white mb-3">125,000</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 5 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-emerald-200 mb-2">Toplam Ağaç</div>
            <div className="text-2xl font-bold text-emerald-400">2.1 Milyon</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-200">Her yıl artan ağaç sayısı</span>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-slate-800/40 to-slate-700/30 rounded-2xl p-6 border border-slate-600/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(6)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-slate-600/30 rounded-2xl flex items-center justify-center border border-slate-500/40 group-hover:scale-110 transition-transform">
            <Factory className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Karbon Emisyonu</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-300">Kişi Başı Yıllık</span>
              <span className="text-xl font-bold text-white">5.2 ton</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-slate-500 to-slate-600 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '52%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-300">Yıllık Azalma</span>
              <span className="text-xl font-bold text-emerald-400">-3.5%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-emerald-400 transform rotate-180" />
          <span className="text-xs text-emerald-200">Emisyon azalıyor</span>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-indigo-900/40 to-blue-800/30 rounded-2xl p-6 border border-indigo-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(7)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-indigo-500/30 rounded-2xl flex items-center justify-center border border-indigo-400/40 group-hover:scale-110 transition-transform">
            <Wind className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Gürültü Kirliliği</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">Gündüz Seviyesi</span>
              <span className="text-sm font-bold text-white">62 dB</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 7 ? '62%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">Gece Seviyesi</span>
              <span className="text-sm font-bold text-emerald-400">48 dB</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 7 ? '48%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-indigo-200">Durum</span>
              <span className="text-sm font-bold text-emerald-400">Normal</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-lime-900/40 to-green-800/30 rounded-2xl p-6 border border-lime-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(8)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-lime-500/30 rounded-2xl flex items-center justify-center border border-lime-400/40 group-hover:scale-110 transition-transform">
            <Leaf className="w-7 h-7 text-lime-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Çevre Projeleri</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-lime-200 mb-2">Aktif Proje Sayısı</div>
            <div className="text-3xl font-bold text-white mb-3">28</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 8 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-lime-200 mb-2">Yıllık Bütçe</div>
            <div className="text-2xl font-bold text-emerald-400">₺156M</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-lime-500/10 rounded-lg p-3">
          <TrendingUp className="w-4 h-4 text-lime-400" />
          <span className="text-xs text-lime-200">Sürdürülebilir kalkınma</span>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStats;
