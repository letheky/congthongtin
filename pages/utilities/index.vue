<template>
  <div>
    <BreadCrumbV2 :breadcrumb="breadcrumbData" />
    <div class="!px-[5%] !py-6 text-slate-700">
      <section>
        <h3 class="text-center text-3xl font-semibold">
          {{ getTranslation(currentTextLabel, 'content') }}
        </h3>
        <p class="text-center text-md">
          {{ getTranslation(currentSmallTextLabel, 'content') }}
        </p>
      </section>
      <section class="flex justify-between !my-4 gap-6">
        <span class="w-1/5 border border-slate-500 h-fit">
          <h3
            class="text-lg font-semibold !py-1 !mx-3 mb-1 border-b border-b-slate-500"
          >
            {{ getTranslation(currentTextLabel, 'content') }}
          </h3>
          <ul class="!py-2">
            <NuxtLink
              v-for="item in categories.results"
              :key="item.id"
              class="relative inline-block w-full"
              :to="`/utilities/category=${item.id}`"
              :class="{ 'active-nav': item.id === category }"
            >
              <Icon
                v-if="item.id === category"
                name="check"
                class="absolute left-2 top-[50%] -translate-y-1/2 w-5 h-5"
              />
              <p
                class="!py-1.5 !px-8 text-md hover:text-rose-600 transition-colors duration-300"
              >
                {{ getTranslation(item, 'name') }}
              </p>
            </NuxtLink>
          </ul>
        </span>
        <main class="w-4/5">
          <h3 class="font-semibold !mb-1">
            {{ contactList.total_objects }} địa chỉ
          </h3>
          <!--eslint-disable-next-line vue/html-self-closing -->
          <hr />
          <ul>
            <li
              v-for="item in contactList.results"
              :key="item.id"
              class="flex justify-between gap-4 !my-4"
            >
              <NuxtImg
                :src="item.thumbnail"
                :alt="item.name"
                class="w-48 h-48 object-cover"
              />
              <section class="flex flex-col flex-1 !py-4 gap-1">
                <h4 class="text-xl font-semibold !mb-1">
                  {{ getTranslation(item, 'name') }}
                </h4>
                <p class="flex align-center gap-1 text-slate-400">
                  <Icon name="pin" />
                  {{ getTranslation(item, 'address') }}
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
                  class="flex align-center gap-1 text-blue-500"
                  :href="`mailto:${item.email}`"
                >
                  <Icon name="mail" />
                  {{ item.email }}
                </a>
                <a
                  v-if="item.website"
                  class="flex align-center gap-1 text-blue-500"
                  :href="`https://${item.website}`"
                >
                  <Icon name="website" />
                  {{ item.website }}
                </a>
              </section>
            </li>
          </ul>
        </main>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});

//GET current locale
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Helper function to safely get translations with fallback
const getTranslation = (item, field) => {
  // Check if item exists
  if (!item) return "-";
  
  // Check if translations object exists
  if (!item.translations) return item[field] || "-";
  
  // First try the current locale
  if (item.translations[currentLocale.value]?.[field]) {
    return item.translations[currentLocale.value][field];
  }
  
  // Last resort fallback
  return item[field] || "-";
};

//Handle category for creating breadcrumb
const { data: categories } = await useFetch("/api/contact/categories");
const route = useRoute();
const category = computed(() => route?.params?.category?.split("=")[1] || "");
const currentCategory = computed(() =>
  categories.value.results.find((item) => item.id === category.value) || {}
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
    text: getTranslation(currentCategory.value, 'name'),
    path: `/utilities/${category.value ? `category=${category.value}` : ''}`,
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
const { data: contactList } = (await category.value)
  ? useFetch(`/api/contact/by-category?category=${category.value}`)
  : useFetch(`/api/contact/by-category`);
</script>

<style lang="scss" scoped>
.active-nav {
  color: crimson;
  background-color: #eef8ff;
}
</style>