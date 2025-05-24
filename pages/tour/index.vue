<template>
  <div
    v-if="destinationList"
    class="w-full h-fit overflow-hidden px-10 py-5 md:px-20 md:py-10 max-w-7xl mx-auto"
  >
    <span class="w-full h-fit flex justify-between items-center mb-5">
      <h2
        v-if="destinationList?.total_objects"
        class="text-slate-700 font-bold text-3xl"
      >
        {{ destinationList.total_objects }} {{ $t("breadcrumb.destination") }}
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
          v-for="destination in destinationList.results"
          :key="destination.id"
          class="relative w-full max-w-full overflow-hidden flex flex-col justify-between border border-slate-200 rounded-md shadow-2xl"
        >
          <NuxtImg
            :src="destination.thumbnail"
            :alt="getTranslation(destination, 'name')"
            class="w-full h-[30vh]"
          />
          <span
            class="absolute w-8 h-8 top-3 right-3 p-1 bg-white cursor-pointer rounded-full flex items-center justify-center gap-x-0.5"
            :class="{
              'text-red-600': likedDestinations.has(destination.id),
              'text-slate-500 hover:text-red-600': !likedDestinations.has(
                destination.id
              ),
            }"
            @click="likeDestination(destination.id)"
          >
            <Icon name="like" class="w-4 h-4" />
            <p class="text-xs">{{ destination.like }}</p>
          </span>
          <span
            class="flex flex-col sm:flex-row gap-1 justify-between items-center text-slate-700 px-4 my-2"
          >
            <div class="flex items-center gap-2">
              <Icon name="pin" class="text-red-700 w-5 h-5" />
              <p class="text-sm">
                {{ getTranslation(destination, "address") }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="view" class="text-red-700 w-5 h-5" />
              <p class="text-sm">
                {{ destination.view }} {{ $t("article.view") }}
              </p>
            </div>
          </span>
          <NuxtLink
            class="text-xl font-semibold text-black px-4 mb-2 cursor-pointer hover:text-error-600"
            :to="`/destination/${destination.id}`"
          >
            {{ getTranslation(destination, "name") }}
          </NuxtLink>
        </section>
      </div>
      <div v-else class="w-full h-fit overflow-hidden">
        <UIMapViewListV1 :location-list="destinationList.results" />
      </div>
    </Transition>
    <UPagination
      v-if="destinationList.total_objects > 10"
      v-model:page="page"
      show-edges
      :sibling-count="1"
      :total="destinationList.total_objects"
      size="xl"
      color="none"
      active-color="error"
      active-variant="subtle"
    />
  </div>
</template>

<script setup lang="ts">
import type { Destination } from "~/types/destination";
const { t } = useI18n();
const { getTranslation } = useTranslation();

//GET list contact by category
const page = ref(1);

// Fetch contacts with category and pagination
const { data: destinationList } = await useFetch(
  () => {
    return `/api/trip/by-category?page=${page.value}`;
  },
  {
    watch: [page],
  }
);

const toast = useToast();

const activeTab = ref("grid");

// Initialize a Set to store liked tour IDs from local storage
const likedDestinations = ref<Set<string>>(new Set());

// On component mount, load liked destinations from local storage
onMounted(() => {
  const storedLikes = localStorage.getItem("likedDestinations");
  if (storedLikes) {
    likedDestinations.value = new Set(JSON.parse(storedLikes));
  }
});

const likeDestination = async (id: string) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  // Check if the destination has already been liked by this user
  if (likedDestinations.value.has(id)) {
    toast.add({ title: t("article.warn"), color: "warning", duration: 1500 });
    return; // Exit the function if already liked
  }

  try {
    const response = await fetch(
      `${serverEndpoint}position/position/${id}/like`
    );

    if (!response.ok) {
      throw new Error("Failed to like the destination.");
    }

    // Find the destination in the list and update its like count
    const likedDestination = destinationList.value.results.find(
      (destination: Destination) => destination.id === id
    );

    if (likedDestination) {
      likedDestination.like += 1;
      // Add the tour ID to our likedDestination Set
      likedDestinations.value.add(id);
      // Save the updated Set to local storage
      localStorage.setItem(
        "likedDestinations",
        JSON.stringify(Array.from(likedDestinations.value))
      );
    }
  } catch (error) {
    console.error("Error liking destination:", error);
    // Optionally, show an error message to the user
    toast.add({
      description: t("article.form.error.normal"),
      color: "error",
    });
  }
};
</script>

<style scoped></style>
