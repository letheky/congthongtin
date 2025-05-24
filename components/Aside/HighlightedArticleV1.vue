<template>
  <article
    v-if="listItem.results.length > 0"
    class="border border-gray-200 rounded-md p-6 text-slate-700"
  >
    <h4 class="text-xl font-bold my-4">
      {{ title || $t("article.article") }}
    </h4>
    <span
      v-for="item in listItem.results"
      :key="item.id"
      class="flex flex-col gap-3 py-3"
    >
      <hr class="w-full text-gray-200" />
      <span class="flex gap-3 items-center">
        <NuxtImg
          :src="item.thumbnail || item.image"
          :alt="item.id"
          class="w-20 h-20 object-cover"
        />
        <NuxtLink
          :to="`/article/${item.id}`"
          class="text-lg font-semibold cursor-pointer hover:text-sky-700 transition-colors duration-300"
        >
          {{ getTranslation(item, "title") }}
        </NuxtLink>
      </span>
    </span>
  </article>
</template>

<script setup>
const { getTranslation } = useTranslation();
const { title } = defineProps({
  title: { type: String, default: "" },
});

const { data: listItem } = await useFetch(
  `/api/article/by-category?highlight=${true}&page_size=${5}`
);
</script>

<style scoped></style>
