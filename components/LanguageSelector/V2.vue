<template>
  <div class="flex flex-col items-center justify-center">
    <hr class="text-gray-200 w-full" />
    <button
      v-for="loc in languages.results"
      :key="loc.code"
      class="flex items-center w-full gap-2 py-3 hover:bg-white hover:text-slate-800 cursor-pointer transition-colors duration-300"
      :class="{
        'text-gray-800': currentLocale === loc.code,
        'text-gray-400': currentLocale !== loc.code,
      }"
      @click.prevent.stop="setLocale(loc.code)"
    >
      <NuxtImg :src="loc.icon" :alt="`${loc.code} flag`" class="w-5 h-5" />
      <p class="text-sm">
        {{ loc.name }}
      </p>
    </button>
    <hr class="text-gray-200 w-full" />
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

const currentLocale = computed(() => locale.value);

const { data: languages } = await useFetch("/api/setup/language");
</script>

<style lang="scss" scoped></style>
