<template>
  <section class="w-full py-2 relative max-w-full overflow-hidden">
    <h3
      ref="utilitiesTitle"
      class="text-4xl font-bold text-center text-slate-700 !mt-4 !mb-10"
    >
      {{ label.translations[currentLocale].content }}
    </h3>
    <div class="!px-20 md:!px-10 lg:!px-20">
      <div
        class="utility-grid grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3 lg:gap-4"
      >
        <NuxtLink
          v-for="utility in utilitiesData.results"
          :key="utility.id"
          class="utility-item flex flex-col items-center gap-1 md:gap-2 justify-center cursor-pointer"
          :to="`/utilities/category=${utility.id}`"
        >
          <div class="relative group">
            <NuxtImg
              class="w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
              :src="utility.thumbnail || utility.image"
            />
            <!-- Border animation element that shrinks from middle to outer -->
            <div
              class="absolute inset-0 rounded-full border-2 border-rose-700 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
            />
          </div>
          <span
            class="text-slate-700 text-xs sm:text-sm md:text-base lg:text-xl text-center text-nowrap"
          >
            {{ utility.translations[currentLocale].name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();

const { label } = defineProps({
  label: { type: Object, required: true },
});
const currentLocale = computed(() => locale.value);
const { data: utilitiesData } = await useFetch("/api/contact/categories");

// Use the composable with default options
const { fromRight } = useSlideIn();
fromRight(".utility-item", ".utility-grid");

const { elementRef: utilitiesTitle, animate } = useTextReveal();
animate();
</script>

<style lang="scss" scoped></style>
