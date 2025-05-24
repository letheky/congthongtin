<template>
  <div class="flex items-center gap-2 my-4">
    <h3 class="text-gray-500">{{ $t("article.share") }}</h3>
    <NuxtLink
      v-for="(icon, index) in iconList"
      :key="index"
      :to="icon.url"
      class="flex justify-center items-center bg-gray-300 text-gray-500 h-10 w-10 rounded-full hover:bg-gray-600 hover:text-white transition-colors duration-300"
    >
      <Icon class="h-5 w-5" :name="icon.icon" />
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const baseUrl =
  runtimeConfig.public.baseUrl || "https://congthongtin-phi.vercel.app/";

const fullUrl = computed(() => `${baseUrl}${route.fullPath}`);
const encodedUrl = computed(() => encodeURIComponent(fullUrl.value));

const iconList = [
  {
    icon: "facebook",
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}`,
  },
  {
    icon: "twitter",
    url: `https://twitter.com/intent/tweet?url=${encodedUrl.value}`,
  },
  { icon: "telegram", url: `https://t.me/share/url?url=${encodedUrl.value}` },
  {
    icon: "pinterst",
    url: `https://www.pinterest.com/pin/create/button/?url=${encodedUrl.value}`,
  },
  {
    icon: "linkedin",
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}`,
  },
];
</script>

<style scoped></style>
