<template>
    <!-- wrap the built-in Transition component -->
    <Transition name="slide-fade">
      <slot></slot>
      <!-- pass down slot content -->
    </Transition>
  </template>
  
  <style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
  </style>
  