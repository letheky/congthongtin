import {
  onMounted,
  ref,
  nextTick
} from 'vue';
import {
  useNuxtApp
} from '#app';

// ----- Text Animation Composable -----

/**
 * Composable for text reveal animations with GSAP and SplitText
 */
export const useTextReveal = (options = {}) => {
  const elementRef = ref(null);

  // Default configuration with provided options
  const config = {
    type: options.type || 'words',
    stagger: options.stagger || 0.05,
    duration: options.duration || 0.8,
    ease: options.ease || 'power3.out',
    scrollTrigger: options.scrollTrigger || {
      // Default start, will be overridden by matchMedia
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  /**
   * Initialize the text animation
   * @param {HTMLElement | null} customElement - Optional custom element to target instead of elementRef
   * @param {object} customConfig - Optional custom configuration to override defaults
   */
  const animate = (
    customElement = null,
    customConfig = {}
  ) => {
    onMounted(async () => {
      await nextTick();
      const nuxtApp = useNuxtApp();
      const gsap = nuxtApp.$gsap;
      const SplitText = nuxtApp.$SplitText;
      const mm = gsap.matchMedia();

      // Use either the provided element or the ref
      const element = customElement || elementRef.value;
      if (!element) return;

      // Merge default config with custom config
      const mergedConfig = {
        ...config,
        ...customConfig
      };

      // Create SplitText instance
      const split = new SplitText(element, {
        type: mergedConfig.type
      });

      // Get the appropriate split property based on the type
      const targets = Array.isArray(mergedConfig.type) ?
        mergedConfig.type.map(t => split[t]).flat() :
        split[mergedConfig.type];

      // Set up the animation using matchMedia for responsive ScrollTrigger settings
      mm.add({
        // Desktop and larger devices
        isDesktop: `(min-width: 768px)`,
        // Mobile devices
        isMobile: `(max-width: 767px)`
      }, (context) => {
        const {
          isDesktop,
          isMobile
        } = context.conditions;

        let startPosition = mergedConfig.scrollTrigger.start; // Default

        if (isDesktop) {
          startPosition = 'top 90%';
        } else if (isMobile) {
          startPosition = 'top 110%';
        }

        gsap.fromTo(
          targets, {
            yPercent: 100,
            opacity: 0,
          }, {
            yPercent: 0,
            opacity: 1,
            stagger: mergedConfig.stagger,
            duration: mergedConfig.duration,
            ease: mergedConfig.ease,
            scrollTrigger: {
              trigger: element,
              ...mergedConfig.scrollTrigger, // Spread existing scrollTrigger options
              start: startPosition, // Override start based on viewport
            },
          }
        );

        // It's good practice to return a cleanup function for matchMedia
        return () => {
          // Kill the animation when the media query no longer matches,
          // or when the component unmounts.
          if (gsap.getTweensOf(targets).length) {
            gsap.killTweensOf(targets);
          }
          // Revert SplitText if necessary, though usually ScrollTrigger handles this
          // by reverting the animation. If you face issues with text remaining split,
          // you might need to explicitly revert it here.
          // split.revert(); // Uncomment if needed
        };
      });
    });
  };

  return {
    elementRef,
    animate
  };
};

// ----- Slide Animation Composable -----

/**
 * Composable for slide-in animations with GSAP
 */
export const useSlideIn = (options = {}) => {
  const elementRef = ref(null);
  const triggerRef = ref(null);

  // Default configuration with provided options
  const config = {
    direction: options.direction || 'right',
    distance: options.distance !== undefined ? options.distance : 50,
    duration: options.duration || 0.6,
    stagger: options.stagger || 0.1,
    ease: options.ease || 'power2.out',
    opacity: options.opacity !== undefined ? options.opacity : 0,
    scrollTrigger: options.scrollTrigger || {
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  };

  /**
   * Initialize the slide animation
   * @param {string | HTMLElement | HTMLElement[] | null} targetSelector - CSS selector or element for animation targets
   * @param {string | HTMLElement | null} customTrigger - Custom trigger element (optional)
   * @param {object} customConfig - Custom configuration to override defaults
   */
  const animate = (
    targetSelector = null,
    customTrigger = null,
    customConfig = {}
  ) => {
    onMounted(async () => {
      await nextTick();
      const nuxtApp = useNuxtApp();
      const gsap = nuxtApp.$gsap;
      const mm = gsap.matchMedia();

      const targets = targetSelector || elementRef.value;
      if (!targets) return;

      const trigger = customTrigger || triggerRef.value || (typeof targets === 'string' ? targets : targets);

      const mergedConfig = {
        ...config,
        ...customConfig
      };

      const animationProps = {
        opacity: mergedConfig.opacity,
        duration: mergedConfig.duration,
        stagger: mergedConfig.stagger,
        ease: mergedConfig.ease
      };

      switch (mergedConfig.direction) {
        case 'left':
          animationProps.x = mergedConfig.distance;
          break;
        case 'right':
          animationProps.x = -mergedConfig.distance;
          break;
        case 'up':
          animationProps.y = mergedConfig.distance;
          break;
        case 'down':
          animationProps.y = -mergedConfig.distance;
          break;
      }

      mm.add({
        // Desktop and larger devices
        isDesktop: `(min-width: 768px)`,
        // Mobile devices
        isMobile: `(max-width: 767px)`
      }, (context) => {
        const {
          isDesktop,
          isMobile
        } = context.conditions;

        let startPosition = mergedConfig.scrollTrigger.start; // Default

        if (isDesktop) {
          startPosition = 'top 80%';
        } else if (isMobile) {
          startPosition = 'top 120%';
        }

        animationProps.scrollTrigger = {
            trigger: trigger,
            ...mergedConfig.scrollTrigger, // Spread existing scrollTrigger options
            start: startPosition, // Override start based on viewport
          },

          gsap.from(targets, animationProps);

        // It's good practice to return a cleanup function for matchMedia
        return () => {
          // Kill the animation when the media query no longer matches,
          // or when the component unmounts.
          if (gsap.getTweensOf(targets).length) {
            gsap.killTweensOf(targets);
          }
          // Revert SplitText if necessary, though usually ScrollTrigger handles this
          // by reverting the animation. If you face issues with text remaining split,
          // you might need to explicitly revert it here.
          // split.revert(); // Uncomment if needed
        };
      });

    });
  };

  /**
   * Slide in from left to right
   */
  const fromLeft = (
    targetSelector = null,
    customTrigger = null,
    customConfig = {}
  ) => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'left'
    });
  };

  /**
   * Slide in from right to left
   */
  const fromRight = (
    targetSelector = null,
    customTrigger = null,
    customConfig = {}
  ) => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'right'
    });
  };

  /**
   * Slide in from bottom to top
   */
  const fromBottom = (
    targetSelector = null,
    customTrigger = null,
    customConfig = {}
  ) => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'up'
    });
  };

  /**
   * Slide in from top to bottom
   */
  const fromTop = (
    targetSelector = null,
    customTrigger = null,
    customConfig = {}
  ) => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'down'
    });
  };

  return {
    elementRef,
    triggerRef,
    animate,
    fromLeft,
    fromRight,
    fromBottom,
    fromTop
  };
};

