export type ModelCategory = 'actors' | 'models' | 'kids' | 'extras';
export type ModelGender = 'female' | 'male';

export interface Model {
  id: string;
  name: string;
  category: ModelCategory;
  gender: ModelGender;
  height: number; // in cm
  chestOrBust: number; // in cm
  waist: number; // in cm
  hips: number; // in cm
  shoe: number; // EU size
  hairColor: string;
  eyeColor: string;
  age: number;
  location: string;
  bio: string;
  instagram: string;
  mainImage: string;
  gallery: string[];
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  roleOrBrand: string;
}

export interface AgencyStats {
  years: number;
  activeModels: number;
  brandsWorked: number;
  successRate: number;
}

export type PageRoute = 'home' | 'about' | 'models' | 'model-detail' | 'apply' | 'contact' | 'blog';

export interface FilterOptions {
  gender: 'all' | 'female' | 'male';
  category: 'all' | 'actors' | 'models' | 'kids' | 'extras';
  heightRange: 'all' | 'under175' | '175-180' | '180-185' | 'above185';
}
