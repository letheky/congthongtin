<template>
  <nav
    aria-label="Breadcrumb"
    class="!py-2 !px-10 bg-slate-300 text-white overflow-x-auto whitespace-nowrap md:whitespace-normal"
  >
    <ul class="flex items-center gap-2">
      <li
        v-for="(item, index) in breadcrumb"
        :key="item.to"
        class="flex items-center text-slate-700  transition-colors duration-300"
      >
        <!-- Each item has a `to` (NuxtLink props) and `label` (localized) -->
        <Icon v-if="index !== 0" name="chevronRight" />
        <NuxtLink
          v-if="index === 0"
          :to="item.path"
          class="flex items-center gap-2 hover:text-white"
        >
          <Icon name="home" class="md:hidden" />
          <p class="hidden md:block">
            {{ item.text || $t(`breadcrumb.${toCamelCase(item.label)}`) }}
          </p>
        </NuxtLink>
        <NuxtLink
          v-else
          :to="item.path"
          :class="{ 'active-nav': index === breadcrumb.length - 1 }"
          class="hover:text-white"
        >
          {{ item.text || $t(`breadcrumb.${toCamelCase(item.label)}`) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const { toCamelCase } = useCamelCase();
const { breadcrumb } = defineProps({
  breadcrumb: { type: Array, required: true },
});

</script>
<style lang="scss" scoped>
.active-nav {
  color: #e82323;
}
</style>
