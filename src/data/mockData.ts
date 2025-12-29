import { CityZone, ZoneProject } from '../lib/supabase';

export interface CitizenIdea {
    id: string;
    name: string;
    email: string;
    category: string;
    title: string;
    description: string;
    location?: string;
    status: 'pending' | 'reviewing' | 'approved' | 'implemented';
    likes: number;
    created_at: string;
    updated_at: string;
}

export const mockZones: CityZone[] = [
    {
        id: '1',
        name: 'Ulaşım',
        slug: 'transportation',
        color: '#0EA5E9',
        icon: 'Car',
        description: 'Akıllı kavşaklar ve trafik yönetim sistemleri',
        position_x: 20,
        position_y: 30,
        order_index: 1,
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Enerji',
        slug: 'energy',
        color: '#F59E0B',
        icon: 'Zap',
        description: 'Yenilenebilir enerji ve akıllı şebekeler',
        position_x: 50,
        position_y: 50,
        order_index: 2,
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Çevre',
        slug: 'environment',
        color: '#10B981',
        icon: 'Leaf',
        description: 'Atık yönetimi ve yeşil alan takibi',
        position_x: 70,
        position_y: 40,
        order_index: 3,
        created_at: new Date().toISOString()
    }
];

export const mockProjects: ZoneProject[] = [
    {
        id: '101',
        zone_id: '1',
        title: 'Akıllı Kavşak Sistemi',
        description: 'Yapay zeka destekli trafik sinyalizasyon optimizasyonu.',
        image_url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80',
        status: 'completed',
        year: 2023,
        created_at: new Date().toISOString()
    },
    {
        id: '102',
        zone_id: '1',
        title: 'Elektrikli Otobüs Filosu',
        description: 'Toplu taşımada karbon ayak izini azaltan elektrikli otobüsler.',
        image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80',
        status: 'in_progress',
        year: 2024,
        created_at: new Date().toISOString()
    },
    {
        id: '201',
        zone_id: '2',
        title: 'Güneş Enerjisi Santrali',
        description: 'Kamu binalarının çatılarında GES kurulumu.',
        image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80',
        status: 'planned',
        year: 2025,
        created_at: new Date().toISOString()
    }
];

export const mockCitizenIdeas: CitizenIdea[] = [
    {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        category: 'transportation',
        title: 'Bisiklet Yolları Artırılsın',
        description: 'Sahil şeridindeki bisiklet yollarının şehir merkezine bağlanmasını öneriyorum.',
        location: 'İzmit',
        status: 'reviewing',
        likes: 45,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Ayşe Demir',
        email: 'ayse@example.com',
        category: 'environment',
        title: 'Akıllı Geri Dönüşüm Kutuları',
        description: 'Şehrin işlek noktalarına atık türünü tanıyan akıllı kutular konulmalı.',
        location: 'Gebze',
        status: 'approved',
        likes: 120,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Mehmet Kaya',
        email: 'mehmet@example.com',
        category: 'energy',
        title: 'Sokak Lambaları Sensörlü Olsun',
        description: 'Gece geç saatlerde sokak lambaları harekete duyarlı olarak çalışsın, tasarruf edilsin.',
        status: 'pending',
        likes: 12,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];
