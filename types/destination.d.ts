type Translation = {
  name: string;
  des: string | null;
  content: string;
  address: string;
  open_time: string;
  rule: string;
  ticket: string;
  audio: string | null;
  tags: string;
};

type Translations = {
  vi: Translation;
  en: Translation;
};

type Destination = {
  translations: Translations;
  thumbnail: string;
  image: string;
  phone: string;
  website: string | null;
  lat: number;
  lng: number;
  charge: boolean;
  allow_comment: boolean;
  highlight: boolean;
  tour: null | string; 
  type: string[];
  service: string[];
  category: string[];
  country: string;
  province: string;
  district: string;
  ward: string;
  rate: number;
  id: string;
  order: null | number; 
  slug: string;
  created_at: string; // Consider using Date type if you'll parse it
  created_by: string | null;
  updated_at: string; // Consider using Date type if you'll parse it
  updated_by: string;
  like: number;
  view: number;
};

export const Destination;