<template>
  <div class="flex flex-col items-center justify-center bg-gray-800">
    <button
      v-for="loc in languages.results"
      :key="loc.code"
      class="flex items-center w-full gap-2 px-5 py-2 hover:bg-white hover:text-slate-800 cursor-pointer transition-colors duration-300"
      :class="{
        'text-white': currentLocale === loc.code,
        'text-gray-400': currentLocale !== loc.code,
      }"
      @click.prevent.stop="setLocale(loc.code)"
    >
      <NuxtImg
        :src="loc.icon"
        :alt="`${loc.code} flag`"
      />
      <p class="text-sm">
        {{ loc.name }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

const currentLocale = computed(() => locale.value);

const {data: languages } = await useFetch("/api/setup/language");
</script>

<style lang="scss" scoped></style>
