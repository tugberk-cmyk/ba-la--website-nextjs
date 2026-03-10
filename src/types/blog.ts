export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category_id: string;
  author_name: string;
  author_title: string;
  author_avatar: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  blog_categories?: BlogCategory;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
}
