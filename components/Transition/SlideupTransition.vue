<template>
  <!-- wrap the built-in Transition component -->
  <Transition name="slide-up">
    <slot></slot>
    <!-- pass down slot content -->
  </Transition>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
