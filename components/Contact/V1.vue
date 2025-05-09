<template>
  <span
    class="flex flex-col sm:flex-row w-full gap-4 !pt-2 !pb-8 justify-center items-center"
  >
    <NuxtLink
      v-for="index in 3"
      :key="index"
      class="text-slate-700 border border-slate-300 w-full sm:w-1/3 min-h-20 sm:min-h-[160px] h-full flex flex-col items-center gap-2 !py-2 !px-4 hover:shadow-md transition-all duration-300"
      :class="{ 'cursor-pointer': index !== 1 }"
      :to="
        index === 2
          ? 'tel:02223822532'
          : index === 3
          ? 'mailto:svhttdl@bacninh.gov.vn'
          : ''
      "
    >
      <span
        class="w-10 h-10 md:w-12 md:h-12 lg:h-16 lg:w-16 rounded-full flex items-center justify-center"
        :style="{
          backgroundColor:
            index === 1 ? '#FF0243' : index === 2 ? '#6EBD31' : '#41B9EB',
        }"
      >
        <Icon
          :name="
            index === 1
              ? 'contactMap'
              : index === 2
              ? 'contactPhone'
              : 'contactMail'
          "
          class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
        />
      </span>
      <p class="text-center !px-2 break-words">
        {{
          index === 1
            ? $t("footer.address")
            : index === 2
            ? $t("footer.phone")
            : "svhttdl@bacninh.gov.vn"
        }}
      </p>
    </NuxtLink>
  </span>
</template>

<script setup lang="ts"></script>

<style scoped></style>
