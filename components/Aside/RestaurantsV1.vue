<template>
  <article
    v-if="listItem.results.length > 0"
    class="border border-gray-200 rounded-md p-6 text-slate-700"
  >
    <h4 class="text-xl font-bold my-4">
      {{ title || $t("article.restaurant") }}
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
        <section class="flex flex-col gap-3">
          <NuxtLink
            :to="`/food/${item.id}`"
            class="text-md font-semibold cursor-pointer hover:text-sky-700 transition-colors duration-300"
          >
            {{ getTranslation(item, "name") }}
          </NuxtLink>
          <p class="flex gap-1 text-sm">
            <Icon name="pin" class="w-5 h-5 text-sky-600" />{{
              getTranslation(item, "address")
            }}
          </p>
        </section>
      </span>
    </span>
  </article>
</template>

<script setup>
const { getTranslation } = useTranslation();
const { apiPath, title } = defineProps({
  apiPath: { type: String, required: true },
  title: { type: String, default: "" },
});

const { data: listItem } = await useFetch(apiPath);
</script>

<style scoped></style>
