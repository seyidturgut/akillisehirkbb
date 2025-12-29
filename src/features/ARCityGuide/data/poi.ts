export interface POI {
    id: string;
    name: string;
    description: string;
    distance: string;
    type: 'building' | 'transport' | 'leisure' | 'food';
    coordinates: { lat: number; lng: number };
    image: string;
}

export const mockPOIs: POI[] = [
    {
        id: '1',
        name: 'Kocaeli Büyükşehir Belediyesi',
        description: 'Şehir yönetim merkezi ve dijital dönüşüm ofisi.',
        distance: '150m',
        type: 'building',
        coordinates: { lat: 40.7654, lng: 29.9408 },
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800'
    },
    {
        id: '2',
        name: 'Sekapark Kültür Alanı',
        description: 'Şehrin en büyük sahil parkı ve etkinlik alanı.',
        distance: '800m',
        type: 'leisure',
        coordinates: { lat: 40.7610, lng: 29.9150 },
        image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=800'
    },
    {
        id: '3',
        name: 'Akçaray Merkez İstasyonu',
        description: 'Şehir içi ulaşım ağının ana aktarma noktası.',
        distance: '300m',
        type: 'transport',
        coordinates: { lat: 40.7665, lng: 29.9320 },
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800'
    }
];
