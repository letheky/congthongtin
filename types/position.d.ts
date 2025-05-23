// position.d.ts
interface Translation {
  name: string;
  des: string | null;
  content: string | null;
  address: string | null;
  open_time?: string;
  rule?: string;
  ticket?: string;
  audio: string | null;
  tags?: string;
}

interface ImageItem {
  translations: {
    vi: {
      title: string;
      des: string | null;
    };
    en?: {
      title?: string;
      des?: string | null;
    };
  };
  image: string;
  position: string;
  id: string;
  order: number | null;
  slug: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string;
  updated_by: string | null;
}

interface VideoItem {
  translations: {
    vi: {
      title: string;
      des: string | null;
    };
    en?: {
      title?: string;
      des?: string | null;
    };
  };
  video: string;
  position: string;
  id: string;
  order: number | null;
  slug: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string;
  updated_by: string | null;
}

interface LocationEntity {
  translations: {
    vi: {
      name: string;
    };
    en: {
      name: string;
    };
  };
  code: string;
  id: string;
  order?: number | null;
  slug: string;
  created_at: string;
  created_by: string | null;
  updated_at: string;
  updated_by: string | null;
  country?: string;
  province?: string;
  district?: string;
}

interface RateItem {
  translations: {
    vi: {
      title: string;
      des: string | null;
    };
    en?: {
      title?: string;
      des?: string | null;
    };
  };
  rate: string;
  position: string;
  id: string;
  order: number | null;
  slug: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string;
  updated_by: string | null;
}

interface PositionItem {
  translations: {
    vi: Translation;
    en: Translation;
  };
  thumbnail: string;
  image: string;
  phone: string;
  website: string | null;
  lat: number;
  lng: number;
  charge: boolean;
  allow_comment: boolean;
  highlight: boolean;
  suggest_time: unknown[]; // Replace with specific type if known
  tour: unknown | null; // Replace with specific type if known
  type: string[];
  service: string[];
  category: string[];
  country: LocationEntity;
  province: LocationEntity;
  district: LocationEntity;
  ward: LocationEntity | null;
  rate: number;
  rate_list: RateItem[];
  image_list: ImageItem[];
  video_list: VideoItem[];
  id: string;
  order: number | null;
  slug: string;
  created_at: string;
  created_by: string | null;
  updated_at: string;
  updated_by: string;
  like: number;
  view: number;
}

export default PositionItem;