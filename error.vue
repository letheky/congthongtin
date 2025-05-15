<script setup lang="ts">
// Page title
const title = ref("404-Page Not Found");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - 404-Page Not Found`
      : "Cổng thông tin du lịch Bắc Ninh - Website thương mại điện tử Bắc Ninh hoàn toàn mới";
  },
});
</script>
<!-- eslint-disable -->
<template>
  <div class="flex flex-col items-center justify-center h-screen w-full">
    <img src="/images/error-img.svg" width="500" alt="404" />
    <h1 class="text-sm md:text-base text-slate-700 pt-3">Opps!!!</h1>
    <h4 class="text-sm md:text-base text-slate-700 my-8">
      Trang bạn tìm không tồn tại.
    </h4>
    <UIPrimaryBtn ><NuxtLink to="/">Quay về trang chủ </NuxtLink><Icon name="home" class="text-white" /></UIPrimaryBtn>
  </div>
</template>
