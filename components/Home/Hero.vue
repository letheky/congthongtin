<template>
  <section class="hero">
    <ClientOnly>
      <swiper-container ref="containerRef" :init="false">
        <swiper-slide
          v-for="(slide, idx) in slides"
          :key="idx"
          style="background-color: rgb(32, 233, 70); color: white"
        >
          Slide {{ idx + 1 }}
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
    <article class="hero-content">
      <h2>Chào mừng bạn đến với</h2>
      <h1>Bắc Ninh</h1>
      <div class="hero-buttons">
        <button class="btn-secondary">
          <Icon name="pin" class="icon" /> Khám phá bản đồ số
        </button>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const containerRef = ref(null);
const slides = ref(Array.from({ length: 10 }));
const swiper = useSwiper(containerRef, {
  effect: "creative",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
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
