<template>
  <div class="rating-component" :class="{ interactive: interactive }">
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="star-wrapper"
      @click="interactive ? handleStarClick(index + 1) : null"
      @mouseenter="interactive ? handleStarHover(index + 1) : null"
      @mouseleave="interactive ? handleMouseLeave() : null"
    >
      <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        class="star-icon"
      >
        <!-- Background star (empty) -->
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          :fill="emptyColor"
          :stroke="strokeColor"
          :stroke-width="strokeWidth"
        />
        
        <!-- Filled star with clip-path for partial filling -->
        <defs v-if="componentId">
          <clipPath :id="`clip-${index}-${componentId}`">
            <rect
              x="0"
              y="0"
              :width="star.fillPercentage + '%'"
              height="100%"
            />
          </clipPath>
        </defs>
        
        <path
          v-if="star.fillPercentage > 0 && componentId"
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          :fill="fillColor"
          :stroke="strokeColor"
          :stroke-width="strokeWidth"
          :clip-path="`url(#clip-${index}-${componentId})`"
        />
      </svg>
    </div>
    
    <!-- Optional rating display -->
    <span v-if="showValue" class="rating-value">
      {{ displayValue }}
    </span>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

// Props
const props = defineProps({
  // Rating value (0-5, supports decimals)
  modelValue: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 5
  },
  
  // Visual customization
  size: {
    type: [Number, String],
    default: 24
  },
  fillColor: {
    type: String,
    default: '#fbbf24' // amber-400
  },
  emptyColor: {
    type: String,
    default: '#e5e7eb' // gray-200
  },
  strokeColor: {
    type: String,
    default: '#d1d5db' // gray-300
  },
  strokeWidth: {
    type: [Number, String],
    default: 1
  },
  
  // Behavior
  interactive: {
    type: Boolean,
    default: false
  },
  allowHalf: {
    type: Boolean,
    default: true
  },
  showValue: {
    type: Boolean,
    default: false
  },
  precision: {
    type: Number,
    default: 1,
    validator: (value) => value >= 0 && value <= 2
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change'])

// Reactive state
const hoverValue = ref(0)
const isHovering = ref(false)
const componentId = ref('')

// Generate component ID only on client side
onMounted(() => {
  componentId.value = Math.random().toString(36).substr(2, 9)
})

// Computed properties
const currentValue = computed(() => {
  return isHovering.value ? hoverValue.value : props.modelValue
})

const displayValue = computed(() => {
  return currentValue.value.toFixed(props.precision)
})

const stars = computed(() => {
  const starsArray = []
  const value = currentValue.value
  
  for (let i = 1; i <= 5; i++) {
    let fillPercentage = 0
    
    if (value >= i) {
      // Full star
      fillPercentage = 100
    } else if (value > i - 1) {
      // Partial star
      const decimal = value - (i - 1)
      fillPercentage = decimal * 100
      
      // Snap to half if allowHalf is true and we're close to 0.5
      if (props.allowHalf && Math.abs(decimal - 0.5) < 0.1) {
        fillPercentage = 50
      }
    }
    
    starsArray.push({
      index: i,
      fillPercentage: Math.max(0, Math.min(100, fillPercentage))
    })
  }
  
  return starsArray
})

// Methods
const handleStarClick = (rating) => {
  let newValue = rating
  
  if (props.allowHalf) {
    // Check if clicking on the same star - toggle between full and half
    if (Math.floor(props.modelValue) === rating && props.modelValue !== rating) {
      newValue = rating
    } else if (props.modelValue === rating) {
      newValue = rating - 0.5
    }
  }
  
  newValue = Math.max(0, Math.min(5, newValue))
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleStarHover = (rating) => {
  if (!props.interactive) return
  
  isHovering.value = true
  hoverValue.value = rating
}

const handleMouseLeave = () => {
  isHovering.value = false
  hoverValue.value = 0
}
</script>

<style scoped>
.rating-component {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.star-wrapper {
  display: inline-flex;
  cursor: default;
  transition: transform 0.1s ease;
}

.interactive .star-wrapper {
  cursor: pointer;
}

.interactive .star-wrapper:hover {
  transform: scale(1.1);
}

.star-icon {
  display: block;
  transition: all 0.2s ease;
}

.rating-value {
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

/* Responsive sizing */
@media (max-width: 640px) {
  .rating-component {
    gap: 1px;
  }
  
  .rating-value {
    margin-left: 6px;
    font-size: 12px;
  }
}
</style>