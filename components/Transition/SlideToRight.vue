<template>
  <!-- wrap the built-in Transition component -->
  <Transition name="slide-to-right">
    <slot></slot>
    <!-- pass down slot content -->
  </Transition>
</template>

<style>
.slide-to-right-enter-active,
.slide-to-right-leave-active {
  transition: all 0.25s ease-out;
}

.slide-to-right-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-to-right-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
