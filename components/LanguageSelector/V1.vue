<template>
  <div
    class="hidden items-center justify-end !px-10 !py-2 gap-5 bg-gray-800 md:flex"
  >
    <button
      v-for="loc in languages.results"
      :key="loc.code"
      class="flex items-center gap-2 cursor-pointer"
      :class="{
        'text-white': currentLocale === loc.code,
        'text-gray-400': currentLocale !== loc.code,
      }"
      @click.prevent.stop="setLocale(loc.code)"
    >
      <NuxtImg
        :src="loc.icon"
        :alt="`${loc.code} flag`"
        class="w-4 h-4"
      />
      <p class="text-sm">
        {{ loc.name }}
      </p>
    </button>
    <div class="relative inline-block cursor-pointer group mt-1">
      <Icon name="search" class="text-white group-hover:text-red-700" />
      <div
        class="absolute left-1/2 -translate-x-1/2 !px-3 !py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-10 text-nowrap"
      >
        {{ t("tooltip.search") }}
      </div>
    </div>
    <div class="relative inline-block cursor-pointer group mt-1">
      <Icon name="user" class="text-white group-hover:text-red-700" />
      <div
        class="absolute left-1/2 -translate-x-1/2 !px-3 !py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-10 text-nowrap"
      >
        {{ t("tooltip.login") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n();

const currentLocale = computed(() => locale.value);

const {data: languages } = await useFetch("/api/setup/language");</script>

<style lang="scss" scoped></style>
