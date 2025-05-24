<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-full overflow-hidden">
    <BreadCrumbV2 :breadcrumb="breadcrumbData" />
    <article
      class="w-full max-w-7xl mx-auto py-10 px-5 md:px-10 flex flex-col lg:flex-row gap-5"
    >
      <main class="w-full lg:w-2/3">
        <template v-if="destination">
          <h2 class="text-3xl font-semibold text-slate-800 py-4">
            {{ getTranslation(destination, "name") }}
          </h2>
          <hr class="text-slate-200" />
          <span
            class="text-slate-500 text-sm flex flex-col sm:flex-row align-center gap-3 my-4"
          >
            <p class="flex items-center gap-1">
              <Icon name="pin" class="w-5 h-5" />
              {{ getTranslation(destination.district, "name") }}
            </p>
            <p class="flex items-center gap-1">
              <Icon name="view" class="w-5 h-5" />
              {{ destination.view }}
              {{ $t("article.view") }}
            </p>
            <p class="flex items-center gap-1">
              <Icon name="like" class="w-5 h-5" />
              {{ destination.like }}
              {{ $t("article.like") }}
            </p>
            <p class="flex items-center gap-1">
              <ClientOnly>
                <UIRatingV1
                  :model-value="destination.rate"
                  :size="20"
                  :precision="2"
                />
              </ClientOnly>
              {{ destination.rate_list.length }}
              {{ $t("article.rate") }}
            </p>
          </span>
          <div class="w-full h-fit">
            <UCarousel
              v-slot="{ item }"
              loop
              dots
              :autoplay="{ delay: 2000 }"
              :items="destination.image_list"
              class="w-full h-full"
            >
              <NuxtImg
                :src="item.image"
                class="w-full aspect-[2/1] h-60 sm:h-100 md:h-130 lg:h-160 rounded-lg"
              />
            </UCarousel>
          </div>
          <div
            class="my-5 text-slate-700"
            v-html="getTranslation(destination, 'content')"
          />
          <template v-if="destination.service.length > 0">
            <h3 class="text-slate-700 text-2xl font-bold tracking-tighter my-3">
              {{ $t("article.service") }}
            </h3>
            <span
              v-for="item in destinationServiceList"
              :key="item"
              class="text-slate-700 flex items-center gap-1"
            >
              <Icon name="check" class="text-sky-500 w-5 h-5" />
              {{ item }}
            </span>
          </template>
          <div v-if="getTranslation(destination, 'address')" class="min-h-32">
            <UIAccordionSingleV1
              :address="getTranslation(destination, 'address')"
            />
          </div>
          <hr />
          <UIShareGroupV1 />
          <h2 class="text-slate-700 text-3xl font-bold tracking-tighter my-6">
            {{ $t("article.form.rateTitle") }}
          </h2>
          <ClientOnly>
            <UIPostFormRateV1 :api-path="`/api/position/${id}`" />
          </ClientOnly>
        </template>
      </main>
      <aside class="w-full lg:w-1/3 flex flex-col gap-5">
        <section class="p-3 border border-gray-200 rounded-md h-fit">
          <h4 class="text-xl text-slate-700 font-semibold mb-1 cursor-pointer">
            {{ $t("article.map") }}
          </h4>
          <UIMapV1
            :target-location="destination"
            :show-direction="false"
            :zoom-level="15"
          />
        </section>
        <AsidePlacesV1
          :api-path="`/api/position/by-category${categoryURLParams}`"
        />
        <AsideRestaurantsV1
          :api-path="`/api/restaurant/by-type?page_size=${5}`"
        />
        <AsideHotelsV1 :api-path="`/api/stay/by-type?page_size=${5}`" />
      </aside>
    </article>
  </div>
</template>

<script setup>
// import type PositionItem from '~/types/position'
definePageMeta({
  layout: "home",
});
const { getTranslation } = useTranslation();
const route = useRoute();
const id = route.params.id;

const { data: destination } = await useFetch(`/api/position/${id}`);
const { data: serviceList } = await useFetch("/api/position/service");

const destinationServiceList = computed(() => {
  const result = [];
  const filterdService = serviceList.value.results.filter((service) =>
    destination.value.service.includes(service.id)
  );
  filterdService.forEach((service) => {
    result.push(getTranslation.value(service, "name"));
  });
  return result;
});

const categoryURLParams = computed(() => {
  let result = "";
  destination.value.category.forEach((category, index) => {
    result += index === 0 ? `?category=${category}` : `,${category}`;
  });
  result += destination.value.category.length === 0 ? "?page_size=5" : "&page_size=5";
  return result;
});

const breadcrumbData = computed(() => [
  {
    label: "home",
    text: "",
    path: "/",
  },
  {
    label: "destination",
    text: "",
    path: "/destination",
  },
  {
    text: getTranslation.value(destination.value, "name"),
    path: `/destination/${destination.value.id}`,
  }
]);
</script>

<style scoped></style>
