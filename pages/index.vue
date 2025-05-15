<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <HomeHeroV1 />
    <HomeUtilitiesV1 :label="find('tienich')" />
    <HomeExploreV1
      :label="find('khampha')"
      :smallLabel="find('khamphasmall')"
    />
    <HomeEventsV1 :label="find('sukien')" />
    <HomeTodosV1 />
    <HomeDetailsV1 :label="find('dacsac')" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
const { data: textLabelList } = await useFetch("/api/setup/textLabel");
const find = (text) => {
  return textLabelList.value.results.find((el) => el.name === text);
};
</script>

<style lang="scss" scoped></style>
