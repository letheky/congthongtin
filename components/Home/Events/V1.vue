<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    class="w-full py-4 px-4 md:px-10 lg:px-20 bg-[url('/images/home/events-bg.png')] bg-cover bg-center min-h-[60vh] relative"
  >
    <h3
      ref="eventsTitle"
      class="text-4xl font-bold text-center text-slate-700 mb-10"
    >
      {{ $t("events.title") }}
    </h3>
    <swiper-container
      ref="containerRef"
      :init="false"
      class="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] shadow-lg bg-white"
    >
      <swiper-slide v-for="event in events" :key="event.id" class="h-full">
        <div class="flex h-full justify-between">
          <div class="w-7/12 py-4 px-8">
            <h4
              class="text-lg md:text-xl lg:text-2xl font-bold text-red-600 mb-2"
            >
              {{ event.title }}
            </h4>
            <hr />
            <div
              class="event-location flex items-center gap-2 mb-2 text-gray-800 mt-2"
            >
              <Icon name="pin" class="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <p class="text-sm md:text-base lg:text-lg">
                {{ $t("location") }}
              </p>
            </div>
            <div class="text-gray-800 flex items-center gap-2 mb-2">
              <Icon
                name="calendar"
                class="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
              />
              <p class="text-sm md:text-base lg:text-lg">{{ event.date }}</p>
            </div>
          </div>
          <NuxtImg
            :src="event.image"
            :alt="event.title"
            :placeholder="5"
            preload
            class="w-5/12 h-full object-cover"
          />
        </div>
      </swiper-slide>
    </swiper-container>
    <!-- Navigation -->
    <div
      class="flex justify-between gap-2 absolute bottom-[34%] md:bottom-[20%] lg:bottom-[22%] left-1/2 -translate-x-1/2 z-10"
    >
      <div
        class="swiper-button-prev flex justify-center items-center h-7 w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 bg-gray-400 rounded-full hover:bg-gray-500"
      >
        <Icon
          name="chevronLeft"
          class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
        />
      </div>
      <div
        class="swiper-button-next flex justify-center items-center h-7 w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 bg-gray-400 rounded-full hover:bg-gray-500"
      >
        <Icon
          name="chevronRight"
          class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
        />
      </div>
    </div>
    <div class="flex justify-center my-5">
      <UIPrimaryBtn>
        {{ $t("button.viewAll") }}
        <Icon name="forward" class="text-white" />
      </UIPrimaryBtn>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { useTextReveal } from "~/composables/useGsap";
const events = [
  {
    id: 1,
    date: "03/03/2025 - 03/03/2025",
    title: "Hội thi Dân ca Quan họ Xuân Ất Tỵ 2025",
    image: "/images/home/event-1.webp",
  },
  {
    id: 2,
    date: "02/03/2025 - 02/03/2025",
    title: "Khai mạc Hội thi hát đối đáp Dân ca Quan họ Bắc Ninh",
    image: "/images/home/event-2.webp",
  },
  {
    id: 3,
    date: "01/03/2025 - 01/03/2025",
    title: "Lễ hội Đền Đô Bắc Ninh",
    image: "/images/home/event-3.webp",
  },
  {
    id: 4,
    date: "28/02/2025 - 28/02/2025",
    title: "Festival Quan họ - Kinh Bắc 2025",
    image: "/images/home/event-4.webp",
  },
];

const containerRef = ref(null);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const swiper = useSwiper(containerRef, {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});

const { elementRef: eventsTitle, animate } = useTextReveal();
animate();
</script>

<style lang="scss" scoped></style>
