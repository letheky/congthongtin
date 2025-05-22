interface Translation {
  name: string;
  des: string;
  content: string;
  address: string | null;
  audio: string | null;
  link: string | null;
}

export declare interface TourType {
  translations: {
    vi: Translation;
    en: Translation;
    // Add other languages if needed
  };
  thumbnail: string;
  file: string | null;
  lat: number;
  lng: number;
  highlight: boolean;
  type: string[]; // Assuming this is an array of strings (empty in your example)
  country: string;
  province: string;
  district: string;
  ward: string | null;
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

// Example usage:
const tour: TourType = {
  translations: {
    vi: {
      name: "Chùa Phù Lưu",
      des: "",
      content: "",
      address: null,
      audio: null,
      link: "https://bacninh.vietnaminfo.net/DataFiles/Tour3D/2/index.htm"
    },
    en: {
      name: "Phu Luu Pagoda",
      des: "",
      content: "",
      address: null,
      audio: null,
      link: null
    }
  },
  thumbnail: "http://172.236.145.72:8002/media/app_tour/Tour/2025/05/12/556008b9-6f27-43ca-a0b8-fe0f2558fb41.webp",
  file: null,
  lat: 21.18608,
  lng: 106.07631,
  highlight: true,
  type: [],
  country: "b7e5bb2b-8a8b-4505-b81a-f5b4bc5dfc12",
  province: "c3111182-c941-431b-ad90-7e84cfe7efb2",
  district: "33c7c3b9-90fd-43eb-963a-d606d5d5d333",
  ward: null,
  id: "7100d30b-4b88-4f20-bdf4-2a2ce46562e9",
  order: null,
  slug: "",
  created_at: "2025-05-21T15:54:01.899451+07:00",
  created_by: null,
  updated_at: "2025-05-21T15:54:01.903266+07:00",
  updated_by: "c1c86bc4-3552-417d-852a-42fe5d6b5e73",
  like: 0,
  view: 1
};