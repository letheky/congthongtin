import { onMounted, ref } from 'vue'
import { useNuxtApp } from '#app'
import type { Ref } from 'vue'

// ----- Type Definitions -----

// GSAP Interface
interface GSAP {
  from: (targets: string | HTMLElement | HTMLElement[], vars: object) => void
  to: (targets: string | HTMLElement | HTMLElement[] | object, vars: object) => void
  fromTo: (targets: string | HTMLElement | HTMLElement[], fromVars: object, toVars: object) => void
  set: (targets: string | HTMLElement | HTMLElement[], vars: object) => void
}

// SplitText Interface
interface SplitTextInstance {
  chars: HTMLElement[]
  words: HTMLElement[]
  lines: HTMLElement[]
  [key: string]: HTMLElement[]
}

interface SplitTextConstructor {
  new(element: HTMLElement, options: { type: string | string[] }): SplitTextInstance
}

// ScrollTrigger Interface
interface ScrollTriggerConfig {
  trigger?: string | HTMLElement
  start?: string
  end?: string
  toggleActions?: string
  markers?: boolean
  scrub?: boolean | number
  [key: string]: unknown
}

// Animation Configuration Interfaces
interface TextAnimationConfig {
  type: string | string[]
  stagger: number
  duration: number
  ease: string
  scrollTrigger: ScrollTriggerConfig
  [key: string]: unknown
}

interface SlideAnimationConfig {
  direction: 'left' | 'right' | 'up' | 'down'
  distance: number
  duration: number
  stagger: number
  ease: string
  opacity: number
  scrollTrigger: ScrollTriggerConfig
  [key: string]: unknown
}

interface ScrambleConfig {
  charactersPool: string
  duration: number
  repeat: number
  repeatDelay: number
  stagger: number
  offset: number
  [key: string]: unknown
}

// ----- Text Animation Composable -----

/**
 * Composable for text reveal animations with GSAP and SplitText
 */
export const useTextReveal = (options: Partial<TextAnimationConfig> = {}) => {
  const elementRef: Ref<HTMLElement | null> = ref(null)

  // Default configuration with provided options
  const config: TextAnimationConfig = {
    type: options.type || 'words',
    stagger: options.stagger || 0.05,
    duration: options.duration || 0.8,
    ease: options.ease || 'power3.out',
    scrollTrigger: options.scrollTrigger || {
      start: 'top bottom-=50px',
      toggleActions: 'play none none none'
    }
  }

  /**
   * Initialize the text animation
   * @param customElement - Optional custom element to target instead of elementRef
   * @param customConfig - Optional custom configuration to override defaults
   */
  const animate = (
    customElement: HTMLElement | null = null,
    customConfig: Partial<TextAnimationConfig> = {}
  ): void => {
    onMounted(async () => {
      await nextTick();
      const nuxtApp = useNuxtApp()
      const gsap = nuxtApp.$gsap as GSAP
      const SplitText = nuxtApp.$SplitText as unknown as SplitTextConstructor

      // Use either the provided element or the ref
      const element = customElement || elementRef.value
      if (!element) return

      // Merge default config with unknown custom config
      const mergedConfig: TextAnimationConfig = { ...config, ...customConfig }

      // Create SplitText instance
      const split = new SplitText(element, { type: mergedConfig.type })

      // Get the appropriate split property based on the type
      const targets = Array.isArray(mergedConfig.type)
        ? mergedConfig.type.map(t => split[t]).flat()
        : split[mergedConfig.type as string]

      // Set up the animation
      gsap.fromTo(
        targets,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          stagger: mergedConfig.stagger,
          duration: mergedConfig.duration,
          ease: mergedConfig.ease,
          scrollTrigger: {
            trigger: element,
            ...mergedConfig.scrollTrigger
          },
        }
      )
    })
  }

  return {
    elementRef,
    animate
  }
}

// ----- Slide Animation Composable -----

/**
 * Composable for slide-in animations with GSAP
 */
export const useSlideIn = (options: Partial<SlideAnimationConfig> = {}) => {
  const elementRef: Ref<HTMLElement | null> = ref(null)
  const triggerRef: Ref<HTMLElement | null> = ref(null)

  // Default configuration with provided options
  const config: SlideAnimationConfig = {
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
  }

  /**
   * Initialize the slide animation
   * @param targetSelector - CSS selector or element for animation targets
   * @param customTrigger - Custom trigger element (optional)
   * @param customConfig - Custom configuration to override defaults
   */
  const animate = (
    targetSelector: string | HTMLElement | HTMLElement[] | null = null,
    customTrigger: string | HTMLElement | null = null,
    customConfig: Partial<SlideAnimationConfig> = {}
  ): void => {
    onMounted(async () => {
      // Get GSAP from Nuxt app
      await nextTick();
      const nuxtApp = useNuxtApp()
      const gsap = nuxtApp.$gsap as GSAP

      // Determine targets
      const targets = targetSelector || elementRef.value
      if (!targets) return

      // Determine trigger element
      const trigger = customTrigger || triggerRef.value || (typeof targets === 'string' ? targets : targets)

      // Merge default config with unknown custom config
      const mergedConfig: SlideAnimationConfig = { ...config, ...customConfig }

      // Set animation properties based on direction
      const animationProps: Record<string, unknown> = {
        opacity: mergedConfig.opacity,
        duration: mergedConfig.duration,
        stagger: mergedConfig.stagger,
        ease: mergedConfig.ease
      }

      // Add directional properties
      switch (mergedConfig.direction) {
        case 'left':
          animationProps.x = mergedConfig.distance
          break
        case 'right':
          animationProps.x = -mergedConfig.distance
          break
        case 'up':
          animationProps.y = mergedConfig.distance
          break
        case 'down':
          animationProps.y = -mergedConfig.distance
          break
      }

      // Add scroll trigger
      animationProps.scrollTrigger = {
        trigger,
        ...mergedConfig.scrollTrigger
      }

      // Run the animation
      gsap.from(targets, animationProps)
    })
  }

  /**
   * Slide in from left to right
   */
  const fromLeft = (
    targetSelector: string | HTMLElement | HTMLElement[] | null = null,
    customTrigger: string | HTMLElement | null = null,
    customConfig: Partial<SlideAnimationConfig> = {}
  ): void => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'left'
    })
  }

  /**
   * Slide in from right to left
   */
  const fromRight = (
    targetSelector: string | HTMLElement | HTMLElement[] | null = null,
    customTrigger: string | HTMLElement | null = null,
    customConfig: Partial<SlideAnimationConfig> = {}
  ): void => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'right'
    })
  }

  /**
   * Slide in from bottom to top
   */
  const fromBottom = (
    targetSelector: string | HTMLElement | HTMLElement[] | null = null,
    customTrigger: string | HTMLElement | null = null,
    customConfig: Partial<SlideAnimationConfig> = {}
  ): void => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'up'
    })
  }

  /**
   * Slide in from top to bottom
   */
  const fromTop = (
    targetSelector: string | HTMLElement | HTMLElement[] | null = null,
    customTrigger: string | HTMLElement | null = null,
    customConfig: Partial<SlideAnimationConfig> = {}
  ): void => {
    animate(targetSelector, customTrigger, {
      ...customConfig,
      direction: 'down'
    })
  }

  return {
    elementRef,
    triggerRef,
    animate,
    fromLeft,
    fromRight,
    fromBottom,
    fromTop
  }
}

