<template>
  <section class="w-full !py-4 !px-10 overflow-hidden">
    <h3
      ref="exploreTitle"
      class="!mt-10 text-5xl text-red-600 font-bold text-center"
    >
      {{ getTranslation(exploreTextLabel, "content") }}
      {{ getTranslation(locationTextLabel, "content") }}
    </h3>
    <p
      ref="exploreDescription"
      class="text-gray-800 text-2xl text-center !py-5"
    >
      {{ getTranslation(exploreSmallTextLabel, "content") }}
    </p>
    <div
      class="grid grid-cols-1 grid-rows-5 gap-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2"
    >
      <div
        v-for="tour in tourList.results"
        :key="tour.id"
        class="place-card relative first-of-type:col-span-1 first-of-type:row-span-1 md:first-of-type:col-span-2 md:first-of-type:row-span-2 col-span-1 row-span-1 overflow-hidden cursor-pointer rounded-md"
        @click="openDetailTour(tour)"
      >
        <NuxtImg
          :src="tour.thumbnail"
          :alt="getTranslation(tour, 'name')"
          class="place-card__image w-full h-full hover:scale-110 transition-all duration-300"
          preload
          :placeholder="[89, 60, 75, 5]"
        />
        <div class="w-full h-full absolute top-0 left-0 pointer-events-none">
          <NuxtImg
            src="/images/360-icon.png"
            alt="360° view"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
          />
          <h4 class="text-white text-xl bottom-2 left-3 absolute">
            {{ getTranslation(tour, "name") }}
          </h4>
        </div>
      </div>
    </div>

    <div class="!my-10 flex justify-center">
      <NuxtLink
        to="/tour360"
        class="flex items-center gap-2 px-4 py-2 rounded-sm text-white bg-red-600 hover:bg-red-700"
      >
        {{ t("button.viewAll") }}
        <Icon name="forward" class="text-white" />
      </NuxtLink>
    </div>

    <section
      class="explore-full-grid grid grid-cols-1 grid-rows-9 md:grid-cols-2 md:grid-rows-5 lg:grid-cols-3 lg:grid-rows-3 gap-4 h-fit lg:h-[80vh]"
    >
      <div
        v-for="place in destinationList?.results"
        :key="place.id"
        class="explore-full-item relative h-80 md:h-60 lg:h-full w-full overflow-hidden cursor-pointer rounded-md"
      >
        <NuxtImg
          :src="place.thumbnail"
          :alt="getTranslation(place, 'name')"
          class="w-full h-full hover:scale-105 hover:brightness-75 transition-all duration-300"
          preload
          :placeholder="5"
        />
        <div class="absolute bottom-5 left-5">
          <NuxtLink
            :to="`/destination/${place.id}`"
            class="text-white text-md md:text-xl lg:text-2xl"
            style="text-shadow: 0 0 10px rgba(0, 0, 0, 0.5)"
          >
            {{ getTranslation(place, "name") }}
          </NuxtLink>
        </div>
      </div>
      <div
        class="explore-full-item h-full w-full bg-red-600 flex flex-col justify-center items-center gap-4 row-start-5 md:col-start-1 md:row-start-3 lg:col-start-2 lg:row-start-2"
      >
        <h2 class="text-white text-4xl">
          {{ t("location") }}
        </h2>
        <p class="text-white text-xl h-8 typing-text relative">
          {{ currentText }}
        </p>
      </div>
    </section>

    <Transition name="position-fade" mode="out-in">
      <TourModalDetailV1
        v-if="isTourOpen"
        :model-value="isTourOpen"
        :current-tour-id="currentOpenTourId"
        :close="handleCloseModal"
      />
    </Transition>
  </section>
</template>

<script setup>
import useStore from "~/store/useStore";
import { useTextReveal } from "~/composables/useGsap";

//Get text label for homepage
const { getTranslation } = useTranslation();
const { data: textLabelList } = await useFetch(`/api/setup/textLabel`);
const exploreTextLabel = computed(() =>
  textLabelList.value.results.find((item) => item.name === "khampha")
);
const locationTextLabel = computed(() =>
  textLabelList.value.results.find((item) => item.name === "diadiem")
);
const exploreSmallTextLabel = computed(() =>
  textLabelList.value.results.find((item) => item.name === "khamphasmall")
);

//Get tour data
const { data: tourList } = await useFetch("/api/tour360/by-category");
const { isOpen: isTourOpen, close: closeTour, open: openTour } = useModal();
const currentOpenTourId = ref(null);

const openDetailTour = (tour) => {
  currentOpenTourId.value = tour.id;
  openTour();
};
const handleCloseModal = () => {
  currentOpenTourId.value = null;
  document.body.classList.remove("no-scroll");
  closeTour();
};

//Get destination data
const { data: destinationList } = useFetch(
  "/api/position/by-category?page_size=8"
);

//Other setup
const { t } = useI18n();
const { $gsap: gsap } = useNuxtApp();
const mm = gsap.matchMedia();

/**
 * * Animation with text, image, icon
 */
const websiteInfoStore = useStore();
const texts = t("explore.slogan").split("...");

const currentText = ref(
  getTranslation.value(websiteInfoStore.websiteInfo.value, "slogan")
);

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

const { elementRef: exploreTitle, animate: animateTitle } = useTextReveal();
animateTitle();
const { elementRef: exploreDescription, animate: animateDes } = useTextReveal();
animateDes();

onMounted(() => {
  setTimeout(typeText, typingSpeed);
});

onMounted(async () => {
  await nextTick();

  const items = document.querySelectorAll(".place-card");

  mm.add("(min-width: 768px)", () => {
    items.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: index === 0 ? -200 : 200,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  });
  mm.add("(max-width: 767px)", () => {
    items.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 120%",
          toggleActions: "play none none none",
        },
        x: index % 2 === 0 ? -200 : 200,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  });
});

onMounted(async () => {
  await nextTick();

  mm.add("(min-width: 768px)", () => {
    gsap.utils.toArray(".explore-full-item").forEach((item) => {
      gsap.from(item, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  mm.add("(max-width: 767px)", () => {
    gsap.utils.toArray(".explore-full-item").forEach((item) => {
      gsap.from(item, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 120%",
          toggleActions: "play none none none",
        },
      });
    });
  });
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
