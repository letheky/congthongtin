<template>
  <nav
    aria-label="Breadcrumb"
    class="!py-2 !px-10 bg-slate-700 text-white overflow-x-auto whitespace-nowrap md:whitespace-normal"
  >
    <ul class="flex items-center gap-2">
      <li
        v-for="(item, index) in breadcrumb"
        :key="item.to"
        class="flex items-center text-slate-300 hover:text-white transition-colors duration-300"
      >
        <!-- Each item has a `to` (NuxtLink props) and `label` (localized) -->
        <Icon v-if="index !== 0" name="chevronRight" />
        <NuxtLink
          v-if="index === 0"
          :to="item.path"
          class="flex items-center gap-2"
        >
          <Icon name="home" class="md:hidden" />
          <p class="hidden md:block">
            {{ $t(`breadcrumb.${toCamelCase(item.label)}`) }}
          </p>
        </NuxtLink>
        <NuxtLink
          v-else
          :to="item.path"
          :class="{ 'active-nav': index === breadcrumb.length - 1 }"
        >
          {{ $t(`breadcrumb.${toCamelCase(item.label)}`) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const { breadcrumb } = defineProps({
  breadcrumb: { type: Array, required: true },
});
const { toCamelCase } = useCamelCase();
</script>
<style lang="scss" scoped>
.active-nav {
  color: skyblue;
}
</style>