// ----- Text Scramble Animation Composable -----

/**
 * Composable for text scramble effect with GSAP and SplitText
 */
export const useTextScramble = (options: Partial<ScrambleConfig> = {}) => {
  const elementRefs: Ref<(HTMLElement | null)[]> = ref([])

  // Default configuration with provided options
  const config: ScrambleConfig = {
    charactersPool: options.charactersPool || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    duration: options.duration !== undefined ? options.duration : 0.2,
    repeat: options.repeat !== undefined ? options.repeat : 5,
    repeatDelay: options.repeatDelay !== undefined ? options.repeatDelay : 0,
    stagger: options.stagger !== undefined ? options.stagger : 0.03,
    offset: options.offset !== undefined ? options.offset : 0.4,
    type: options.type || 'chars'
  }

  /**
   * Initialize the text scramble animation
   * @param elements - Elements to apply the scramble effect to
   * @param customConfig - Optional custom configuration to override defaults
   */
  const animate = (
    elements: (HTMLElement | null)[] | HTMLElement | null = null,
    customConfig: Partial<ScrambleConfig> = {}
  ): void => {
    onMounted(async () => {
      await nextTick();
      const nuxtApp = useNuxtApp()
      const gsap = nuxtApp.$gsap as GSAP
      const SplitText = nuxtApp.$SplitText as unknown as SplitTextConstructor

      // Use either provided elements or refs
      const targetElements = elements
        ? (Array.isArray(elements) ? elements : [elements]).filter(Boolean) as HTMLElement[]
        : elementRefs.value.filter(Boolean) as HTMLElement[]

      if (targetElements.length === 0) return

      // Merge default config with unknown custom config
      const mergedConfig: ScrambleConfig = { ...config, ...customConfig }

      // Process each element
      targetElements.forEach((element, idx) => {
        if (!element) return

        // Create SplitText instance
        const split = new SplitText(element, { type: mergedConfig.type as string | string[] })
        const chars = split[mergedConfig.type as string]

        // Apply scramble effect to each character
        chars.forEach((char, i) => {
          const original = char.textContent

          gsap.to(
            {}, // Empty object as target
            {
              duration: mergedConfig.duration,
              repeat: mergedConfig.repeat,
              repeatDelay: mergedConfig.repeatDelay,
              onRepeat: () => {
                if (!char) return
                // Replace with random character from pool
                char.textContent = mergedConfig.charactersPool[
                  Math.floor(Math.random() * mergedConfig.charactersPool.length)
                ]
              },
              onComplete: () => {
                if (!char) return
                // Restore original character
                char.textContent = original
              },
              // Stagger effect with offset between elements
              delay: i * mergedConfig.stagger - idx * mergedConfig.offset
            }
          )
        })
      })
    })
  }

  return {
    elementRefs,
    animate
  }
}

// ----- Main useGsap Composable -----

/**
 * Main GSAP composable that combines all animation utilities
 */
export const useGsap = () => {
  /**
   * Create a text reveal animation instance
   */
  const createTextReveal = (options: Partial<TextAnimationConfig> = {}) => {
    return useTextReveal(options)
  }

  /**
   * Create a slide-in animation instance
   */
  const createSlideIn = (options: Partial<SlideAnimationConfig> = {}) => {
    return useSlideIn(options)
  }

  /**
   * Create a text scramble animation instance
   */
  const createTextScramble = (options: Partial<ScrambleConfig> = {}) => {
    return useTextScramble(options)
  }

  /**
   * Run text scramble effect directly (convenience method)
   */
  const scrambleText = (
    elements: (HTMLElement | null)[] | HTMLElement | null,
    options: Partial<ScrambleConfig> = {}
  ) => {
    const scrambler = useTextScramble(options)
    scrambler.animate(elements)
    return scrambler
  }

  return {
    // Factory methods
    createTextReveal,
    createSlideIn,
    createTextScramble,

    // Direct access to composables
    textReveal: useTextReveal,
    slideIn: useSlideIn,
    textScramble: useTextScramble,

    // Convenience methods
    scrambleText
  }
}