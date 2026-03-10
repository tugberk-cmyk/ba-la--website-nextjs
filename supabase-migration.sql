-- =============================================
-- Bağlaç Blog Sistemi — Supabase Migration
-- =============================================

-- 1. Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  color text DEFAULT '#000000'
);

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read blog_categories" ON blog_categories FOR SELECT USING (true);

-- 2. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  cover_image text,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_name text DEFAULT 'Bağlaç Ekibi',
  author_title text DEFAULT '',
  author_avatar text DEFAULT '',
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  meta_title text,
  meta_description text
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published blog_posts" ON blog_posts FOR SELECT USING (published = true);

-- 3. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- No public access to admin_users

-- 4. Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read blog-images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Auth upload blog-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Auth update blog-images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Auth delete blog-images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');

-- 5. Seed default categories
INSERT INTO blog_categories (name, slug, color) VALUES
  ('Ürün', 'urun', '#6366f1'),
  ('Teknoloji', 'teknoloji', '#0ea5e9'),
  ('SEO', 'seo', '#10b981'),
  ('E-Ticaret', 'e-ticaret', '#f59e0b'),
  ('Güncel', 'guncel', '#ef4444')
ON CONFLICT (slug) DO NOTHING;
