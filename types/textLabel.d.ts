interface TranslationContent {
  content: string;
  // des: string;
}

export declare interface TextLabel {
  id: number;
  name: string;
  translations: Record<string, TranslationContent>; // dynamic language keys like 'vi', 'en', 'fr'
}
