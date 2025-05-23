<template>
  <div class="bg-gray-100 dark:bg-gray-700 rounded-lg max-w-md mx-auto">
    <div
      class="flex justify-between items-center p-4 cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
      @click="toggleCollapse"
    >
      <h3
        class="text-sky-500 dark:text-sky-400 text-base font-medium tracking-wide"
      >
        {{ title || $t("article.contact") }}
      </h3>
      <button
        class="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-700 
        dark:hover:text-gray-200 rounded transition-all duration-200"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="!isCollapsed"
            d="M19 12H5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            v-else
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <Transition
      name="slide"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-show="!isCollapsed" class="px-4 pb-4 overflow-hidden">
        <div class="flex items-start gap-2 mb-2">
          <svg
            class="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="12"
              cy="10"
              r="3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed break-words"
            >{{ address }}</span
          >
        </div>

        <!-- Additional address items -->
        <div
          v-for="(item, index) in additionalAddresses"
          :key="index"
          class="flex items-start gap-2 mb-2 last:mb-0"
        >
          <svg
            class="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="12"
              cy="10"
              r="3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed break-words"
            >{{ item }}</span
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "Thôn Bút Tháp, xã Định Tố, huyện Thuận Thành",
  },
  additionalAddresses: {
    type: Array,
    default: () => [],
  },
  defaultCollapsed: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["toggle"]);

// Reactive state
const isCollapsed = ref(props.defaultCollapsed);

// Methods
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("toggle", isCollapsed.value);
};

// Transition methods
const onEnter = (el) => {
  el.style.height = "0";
  el.style.opacity = "0";
};

const onAfterEnter = (el) => {
  el.style.height = "auto";
  el.style.opacity = "1";
};

const onLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
  void el.offsetHeight; // force reflow
  el.style.height = "0";
  el.style.opacity = "0";
};

const onAfterLeave = (el) => {
  el.style.height = "auto";
  el.style.opacity = "1";
};
</script>

<style scoped>
/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.slide-enter-from {
  height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
