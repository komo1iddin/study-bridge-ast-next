// University content type
export interface University {
  id: number;
  name: string;
  logo: string;
  image: string;
  city: string;
  description: string;
  educationType: string[];
  hasGrants: boolean;
  featured: boolean;
  ranking: number;
  foundedYear: number;
  studentsCount: number;
  internationalStudents: number;
  slug: string;
  content?: string;
}

// Grant content type
export interface Grant {
  id: number;
  title: string;
  description: string;
  amount: string;
  requirements: string;
  featured: boolean;
  slug: string;
  content?: string;
}

// Blog post content type
export interface BlogPost {
  title: string;
  date: string;
  thumbnail: string;
  author: string;
  summary: string;
  tags: string[];
  slug: string;
  content: string;
} 