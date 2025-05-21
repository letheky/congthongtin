<template>
  <div class="w-full overflow-hidden">
    <BreadCrumbV2 :breadcrumb="breadcrumbData" />
    <div class="px-[5%] py-6 text-slate-700">
      <section>
        <h3 class="text-center text-3xl font-semibold">
          {{ getTranslation(currentTextLabel, "content") }}
        </h3>
        <p class="text-center text-md">
          {{ getTranslation(currentSmallTextLabel, "content") }}
        </p>
      </section>
      <section class="flex flex-col md:flex-row justify-between my-4 gap-6">
        <span class="w-full md:w-1/5 border border-slate-500 h-fit">
          <h3
            class="text-lg font-semibold py-1 mx-3 mb-1 border-b border-b-slate-500"
          >
            {{ getTranslation(currentTextLabel, "content") }}
          </h3>
          <ul class="py-2">
            <NuxtLink
              v-for="item in categories.results"
              :key="item.id"
              class="relative inline-block w-full"
              :to="`/utilities/category=${item.id}`"
              :class="{ 'active-nav': item.id === categoryId }"
            >
              <Icon
                v-if="item.id === categoryId"
                name="check"
                class="absolute left-2 top-[50%] -translate-y-1/2 w-5 h-5"
              />
              <p
                class="py-1.5 px-8 text-md hover:text-rose-600 transition-colors duration-300"
              >
                {{ getTranslation(item, "name") || "-" }}
              </p>
            </NuxtLink>
          </ul>
        </span>
        <main v-if="contactList" class="w-full md:w-4/5">
          <h3 class="font-semibold mb-1">
            {{ contactList.total_objects }} địa chỉ
          </h3>
          <!--eslint-disable-next-line vue/html-self-closing -->
          <ul>
            <li
              v-for="item in contactList.results"
              :key="item.id"
              class="flex flex-col"
            >
            <hr class="text-slate-200" >
              <section class="flex justify-between gap-4 my-4">
                <NuxtImg
                  :src="item.thumbnail"
                  :alt="item.name"
                  class="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-cover self-center"
                />
                <section class="flex flex-col flex-1 py-4 gap-1">
                  <UModal 
                    fullscreen
                    :title="getTranslation(item, 'name')"
                    :close="{
                      color: 'error',
                      variant: 'outline',
                      class: 'rounded-full cursor-pointer',
                    }"
                  >
                    <h4 class="text-xl font-bold mb-1 cursor-pointer">
                      {{ getTranslation(item, "name") }}
                    </h4>
                    <template #body>
                      <article class="flex flex-col md:flex-row gap-4">
                        <div class="flex md:flex-col w-full md:w-80 gap-2">
                          <NuxtImg
                            :src="item.thumbnail"
                            :alt="item.name"
                            class="aspect-square object-cover w-32 md:w-auto row-span-4 self-center"
                          />
                          <section class="flex flex-col gap-1">
                            <div v-if="item.address" class="flex align-center gap-1 text-slate-400">
                              <Icon
                                class="text-orange-500 !w-[24px]"
                                name="pin"
                              />
                              <p class="text-wrap break-words">
                                {{ getTranslation(item, "address") }}
                              </p>
                            </div>
                            <a
                              v-if="item.phone"
                              class="flex align-center gap-1 text-slate-400"
                            >
                              <Icon class="text-orange-500" name="hotline" />
                              {{ item.phone }}
                            </a>
                            <a
                              v-if="item.email"
                              class="flex align-center gap-1 text-slate-400 break-all"
                            >
                              <Icon class="text-orange-500" name="mail" />
                              {{ item.email }}
                            </a>
                            <a
                              v-if="item.website"
                              class="flex align-center gap-1 text-slate-400 break-all"
                            >
                              <Icon class="text-orange-500" name="website" />
                              {{ item.website }}
                            </a>
                          </section>
                        </div>
                        <UIMapV1 :target-location="item" />
                      </article>
                    </template>
                  </UModal>
                  <p v-if="item.address" class="flex align-center gap-1 text-slate-400">
                    <Icon name="pin" />
                    {{ getTranslation(item, "address") }}
                  </p>
                  <a
                    v-if="item.phone"
                    class="flex align-center gap-1 text-blue-500"
                    :href="`tel:${item.phone}`"
                  >
                    <Icon name="hotline" />
                    {{ item.phone }}
                  </a>
                  <a
                    v-if="item.email"
                    class="flex align-center gap-1 text-blue-500 break-all"
                    :href="`mailto:${item.email}`"
                  >
                    <Icon name="mail" />
                    {{ item.email }}
                  </a>
                  <a
                    v-if="item.website"
                    class="flex align-center gap-1 text-blue-500 break-all"
                    :href="`https://${item.website}`"
                  >
                    <Icon name="website" />
                    {{ item.website }}
                  </a>
                </section>
              </section>
              
            </li>
          </ul>
          <UPagination
            v-if="contactList.total_objects > 10"
            v-model:page="page"
            show-edges
            :sibling-count="1"
            :total="contactList.total_objects"
            size="xl"
            color="none"
            active-color="error"
            active-variant="subtle"
          />
        </main>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});

const { getTranslation } = useTranslation();

//Handle category for creating breadcrumb
const { data: categories } = await useFetch("/api/contact/categories");
const route = useRoute();
const categoryId = computed(() => route.params.category.split("=")[1]);
const currentCategory = computed(() =>
  categories.value.results.find((item) => item.id === categoryId.value)
);
const breadcrumbData = computed(() => [
  {
    label: "home",
    text: "",
    path: "/",
  },
  {
    label: "utilities",
    text: "",
    path: "/utilities",
  },
  {
    text: getTranslation(currentCategory.value, "name"),
    path: `/utilities/${currentCategory.value.id}`,
  },
]);

//GET text label for utilities header & description
const { data: textLabelList } = await useFetch("/api/setup/textLabel");
const currentTextLabel = computed(() =>
  textLabelList.value.results.find((item) => item.name === "tienich")
);
const currentSmallTextLabel = computed(() =>
  textLabelList.value.results.find((item) => item.name === "tienichsmall")
);

//GET list contact by category
const page = ref(1);

// Fetch contacts with category and pagination
const { data: contactList } = await useFetch(
  () => {
    return `/api/contact/by-category?page=${page.value}&category=${categoryId.value}`;
  },
  {
    watch: [page],
  }
);
</script>

<style lang="scss" scoped>
.active-nav {
  color: crimson;
  background-color: #eef8ff;
}
</style>
