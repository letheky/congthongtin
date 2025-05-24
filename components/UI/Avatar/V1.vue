<template>
  <div
    :class="[
      'relative inline-flex items-center justify-center rounded-full overflow-hidden',
      sizeClasses,
    ]"
  >
    <!-- Display image if src exists -->
    <NuxtImg
      v-if="src"
      :src="src"
      :alt="alt || 'Avatar'"
      class="w-full h-full object-cover"
    />

    <!-- Display initials with random background if no src -->
    <div
      v-else
      :class="[
        'w-full h-full flex items-center justify-center text-white font-semibold',
        backgroundColorClass,
        textSizeClass,
      ]"
    >
      {{ initials }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<Props>(), {
  src: "",
  alt: "",
  size: "md",
});

// Generate initials from alt text
const initials = computed(() => {
  if (!props.alt) return "?";

  const words = props.alt.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return [words.at(0), words.at(-1)]
    .map((word) => (word ? word.charAt(0) : ''))
    .join("")
    .toUpperCase();
});

// Generate consistent random color based on alt text
const backgroundColorClass = computed(() => {
  if (!props.alt) return "bg-gray-500";

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-rose-500",
  ];

  // Create a simple hash from the alt text for consistent color selection
  let hash = 0;
  for (let i = 0; i < props.alt.length; i++) {
    hash = props.alt.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
});

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };
  return sizes[props.size];
});

// Text size classes for initials
const textSizeClass = computed(() => {
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };
  return textSizes[props.size];
});
</script>
