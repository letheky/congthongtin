<template>
  <div>
    <h3 class="text-center text-3xl text-slate-700 font-semibold">
      {{ currentTextLabel.translations[currentLocale].content }}
    </h3>
    <p class="text-center text-lg text-slate-600">{{ currentSmallTextLabel.translations[currentLocale].content }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
})


const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const { data: textLabelList } = await useFetch("/api/setup/textLabel");
const currentTextLabel = computed(() =>
  textLabelList.value.results.find((item) => item.name === "tienich")
);
const currentSmallTextLabel = computed(() =>
  textLabelList.value.results.find((item) => item.name === "tienichsmall")
);
</script>

<style lang="scss" scoped></style>
