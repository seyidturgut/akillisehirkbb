/*
  # Create Akıllı Şehir Kocaeli Database Schema

  ## Overview
  This migration creates the database structure for the Kocaeli Smart City interactive map,
  storing information about city zones and their associated projects.

  ## New Tables

  ### `city_zones`
  Core city areas that users can interact with on the map.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Zone name (e.g., "İzmit Körfezi", "SekaPark")
  - `slug` (text, unique) - URL-friendly identifier
  - `color` (text) - Primary color for zone visualization
  - `icon` (text) - Icon identifier for the zone
  - `description` (text) - Short description of the zone
  - `position_x` (numeric) - X coordinate on isometric map
  - `position_y` (numeric) - Y coordinate on isometric map
  - `order_index` (integer) - Display order for scroll animations
  - `created_at` (timestamptz) - Creation timestamp

  ### `zone_projects`
  Individual projects within each city zone.
  - `id` (uuid, primary key) - Unique identifier
  - `zone_id` (uuid, foreign key) - Reference to parent zone
  - `title` (text) - Project title
  - `description` (text) - Detailed project description
  - `image_url` (text) - Project image URL
  - `status` (text) - Project status (planned, in_progress, completed)
  - `year` (integer) - Project year
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on both tables
  - Allow public read access (smart city info is public)
  - Restrict write access to authenticated users only

  ## Initial Data
  Populated with 6 main Kocaeli zones and sample projects for each
*/

-- Create city_zones table
CREATE TABLE IF NOT EXISTS city_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  color text NOT NULL,
  icon text NOT NULL,
  description text NOT NULL,
  position_x numeric NOT NULL,
  position_y numeric NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create zone_projects table
CREATE TABLE IF NOT EXISTS zone_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id uuid REFERENCES city_zones(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text DEFAULT '',
  status text DEFAULT 'completed',
  year integer DEFAULT 2024,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE city_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_projects ENABLE ROW LEVEL SECURITY;

-- Public read access for city zones
CREATE POLICY "Anyone can view city zones"
  ON city_zones FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read access for zone projects
CREATE POLICY "Anyone can view zone projects"
  ON zone_projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can insert zones
CREATE POLICY "Authenticated users can insert zones"
  ON city_zones FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update zones
CREATE POLICY "Authenticated users can update zones"
  ON city_zones FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can insert projects
CREATE POLICY "Authenticated users can insert projects"
  ON zone_projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update projects
CREATE POLICY "Authenticated users can update projects"
  ON zone_projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial city zones
INSERT INTO city_zones (name, slug, color, icon, description, position_x, position_y, order_index) VALUES
('İzmit Körfezi', 'izmit-korfezi', '#0EA5E9', 'Waves', 'Körfez kıyı şeridi ve deniz projelerine odaklı akıllı çözümler', 50, 30, 1),
('SekaPark', 'sekapark', '#10B981', 'Trees', 'Yeşil alan ve rekreasyon projelerinde dijital dönüşüm', 35, 45, 2),
('Kocaeli Kongre Merkezi', 'kongre-merkezi', '#8B5CF6', 'Building2', 'Etkinlik ve kongre yönetiminde teknoloji entegrasyonu', 60, 50, 3),
('Kartepe', 'kartepe', '#EC4899', 'Mountain', 'Turizm ve akıllı ulaşım sistemleri', 70, 25, 4),
('Sanayi Bölgesi', 'sanayi-bolgesi', '#F59E0B', 'Factory', 'Endüstri 4.0 ve akıllı üretim projeleri', 40, 65, 5),
('Ormanya', 'ormanya', '#059669', 'TreeDeciduous', 'Doğa ve çevre teknolojileri', 25, 55, 6);

-- Insert sample projects for each zone
INSERT INTO zone_projects (zone_id, title, description, status, year) VALUES
-- İzmit Körfezi projects
((SELECT id FROM city_zones WHERE slug = 'izmit-korfezi'), 
 'Akıllı Kıyı Sensör Ağı', 
 'Körfez kıyısında su kalitesi, hava durumu ve deniz seviyesi izleme sistemleri', 
 'completed', 2023),
((SELECT id FROM city_zones WHERE slug = 'izmit-korfezi'), 
 'Dijital Marinalar Projesi', 
 'Marina operasyonlarının dijitalleşmesi ve mobil uygulama entegrasyonu', 
 'in_progress', 2024),

-- SekaPark projects
((SELECT id FROM city_zones WHERE slug = 'sekapark'), 
 'Akıllı Park Aydınlatma', 
 'Güneş enerjili ve hareket sensörlü akıllı aydınlatma sistemi', 
 'completed', 2023),
((SELECT id FROM city_zones WHERE slug = 'sekapark'), 
 'Dijital Park Rehberi', 
 'AR teknolojisi ile interaktif park bilgilendirme sistemi', 
 'completed', 2024),

-- Kongre Merkezi projects
((SELECT id FROM city_zones WHERE slug = 'kongre-merkezi'), 
 'Akıllı Etkinlik Yönetimi', 
 'Otomasyon sistemleri ve dijital kayıt platformu', 
 'completed', 2023),
((SELECT id FROM city_zones WHERE slug = 'kongre-merkezi'), 
 'Sanal Kongre Platformu', 
 'Hibrit etkinlikler için dijital altyapı', 
 'in_progress', 2024),

-- Kartepe projects
((SELECT id FROM city_zones WHERE slug = 'kartepe'), 
 'Akıllı Teleferik Sistemi', 
 'Gerçek zamanlı kapasite yönetimi ve mobil biletleme', 
 'completed', 2023),
((SELECT id FROM city_zones WHERE slug = 'kartepe'), 
 'Dijital Turist Bilgilendirme', 
 'Çok dilli dijital tabela ve mobil rehber sistemleri', 
 'planned', 2025),

-- Sanayi Bölgesi projects
((SELECT id FROM city_zones WHERE slug = 'sanayi-bolgesi'), 
 'Endüstri 4.0 Dönüşüm', 
 'IoT sensörler ve veri analitiği ile akıllı fabrikalar', 
 'in_progress', 2024),
((SELECT id FROM city_zones WHERE slug = 'sanayi-bolgesi'), 
 'Akıllı Lojistik Hub', 
 'Otonom araç yönetimi ve depo otomasyonu', 
 'planned', 2025),

-- Ormanya projects
((SELECT id FROM city_zones WHERE slug = 'ormanya'), 
 'Orman İzleme Sistemi', 
 'Yangın algılama ve hava kalitesi sensör ağı', 
 'completed', 2023),
((SELECT id FROM city_zones WHERE slug = 'ormanya'), 
 'Akıllı Tabiat Parkı', 
 'Ekolojik veri toplama ve dijital eğitim platformu', 
 'in_progress', 2024);