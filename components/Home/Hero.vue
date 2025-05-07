<template>
  <section class="relative h-[80vh]">
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
      class="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-10 w-10 h-10 z-10 bg-gray-400 rounded-full hover:bg-gray-500 hidden md:block "
    >
      <Icon name="chevronLeft" class="text-white w-10 h-10" />
    </div>
    <div
      class="swiper-button-next absolute top-1/2 -translate-y-1/2 right-10 w-10 h-10 z-10 bg-gray-400 rounded-full hover:bg-gray-500 hidden md:block "
    >
      <Icon name="chevronRight" class="text-white w-10 h-10" />
    </div>

    <article
      class="absolute top-20 left-10 md:top-40 md:left-48  min-w-fit flex flex-col justify-center gap-5 z-10"
    >
      <h2
        class="text-white text-4xl font-semibold border-l-4 border-red-600 !pl-4 tracking-tighter"
        style="text-shadow: 0 1px 1px #6f6f6f"
      >
        {{ t("hero.title") }}
      </h2>
      <h1
        class="text-white text-7xl font-bold tracking-tight"
        style="text-shadow: 3px 3px 2px #6f6f6f"
      >
        {{ t("hero.location") }}
      </h1>
      <div>
        <UIPrimaryBtn>
          <Icon name="mapicon" class="icon" /> {{ t("hero.description") }}
        </UIPrimaryBtn>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
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

<style lang="scss" scoped>
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
}
</style>
