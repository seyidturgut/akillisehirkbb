export interface CityLiveData {
    airQuality: {
        value: number;
        label: 'İyi' | 'Orta' | 'Kötü';
        color: string;
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
        value: 12,
        label: 'İyi',
        color: '#10b981' // emerald-500
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

// Simulation helper
export const simulateDataChange = (current: CityLiveData): CityLiveData => {
    const newDensity = Math.max(0, Math.min(100, current.traffic.density + (Math.random() * 4 - 2)));

    return {
        ...current,
        airQuality: {
            ...current.airQuality,
            value: Math.max(0, current.airQuality.value + (Math.random() * 2 - 1)),
            label: current.airQuality.value < 50 ? 'İyi' : current.airQuality.value < 100 ? 'Orta' : 'Kötü',
            color: current.airQuality.value < 50 ? '#10b981' : current.airQuality.value < 100 ? '#f59e0b' : '#ef4444'
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