// ----- Text Scramble Animation Composable -----

/**
 * Composable for text scramble effect with GSAP and SplitText
 */
export const useTextScramble = (options = {}) => {
  const elementRefs = ref([]);

  // Default configuration with provided options
  const config = {
    charactersPool: options.charactersPool || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    duration: options.duration !== undefined ? options.duration : 0.2,
    repeat: options.repeat !== undefined ? options.repeat : 5,
    repeatDelay: options.repeatDelay !== undefined ? options.repeatDelay : 0,
    stagger: options.stagger !== undefined ? options.stagger : 0.03,
    offset: options.offset !== undefined ? options.offset : 0.4,
    type: options.type || 'chars' // Retained this as it's used by SplitText
  };

  /**
   * Initialize the text scramble animation
   * @param {(HTMLElement | null)[] | HTMLElement | null} elements - Elements to apply the scramble effect to
   * @param {object} customConfig - Optional custom configuration to override defaults
   */
  const animate = (
    elements = null,
    customConfig = {}
  ) => {
    onMounted(async () => {
      await nextTick();
      const nuxtApp = useNuxtApp();
      const gsap = nuxtApp.$gsap;
      const SplitText = nuxtApp.$SplitText;

      const targetElements = elements ?
        (Array.isArray(elements) ? elements : [elements]).filter(Boolean) :
        elementRefs.value.filter(Boolean);

      if (targetElements.length === 0) return;

      const mergedConfig = {
        ...config,
        ...customConfig
      };

      targetElements.forEach((element, idx) => {
        if (!element) return;

        const split = new SplitText(element, {
          type: mergedConfig.type
        });
        const chars = split[mergedConfig.type]; // mergedConfig.type should be 'chars', 'words', or 'lines'

        if (!chars) return; // Safety check if type doesn't match SplitText output

        chars.forEach((char, i) => {
          const original = char.textContent;

          gsap.to({}, // Empty object as target
            {
              duration: mergedConfig.duration,
              repeat: mergedConfig.repeat,
              repeatDelay: mergedConfig.repeatDelay,
              onRepeat: () => {
                if (!char) return;
                char.textContent = mergedConfig.charactersPool[
                  Math.floor(Math.random() * mergedConfig.charactersPool.length)
                ];
              },
              onComplete: () => {
                if (!char) return;
                char.textContent = original;
              },
              delay: i * mergedConfig.stagger - idx * mergedConfig.offset
            }
          );
        });
      });
    });
  };

  return {
    elementRefs,
    animate
  };
};

// ----- Main useGsap Composable -----

/**
 * Main GSAP composable that combines all animation utilities
 */
export const useGsap = () => {

  return {

    // Direct access to composables (useful for invoking their setup with default options)
    useTextReveal,
    useSlideIn,
    useTextScramble,

  };
};