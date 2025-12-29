export interface CityLiveData {
    airQuality: {
        value: number;
        label: string;
        color: string;
        description: string;
    };
    traffic: {
        density: number; // 0-100
        status: 'Akıcı' | 'Yoğun' | 'Durma Noktasında';
        color: string;
    };
    weather: {
        temp: number;
        condition: string;
        humidity: number;
    };
}

export const initialLiveData: CityLiveData = {
    airQuality: {
        value: 42,
        label: 'İyi',
        color: '#00e400', // Green
        description: 'Hava kalitesi tatmin edici ve az riskli.'
    },
    traffic: {
        density: 35,
        status: 'Akıcı',
        color: '#10b981'
    },
    weather: {
        temp: 24,
        condition: 'Güneşli',
        humidity: 45
    }
};

export const simulateDataChange = (current: CityLiveData): CityLiveData => {
    const newDensity = Math.max(0, Math.min(100, current.traffic.density + (Math.random() * 4 - 2)));
    const newVal = Math.max(0, Math.min(500, current.airQuality.value + (Math.random() * 10 - 5)));

    let aqiInfo = { label: 'İyi', color: '#00e400', desc: 'Hava kalitesi tatmin edici ve az riskli.' };

    if (newVal > 300) aqiInfo = { label: 'Tehlikeli', color: '#7e0023', desc: 'Acil durum; herkes etkilenebilir.' };
    else if (newVal > 200) aqiInfo = { label: 'Çok Sağlıksız', color: '#8f3f97', desc: 'Sağlık uyarısı; herkes risk altında.' };
    else if (newVal > 150) aqiInfo = { label: 'Sağlıksız', color: '#ff0000', desc: 'Sağlık etkileri görülebilir.' };
    else if (newVal > 100) aqiInfo = { label: 'Hassas Gruplar İçin Sağlıksız', color: '#ff7e00', desc: 'Hassas gruplar etkilenebilir.' };
    else if (newVal > 50) aqiInfo = { label: 'Orta', color: '#ffff00', desc: 'Hava kalitesi kabul edilebilir.' };

    return {
        ...current,
        airQuality: {
            value: newVal,
            label: aqiInfo.label,
            color: aqiInfo.color,
            description: aqiInfo.desc
        },
        traffic: {
            ...current.traffic,
            density: newDensity,
            status: newDensity > 70 ? 'Durma Noktasında' : newDensity > 40 ? 'Yoğun' : 'Akıcı',
            color: newDensity > 70 ? '#ef4444' : newDensity > 40 ? '#f59e0b' : '#10b981'
        },
        weather: {
            ...current.weather,
            temp: current.weather.temp + (Math.random() * 0.2 - 0.1)
        }
    };
};
