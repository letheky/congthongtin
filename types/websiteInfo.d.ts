export declare interface LanguageInfo {
  name: string,
  des: string,
  slogan: string,
  manager: string,
  address: string,
  copyright: string
}
export declare interface WebsiteInfo {
  translations: {
    [key: string]: LanguageInfo; // for dynamic language support, e.g., "vi", "en"
  };
  phone: string,
  email: string,
  favicon: string,
  logo: string
}