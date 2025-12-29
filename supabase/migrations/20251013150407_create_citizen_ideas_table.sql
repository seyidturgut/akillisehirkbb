/*
  # Vatandaş Fikirleri Tablosu

  1. Yeni Tablo
    - `citizen_ideas`
      - `id` (uuid, primary key) - Benzersiz fikir ID
      - `name` (text) - Fikir sahibinin adı
      - `email` (text) - İletişim için email
      - `category` (text) - Fikir kategorisi (ulaşım, enerji, çevre vb.)
      - `title` (text) - Fikir başlığı
      - `description` (text) - Detaylı açıklama
      - `location` (text, optional) - İlçe/bölge bilgisi
      - `status` (text) - Durum (pending, reviewing, approved, implemented)
      - `likes` (integer) - Beğeni sayısı
      - `created_at` (timestamptz) - Oluşturulma tarihi
      - `updated_at` (timestamptz) - Güncellenme tarihi

  2. Güvenlik
    - RLS aktif
    - Herkes okuyabilir
    - Herkes yeni fikir ekleyebilir
    - Sadece kendi fikirlerini güncelleyebilir
*/

CREATE TABLE IF NOT EXISTS citizen_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  location text,
  status text DEFAULT 'pending' NOT NULL,
  likes integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE citizen_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ideas"
  ON citizen_ideas
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert ideas"
  ON citizen_ideas
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own ideas"
  ON citizen_ideas
  FOR UPDATE
  TO anon, authenticated
  USING (email = current_setting('request.headers')::json->>'x-user-email')
  WITH CHECK (email = current_setting('request.headers')::json->>'x-user-email');

CREATE INDEX IF NOT EXISTS idx_citizen_ideas_created_at ON citizen_ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_citizen_ideas_status ON citizen_ideas(status);
CREATE INDEX IF NOT EXISTS idx_citizen_ideas_category ON citizen_ideas(category);
