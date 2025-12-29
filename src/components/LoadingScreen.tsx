import React, { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
    progress: number;
    fadeOut: boolean;
}

const CONFIG = {
    buildingCount: 60,
    colorPalette: [
        '#00f2ff', // Cyan
        '#00aaff', // Deep Sky
        '#bc13fe', // Purple
        '#ffffff'  // White Highlights
    ]
};

const LOG_DATA = [
    "İzmit Körfezi Deniz Trafik Kontrolü...",
    "Bilişim Vadisi AI Sunucuları: ONLINE",
    "Gebze Organize Sanayi Enerji Ağı...",
    "Kartepe Hava Sensörleri: Veri Alınıyor",
    "Sekapark Kameraları Senkronize",
    "Cengiz Topel Havaalanı Radar Verisi...",
    "Kocaeli Üniversitesi Ar-Ge Ağı...",
    "Tramvay Hattı (Akçaray) Sinyalizasyonu...",
    "Körfez Köprüsü Bağlantı Noktaları...",
    "Şehir Hastanesi Acil Durum Protokolü...",
    "Yuvacık Barajı Su Seviyesi Kontrolü...",
    "Siber Güvenlik Duvarı: AKTİF"
];

class CyberBuilding {
    x: number;
    w: number;
    maxH: number;
    currentH: number;
    growSpeed: number;
    type: number;
    color: string;
    lightColor: string;
    scanLineY: number;
    scanSpeed: number;

    constructor(x: number, w: number, height: number, width: number) {
        this.x = x;
        this.w = w;
        const distFromCenter = Math.abs(x - width / 2) / (width / 2);
        const heightFactor = 1 - (distFromCenter * 0.5);

        this.maxH = (Math.random() * height * 0.4 + height * 0.1) * heightFactor;
        this.currentH = 0;
        this.growSpeed = Math.random() * 5 + 2;

        this.type = Math.random();
        this.color = Math.random() > 0.8 ? '#1a1a2e' : '#0f0f1a';
        this.lightColor = CONFIG.colorPalette[Math.floor(Math.random() * CONFIG.colorPalette.length)];

        this.scanLineY = 0;
        this.scanSpeed = Math.random() * 2 + 1;
    }

    update() {
        if (this.currentH < this.maxH) {
            this.currentH += (this.maxH - this.currentH) * 0.05;
        }
        this.scanLineY -= this.scanSpeed;
        if (this.scanLineY < 0) this.scanLineY = this.currentH;
    }

    draw(ctx: CanvasRenderingContext2D, waterLevel: number) {
        const bottomY = waterLevel;
        const topY = bottomY - this.currentH;

        let grd = ctx.createLinearGradient(this.x, bottomY, this.x, topY);
        grd.addColorStop(0, '#000');
        grd.addColorStop(1, this.color);

        ctx.fillStyle = grd;
        ctx.fillRect(this.x, topY, this.w, this.currentH);

        ctx.globalCompositeOperation = 'lighter';

        if (this.type < 0.3) {
            ctx.fillStyle = `rgba(${this.hexToRgb(this.lightColor)}, 0.3)`;
            ctx.fillRect(this.x + this.w * 0.2, topY, 2, this.currentH);
            ctx.fillRect(this.x + this.w * 0.8, topY, 2, this.currentH);
        } else if (this.type < 0.7) {
            ctx.fillStyle = `rgba(${this.hexToRgb(this.lightColor)}, 0.15)`;
            for (let y = topY; y < bottomY; y += 15) {
                if (Math.random() > 0.2) ctx.fillRect(this.x + 2, y, this.w - 4, 1);
            }
        } else {
            ctx.fillStyle = `rgba(${this.hexToRgb(this.lightColor)}, 0.5)`;
            for (let i = 0; i < 10; i++) {
                const px = this.x + Math.random() * this.w;
                const py = topY + Math.random() * this.currentH;
                const size = Math.random() * 1.5;
                ctx.fillRect(px, py, size, size);
            }
        }

        ctx.fillStyle = `rgba(${this.hexToRgb(this.lightColor)}, 0.4)`;
        ctx.fillRect(this.x, bottomY - this.scanLineY, this.w, 2);

        if (this.currentH > this.maxH * 0.95) {
            ctx.fillStyle = '#fff';
            if (Math.random() > 0.95) ctx.fillRect(this.x + Math.random() * this.w, topY, 1, 1);
        }

        ctx.globalCompositeOperation = 'source-over';
    }

    hexToRgb(hex: string) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : '255, 255, 255';
    }
}

class Drone {
    x: number;
    y: number;
    speed: number;
    size: number;
    color: string;
    width: number;
    waterLevel: number;

    constructor(width: number, waterLevel: number) {
        this.width = width;
        this.waterLevel = waterLevel;
        this.x = Math.random() * width;
        this.y = Math.random() * (waterLevel - 50);
        this.speed = Math.random() * 3 + 1;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.5 ? '#ff4800' : '#fff';
    }

    reset() {
        this.x = this.width;
        this.y = Math.random() * (this.waterLevel - 50);
        this.speed = Math.random() * 3 + 1;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.5 ? '#ff4800' : '#fff';
    }

