<template>
  <!-- Desktop header -->
  <div
    class="flex items-center justify-around px-10 py-2 gap-4 shadow-md w-full text-blue-950"
    :class="[
      isScrolled
        ? 'fixed top-0 transition-all duration-200 z-50 bg-gray-800 shadow-md text-white'
        : 'bg-transparent',
    ]"
  >
    <NuxtLink to="/">
      <NuxtImg src="/images/logo.webp" alt="logo" class="w-12 h-12" />
    </NuxtLink>
    <Icon
      name="menu2"
      class="text-gray-800 w-10 h-10 lg:hidden"
      :class="{
        'text-white': isScrolled,
      }"
      @click="isOpen = true"
    />
    <nav class="hidden items-center justify-around h-12 lg:flex">
      <ul class="flex items-center gap-4">
        <li
          v-for="(menuItem, index) in homeMenu as MenuItem[]"
          :key="menuItem.id"
          class="relative group h-16 flex items-center"
        >
          <NuxtLink
            :to="t(`homeMenu[${index}].href`)"
            class="uppercase hover:text-red-600 transition-colors duration-500"
          >
            {{ t(`homeMenu[${index}].label`) }}
          </NuxtLink>

          <!-- Dropdown -->
          <ul
            v-if="menuItem.children"
            class="absolute top-full left-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 bg-white border-t-2 border-red-600 min-w-fit w-52 shadow-md z-10"
          >
            <li
              v-for="(child, childIndex) in menuItem.children"
              :key="child.id"
              class="px-4 py-2 text-nowrap text-sm uppercase border-t-2 border-red-600 hover:text-white hover:bg-red-600 transition-colors duration-300"
              :class="{
                'text-gray-800': isScrolled,
              }"
            >
              <NuxtLink
                :to="t(`homeMenu[${index}].children[${childIndex}].href`)"
              >
                {{ t(`homeMenu[${index}].children[${childIndex}].label`) }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Mobile & Touchpad header -->
  <TransitionSlideToRight>
    <div
      v-show="isOpen"
      class="fixed inset-0 z-50 flex"
      role="dialog"
      tabindex="-1"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-blue-950/90" @click="isOpen = false" />
      <!-- Panel -->
      <div
        class="relative max-w-full md:max-w-xs w-full bg-white border-e border-gray-200 transform transition-transform duration-300"
      >
        <div
          class="flex justify-between items-center py-3 px-4 border-b border-gray-200"
        >
          <h3 class="font-bold text-gray-800 mr-1">
            Cổng thông tin du lịch Bắc Ninh
          </h3>
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none"
            aria-label="Close"
            @click="isOpen = false"
          >
            <Icon name="close" class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <ul class="flex flex-col items-start gap-1">
            <li
              v-for="(menuItem, index) in homeMenu as MenuItem[]"
              :key="menuItem.id"
              class="flex flex-col items-start justify-between border-b-2 border-gray-200 w-full"
            >
              <div class="flex items-center justify-between w-full py-1">
                <NuxtLink
                  :to="t(`homeMenu[${index}].href`)"
                  class="uppercase text-gray-800 hover:text-red-600 transition-colors duration-500"
                >
                  {{ t(`homeMenu[${index}].label`) }}
                </NuxtLink>
                <button
                  v-if="menuItem.children"
                  type="button"
                  class="size-8 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none"
                  aria-label="Toogle Submenu"
                  @click="handleShowSubMenu(index)"
                >
                  <Icon
                    :name="showSubMenuIndex === index ? 'arrowUp' : 'arrowDown'"
                    class="w-5 h-5"
                  />
                </button>
              </div>
              <TransitionNestComponent>
                <ul
                  v-if="showSubMenuIndex === index"
                  class="flex flex-col items-start gap-1"
                >
                  <li
                    v-for="(child, childIndex) in menuItem.children"
                    :key="child.id"
                  >
                    <NuxtLink
                      :to="t(`homeMenu[${index}].children[${childIndex}].href`)"
                      class="text-gray-800 hover:text-red-600 transition-colors duration-500"
                    >
                      {{
                        t(`homeMenu[${index}].children[${childIndex}].label`)
                      }}
                    </NuxtLink>
                  </li>
                </ul>
              </TransitionNestComponent>
            </li>
          </ul>
        </div>
        <div class="flex flex-col justify-between px-4 gap-4">
          <div class="flex items-center gap-2">
            <Icon name="user" class="w-5 h-5 text-gray-800" />
            <p class="text-md text-gray-800">Đăng nhập</p>
          </div>
          <button
            v-for="loc in locales"
            :key="loc.code"
            class="flex items-center gap-2 border-gray-200 first-of-type:border-t-2 first-of-type:pt-2 last-of-type:border-b-2 last-of-type:pb-2"
            :class="{
              'text-blue-800': currentLocale === loc.code,
              'text-gray-400': currentLocale !== loc.code,
            }"
            @click.prevent.stop="setLocale(loc.code)"
          >
            <NuxtImg
              :src="`/images/flags/${loc.code}.png`"
              :alt="`${loc.code} flag`"
              class="w-5 h-5"
            />
            <p class="text-md">
              {{ loc.name }}
            </p>
          </button>
        </div>
        <section class="text-gray-800 px-4 py-2">
          <p class="my-4">
            Cổng thông tin du lịch Bắc Ninh cung cấp những thông tin hữu ích
            nhất cho trải nghiệm du lịch của bạn.
          </p>
          <a class="text-red-600" href="mailto:svhttdl@bacninh.gov.vn"
            >svhttdl@bacninh.gov.vn</a
          >
          <!-- eslint-disable -->
          <br />
          <a class="text-red-600" href="tel:02223 822 532">02223 822 532</a>
          <p class="text-red-600">
            Địa chỉ: số 15 Lý Thái Tổ - Tp Bắc Ninh - tỉnh Bắc Ninh
          </p>
        </section>
      </div>
    </div>
  </TransitionSlideToRight>
</template>

<script setup lang="ts">
type MenuItem = {
  id: number;
  label: string;
  href: string;
  children?: MenuItem[];
};

const { t, tm, locale, locales, setLocale } = useI18n();
const homeMenu = tm("homeMenu");

const isScrolled = ref(false);
const isOpen = ref(false);
const showSubMenuIndex = ref(-1);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};
const currentLocale = computed(() => locale.value);

const handleShowSubMenu = (index: number) => {
  if (showSubMenuIndex.value === index) {
    showSubMenuIndex.value = -1;
  } else {
    showSubMenuIndex.value = index;
  }
};

const preventBodyScroll = () => {
  if (isOpen.value) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }
};

watch(isOpen, preventBodyScroll);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  preventBodyScroll(); // Reset body scroll when component unmounts
});
</script>

<style lang="scss" scoped></style>
