export const useTranslation = () => {
  // Get current locale from i18n
  const {
    locale,
    defaultLocale
  } = useI18n();
  const currentLocale = computed(() => locale.value);
  // Simple in-memory cache for async translations
  // This will store results like: { 'en': { 'tour1_name': 'Translated Name' } }
  const translationCache = ref({});

  /**
   * Helper function to safely get translations with fallback
   * @param {Object} item - The object containing translations
   * @param {String} field - The field name to get translation for
   * @returns {String} - The translated text or fallback
   */
  // Memoized version that automatically updates when locale changes
  const getTranslation = computed(() => {
    return (item, field) => {
      if (!item) return "-";

      // Current locale fallback chain
      return item.translations?.[locale.value]?.[field]??item[field]??"-";
    };
  });

  const getTranslationAsync = computed(() => {
    console.log('check cache', translationCache.value)
    return async (item, field) => {
      // Create a unique key for caching based on item ID and field
      // Assuming 'item' has a unique 'id' property. Adjust if not.
      const cacheKey = `${item.id || JSON.stringify(item)}_${field}`;
      const cachedValue = translationCache.value[currentLocale.value]?.[cacheKey];

      // If translation is in cache, return it immediately
      if (cachedValue) {
        // console.log(`Returning from cache for ${cacheKey}`);
        return cachedValue;
      }

      // Check if item exists
      if (!item) return "-";

      // First try the current locale (direct from source data)
      if (item.translations[currentLocale.value]?.[field]) {
        const value = item.translations[currentLocale.value][field];
        // Cache this value
        if (!translationCache.value[currentLocale.value]) {
          translationCache.value[currentLocale.value] = {};
        }
        translationCache.value[currentLocale.value][cacheKey] = value;
        return value;
      }

      // Translate fallback language
      if (item.translations[defaultLocale]?.[field]) {
        try {
          const translatedText = await $fetch('/api/setup/translate', {
            method: 'POST',
            body: {
              "text": item.translations[defaultLocale]?.[field],
              "from": "vi", // Assuming default locale is always 'vi' for API
              "to": currentLocale.value
            }
          });
          const result = translatedText;
          // Cache the result
          if (!translationCache.value[currentLocale.value]) {
            translationCache.value[currentLocale.value] = {};
          }
          translationCache.value[currentLocale.value][cacheKey] = result;
          return result;
        } catch (error) {
          console.error("Translation API error:", error);
          // Fallback in case of API error
          const fallback = item[field] || "-";
          if (!translationCache.value[currentLocale.value]) {
            translationCache.value[currentLocale.value] = {};
          }
          translationCache.value[currentLocale.value][cacheKey] = fallback;
          return fallback;
        }
      }

      // Last resort fallback
      const fallback = item[field] || "-";
      if (!translationCache.value[currentLocale.value]) {
        translationCache.value[currentLocale.value] = {};
      }
      translationCache.value[currentLocale.value][cacheKey] = fallback;
      return fallback;
    };
  });


  return {
    currentLocale,
    getTranslation,
    getTranslationAsync
  };
};

export default useTranslation;