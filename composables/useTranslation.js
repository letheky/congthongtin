export const useTranslation = () => {
  // Get current locale from i18n
  const {
    locale
  } = useI18n();
  const currentLocale = computed(() => locale.value);

  /**
   * Helper function to safely get translations with fallback
   * @param {Object} item - The object containing translations
   * @param {String} field - The field name to get translation for
   * @returns {String} - The translated text or fallback
   */
  const getTranslation = (item, field) => {
    // Check if item exists
    if (!item) return "-";

    // Check if translations object exists
    if (!item.translations) return item[field] || "-";

    // First try the current locale
    if (item.translations[currentLocale.value]?.[field]) {
      return item.translations[currentLocale.value][field];
    }

    // Last resort fallback
    return item[field] || "-";
  };

  return {
    currentLocale,
    getTranslation
  };
};

export default useTranslation;