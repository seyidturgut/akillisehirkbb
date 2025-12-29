export interface CityZone {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description: string;
  position_x: number;
  position_y: number;
  order_index: number;
  created_at: string;
}

export interface ZoneProject {
  id: string;
  zone_id: string;
  title: string;
  description: string;
  image_url: string;
  status: 'planned' | 'in_progress' | 'completed';
  year: number;
  created_at: string;
}
