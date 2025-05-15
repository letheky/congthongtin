<template>
  <section class="w-full relative h-[80vh]">
    <ClientOnly>
      <swiper-container
        ref="containerRef"
        :init="false"
        class="w-full h-[80vh] relative"
      >
        <swiper-slide
          v-for="i in 6"
          :key="i"
          class="w-full"
          style="height: 80vh"
        >
          <NuxtImg
            class="w-full h-full object-cover"
            :src="`/images/home/hero-image-${i}.webp`"
            :placeholder="5"
            preload
            alt="Hero"
          />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
    <!-- Navigation -->
    <div
      class="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-10 w-10 h-10 z-10 bg-gray-500 rounded-full hover:bg-gray-600 hover:rotate-[360] hidden md:block transition-all duration-300"
    >
      <Icon name="chevronLeft" class="text-white w-10 h-10" />
    </div>
    <div
      class="swiper-button-next absolute top-1/2 -translate-y-1/2 right-10 w-10 h-10 z-10 bg-gray-500 rounded-full hover:bg-gray-600 hover:rotate-360 hidden md:block transition-all duration-300"
    >
      <Icon name="chevronRight" class="text-white w-10 h-10" />
    </div>
  </section>
</template>

<script setup lang="ts">
const containerRef = ref(null);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const swiper = useSwiper(containerRef, {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
</script>

<style lang="scss" scoped></style>