    update() {
        this.x -= this.speed;
        if (this.x < 0) this.reset();
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.fillRect(this.x, this.y, this.size * 3, 1);
        ctx.fillRect(this.x, this.y, 1, 1);
        ctx.globalAlpha = 1;
    }
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, fadeOut }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [systemMsg, setSystemMsg] = useState("Sistem Başlatılıyor...");
    const [popups, setPopups] = useState<{ id: number; text: string; x: string; y: string }[]>([]);
    const popupIdRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let buildings: CyberBuilding[] = [];
        let drones: Drone[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;
        let waterLevel = height * 0.75;

        const initWorld = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            waterLevel = height * 0.75;
            buildings = [];
            drones = [];

            let currentX = -50;
            while (currentX < width + 50) {
                const w = Math.random() * 30 + 10;
                const gap = Math.random() * 5 - 2;
                buildings.push(new CyberBuilding(currentX, w, height, width));
                currentX += w + gap;
            }

            for (let i = 0; i < 15; i++) {
                drones.push(new Drone(width, waterLevel));
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(5, 5, 16, 0.4)';
            ctx.fillRect(0, 0, width, height);

            buildings.forEach(b => {
                b.update();
                b.draw(ctx, waterLevel);
            });

            ctx.globalCompositeOperation = 'lighter';
            buildings.forEach(b => {
                const h = b.currentH * 0.3;
                let grd = ctx.createLinearGradient(0, waterLevel, 0, waterLevel + h);
                grd.addColorStop(0, `rgba(${b.hexToRgb(b.lightColor)}, 0.2)`);
                grd.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = grd;
                ctx.fillRect(b.x, waterLevel, b.w, h);

                if (Math.random() > 0.95) {
                    ctx.fillStyle = 'rgba(255,255,255,0.1)';
                    ctx.fillRect(b.x, waterLevel + Math.random() * 50, b.w, 1);
                }
            });
            ctx.globalCompositeOperation = 'source-over';

            drones.forEach(d => {
                d.update();
                d.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        initWorld();
        animate();

        const handleResize = () => {
            initWorld();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setSystemMsg("HOŞ GELDİNİZ - KOCAELİ'YE BAĞLANILDI");
        } else if (Math.random() > 0.8) {
            const msg = LOG_DATA[Math.floor(Math.random() * LOG_DATA.length)];
            setSystemMsg(msg);

            const newPopup = {
                id: ++popupIdRef.current,
                text: msg.split(':')[0],
                x: (Math.random() * 80 + 10) + '%',
                y: (Math.random() * 40 + 20) + '%'
            };
            setPopups(prev => [...prev.slice(-4), newPopup]);
            setTimeout(() => {
                setPopups(prev => prev.filter(p => p.id !== newPopup.id));
            }, 2500);
        }
    }, [progress]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-[#050510] font-['Rajdhani'] text-white overflow-hidden transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{
                background: 'linear-gradient(to bottom, #020205 0%, #0a0a1a 100%)'
            }}
        >
            <div className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
                    backgroundSize: '100% 4px',
                    opacity: 0.3
                }}
            />

            <div className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    background: 'radial-gradient(transparent 50%, rgba(0,0,0,0.8) 100%)'
                }}
            />

            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-20 w-full animate-in fade-in slide-in-from-top-4 duration-1000">
                <h1 className="font-['Orbitron'] text-5xl md:text-7xl font-black tracking-[10px] text-white m-0 drop-shadow-[0_0_20px_rgba(0,242,255,0.5)]">
                    KOCAELİ
                </h1>
                <div className="text-[1.2rem] text-[#00f2ff] tracking-[6px] mt-2 uppercase font-bold drop-shadow-[0_0_10px_#00f2ff]">
                    Akıllı Şehir
                </div>
            </div>

            <canvas ref={canvasRef} className="absolute inset-0 z-[1] filter blur-[0.5px]" />

            {popups.map(popup => (
                <div
                    key={popup.id}
                    className="absolute bg-[#000a14]/80 border border-[#00f2ff] text-[#00f2ff] px-2.5 py-1.5 text-[10px] rounded pointer-events-none z-[15] shadow-[0_0_10px_rgba(0,242,255,0.2)] animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ left: popup.x, top: popup.y }}
                >
                    {popup.text}
                </div>
            ))}

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[500px] px-6 z-20">
                <div className="w-full h-1 bg-white/10 relative overflow-hidden mb-4 rounded-sm">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00f2ff] to-white shadow-[0_0_15px_#00f2ff] transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-[0.9rem] text-white/70 uppercase">
                    <span className={progress >= 100 ? 'text-white' : ''}>{systemMsg}</span>
                    <span className="font-bold">{Math.floor(progress)}%</span>
                </div>
                <div className="text-center mt-3 text-[0.7rem] text-gray-500">
                    SECURE CONNECTION ESTABLISHED <span className="animate-pulse">_</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes blinker {
          50% { opacity: 0; }
        }
        .animate-pulse {
          animation: blinker 1s linear infinite;
        }
      `}} />
        </div>
    );
};
