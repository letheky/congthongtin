<!-- eslint-disable -->
<template>
  <div class="w-full h-fit md:h-[40vh] flex flex-col md:flex-row">
    <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="todo-item w-full md:w-1/2 h-[28vh] md:h-full relative group"
      :class="{ 'slide-down': index % 2 === 0, 'slide-up': index % 2 !== 0 }"
    >
      <NuxtImg
        :src="todo.image"
        class="w-full h-full object-cover brightness-75"
      />
      <Icon
        :name="todo.icon"
        class="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10"
      />
      <h3
        class="text-white text-xl text-center font-bold absolute top-24 md:top-32 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {{ todo.title }}
      </h3>
      <div
        class="absolute top-32 md:top-40 left-1/2 -translate-x-1/2 w-[70%] md:w-[80%] flex flex-col gap-2 justify-center items-center opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <div
          v-for="content in todo.content.split('.').map((c) => c.trim())"
          :key="content"
          class="text-white text-xs md:text-sm text-center"
        >
          {{ content }}
        </div>
        <button
          class="!px-4 !py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs md:text-sm flex items-center hover:gap-1 cursor-pointer"
        >
          {{ $t("button.explore") }} <Icon name="forward" class="w-4 h-4" />
        </button>
      </div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-2 border-white opacity-0 scale-x-50 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none`"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-white opacity-0 scale-x-50 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
      ></div>
    </div>
  </div>
</template>

<script setup>
const todos = [
  {
    id: 1,
    title: "Ở đâu?",
    content: "Luôn có địa chỉ lưu trú phù hợp ở đâu đó dành riêng cho bạn",
    icon: "building",
    image: "/images/home/todo-1.webp",
  },
  {
    id: 2,
    title: "Ăn gì?",
    content:
      "Lựa chọn ẩm thực phong phú thỏa mãn tín đồ ẩm thực. Đa dạng trải nghiệm từ cao cấp đến đường phố",
    icon: "eat",
    image: "/images/home/todo-2.webp",
  },
  {
    id: 3,
    title: "Chơi gì?",
    content: "Tìm kiếm sự độc độc đáo mới lạ",
    icon: "landmark",
    image: "/images/home/todo-3.webp",
  },
  {
    id: 4,
    title: "Cẩm nang du lịch",
    content: "Tận hưởng chuyến du lịch của bạn",
    icon: "handbook",
    image: "/images/home/todo-4.webp",
  },
];

onMounted(async () => {
  await nextTick();

  const { $gsap: gsap } = useNuxtApp();
  const ScrollTrigger = await import("gsap/ScrollTrigger").then(
    (m) => m.default
  );
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".todo-item").forEach((el) => {
    const isSlideDown = el.classList.contains("slide-down");

    gsap.from(el, {
      y: isSlideDown ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
});
</script>

<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.5s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}

.scale-enter-to,
.scale-leave-from {
  transform: scale(1);
}
</style>
