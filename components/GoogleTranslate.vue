<template>
  <div>
    <div id="google_translate_element" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const loadGoogleTranslateScript = () => {
  // Check if the script is already loaded
  if (
    !document.querySelector(
      '[src="https://translate.google.com/translate_a/element.js"]'
    )
  ) {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;

    // Assign the callback function to initialize
    script.onload = () => {
      window.googleTranslateElementInit = initGoogleTranslate;
    };

    document.head.appendChild(script);
  } else if (typeof window.google !== "undefined" && window.google.translate) {
    initGoogleTranslate();
  }
};

const initGoogleTranslate = () => {
  if (typeof window.google !== "undefined" && window.google.translate) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "vi", // Default language
        includedLanguages: "en,CN", 
      },
      "google_translate_element"
    );
  } else {
    console.error("Google Translate library not loaded.");
  }
};

// Load the script when component is mounted
onMounted(() => {
  loadGoogleTranslateScript();
});
</script>

<style scoped>
/* Styling to hide the Google Translate banner */
.goog-te-banner-frame.skiptranslate {
  display: none !important;
}
body {
  top: 0 !important;
}
</style>
