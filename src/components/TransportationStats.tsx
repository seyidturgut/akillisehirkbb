import React, { useState } from 'react';
import { Bus, Fuel, Zap, TrendingUp, MapPin, Users, CreditCard, Wallet } from 'lucide-react';

const TransportationStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        className="group bg-gradient-to-br from-blue-900/40 to-blue-800/30 rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(0)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-500/30 rounded-2xl flex items-center justify-center border border-blue-400/40 group-hover:scale-110 transition-transform">
            <Fuel className="w-7 h-7 text-blue-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Doğalgaz Araçlar</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-blue-200 mb-2">2022</div>
            <div className="text-3xl font-bold text-white mb-3">480</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 0 ? '96%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-blue-200 mb-2">2023</div>
            <div className="text-3xl font-bold text-emerald-400 mb-3">490</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 0 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">+2.1% artış</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-orange-900/40 to-orange-800/30 rounded-2xl p-6 border border-orange-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(1)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-orange-500/30 rounded-2xl flex items-center justify-center border border-orange-400/40 group-hover:scale-110 transition-transform">
            <Fuel className="w-7 h-7 text-orange-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Dizel Araçlar</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-orange-200 mb-2">2022</div>
            <div className="text-3xl font-bold text-white mb-3">505</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '97%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-orange-200 mb-2">2023</div>
            <div className="text-3xl font-bold text-emerald-400 mb-3">520</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 1 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">+3.0% artış</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-green-900/40 to-emerald-800/30 rounded-2xl p-6 border border-green-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(2)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-green-500/30 rounded-2xl flex items-center justify-center border border-green-400/40 group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7 text-green-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Elektrikli Araçlar</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-green-200 mb-2">2022</div>
            <div className="text-3xl font-bold text-white mb-3">18</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 2 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-green-200 mb-2">2023</div>
            <div className="text-3xl font-bold text-slate-400 mb-3">-</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-slate-700 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <span className="text-sm font-semibold text-slate-400">Veri bekleniyor</span>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-cyan-900/40 to-blue-800/30 rounded-2xl p-6 border border-cyan-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(3)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-cyan-500/30 rounded-2xl flex items-center justify-center border border-cyan-400/40 group-hover:scale-110 transition-transform">
            <MapPin className="w-7 h-7 text-cyan-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Güzergahlar</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">Lastik Tekerlekli</span>
              <span className="text-sm font-bold text-white">17,759 km</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 3 ? '92%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">Tramvay</span>
              <span className="text-sm font-bold text-white">20.8 km</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 3 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-cyan-200">Deniz Ulaşım</span>
              <span className="text-sm font-bold text-white">57.9 km</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 3 ? '75%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-purple-900/40 to-pink-800/30 rounded-2xl p-6 border border-purple-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(4)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-purple-500/30 rounded-2xl flex items-center justify-center border border-purple-400/40 group-hover:scale-110 transition-transform">
            <Bus className="w-7 h-7 text-purple-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Tramvay İstatistikleri</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-purple-200 mb-2">Sefer Sayısı (2023)</div>
            <div className="text-2xl font-bold text-white mb-3">111,806</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">+6.9%</span>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-purple-200 mb-2">Koltuk Kapasitesi</div>
            <div className="text-lg font-bold text-white">18 Tramvay / 900 Koltuk</div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-purple-200 mb-2">Kullanım Oranı</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-400">8.46</span>
              <span className="text-lg text-purple-200">%</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-indigo-900/40 to-blue-800/30 rounded-2xl p-6 border border-indigo-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(5)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-indigo-500/30 rounded-2xl flex items-center justify-center border border-indigo-400/40 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yolcu Profili</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">Ücretsiz</span>
              <span className="text-sm font-bold text-emerald-400">1,788,594</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 5 ? '36%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">İndirimli</span>
              <span className="text-sm font-bold text-amber-400">479,766</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 5 ? '10%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-indigo-200">Tam Ücret</span>
              <span className="text-sm font-bold text-blue-400">2,418,323</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 5 ? '49%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-teal-900/40 to-cyan-800/30 rounded-2xl p-6 border border-teal-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(6)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-teal-500/30 rounded-2xl flex items-center justify-center border border-teal-400/40 group-hover:scale-110 transition-transform">
            <CreditCard className="w-7 h-7 text-teal-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Ödeme Yöntemleri</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-sm text-teal-200">Kocaelikart</span>
              </div>
              <span className="text-xl font-bold text-white">182.6M</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '81%' : '0%' }}
              ></div>
            </div>
            <div className="text-xs text-teal-300 mt-2">182,677,558 işlem</div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm text-blue-200">Kredi Kartı</span>
              </div>
              <span className="text-xl font-bold text-white">43.0M</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 6 ? '19%' : '0%' }}
              ></div>
            </div>
            <div className="text-xs text-blue-300 mt-2">42,966,193 işlem</div>
          </div>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-emerald-900/40 to-green-800/30 rounded-2xl p-6 border border-emerald-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(7)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-emerald-500/30 rounded-2xl flex items-center justify-center border border-emerald-400/40 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-7 h-7 text-emerald-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Yeşil Ulaşım</h3>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 text-center">
          <div className="relative inline-flex items-center justify-center mb-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#10B981"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.29)}`}
                className="transition-all duration-1000"
                style={{
                  strokeDashoffset: activeCard === 7 ? `${2 * Math.PI * 56 * (1 - 0.29)}` : `${2 * Math.PI * 56}`
                }}
              />
            </svg>
            <div className="absolute">
              <div className="text-4xl font-bold text-white">29%</div>
            </div>
          </div>
          <p className="text-sm text-emerald-200 leading-relaxed">
            Toplu taşımada yeşil ulaşım araçlarının payı
          </p>
        </div>

        <div className="mt-4 bg-emerald-500/10 rounded-xl p-3">
          <p className="text-xs text-emerald-200 text-center">
            Elektrik ve doğalgaz ile çalışan araçlar
          </p>
        </div>
      </div>

      <div
        className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setActiveCard(8)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-400/40 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7 text-blue-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">Toplam Yolcu</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-blue-200 mb-2">2022</div>
            <div className="text-2xl font-bold text-white">173.4 Milyon</div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="text-xs text-blue-200 mb-2">2023</div>
            <div className="text-2xl font-bold text-emerald-400 mb-3">182.7 Milyon</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: activeCard === 8 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 rounded-lg p-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-lg font-bold text-emerald-400">+5.4%</div>
              <div className="text-xs text-emerald-200">Yıllık artış</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationStats;
