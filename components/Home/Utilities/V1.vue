<template>
  <section class="w-full py-2 relative max-w-full overflow-hidden">
    <h3
      ref="utilitiesTitle"
      class="text-4xl font-bold text-center text-slate-700 !mt-4 !mb-10"
    >
      {{ t("utilities.title") }}
    </h3>
    <div class="!px-20 md:!px-10 lg:!px-20">
      <div
        class="utility-grid grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3 lg:gap-4"
      >
        <div
          v-for="utility in utilities"
          :key="utility.icon"
          class="utility-item flex flex-col items-center gap-1 md:gap-2 justify-center cursor-pointer"
        >
          <div class="relative group">
            <div
              class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
              :style="{ backgroundColor: utility.bgColor }"
            >
              <Icon
                :name="utility.icon"
                class="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                :style="{ color: utility.iconColor }"
              />
            </div>
            <!-- Border animation element that shrinks from middle to outer -->
            <div
              class="absolute inset-0 rounded-full border-2 border-rose-700 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
            />
          </div>
          <span
            class="text-slate-700 text-xs sm:text-sm md:text-base lg:text-xl text-center text-nowrap"
            >{{ t(`utilities.${utility.icon}`) }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup >
const { t } = useI18n();

const utilities = [
  {
    icon: "gas",
    class: "gas",
    bgColor: "#ffd8cc",
    iconColor: "#ff6b35",
  },
  {
    icon: "taxi",
    class: "taxi",
    bgColor: "#fff2cc",
    iconColor: "#ffc107",
  },
  {
    icon: "bus",
    class: "bus",
    bgColor: "#d1e7ff",
    iconColor: "#0d6efd",
  },
  {
    icon: "atm",
    class: "atm",
    bgColor: "#d4f4d7",
    iconColor: "#198754",
  },
  {
    icon: "market",
    class: "market",
    bgColor: "#f5d6c6",
    iconColor: "#d4622e",
  },
  {
    icon: "shop",
    class: "shop",
    bgColor: "#d7f5f5",
    iconColor: "#20c997",
  },
  {
    icon: "pharmacy",
    class: "pharmacy",
    bgColor: "#ffd6e5",
    iconColor: "#e83e8c",
  },
  {
    icon: "carRental",
    class: "car-rental",
    bgColor: "#DFECFC",
    iconColor: "#3A569D",
  },
  {
    icon: "hotline",
    class: "hotline",
    bgColor: "#e5d8ff",
    iconColor: "#8540f5",
  },
];

// Use the composable with default options
const { fromRight } = useSlideIn()
fromRight('.utility-item', '.utility-grid')

const { elementRef: utilitiesTitle, animate } = useTextReveal()
animate()

</script>

<style lang="scss" scoped>
</style>
