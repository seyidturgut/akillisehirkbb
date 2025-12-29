export interface CityLiveData {
    airQuality: {
        value: number;
        label: 'Good' | 'Moderate' | 'Poor';
        color: string;
    };
    traffic: {
        density: number; // 0-100
        status: 'Fluid' | 'Heavy' | 'Stalled';
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
        label: 'Good',
        color: '#10b981' // emerald-500
    },
    traffic: {
        density: 35,
        status: 'Fluid',
        color: '#10b981'
    },
    weather: {
        temp: 24,
        condition: 'Clear',
        humidity: 45
    }
};

// Simulation helper
export const simulateDataChange = (current: CityLiveData): CityLiveData => {
    return {
        ...current,
        airQuality: {
            ...current.airQuality,
            value: Math.max(0, current.airQuality.value + (Math.random() * 2 - 1))
        },
        traffic: {
            ...current.traffic,
            density: Math.max(0, Math.min(100, current.traffic.density + (Math.random() * 4 - 2))),
            status: current.traffic.density > 70 ? 'Heavy' : current.traffic.density > 40 ? 'Heavy' : 'Fluid',
            color: current.traffic.density > 70 ? '#ef4444' : current.traffic.density > 40 ? '#f59e0b' : '#10b981'
        },
        weather: {
            ...current.weather,
            temp: current.weather.temp + (Math.random() * 0.2 - 0.1)
        }
    };
};
