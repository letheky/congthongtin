<template>
  <div class="w-full max-w-full">
    <UApp>
      <NuxtLayout>
        <NuxtPage
          :transition="{
            name: 'page',
            mode: 'out-in',
            onBeforeEnter,
          }"
        />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup lang="ts">
import useStore from "~/store/useStore";
const { finalizePendingLocaleChange } = useI18n();

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange();
};

//Get page info
const store = useStore();
// const { getTranslation } = useTranslation();
const { data: pageInfo, error } = await useFetch("/api/setup/info");
const { data: provinceList } = await useFetch("/api/location/province");
const { data: wardList } = await useFetch("/api/location/ward");
const { data: countryList } = await useFetch("/api/location/country");
const { data: districtList } = await useFetch("/api/location/district");
const { data: textLabelList } = await useFetch("/api/setup/textLabel");

onMounted(() => {
  if (pageInfo.value) {
    store.setWebsiteInfo(pageInfo.value);
    store.provinceList = provinceList.value.results;
    store.wardList = wardList.value.results;
    store.countryList = countryList.value.results;
    store.districtList = districtList.value.results;
    store.textLabelList = textLabelList.value.results;
    
  } else if (error.value) {
    console.error("Error fetching page info:", error.value);
  }
});
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
