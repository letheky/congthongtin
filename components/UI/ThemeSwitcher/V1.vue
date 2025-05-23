<template>
  <div class="flex items-center justify-center h-fit">
    <!-- Theme Toggle Button -->
    <button
      v-if="mounted"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      class="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:bg-gray-400 dark:hover:bg-gray-500"
      @click="toggleTheme"
    >
      <span class="sr-only">Toggle theme</span>

      <!-- Toggle circle with icon -->
      <span
        class="w-6 h-6 transform transition-all duration-200 ease-in-out rounded-full shadow-lg flex items-center justify-center"
        :class="isDark ? 'translate-x-6 bg-gray-800' : 'translate-x-0 bg-white'"
      >
        <!-- Moon icon (dark mode) -->
        <UIIconMoon v-if="isDark" />
        <!-- Sun icon (light mode) -->
        <UIIconSun v-else />
      </span>
    </button>

    <!-- Loading placeholder -->
    <div
      v-else
      class="w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// Reactive state
const isDark = ref(false);
const mounted = ref(false);

// Initialize theme on component mount
onMounted(async () => {
  await nextTick();

  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
  }

  // Set mounted to true to show the button
  mounted.value = true;
});

// Toggle theme function
const toggleTheme = () => {
  isDark.value = !isDark.value;

  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// Expose functions for parent components (optional)
defineExpose({
  toggleTheme,
  isDark: readonly(isDark),
});
</script>

<style scoped>
/* Additional smooth transitions */
.theme-transition {
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
}

/* Custom focus styles */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
