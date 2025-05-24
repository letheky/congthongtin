<template>
  <div class="bg-gray-100 rounded-lg w-full mx-auto my-4">
    <div
      class="flex justify-between items-center px-4 py-2 cursor-pointer select-none hover:bg-gray-200 rounded-lg transition-colors duration-200"
      @click="toggleCollapse"
    >
      <h3
        class="text-sky-500 dark:text-sky-400 text-base font-medium tracking-wide"
      >
        {{ title || $t("article.contact") }}
      </h3>

      <Transition name="fade" mode="out-in">
        <Icon
          v-if="!isCollapsed"
          name="chevronUp"
          class="w-5 h-5 text-sky-500"
        />
        <Icon v-else name="chevronDown" class="w-5 h-5 text-sky-500" />
      </Transition>
    </div>

    <Transition name="fade" @enter="onEnter" @leave="onLeave">
      <div v-show="!isCollapsed" class="transition-all duration-1000">
        <div class="flex items-center gap-2 px-4 py-4 overflow-hidden">
          <Icon name="pin" class="text-sky-500" />
          <span class="text-gray-600 text-sm leading-relaxed break-words">
            {{ address }}
          </span>
        </div>

        <!-- Additional address items -->
        <div
          v-for="(item, index) in additionalAddresses"
          :key="index"
          class="flex items-start gap-2 mb-2 last:mb-0"
        >
          <svg
            class="text-gray-500 mt-0.5 flex-shrink-0"
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
          <span class="text-gray-600 text-sm leading-relaxed break-words">{{
            item
          }}</span>
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
  el.style.height = el.scrollHeight + "px";
  el.style.opacity = "1";
};

const onLeave = (el) => {
  el.style.height = "0px";
  el.style.opacity = "0";
};
</script>

<style scoped></style>
