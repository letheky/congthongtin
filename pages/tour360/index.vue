<template>
  <div
    v-if="tourList"
    class="w-full h-fit overflow-hidden px-10 py-5 md:px-20 md:py-10 max-w-7xl mx-auto"
  >
    <span class="w-full h-fit flex justify-between items-center mb-5">
      <h2
        v-if="tourList?.total_objects"
        class="text-slate-700 font-bold text-3xl"
      >
        {{ tourList.total_objects }} Tour 360
      </h2>
      <div
        class="flex items-center w-fit text-white border border-slate-200 rounded-md p-1 bg-slate-700"
      >
        <span
          class="flex items-center justify-center gap-1 py-1 px-3 rounded-sm cursor-pointer transition-colors duration-300"
          :class="activeTab === 'grid' ? 'text-slate-800 bg-primary-600' : ''"
          @click="activeTab = 'grid'"
        >
          <Icon name="grid" class="w-5 h-5" />
          <h4 class="text-sm font-semibold">Lưới</h4>
        </span>
        <span
          class="flex items-center justify-center gap-1 py-1 px-3 rounded-sm cursor-pointer transition-colors duration-300"
          :class="activeTab === 'map' ? 'text-slate-800 bg-primary-600' : ''"
          @click="activeTab = 'map'"
        >
          <Icon name="contactMap" class="w-5 h-5" />
          <h4 class="text-sm font-semibold">Bản đồ</h4>
        </span>
      </div>
    </span>
    <Transition name="fade" mode="out-in">
      <div
        v-if="activeTab === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <section
          v-for="tour in tourList.results"
          :key="tour.id"
          class="relative w-full max-w-full overflow-hidden flex flex-col border border-slate-200 rounded-md shadow-2xl"
        >
          <NuxtImg
            :src="tour.thumbnail"
            :alt="getTranslation(tour, 'name')"
            class="w-full h-[30vh]"
          />
          <span
            class="absolute w-8 h-8 top-3 right-3 p-1 bg-white cursor-pointer rounded-full flex items-center justify-center gap-x-0.5"
            :class="{
              'text-red-600': likedTours.has(tour.id),
              'text-slate-500 hover:text-red-600': !likedTours.has(tour.id),
            }"
            @click="likeTour(tour.id)"
          >
            <Icon name="like" class="w-4 h-4" />
            <p class="text-xs">{{ tour.like }}</p>
          </span>
          <span
            class="flex flex-col sm:flex-row gap-1 justify-between items-center text-slate-700 px-4 my-2"
          >
            <div class="flex items-center gap-2">
              <Icon name="pin" class="text-red-700 w-5 h-5" />
              <p class="text-sm">{{ getTranslation(tour, "address") }}</p>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="view" class="text-red-700 w-5 h-5" />
              <p class="text-sm">{{ tour.view }} {{ $t("article.view") }}</p>
            </div>
          </span>
          <h3
            class="text-xl font-semibold text-black px-4 mb-2 cursor-pointer hover:text-error-600"
            @click="openDetailTour(tour)"
          >
            {{ getTranslation(tour, "name") }}
          </h3>
        </section>
      </div>
      <div v-else class="w-full h-fit overflow-hidden">
        <UIMapListV1 :location-list="tourList.results" />
      </div>
    </Transition>
    <TourModalDetailV1
      v-if="isTourOpen"
      :model-value="isTourOpen"
      :current-tour-id="currentOpenTourId"
      :close="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { TourType } from "~/types/tour";
const { t } = useI18n();
const { getTranslation } = useTranslation();
const { data: tourList } = await useFetch("/api/tour360/by-category");
const config = useRuntimeConfig();
const serverEndpoint = config.public.serverEndpoint;
const toast = useToast();

const activeTab = ref("grid");

// Initialize a Set to store liked tour IDs from local storage
const likedTours = ref<Set<string>>(new Set());

// On component mount, load liked tours from local storage
onMounted(() => {
  const storedLikes = localStorage.getItem("likedTours");
  if (storedLikes) {
    likedTours.value = new Set(JSON.parse(storedLikes));
  }
});

const likeTour = async (id: string) => {
  // Check if the tour has already been liked by this user
  if (likedTours.value.has(id)) {
    toast.add({ title: t("article.warn"), color: "warning", duration: 1500 });
    return; // Exit the function if already liked
  }

  try {
    const response = await fetch(`${serverEndpoint}tour/tour/${id}/like`);

    if (!response.ok) {
      throw new Error("Failed to like the tour.");
    }

    // Find the tour in the list and update its like count
    const likedTour = tourList.value.results.find(
      (tour: TourType) => tour.id === id
    );

    if (likedTour) {
      likedTour.like += 1;
      // Add the tour ID to our likedTours Set
      likedTours.value.add(id);
      // Save the updated Set to local storage
      localStorage.setItem(
        "likedTours",
        JSON.stringify(Array.from(likedTours.value))
      );
    }
  } catch (error) {
    console.error("Error liking tour:", error);
    // Optionally, show an error message to the user
  }
};

const { isOpen: isTourOpen, close: closeTour, open: openTour } = useModal();
const currentOpenTourId = ref("");

const openDetailTour = (tour: TourType) => {
  currentOpenTourId.value = tour.id;
  openTour();
};
const handleCloseModal = () => {
  currentOpenTourId.value = "";
  document.body.classList.remove("no-scroll");
  closeTour();
};
</script>

<style scoped></style>
