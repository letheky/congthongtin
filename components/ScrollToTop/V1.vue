<!-- components/ScrollToTop.vue -->
<template>
  <transition name="fade">
    <button
      v-show="isVisible"
      class="scroll-to-top"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  </transition>
</template>

<script>
export default {
  name: "ScrollToTop",
  props: {
    visibilityHeight: {
      type: Number,
      default: 400,
    },
    scrollDuration: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    // Only add event listeners on client-side to avoid SSR issues
    if (import.meta.client) {
      window.addEventListener("scroll", this.toggleVisibility);
    }
  },
  beforeUnmount() {
    // Clean up event listeners
    if (import.meta.client) {
      window.removeEventListener("scroll", this.toggleVisibility);
    }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = window.pageYOffset > this.visibilityHeight;
    },
    scrollToTop() {
      const startPosition = window.pageYOffset;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;

        if (elapsedTime < this.scrollDuration) {
          const progress = this.easeInOutCubic(
            elapsedTime / this.scrollDuration
          );
          window.scrollTo(0, startPosition * (1 - progress));
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, 0);
        }
      };

      requestAnimationFrame(animateScroll);
    },
    // Easing function for smoother animation
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
  },
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 20;
  transition: background-color 0.3s, transform 0.2s;
}

.scroll-to-top:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.scroll-to-top:active {
  transform: translateY(0);
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
