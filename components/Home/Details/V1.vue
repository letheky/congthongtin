<template>
  <section
    class="w-full !p-4 md:!px-8 md:!py-10 max-w-full overflow-hidden"
  >
    <h3
      ref="detailsTitle"
      class="text-4xl font-bold text-center text-slate-700 mb-10"
    >
      {{ $t("details.title") }}
    </h3>
    <div
      class="grid grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-2 gap-4 !mt-5 h-fit md:h-[50vh] lg:h-[60vh]"
    >
      <div
        v-for="(place, index) in places"
        :key="place.name"
        class="colorful-item rounded-md overflow-hidden relative h-80 md:h-[30vh] lg:h-full w-full"
        :class="{ large: index === 0, medium: index === 1 }"
      >
        <NuxtImg
          class="w-full h-full object-cover hover:scale-105 transition-all duration-300"
          :src="place.image"
          :alt="place.name"
        />
        <div
          class="absolute bottom-2 left-2 w-[95%] h-fit flex items-center gap-2"
        >
          <NuxtImg
            :src="place.user.avatar"
            :alt="place.user.name"
            format="webp"
            class="w-10 h-10 rounded-full"
          />

          <div class="flex flex-col">
            <h4 class="text-white text-sm font-bold">{{ place.user.name }}</h4>
            <p class="text-white text-sm">{{ place.user.comment }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center !mt-6">
      <UIPrimaryBtn class="hover:gap-4">
        {{ $t("button.viewMore") }}
        <Icon name="forward" class="w-4 h-4" />
      </UIPrimaryBtn>
    </div>
  </section>
</template>

<script setup>
const { $gsap: gsap } = useNuxtApp();
const mm = gsap.matchMedia();
const places = [
  {
    image: "/images/home/colorful-1.webp",
    url: "/van-mieu-bac-ninh",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment: "Mời anh về Bắc Ninh em chơi thăm",
    },
  },
  {
    image: "/images/home/colorful-2.webp",
    url: "/chua-phu-luu",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment: "Đến Bắc Ninh, đừng quên thưởng thức ẩm thực nơi này",
    },
  },
  {
    image: "/images/home/colorful-3.webp",
    url: "/den-tho-tien-si",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment:
        "Mời anh về Bắc Ninh em chơi thăm, lễ hội nô nức đông vui quanh năm...",
    },
  },
  {
    image: "/images/home/colorful-4.webp",
    url: "/dinh-phu-luu",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment: "Mời anh về với hội Lim",
    },
  },
];

const { elementRef: detailsTitle, animate: animateTitle } = useTextReveal();
animateTitle();

onMounted(async () => {
  await nextTick();

  mm.add("(min-width: 768px)", () => {
    gsap.utils.toArray(".colorful-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          x: index === 0 ? -200 : 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });

  mm.add("(max-width: 767px)", () => {
    gsap.utils.toArray(".colorful-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          x: index % 2 === 0 ? -200 : 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,

          scrollTrigger: {
            trigger: item,
            start: "top 120%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });
});
</script>

<style lang="scss" scoped>
.colorful-item {
  grid-column: span 1;
  grid-row: span 1;
}
@media (min-width: 768px) {
  .colorful-item {
    &:first-of-type {
      grid-column: span 2;
      grid-row: span 2;
    }
    &:nth-of-type(2) {
      grid-column: span 2;
      grid-row: span 1;
    }
  }
}
@media (min-width: 1024px) {
  .colorful-item {
    &:first-of-type {
      grid-column: span 2;
      grid-row: span 2;
    }
    &:nth-of-type(2) {
      grid-column: span 2;
      grid-row: span 1;
    }
  }
}
</style>
