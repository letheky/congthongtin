<template>
  <section class="w-full py-4 px-10">
    <h3 class="mt-10 text-5xl text-red-600 font-bold text-center">
      {{ t("explore.title") }} {{ t("location") }}
    </h3>
    <p class="text-gray-800 text-2xl text-center py-5">
      {{ t("explore.description") }}
    </p>
    <div
      class="grid grid-cols-1 grid-rows-5 gap-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2"
    >
      <div
        v-for="place in places"
        :key="place.name"
        class="relative first-of-type:col-span-1 first-of-type:row-span-1 md:first-of-type:col-span-2 md:first-of-type:row-span-2 col-span-1 row-span-1 overflow-hidden cursor-pointer rounded-md"
      >
        <NuxtImg
          :src="place.image"
          :alt="place.name"
          class="w-full h-full hover:scale-110 transition-all duration-300"
        />
        <div class="w-full h-full absolute top-0 left-0 pointer-events-none">
          <NuxtImg
            src="/images/360-icon.png"
            alt="360° view"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
          />
          <h4 class="text-white text-2xl bottom-5 left-5 absolute">
            {{ place.name }}
          </h4>
        </div>
      </div>
    </div>

    <div class="my-10 flex justify-center">
      <UIPrimaryBtn
        >{{ t("button.viewAll") }}
        <Icon name="forward" class="text-white" />
      </UIPrimaryBtn>
    </div>

    <section
      class="grid grid-cols-1 grid-rows-9 md:grid-cols-2 md:grid-rows-5 lg:grid-cols-3 lg:grid-rows-3 gap-4 h-fit lg:h-[80vh]"
    >
      <div
        v-for="place in fullPlaces"
        :key="place.name"
        class="relative h-80 md:h-60 lg:h-full w-full overflow-hidden cursor-pointer rounded-md"
      >
        <NuxtImg
          :src="place.image"
          :alt="place.name"
          class="w-full h-full hover:scale-105 hover:brightness-75 transition-all duration-300"
        />
        <div class="absolute bottom-5 left-5">
          <h4
            class="text-white text-md md:text-xl lg:text-2xl"
            style="text-shadow: 0 0 10px rgba(0, 0, 0, 0.5)"
          >
            {{ place.name }}
          </h4>
        </div>
      </div>
      <div
        class="h-full w-full bg-red-600 flex flex-col justify-center items-center gap-4 row-start-5 md:col-start-1 md:row-start-3 lg:col-start-2 lg:row-start-2"
      >
        <h2 class="text-white text-4xl">
          {{ t("location") }}
        </h2>
        <p class="text-white text-xl h-8 typing-text relative">
          {{ currentText }}
        </p>
      </div>
    </section>
  </section>
</template>

<script setup>
// import SecondaryButton from '@/components/UI/SecondaryButton.vue';
import { ref, onMounted } from "vue";

const { t } = useI18n();
const places = [
  {
    name: "Văn Miếu Bắc Ninh",
    image: "/images/home/discovery-1.webp",
    url: "/van-mieu-bac-ninh",
  },
  {
    name: "Chùa Phù Lưu",
    image: "/images/home/discovery-2.webp",
    url: "/chua-phu-luu",
  },
  {
    name: "Đền thờ tiến sĩ Lê Văn Thịnh",
    image: "/images/home/discovery-3.webp",
    url: "/den-tho-tien-si",
  },
  {
    name: "Đình Phù Lưu",
    image: "/images/home/discovery-4.webp",
    url: "/dinh-phu-luu",
  },
  {
    name: "Chùa Phí Tướng",
    image: "/images/home/discovery-5.webp",
    url: "/chua-phi-tuong",
  },
];

const fullPlaces = [
  {
    name: "Chùa Bút Tháp - Kiệt tác của lịch sử",
    image: "/images/home/explore-1.webp",
    url: "/chua-but-thap",
  },
  {
    name: "Chùa Dâu – ngôi chùa cổ nhất Việt Nam",
    image: "/images/home/explore-2.webp",
    url: "/chua-dau",
  },
  {
    name: "Di tích lịch sử Khu lăng mộ và đền thờ các vị Vua triều Lý",
    image: "/images/home/explore-3.webp",
    url: "/lang-mo-den-tho-vua-ly",
  },
  {
    name: "Di tích lịch sử và kiến trúc nghệ thuật chùa Phật Tích",
    image: "/images/home/explore-4.webp",
    url: "/chua-phat-tich",
  },
  {
    name: "Di tích lịch sử, kiến trúc nghệ thuật đình Đình Bảng",
    image: "/images/home/explore-5.webp",
    url: "/dinh-dinh-bang",
  },
  {
    name: "Cụm di tích lịch sử, cách mạng Đình, Đền, Chùa Đồng Kỵ",
    image: "/images/home/explore-6.webp",
    url: "/cum-di-tich-dong-ky",
  },
  {
    name: "Cụm di tích Lăng và Đền thờ Cao Lỗ Vương",
    image: "/images/home/explore-7.webp",
    url: "/lang-den-cao-lo-vuong",
  },
  {
    name: "Thành cổ Luy Lâu",
    image: "/images/home/explore-8.webp",
    url: "/thanh-co-luy-lau",
  },
];

const texts = t("explore.slogan").split("...");

const currentText = ref("");
const currentIndex = ref(0);
const isDeleting = ref(false);
const typingSpeed = 150;
const deletingSpeed = 75;
const delayBetweenTexts = 2000;

const typeText = () => {
  const current = currentIndex.value;
  const text = texts[current];

  if (isDeleting.value) {
    currentText.value = text.substring(0, currentText.value.length - 1);
  } else {
    currentText.value = text.substring(0, currentText.value.length + 1);
  }

  let typeSpeed = isDeleting.value ? deletingSpeed : typingSpeed;

  if (!isDeleting.value && currentText.value === text) {
    typeSpeed = delayBetweenTexts;
    isDeleting.value = true;
  } else if (isDeleting.value && currentText.value === "") {
    isDeleting.value = false;
    currentIndex.value = (currentIndex.value + 1) % texts.length;
  }

  setTimeout(typeText, typeSpeed);
};

onMounted(() => {
  setTimeout(typeText, typingSpeed);
});
</script>
<style scoped>
.typing-text::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: white;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
